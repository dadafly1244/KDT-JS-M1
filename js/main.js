import "../scss/main.scss";
import { fetchDataByTitle } from "./getapi";

//객체 찾기
const movieEl = document.querySelector(".movie");
const movieListEl = document.querySelector(".movie--list");
const welcomeEl = document.querySelector(".welcome");
const moreBtnEl = document.querySelector(".movie--more-btn");
const searchEl = document.querySelector(".search");
const formEl = searchEl.querySelector("form");
const searchTextEl = formEl.querySelector("#search--text");
const fetchLoadindEl = document.querySelector(".movie--loding-container");

//전역 변수
let currentPage = 1;

const io = new IntersectionObserver(async ([{ isIntersecting }]) => {
  //무한스크롤
  console.log("isintersection", isIntersecting);
  if (isIntersecting) {
    try {
      if (searchTextEl.value !== "") {
        const fetchedData = await fetchDataByTitle(
          searchTextEl.value,
          currentPage
        );
        const { Search: movies, totalResults: totalNumMovie } =
          fetchedData.data;
        if (totalNumMovie === "1") {
          renderMovies(movies, movieListEl);
          io.unobserve(fetchLoadindEl);
          noMoreMovies();
        } else {
          renderMovies(movies, movieListEl);
          currentPage += 1;
        }
      } else {
        console.log(`아직 검색된 영화 없음`);
        loadingEl.style.display = "none";
      }
    } catch (error) {
      noMoreMovies();
    }
  }
});

// event listener
formEl.addEventListener("keydown", (e) => {
  //form태그 안에서 사용자가 키보드를 누르는 이벤트를 감지
  if (e.key === "Enter") {
    //enter를 누르면 click도 되는 건가...? 쨋든 2개 출력이되는 문제를 예방
    e.preventDefault();
    renderFirstpage();
  }
});
formEl.addEventListener("click", (e) => {
  //form태그 안에서 사용자가 클릭하는 이벤트를 감지
  //button에 value 값을 button으로 주고, 이벤트 타켓의 value가 버튼이면 실행!!
  if (e.target.value === "button") {
    renderFirstpage();
  }
});
// moreBtnEl.addEventListener('click',async () => { //more버튼을 누르는 이벤트 감지
//   //console.log('searchTextEl.value,currentPage',searchTextEl.value,currentPage)
//   const fetchedData = await fetchDataByTitle(searchTextEl.value,currentPage)
//   const {Search: movies} = fetchedData.data
//   renderMovies(movies,movieListEl)
//   currentPage += 1
// })

function noMoreMovies() {
  //더이상 불러올 영화가 없을때 출력하는 함수
  console.log("더이상 영화없음");
  io.unobserve(fetchLoadindEl);
  const noMoreMoviesEl = document.createElement("div");
  noMoreMoviesEl.classList.add("no-more-movie");
  noMoreMoviesEl.textContent = "더 이상 검색된 영화가 없습니다. ";
  movieListEl.append(noMoreMoviesEl);
  fetchLoadindEl.style.display = "none";
}

// ##이벤트가 발생했을 때 화면에 출력하는 함수들
async function renderFirstpage() {
  //검색하면 제일 첫 페이지를 출력하는 함수
  movieEl.style.height = "auto";
  welcomeEl.style.display = "none";
  currentPage = 1;
  movieListEl.innerHTML = "";
  if (searchTextEl.value === "") {
    //아무것도 입력되지 않으면
    errorMsgForNoMovie(movieListEl, "검색어를 입력해 주세요.");
    return;
  }
  const fetchedData = await fetchDataByTitle(searchTextEl.value, currentPage);
  const { Response } = fetchedData.data;
  if (Response === "True") {
    const { Search: movies, totalResults: totalNumMovie } = fetchedData.data;
    console.log(fetchedData.data);
    // page가 1일때만 총 영화 개수 출력하기
    currentPage === 1 && renderTotalMoviesNum(totalNumMovie);
    //currentPage = 2
    //renderMovies(movies,movieListEl)
    fetchLoadindEl.style.display = "block";
    io.observe(fetchLoadindEl);
  } else {
    errorMsgForNoMovie(movieListEl, fetchedData.data.Error);
  }
}

function renderTotalMoviesNum(totalMoviesNum) {
  //영화 총 갯수를 출력하는 함수
  const totalMovienumEl = document.querySelector(".movie--total-movie-num");
  totalMovienumEl.innerHTML = "";
  const totalMovies = document.createElement("h3");
  totalMovies.textContent = `전체 검색 결과 : ${totalMoviesNum}`;
  totalMovienumEl.append(totalMovies);
}

function errorMsgForNoMovie(parentEl, apiErrorMsg) {
  //영화 제목으로 영화를 찾을 수 없는 경우 에러 출력하는 함수
  renderTotalMoviesNum(0);
  const noMovieContainerEl = document.createElement("div");
  noMovieContainerEl.classList.add("nomovie-container");
  const noMovieTitleEl = document.createElement("h3");
  noMovieTitleEl.textContent = `입력한 검색어 '${searchTextEl.value}'로 찾을 수 있는 영화가 없습니다.\n(${apiErrorMsg})`;
  const noMovieImgEl = document.createElement("img");
  noMovieImgEl.src = "./images/nomovie.png";
  noMovieContainerEl.append(noMovieTitleEl);
  noMovieContainerEl.append(noMovieImgEl);
  parentEl.append(noMovieContainerEl);
}

function renderMovies(movies, containerEl) {
  //요소를 생성하고 자식 요소로 넣어주는 함수
  movies.forEach((movie) => {
    //로딩중 객체 생성
    const loadingEl = document.createElement("div");
    loadingEl.classList.add("befor-loading");
    loadingEl.textContent = "로딩중중중...";
    containerEl.append(loadingEl);

    //타이틀 객체 생성
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-title");
    movieEl.textContent = movie.Title;

    //영화의 제목과 포스터요소를 부모 요소에 넣어주는 함수 호출
    imageLoad(movieEl, movie.Poster, movieListEl, loadingEl)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

function imageLoad(titleEl, imgSrc, containerEl, lodingEl) {
  //이미지 요소 만들고 로드되면 로딩중 요소를 삭제하고 제목과 포스터를 부모 요소에 삽입하는 함수
  return new Promise((resolve, reject) => {
    if (!imgSrc) {
      reject("이미지 로딩 실패");
      return; // 없으면 밑에는 실행되서 에러가 뜸 reslove만 안 돌아감
    }
    const movieItemEl = document.createElement("div");
    movieItemEl.classList.add("movie-item");
    const imgEl = document.createElement("img");
    imgEl.src = imgSrc === "N/A" ? "./images/noImg.png" : imgSrc;
    imgEl.addEventListener("load", () => {
      lodingEl.remove();
      movieItemEl.append(titleEl);
      movieItemEl.append(imgEl);
      containerEl.append(movieItemEl);
      resolve("이미지 로드 완료!");
    });
  });
}
