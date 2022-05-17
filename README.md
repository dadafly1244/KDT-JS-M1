# 🎥 영화 검색 프로젝트

- 과제 기한:
  - 과제 수행 기간: 04월 28일(목) ~ 05월 19일(목)
  - 코드 리뷰 기간: 05월 19일(목) ~ 05월 20일(금)
- 내용:
  - 주어진 API를 활용해 영화 검색 프로젝트를 만들어보세요.

## 구현

### 검색창 Enter

form테그에 이벤트를 걸어서 click이벤트와 keydown이벤트를 한번에 받아오고 싶었지만 실패했다. 
참고 블로그 : https://velog.io/@hidaehyunlee/ES2020-click-enter-%EB%91%90-%EA%B0%9C%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%8F%99%EC%8B%9C%EC%97%90-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0

https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

https://okky.kr/article/679723
이 글을 참고해서 form안에 input태그에서 엔터를 누르면 submit이 되는 현상을 이용하고 싶었으나 실패..ㅠ

대신 두개의 addEventListener를 쓰고 겹치는 부분은 renderFirstpage함수로  빼주었다. 




## 요구사항

### 필수 요구사항

- [ ] 검색어를 입력해 영화를 검색할 수 있어야 합니다.
- [ ] 검색된 결과(영화 목록)을 출력해야 합니다.
- [ ] 프론트엔드 프레임워크 없이 바닐라 자바스크립트만으로 개발해야 합니다.
- [ ] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### 선택 요구사항

- [ ] Webpack 프로젝트로 구성해보세요.
- [ ] 클라이언트에서 API Key가 노출되지 않도록 만들어보세요.
- [ ] 무한 스크롤을 위한 'Intersection Observer'를 활용해보세요.
- [ ] 최초 API 요청(Request)에 대한 로딩 애니메이션을 추가해보세요.
- [ ] SCSS, Bootstrap 등을 구성해 프로젝트를 최대한 예쁘게(?) 만들어보세요.
- [ ] 영화 포스터 주소에 포함된 `SX300`를 `SX700`과 같이 더 큰 숫자로 수정해 요청하세요.
- [ ] 실시간으로 이미지의 크기를 다르게 요청하는 것이 어떤 원리로 가능한지 조사해보세요.
- [ ] 요청 주소에 HTTP가 아닌 HTTPS 프로토콜을 사용해야 하는 이유를 조사해보세요.

## API 사용법

- 참고 사이트: [The Open Movie Database](http://www.omdbapi.com/)
- 요청 주소: `https://www.omdbapi.com`
- Method: `GET`
- API_KEY: `7035c60c`

### 영화 목록 검색

파라미터 | 필수 | 설명 | 기본값 | 유효 값
--|--|--|--|--
`s` | 예 | 검색할 영화 제목 | |
`y` | | 영화 출시 년도 | |
`page` | | 검색 결과 페이지 | `1` | `1`~`100`

요청 예시:

```url
https://www.omdbapi.com?apikey=7035c60c&s=frozen&page=3
```

응답 예시:

- `Search`: 영화 목록, 1페이지(`page`) 당 최대 10개
- `totalResults`: 검색 가능한 모든 영화 개수

```json
{
  "Search": [
    {
      "Title": "Frozen",
      "Year": "2013",
      "imdbID": "tt2294629",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA0YjYy...eQXVyNDg4NjY5OTQ@._V1_SX300.jpg"
    },
    "...최대10개"
  ],
  "totalResults": "263",
  "Response": "True"
}
```
