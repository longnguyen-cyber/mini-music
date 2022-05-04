let $ = document.querySelector.bind(document)
let $$ = document.querySelectorAll.bind(document)
let play = $('.play-icon')
let song = $('#song')
let isPlaying = true
play.addEventListener('click', () => playPause())
const playPause = () => {
  if (isPlaying) {
    song.play()
    isPlaying = false
  } else {
    song.pause()
    isPlaying = true
  }
}
