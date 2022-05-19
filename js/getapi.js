import axios from 'axios';

export async function fetchDataByTitle(title, currentPage = 1) {
  try {
    return await axios({
      //url: `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${currentPage}`,
      url: `https://www.omdbapi.com?apikey=${OMDB_API_KEY}&s=${title}&page=${currentPage}`,
      method: 'GET'
    })
  } catch(error) {
    console.error(error);
  }
}

export async function fetchDataByID(ID) {
  try {
    return await axios({
      url: `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&i=${ID}`,
      method: 'GET'
    })
  } catch (error) {
    console.error(error);
  }
}