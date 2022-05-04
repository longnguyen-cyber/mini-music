const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const play = $('.player-inner')
const song = $('#song')
const nextSong = $('.play-forward')
const prevSong = $('.play-back')
const rangeBar = $('.range')
const durationTime = $('.duration')
const remainingTime = $('.remaining')
const musicThumbnail = $('.music-thumb')
const playRepeat = $('.play-repeat')
const musicName = $('.music-name')
const musicImg = $('.music-thumb img')
const playInfinite = $('.play-infinite')
const playRandomSong = $('.play-random')

let isPlaying = true
let indexSong = 0
let timer
let repeatCount = 0
let repeatSong = false
let infiniteSong = false
const listSong = [
  {
    id: 1,
    title: 'music 1',
    file: 'music1.mp3',
    image: 'https://picsum.photos/200/200'
  },
  {
    id: 2,
    title: 'music 2',
    file: 'music2.mp3',
    image: 'https://picsum.photos/200/200'
  },

  {
    id: 3,
    title: 'music 3',
    file: 'music3.mp3',
    image: 'https://picsum.photos/200/200'
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

playInfinite.addEventListener('click', () => {
  if (infiniteSong) {
    infiniteSong = false
    playInfinite.removeAttribute('style')
  } else {
    infiniteSong = true
    playInfinite.style.backgroundColor = '#ff0000'
  }
})
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

nextSong.addEventListener('click', () => changeSong(1))
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
    isPlaying = true
  } else if (dir === -1) {
    indexSong--
    if (indexSong < 0) {
      indexSong = listSong.length - 1
    }
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
  musicImg.setAttribute('src', listSong[indexSong].image)
  musicName.textContent = listSong[indexSong].title
}
displayTimer()
init(indexSong)
