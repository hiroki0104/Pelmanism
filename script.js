;(() => {
  Array.prototype.shuffle = function () {
    let i = this.length
    while (i) {
      const j = Math.floor(Math.random() * i)
      let t = this[--i]
      this[i] = this[j]
      this[j] = t
    }
    return this
  }

  let images = [
    { src: 'dog.jpeg', alt: 'dog' },
    { src: 'bear.jpeg', alt: 'bear' },
    { src: 'lion.jpg', alt: 'lion' },
  ]

  let timer = NaN,
    score = 0,
    flipTimer,
    prevImage,
    prevTd,
    startTime

  window.addEventListener('load', init)
  function init() {
    const table = document.getElementById('table')
    const imageLength = images.length
    for (let i = 0; i < imageLength; ++i) {
      images.push(images[i])
    }
    images.shuffle()
    console.log(images)
    for (let i = 0; i < 3; ++i) {
      const tr = document.createElement('tr')
      for (let j = 0; j < 2; ++j) {
        const td = document.createElement('td')
        const img = document.createElement('img')
        td.className = 'card back'
        // td.number = cards[i * 2 + j]
        td.addEventListener('click', flip)
        const resource = images[i * 2 + j]
        img.src = `img/${resource.src}`
        img.alt = resource.alt
        console.log(img.alt)
        console.log(img.src)
        td.appendChild(img)
        tr.appendChild(td)
      }
      table.appendChild(tr)
    }

    startTime = new Date()
    timer = setInterval(tick, 1000)
  }

  function tick() {
    let now = new Date()
    let elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
    document.getElementById('time').textContent = elapsed
  }

  function flip(e) {
    let src = e.srcElement.firstChild
    let srcParent = e.srcElement
    console.log(src.classList)
    if (flipTimer || src.textContent != '') {
      return
    }
    let alt = src.alt
    srcParent.classList = 'card'
    src.classList.add('appear')

    if (prevImage == null) {
      prevImage = src
      prevTd = srcParent
      return
    }
    console.log(prevImage)
    if (prevImage.alt == alt) {
      if (++score == images.length / 2) {
        clearInterval(timer)
      }
      prevImage = null
      clearTimeout(flipTimer)
    } else {
      flipTimer = setTimeout(() => {
        src.classList.remove('appear')
        prevImage.classList.remove('appear')
        srcParent.className = 'card back'
        prevTd.className = 'card back'
        prevImage = null
        flipTimer = NaN
      }, 1000)
    }
  }
})()
