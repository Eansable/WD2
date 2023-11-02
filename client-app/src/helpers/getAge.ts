const getPlayerAge = (date: Date) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const dobnow = new Date(now.getFullYear(), date.getMonth(), date.getDate())
    let age = today.getFullYear() - date.getFullYear()
    if (today < dobnow) {
      age--
    }
    return age
  }

  export default getPlayerAge