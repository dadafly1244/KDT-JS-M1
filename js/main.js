import '../scss/main.scss'
import {fetchDataByTitle,fetchDataByID} from './getapi'

//객체 찾기
const movieEl = document.querySelector('.movie')
const movieListEl= document.querySelector('.movie--list')
const moreBtnEl= document.querySelector('.movie--more-btn')
const searchEl = document.querySelector('.search')
const formEl = searchEl.querySelector('form')
const searchTextEl  = formEl.querySelector('#search--text')

//전역 변수 
let currentPage = 1


// event listener
formEl.addEventListener('keydown', (e) => {
  console.log('e',e)
  if (e.key === 'Enter') {
    renderFirstpage()
  }
} )
formEl.addEventListener('click', (e) => {
 //button에 value 값을 button으로 주고, 이벤트 타켓의 value가 버튼이면 실행!! 
  if (e.target.value === 'button'){
    renderFirstpage()
  }
})
moreBtnEl.addEventListener('click',async () => {
  console.log('searchTextEl.value,currentPage',searchTextEl.value,currentPage)
  const fetchedData = await fetchDataByTitle(searchTextEl.value,currentPage)
  const {Search: movies} = fetchedData.data
  renderMovies(movies,movieListEl)
  currentPage += 1
})

//이벤트가 발생했을 때 화면에 출력하는 함수


function randerTotalMoviesNum(totalMoviesnum) {
  const totalMovienumEl = document.querySelector('.movie--total-movie-num')
  totalMovienumEl.innerHTML = ''
  const totalMovies = document.createElement('div')
  totalMovies.textContent = `전체 검색 결과 : ${totalMoviesnum}`
  totalMovienumEl.append(totalMovies)
}

async function renderFirstpage() {
  currentPage = 1
  const fetchedData = await fetchDataByTitle(searchTextEl.value,currentPage)
  const {Search: movies, totalResults :totalNumMovie} = fetchedData.data
   // page가 1일때만 총 영화 개수 출력하기
  currentPage === 1 && randerTotalMoviesNum(totalNumMovie)
  currentPage = 2
  renderMovies(movies,movieListEl)

}

function renderMovies(movies, containerEl) {
  movies.forEach(movie => {
    const movieEl = document.createElement('div') 
    movieEl.textContent = movie.Title
    containerEl.append(movieEl)
    const imgEl = document.createElement('img')
    imgEl.src = movie.Poster ==='N/A' ? './images/noImg.png' : movie.Poster
    containerEl.append(imgEl)

  })
}