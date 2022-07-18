export const pad = (num) => {
  return num.toString().padStart(2, '0')
}

export const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const pushGTMData = (window, data) => {
  window.dataLayer?.push({
    ...data,
  })
}
