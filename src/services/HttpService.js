class HttpService {
  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  async request(url, method, headers, body) {
    const response = await fetch(`${this.baseUri}${url}`, {
      method,
      headers,
      body,
    });

    const responseData = await response.json();

    if (!reponse.ok) {
      // U zavisnosti kakav format eror-a vracas u iz apija, mozda je responseData.message ili nesto drugo
      throw new Exception(responseData?.error);
    }

    return responseData;
  }
}

export default new HttpService(process.env.REACT_APP_API_URL);
