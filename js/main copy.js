import '../scss/main.scss'


//Before I Disappear
const movieEl = document.querySelector('.movie')
console.log(movieEl)
const movieListEl= document.querySelector('.movie--list')
console.log(movieListEl)



//getMovie('frozen',3)

async function getMovie1(title, currentPage = 1) {
  const res = await axios({
    url: `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${currentPage}`,
    method: 'GET'
  })
  return await res
}

const ssss = async () => {
  let currentPage = 1
  const sibal = await getMovie1('frozen',currentPage)
  currentPage = 2
  console.log('sibal',sibal.data)
  const {Search: movies, totalResults :totalNumMovie} = sibal.data
  console.log('movieㅇs', movies)
  console.log('totaㅇl:',totalNumMovie)
   // page가 1일때만 총 영화 개수 출력하기
  currentPage === 1 && randerTotalMoviesNum(totalNumMovie)
  
  renderMovies(movies,movieListEl)
}

ssss()

async function getMovie(title = 'frozen', currentPage= 1) {
  const { data } = await axios({
    url: `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${currentPage}`,
    method: 'GET'
  })
  const {Search: movies, totalResults :totalNumMovie} = data
  // console.log('movieㅇs', movies)
  // console.log('totaㅇl:',totalNumMovie)
  // page가 1일때만 총 영화 개수 출력하기
  currentPage === 1 && randerTotalMoviesNum(totalNumMovie)
  
  renderMovies(movies,movieListEl)
}



function randerTotalMoviesNum(totalMoviesnum) {
  const totalMovienumEl = document.querySelector('.movie--total-movie-num')
  const totalMovies = document.createElement('div')
  totalMovies.textContent = `전체 검색 결과 : ${totalMoviesnum}`
  console.log('totalMovies',totalMovies)
  totalMovienumEl.append(totalMovies)
}

function renderMovies(movies, containerEl) {
  console.log('movies', movies)

  movies.forEach(movie => {
    console.log(movie)
    const movieEl = document.createElement('div') 
    movieEl.textContent = movie.Title
    console.log("movieEl",movieEl)
    containerEl.append(movieEl)
    const imgEl = document.createElement('img')
    imgEl.src = movie.Poster
    containerEl.append(imgEl)

  })
}