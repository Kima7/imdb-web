import apiService, { methodType, route } from './ApiService';

const authHeader = { Authorization: 'Bearer ' + localStorage.getItem('token') };

class AuthService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  register({ name, email, password, confirm_password }) {
    const user = { name, password, email, confirm_password };
    return this.apiService.request({
      url: route.register,
      method: methodType.POST,
      body: JSON.stringify(user),
    });
  }

  login({ email, password }) {
    const user = { password, email };
    return this.apiService.request({
      url: route.login,
      method: methodType.POST,
      body: JSON.stringify(user),
    });
  }

  logout() {
    return this.apiService.request({
      url: route.logout,
      method: methodType.POST,
      additionalHeaders: authHeader,
    });
  }

  me() {
    return this.apiService.request({
      url: route.me,
      method: methodType.POST,
      additionalHeaders: authHeader,
    });
  }
}

export default new AuthService(apiService);
