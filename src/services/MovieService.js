import apiService from './ApiService';

class MovieService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getMovies() {
    return this.apiService.request('/movies', 'GET');
  }

  getMovie({ id }) {
    return this.apiService.request(`/movies/${id}`, 'GET');
  }

  addMovie({ title, description, cover_image, genre }) {
    const movie = { title, description, cover_image, genre };
    return this.apiService.request(
      '/movies',
      'POST',
      {},
      JSON.stringify(movie)
    );
  }

  getGenreTypes() {
    return this.apiService.request('/genres', 'GET');
  }

  filterMovies({ genre }) {
    return this.apiService.request(`/genreFilter/${genre}`, 'GET');
  }

  storeLike({ movie_id, like }) {
    const likeData = { movie_id, like };
    return this.apiService.request(
      '/storeLike',
      'POST',
      {},
      JSON.stringify(likeData)
    );
  }
}

export default new MovieService(apiService);
