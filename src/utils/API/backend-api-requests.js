export const fetchWatched = async (loginToken) => {
  const response = await fetch('http://localhost:8080/user/watched', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginToken}`
    }
  });
  const data = await response.json();
  return data;
};

export const fetchLikes = async (loginToken) => {
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

export const fetchWatchlist = async (loginToken) => {
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

export const getWatchedById = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/watched/${type}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const getLikeById = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/likes/${type}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};
export const getWatchlistById = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/watchlist/${type}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const postWatched = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/watched/${type}/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const postLike = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/likes/${type}/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const postWatchlist = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/watchlist/${type}/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const deleteWatched = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/watched/${type}/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const deleteLike = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/likes/${type}/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};

export const deleteWatchlist = async (loginToken, type, id) => {
  const response = await fetch(
    `http://localhost:8080/user/watchlist/${type}/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginToken}`
      }
    }
  );
  const data = await response.json();
  return data;
};
