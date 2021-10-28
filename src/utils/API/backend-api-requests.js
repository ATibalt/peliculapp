export const fetchWatched = async (loginToken, type, page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/watched?type=${type}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`
        }
      }
    );
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const fetchLikes = async (loginToken, type, page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/likes?type=${type}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`
        }
      }
    );
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const fetchWatchlist = async (loginToken, type, page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/watchlist?type=${type}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`
        }
      }
    );
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const getWatchedById = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const getLikeById = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};
export const getWatchlistById = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const postWatched = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const postLike = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const postWatchlist = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const deleteWatched = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const deleteLike = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};

export const deleteWatchlist = async (loginToken, type, id) => {
  try {
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
    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: error.message
    };
  }
};
