import apiService from './ApiService';

class AuthService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  register({ name, email, password, confirm_password }) {
    const user = { name, password, email, confirm_password };
    return this.apiService.request(
      '/register',
      'POST',
      {},
      JSON.stringify(user)
    );
  }

  login({ email, password }) {
    const user = { password, email };
    return this.apiService.request('/login', 'POST', {}, JSON.stringify(user));
  }

  logout() {
    return this.apiService.request('/logout', 'POST');
  }

  me() {
    return this.apiService.request('/me', 'POST');
  }
}

export default new AuthService(apiService);
