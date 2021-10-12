/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieData, fetchTvData } from '../../utils/API/api-requests';

import styles from './ContentDescription.module.css';
import Header from '../../components/Description/Header/Header';
import Overview from '../../components/Description/Overview/Overview';
import Carousel from '../../components/UI/Carousel/Carousel';

const ContentDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentData, setContentData] = useState({});

  const { type, id } = useParams();

  const fetchData = useCallback(async () => {
    let data;
    switch (type) {
      case 'movie':
        data = await fetchMovieData(id);
        break;
      case 'tv':
        data = await fetchTvData(id);
        break;
      default:
        break;
    }

    return data;
  }, [type, id]);

  useEffect(() => {
    let isSubscribed = true;
    fetchData().then((res) => {
      if (isSubscribed) {
        setContentData(res);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [fetchData]);

  return (
    <main className={styles.description__main}>
      {!isLoading && (
        <>
          <Header data={contentData} type={type} />
          <Overview
            type={type}
            text={contentData.overview}
            crew={
              type === 'movie'
                ? contentData.credits.crew
                : contentData.aggregate_credits.crew
            }
            genres={contentData.genres}
            createdBy={type === 'tv' ? contentData.created_by : []}
          />
          <Carousel
            title="Reparto"
            content={
              type === 'movie'
                ? contentData.credits.cast
                : contentData.aggregate_credits.cast
            }
            isPerson
          />
          {contentData.similar.results.length > 0 && (
            <Carousel title="Similares" content={contentData.similar.results} />
          )}
          {contentData.recommendations.results.length > 0 && (
            <Carousel
              title="Recomendadas"
              content={contentData.recommendations.results}
            />
          )}
        </>
      )}
    </main>
  );
};

export default ContentDescription;
