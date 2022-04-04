import apiService, { methodType, route } from './ApiService';

const authHeader = { Authorization: 'Bearer ' + localStorage.getItem('token') };
class MovieService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getMovies() {
    return this.apiService.request({
      url: route.movies,
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
}

export default new MovieService(apiService);
