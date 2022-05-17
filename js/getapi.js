import axios from 'axios';

export async function fetchDataByTitle(title, currentPage = 1) {
  return await axios({
    url: `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${currentPage}`,
    method: 'GET'
  })
}

export async function fetchDataByID(ID) {
  return await axios({
    url: `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&i=${ID}`,
    method: 'GET'
  })
}