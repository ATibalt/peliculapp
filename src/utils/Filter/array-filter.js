function orderByYear(content, isMovies) {
  if (!isMovies) {
    content.sort((a, b) => {
      const yearsA = a.first_air_date.split('–');
      const yearsB = b.first_air_date.split('–');

      return yearsB[0] - yearsA[0];
    });
  } else {
    content.sort((a, b) => {
      const yearA = a.release_date.split('-');
      const yearB = b.release_date.split('-');
      return yearB[0] - yearA[0];
    });
  }

  return content;
}
function orderByTitle(content, isMovies) {
  if (!isMovies) {
    content.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    content.sort((a, b) => a.title.localeCompare(b.title));
  }
  return content;
}

function filterArray(content, isMovies, filters) {
  let sortedArray;

  if (filters.order) {
    switch (filters.order) {
      case 'year/desc':
        sortedArray = orderByYear(content, isMovies);
        break;
      case 'year/asc':
        sortedArray = orderByYear(content, isMovies).reverse();
        break;
      case 'title/asc':
        sortedArray = orderByTitle(content, isMovies);
        break;
      case 'title/desc':
        sortedArray = orderByTitle(content, isMovies).reverse();
        break;
      case 'date/asc':
        sortedArray = content;
        break;
      case 'date/desc':
        sortedArray = content.reverse();
        break;
      default:
        sortedArray = content;
        break;
    }
  }

  let filteredArray = sortedArray;

  if (filters.title) {
    if (isMovies) {
      filteredArray = sortedArray.filter((item) =>
        item.title.toUpperCase().includes(filters.title.toUpperCase())
      );
    } else {
      filteredArray = sortedArray.filter((item) =>
        item.name.toUpperCase().includes(filters.title.toUpperCase())
      );
    }
  }
  if (filters.genre) {
    filteredArray = filteredArray.filter((item) => {
      const gen = item.genres.filter(
        (genre) => Number(genre.id) === Number(filters.genre)
      );
      const hasGenre = gen.length > 0;
      return hasGenre;
    });
  }
  if (filters.year_span[0] || filters.year_span[1]) {
    const startYear = filters.year_span[0]
      ? Number(filters.year_span[0])
      : 1900;
    const endYear = filters.year_span[1]
      ? Number(filters.year_span[1])
      : new Date().getFullYear() + 5;

    if (isMovies) {
      filteredArray = filteredArray.filter((item) => {
        const releaseYear = item.release_date.split('-')[0];
        return releaseYear >= startYear && releaseYear <= endYear;
      });
    } else {
      filteredArray = filteredArray.filter((item) => {
        const tvReleaseYear = item.first_air_date.split('-')[0];
        if (item.status === 'Ended') {
          const tvEndYear = item.last_air_date.split('-')[0];
          return tvReleaseYear >= startYear && tvEndYear <= endYear;
        }
        return tvReleaseYear >= startYear;
      });
    }
  }

  return filteredArray;
}

export default filterArray;
