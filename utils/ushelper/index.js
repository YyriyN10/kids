import congressmenData from './congressmendata.json'
import senatorsData from './senatorsdata.json'
import { getState } from './states'
import { districtsData } from './districtsdata'
import { bundestagData } from './bundestagdata'
import { districtNums } from './nums'

// pick random of array
const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const zipCodeToState = (zipcode) => {
  const state = getState(zipcode)
  return state
}

export const zipCodeToStateDistrict = (zipcode) => {
  const state = getState(zipcode)
  const district = districtsData[zipcode]

  if (!district) {
    return state
  }

  return `${state} (${districtNums[pickRandom(district)]})`
  // return { district: DISTRICT_NUMS[district[0]], state: state }
}

export { congressmenData, senatorsData, bundestagData }
