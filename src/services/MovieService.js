import apiService from './ApiService';

class MovieService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  postRegister({ name, email, password, confirm_password }) {
    const user = { name, password, email, confirm_password };
    return this.apiService.request(
      '/register',
      'POST',
      {},
      JSON.stringify(user)
    );
  }

  postLogin({ email, password }) {
    const user = { password, email };
    return this.apiService.request('/login', 'POST', {}, JSON.stringify(user));
  }

  postLogout() {
    return this.apiService.request('/logout', 'POST');
  }

  me() {
    return this.apiService.request('/me', 'POST');
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
}

export default new MovieService(apiService);
