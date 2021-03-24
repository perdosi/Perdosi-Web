const greeting = () => {
  const date = new Date()
  const hours = date.getHours()
  const message = hours < 12 ? 'Selamat Pagi' : hours < 18 ? 'Selamat Siang' : 'Selamat Malam'
  return message
}

export default greeting