

const moviesEl = document.querySelector('.movies')
const anotherMoviesEl = document.querySelector('.another-movies')
getMovie('',1, moviesEl)
// getMovie(1, anotherMoviesEl)

const btnEl = document.querySelector('button')
btnEl.addEventListener('click', () => {
  getMovie('froze',2, moviesEl)
})
async function getMovie(title= 'frozen', pagenum='1',containerEl) {
  const {data} = await axios({
    url: `https://www.omdbapi.com?apikey=7035c60c&s=${title}&page=${pagenum}`,
    method: 'GET'
  })
  console.log('getmovie:',data)
  // console.log(data.Search)
  // const movies = data.Search
  //renderMovies(movies, containerEl)
}
function renderMovies(movies, containerEl) {
  movies.forEach(movie => {
    console.log('renderMovies',movie)
    const movieEl = document.createElement('div')
    movieEl.textContent = movie.Title

    containerEl.append(movieEl)
  })
}




function fetchMovies() {
  axios
    .get('https://www.omdbapi.com/?apikey=7035c60c&s=frozen')
    .then((res) => {
      console.log(res)
      const h1El = document.querySelector('h1')
      const imgEl = document.querySelector('.imgposter')
      h1El.textContent = res.data.Search[0].Title
      imgEl.src= res.data.Search[0].Poster
    })
}

fetchMovies()


// function imageLoad(src) {
//   return new Promise((resolve, reject) => {
//     if (!src) {
//       reject('이미지 경로 없는디?')
//       return
//     }
//     const imgEl = document.createElement('img')
//     imgEl.src = src
//     imgEl.addEventListener('load', () => {
//       resolve('이미지 로드 완료!')
//     })
//   })
// }

// imageLoad()
//   .then(res => {
//     console.log(res)
//   })
//   .catch(error => {
//     console.log(error)
//   })