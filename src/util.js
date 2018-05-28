const getTime = (count, applyZeros = true) => {
  let min = Math.floor(count / 60),
      sec = count % 60
  if(applyZeros){
    min = min < 10 ? `0${min}` : min
  }
  sec = sec < 10 ? `0${sec}` : sec
  return `${min}:${sec}`
}

const getRand = (min, max) => Math.floor(Math.random() * max) + min

export {
  getTime,
  getRand
}