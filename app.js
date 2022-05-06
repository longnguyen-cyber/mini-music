const $1 = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const play = $1('.player-inner')
const song = $1('#song')
const nextSong = $1('.play-forward')
const prevSong = $1('.play-back')
const rangeBar = $1('.range')
const durationTime = $1('.duration')
const remainingTime = $1('.remaining')
const musicThumbnail = $1('.music-thumb')
const playRepeat = $1('.play-repeat')
const musicName = $1('.music-name')
const nextMusic = $1('.next-music')
const musicImg = $1('.music-thumb img')
const playInfinite = $1('.play-infinite')
const playRandomSong = $1('.play-random')
const listMusic = $1('.list-music')

let isPlaying = true
let indexSong = 0
let timer
let repeatCount = 0
let repeatSong = false
let infiniteSong = false
const listSong = [
  {
    id: 1,
    name: 'music 1',
    file: 'music1.mp3',
    image: 'https://picsum.photos/200/200',
    single: 'kuga'
  },
  {
    id: 2,
    name: 'music 2',
    file: 'music2.mp3',
    image: 'https://picsum.photos/200/200',
    single: 'kuga'
  },

  {
    id: 3,
    name: 'music 3',
    file: 'music3.mp3',
    image: 'https://picsum.photos/200/200',
    single: 'kuga'
  }
]

play.addEventListener('click', () => playPause())
const playPause = () => {
  if (isPlaying) {
    song.play()
    isPlaying = false
    play.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`
    musicThumbnail.classList.add('is-playing')
    timer = setInterval(displayTimer, 1000)
  } else {
    song.pause()
    musicThumbnail.classList.remove('is-playing')
    isPlaying = true
    play.innerHTML = `<ion-icon name="play" class="play-icon"></ion-icon>`
    clearInterval(timer)
  }
}
playRepeat.addEventListener('click', () => {
  if (repeatSong) {
    repeatSong = false
    playRepeat.removeAttribute('style')
  } else {
    repeatSong = true
    playRepeat.style.backgroundColor = '#ff0000'
  }
})

// playInfinite.addEventListener('click', () => {
//   if (infiniteSong) {
//     infiniteSong = false
//     playInfinite.removeAttribute('style')
//   } else {
//     infiniteSong = true
//     playInfinite.style.backgroundColor = '#ff0000'
//   }
// })
//create function random number
const randomNumber = () => {
  return Math.floor(Math.random() * (listSong.length - 1 - 0 + 1)) + 0
}
playRandomSong.addEventListener('click', () => {
  init(randomNumber())
  isPlaying = true
  setTimeout(() => {
    playPause()
  }, 500)
  play.innerHTML = `<ion-icon name="play" class="play-icon"></ion-icon>`
})

nextSong.addEventListener('click', () => {
  changeSong(1)
})
prevSong.addEventListener('click', () => changeSong(-1))
song.addEventListener('ended', () => handleChangeSong())
const handleChangeSong = () => {
  repeatCount++
  if (repeatCount === 1 && repeatSong) {
    isPlaying = true
    playPause()
  } else if (infiniteSong) {
    changeSong(0)
  } else {
    repeatCount = 0
    changeSong(1)
  }
}
const changeSong = (dir) => {
  if (dir === 1) {
    indexSong++
    if (indexSong > listSong.length - 1) {
      indexSong = 0
    }
    const musicItem = listMusic.querySelectorAll('.music-item')
    musicItem.forEach((musicItem) => musicItem.removeAttribute('style'))
    musicItem[indexSong].style.backgroundColor = '#ccf5f9'
    isPlaying = true
  } else if (dir === -1) {
    indexSong--
    if (indexSong < 0) {
      indexSong = listSong.length - 1
    }
    const musicItem = listMusic.querySelectorAll('.music-item')
    musicItem.forEach((musicItem) => musicItem.removeAttribute('style'))
    musicItem[indexSong].style.backgroundColor = '#ccf5f9'
    isPlaying = true
  } else if (dir === 0) {
    indexSong = indexSong
    isPlaying = true
  }
  init(indexSong)
  setTimeout(() => {
    playPause()
  }, 500)
  play.innerHTML = `<ion-icon name="play" class="play-icon"></ion-icon>`
}
const displayTimer = () => {
  const { duration, currentTime } = song
  rangeBar.max = duration
  rangeBar.value = currentTime
  remainingTime.textContent = formatTimer(currentTime)
  if (!duration) durationTime.textContent = '00:00'
  else {
    durationTime.textContent = formatTimer(duration)
  }
}
const formatTimer = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
}

rangeBar.addEventListener('change', () => {
  song.currentTime = rangeBar.value
})

const init = (indexSong) => {
  song.setAttribute('src', `./music/${listSong[indexSong].file}`)
  if (indexSong >= listSong.length - 1) nextMusic.textContent = listSong[0].name
  else nextMusic.textContent = listSong[indexSong + 1].name
  musicImg.setAttribute('src', listSong[indexSong].image)
  musicName.textContent = listSong[indexSong].name
}

//generate list song
const musicItems = listSong.map((item) => {
  return `
    <li class="music-item">
      <span class="music-item__id">${item.id}</span>
      <img
        src=${item.image}
        alt=""
        height="48"
        width="48"
        class="music-item__thumb"
      />
      <ion-icon
        name="caret-forward-outline"
        class="music-item__icon"
      ></ion-icon>
      <h4 class="music-item__name">${item.name}</h4>
      <h4 class="music-item__single">${item.single}</h4>
      <span class="music-item__time">4:31</span>
    </li>
  `
})
listMusic.innerHTML += musicItems

const musicItem = listMusic.querySelector('.music-item')
musicItem.style.backgroundColor = '#ccf5f9'
displayTimer()
init(indexSong)
