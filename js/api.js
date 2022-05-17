import axios from 'axios';

const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;
let url = "";

export async function fetchData(title,currentPage) {
	url = `${BASE_URL}&s=${title}&page=${currentPage}`;
	return await axios({ method:'GET', url});
}
export async function fetchDataById(id) {
	url = `${BASE_URL}&i=${id}`;
	return await axios({ method:'GET', url});
}