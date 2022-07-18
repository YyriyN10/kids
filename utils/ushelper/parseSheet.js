require('dotenv').config()
const axios = require('axios')
const congressmendata = require('./congressmendata.json')
const congressmenWebpages = require('./congressmen-pages.json')
const senatorsData = require('./senatorsdata.json')
const fs = require('fs')

const { GOOGLE_SPREADSHEET_ID, GOOGLE_EMAIL, GOOGLE_PRIVATE_KEY } = process.env

const GoogleSpreadsheet = require('google-spreadsheet').GoogleSpreadsheet

async function loadSpreadsheet(spreadsheetId) {
  const doc = new GoogleSpreadsheet(spreadsheetId)
  await doc.useServiceAccountAuth({
    client_email: GOOGLE_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  })
  await doc.loadInfo()

  return doc
}

function parseName(name) {
  const parts = name.split(' ')
  const firstName = parts[0].toLowerCase()
  const lastName = parts[parts.length-1].toLowerCase()
  return { firstName, lastName }
}

async function findContactPage(baseUrl, name) {
  const { firstName, lastName } = parseName(name)

  const urlOptions = ['contact/', 'public/index.cfm/contact/', 'public/index.cfm/contact-form/', 'public/index.cfm/contact-me/',
                      `contact-${firstName}`, `write-to-${firstName}/`, `connect/email-${firstName}/`, `contact/contact-landing/`, `contact/contact-my-office/`, 
                      `contact-us/`, `public/index.cfm/emailsenator${lastName}/`]

  for (let option of urlOptions) {
    const url = `${baseUrl}${option}`

    console.log('Trying', url)

    try {
      const response = await axios.get(url, { timeout: 10_000 })
      if ([200, 301, 302].includes(response.status)) {
        return url
      } else {
        console.log('status:', response.status)
      }
    } catch (err) {
      console.log('err:', err.status, err.message)
    }
  }

  return null
}

async function getCongressmenPages(spreadsheetId) {
  const doc = await loadSpreadsheet(spreadsheetId)

  let congressSheet = doc.sheetsByTitle['Congressmen']
  await congressSheet.loadCells('C1:C')

  let congressmen = []

  for (let i = 0; i < congressSheet.rowCount; i++) {
    const cell = await congressSheet.getCellByA1(`C${i + 1}`)

    if (cell.value) {
      const name = cell.value
      const website = cell._rawData?.hyperlink

      if (website?.length > 0) {
        const contactPage = await findContactPage(website)
        console.log(name, website, contactPage)
        congressmen.push({ name, website, contactPage })
      }
    }
  }

  return congressmen
}

async function getSenatorsPages() {

  const senators = []
  
  for (let senator of senatorsData) {

    const { name, website } = senator

    if (senator.contactPage) continue

    const contactPage = await findContactPage(website, name)

    console.log(name, website, contactPage)
    console.log()   

    senator.contactPage = contactPage

    senators.push(senator)
  }
  
  return senators
}

function findCongressman(congressmen, name) {
  for (let congressman of congressmen) {
    if (congressman.name == name) {
      return congressman
    }
  }
}

;(async () => {
  // const congressmen = await getCongressmenPages(GOOGLE_SPREADSHEET_ID)
  // fs.writeFileSync('congressmen-pages.json', JSON.stringify(congressmen))

  const senators = await getSenatorsPages()
  fs.writeFileSync('senatorsdata-v2.json', JSON.stringify(senators))

  // for (let congressmanWeb of congressmenWebpages) {
  //   const queryName = congressmanWeb.name
  //   const congressman = findCongressman(congressmendata, queryName)
  //   if (congressman) {
  //     congressman.contactPage = congressmanWeb.contactPage
  //     congressman.website = congressmanWeb.website
  //   } else {
  //     console.log(
  //       'did not find congressman',
  //       queryName,
  //       'Their contact page is:',
  //       congressmanWeb.contactPage
  //     )
  //   }
  // }

  // fs.writeFileSync('congressmendata-v2.json', JSON.stringify(congressmendata))
})()
