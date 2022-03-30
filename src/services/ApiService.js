class ApiService {
  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  async request(url, method, additionalHeaders, body) {
    const headers = {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      ...additionalHeaders,
    };

    const response = await fetch(`${this.baseUri}${url}`, {
      method,
      headers,
      body,
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw responseData?.message;
      //throw new Exception(responseData?.error);
    }

    return responseData;
  }
}

export default new ApiService(process.env.REACT_APP_API_URL);
