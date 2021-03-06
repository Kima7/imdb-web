export const methodType = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const route = {
  register: '/register',
  login: '/login',
  logout: '/logout',
  me: '/me',
  movies: '/movies',
  movie: `/movies/id`,
  genres: '/movies/genres',
  genreFilter: `/movies/genreFilter/id`,
  storeLike: '/movies/storeLike',
  storeComment: '/movies/storeComment',
  relatedMovies: `/movies/relatedMovies/id`,
  addToWatchList: '/movies/addToWatchList',
  getWatchList: '/movies/getWatchList',
  removeFromWatchList: '/movies/removeFromWatchList',
  popularMovies: '/movies/popularMovies',
  movieSearch: '/movies/movieSearch',
};

class ApiService {
  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  async request({ url, method, additionalHeaders, body }) {
    const headers = {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...additionalHeaders,
    };

    const response = await fetch(`${this.baseUri}${url}`, {
      method,
      headers,
      body,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData?.message;
    }

    return responseData;
  }
}

export default new ApiService(process.env.REACT_APP_API_URL);
