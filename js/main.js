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
let restMovieNum = 0

// event listener
formEl.addEventListener('keydown', e => {
  
  console.log('e',e)
  if (e.key === 'Enter') {
    //enter를 누르면 click도 되는 건가...? 쨋든 2개 출력이되는 문제를 예방
    e.preventDefault()
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


// ##이벤트가 발생했을 때 화면에 출력하는 함수
function randerTotalMoviesNum(totalMoviesNum) { //영화 총 갯수를 출력하는 함수
  const totalMovienumEl = document.querySelector('.movie--total-movie-num')
  totalMovienumEl.innerHTML = ''
  const totalMovies = document.createElement('div')
  totalMovies.textContent = `전체 검색 결과 : ${totalMoviesNum}`
  totalMovienumEl.append(totalMovies)
  
}

async function renderFirstpage() { //검색하면 제일 첫 페이지를 출력하는 함수 
  currentPage = 1
  movieListEl.innerHTML =''
  const fetchedData = await fetchDataByTitle(searchTextEl.value,currentPage)
  const {Search: movies, totalResults :totalNumMovie} = fetchedData.data
   // page가 1일때만 총 영화 개수 출력하기
  currentPage === 1 && randerTotalMoviesNum(totalNumMovie)
  restMovieNum = totalNumMovie
  currentPage = 2
  renderMovies(movies,movieListEl)
 
}

function renderMovies(movies, containerEl) { //요소를 생성하고 자식 요소로 넣어주는 함수
  movies.forEach(movie => {
    const movieEl = document.createElement('div') 
    movieEl.textContent = movie.Title
    containerEl.append(movieEl)
    const imgEl = document.createElement('img')
    imgEl.src = movie.Poster ==='N/A' ? './images/noImg.png' : movie.Poster
    console.log(imgEl.src)
    containerEl.append(imgEl)

  })
}