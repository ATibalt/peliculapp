import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './ContentFilters.module.css';

const ContentFilters = (props) => {
  const { list, onSubmit, onClear } = props;
  //  Form REFS
  const formRef = useRef(null);
  const titleInput = useRef(null);
  const genreSelect = useRef(null);
  const startYearInput = useRef(null);
  const endYearInput = useRef(null);
  const orderSelect = useRef(null);
  const orderDirectionSelect = useRef(null);

  const filtersSubmitHandler = (event) => {
    event.preventDefault();
    const filters = {
      title: titleInput.current.value,
      genre: genreSelect.current.value,
      year_span: [startYearInput.current.value, endYearInput.current.value],
      order: `${orderSelect.current.value}/${orderDirectionSelect.current.value}`
    };
    onSubmit(filters);
  };

  const onClearFilters = () => {
    formRef.current.reset();
    onClear();
  };

  return (
    <form
      className={styles.filters__form}
      onSubmit={filtersSubmitHandler}
      ref={formRef}
    >
      <label className={styles.filters__label} htmlFor="title">
        Título
      </label>
      <input
        className={styles.filters__input}
        type="text"
        name="title"
        id="title"
        placeholder="Busqueda por título"
        ref={titleInput}
      />
      <label className={styles.filters__label} htmlFor="genre">
        Género
      </label>
      <select
        name="genre"
        id="genre"
        className={styles.filters__select}
        defaultValue=""
        ref={genreSelect}
      >
        <option value="">Seleccionar un genero</option>
        {list.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <label className={styles.filters__label} htmlFor="startYear">
        Años
      </label>
      <div className={styles.filters__years}>
        <input
          type="number"
          id="startYear"
          name="startYear"
          placeholder="Año de Inicio"
          ref={startYearInput}
        />
        <span>-</span>
        <input
          type="number"
          name="endYear"
          placeholder="Año de Fin"
          ref={endYearInput}
        />
      </div>
      <label className={styles.filters__label} htmlFor="orderType">
        Orden
      </label>
      <div className={styles.filters__orders}>
        <select
          name="orderType"
          id="orderType"
          className={styles.filters__select}
          defaultValue="date"
          ref={orderSelect}
        >
          <option value="date">Fecha de agregado</option>
          <option value="year">Año</option>
          <option value="title">Titulo</option>
        </select>
        <span>-</span>
        <select
          name="orderDir"
          id="orderDir"
          className={styles.filters__select}
          defaultValue="asc"
          ref={orderDirectionSelect}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div className={styles.filters__formActions}>
        <button type="submit">Filtrar</button>
        <button type="button" onClick={onClearFilters}>
          Limpiar
        </button>
      </div>
    </form>
  );
};

ContentFilters.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  onClear: PropTypes.func
};
ContentFilters.defaultProps = {
  list: [],
  onSubmit: () => {},
  onClear: () => {}
};

export default ContentFilters;
