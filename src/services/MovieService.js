import httpService from './HttpService';

class MovieService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  getMovies() {
    return this.httpService.request('/movies');
  }
}

export default new MovieService(httpService);
