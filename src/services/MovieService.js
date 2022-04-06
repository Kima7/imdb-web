import apiService, { methodType, route } from './ApiService';

const authHeader = { Authorization: 'Bearer ' + localStorage.getItem('token') };
class MovieService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getMovies({ url }) {
    return this.apiService.request({
      url: route.movies + url,
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  getMovie({ id }) {
    return this.apiService.request({
      url: route.movie.replace('id', id),
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  addMovie({ title, description, cover_image, genre }) {
    const movie = { title, description, cover_image, genre };
    return this.apiService.request({
      url: route.movies,
      method: methodType.POST,
      additionalHeaders: authHeader,
      body: JSON.stringify(movie),
    });
  }

  getGenreTypes() {
    return this.apiService.request({
      url: route.genres,
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  filterMovies({ genre }) {
    return this.apiService.request({
      url: route.genreFilter.replace('id', genre),
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  storeLike({ movie_id, like }) {
    const likeData = { movie_id, like };
    return this.apiService.request({
      url: route.storeLike,
      method: methodType.POST,
      additionalHeaders: authHeader,
      body: JSON.stringify(likeData),
    });
  }

  storeComment({ movie_id, message }) {
    const commentData = { movie_id, message };
    return this.apiService.request({
      url: route.storeComment,
      method: methodType.POST,
      additionalHeaders: authHeader,
      body: JSON.stringify(commentData),
    });
  }

  relatedMovies({ movie_id }) {
    return this.apiService.request({
      url: route.relatedMovies.replace('id', movie_id),
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  popularMovies() {
    return this.apiService.request({
      url: route.popularMovies,
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  addToWatchList({ movie_id, watched }) {
    const watchListData = { movie_id, watched };
    return this.apiService.request({
      url: route.addToWatchList,
      method: methodType.POST,
      additionalHeaders: authHeader,
      body: JSON.stringify(watchListData),
    });
  }

  getWatchList() {
    return this.apiService.request({
      url: route.getWatchList,
      method: methodType.GET,
      additionalHeaders: authHeader,
    });
  }

  removeFromWatchList({ movie_id }) {
    const watchListData = { movie_id };
    return this.apiService.request({
      url: route.removeFromWatchList,
      method: methodType.DELETE,
      additionalHeaders: authHeader,
      body: JSON.stringify(watchListData),
    });
  }
}

export default new MovieService(apiService);
