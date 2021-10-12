const loginToken = localStorage.getItem('token');

export const fetchFavs = async () => {
  const response = await fetch('http://localhost:8080/user/favs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const fetchLikes = async () => {
  const response = await fetch('http://localhost:8080/user/likes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const fetchWatchlist = async () => {
  const response = await fetch('http://localhost:8080/user/watchlist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const postFav = async (id) => {
  const response = await fetch(`http://localhost:8080/user/favs/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const postLike = async (id) => {
  const response = await fetch(`http://localhost:8080/user/likes/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const postWatchlist = async (id) => {
  const response = await fetch(`http://localhost:8080/user/watchlist/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const deleteFav = async (id) => {
  const response = await fetch(`http://localhost:8080/user/favs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const deleteLike = async (id) => {
  const response = await fetch(`http://localhost:8080/user/likes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const deleteWatchlist = async (id) => {
  const response = await fetch(`http://localhost:8080/user/watchlist/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};
