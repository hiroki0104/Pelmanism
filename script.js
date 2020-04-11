;(() => {
  // 配列の要素をランダムに並べ替えるメソッドshuffle。プロトタイプに追加
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
    { src: 'kajitani.jpg', alt: 'kaji' },
    { src: 'bear.jpeg', alt: 'bear' },
    { src: 'lion.jpg', alt: 'lion' },
    { src: 'dog.jpeg', alt: 'dog' },
    { src: 'asitani.jpg', alt: 'riku' },
    { src: 'sai.jpeg', alt: 'sai' },
    { src: 'panda.jpeg', alt: 'panda' },
    { src: 'manmos.jpeg', alt: 'manmos' },
    { src: 'saru.jpeg', alt: 'saru' },
    { src: 'nezumi.png', alt: 'nezumi' },
  ]
  const imageLength = images.length

  let timer = NaN,
    score = 0,
    flipTimer,
    prevImage,
    prevTd,
    startTime

  window.addEventListener('load', init)

  // 初期化処理
  function init() {
    for (let i = 0; i < imageLength; ++i) {
      images.push(images[i])
    }
    images.shuffle()

    render()

    startTime = new Date()
    timer = setInterval(tick, 1000)
  }

  // 画面に描画
  function render() {
    const table = document.getElementById('table')
    for (let i = 0; i < 4; ++i) {
      const tr = document.createElement('tr')
      for (let j = 0; j < 5; ++j) {
        const td = document.createElement('td')
        const img = document.createElement('img')
        td.className = 'card back'
        td.addEventListener('click', flip)
        const resource = images[i * 5 + j]
        img.src = `img/${resource.src}`
        img.alt = resource.alt
        td.appendChild(img)
        tr.appendChild(td)
      }
      table.appendChild(tr)
    }
  }

  function tick() {
    let now = new Date()
    let elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
    document.getElementById('time').textContent = elapsed
  }

  function flip(e) {
    let src = e.srcElement.firstChild
    let srcParent = e.srcElement
    if (flipTimer || src == null) {
      return
    }
    let alt = src.alt
    srcParent.classList = 'card'
    src.classList.add('appear')

    if (prevImage == null && prevTd == null) {
      prevImage = src
      prevTd = srcParent
      return
    }
    if (prevImage.alt == alt) {
      if (++score == imageLength) {
        clearInterval(timer)
      }
      prevImage = null
      prevTd = null
      clearTimeout(flipTimer)
    } else {
      flipTimer = setTimeout(() => {
        src.classList.remove('appear')
        prevImage.classList.remove('appear')
        srcParent.className = 'card back'
        prevTd.className = 'card back'
        prevImage = null
        prevTd = null
        flipTimer = NaN
      }, 1000)
    }
  }
})()
