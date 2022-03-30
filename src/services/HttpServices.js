export async function register({ name, email, password, confirm_password }) {
  const user = {
    name,
    password,
    email,
    confirm_password,
  };
  try {
    const res = await fetch(process.env.REACT_APP_API_URL + '/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log(data);
    if (data.error?.email) return data.error?.email;
    else if (data.error?.confirm_password) return data.error?.confirm_password;
    else if (data.error?.password) return data.error?.password;
    else if (data.error?.name) return data.error?.name;
  } catch {
    return 'Registration unsuccessful, try again.';
  }
  return '';
}

export async function login({ email, password }) {
  const user = {
    password,
    email,
  };
  const res = await fetch(process.env.REACT_APP_API_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  localStorage.setItem('token', data.token);

  //console.log(data.message)
  console.log(data.token);

  return data.message;
}

export async function logout() {
  const res = await fetch(process.env.REACT_APP_API_URL + '/logout', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const message = await res.json();
  if (message.message === 'You logged out successfully!')
    localStorage.removeItem('token');
  console.log(message.message);

  return message.message;
}

export async function me() {
  const res = await fetch(process.env.REACT_APP_API_URL + '/me', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const data = await res.json();
  return data;
}

export async function getMovies() {
  const res = await fetch(process.env.REACT_APP_API_URL + '/movies', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const data = await res.json();
  return data;
}

export async function getMovie({ id }) {
  const res = await fetch(process.env.REACT_APP_API_URL + `/movies/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const data = await res.json();
  //console.log(data.data)
  return data.data;
}

export async function addMovie({ title, description, cover_image, genre }) {
  const movie = {
    title,
    description,
    cover_image,
    genre,
  };

  try {
    const res = await fetch(process.env.REACT_APP_API_URL + '/movies', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(movie),
    });
    const data = await res.json();

    if (data.message) return data.message;
  } catch {
    return 'Movie not created, try again.';
  }
  return '';
}

export async function getGenreTypes() {
  const res = await fetch(process.env.REACT_APP_API_URL + '/genres', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const data = await res.json();
  //console.log(data.data)
  //const dataArray = Object.values(data)
  return data.data;
}

export async function filterMovies({ genre }) {
  const res = await fetch(
    process.env.REACT_APP_API_URL + `/genreFilter/${genre}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
  );

  const data = await res.json();
  return data;
}
