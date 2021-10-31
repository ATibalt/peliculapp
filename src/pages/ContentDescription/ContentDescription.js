/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieData, fetchTvData } from '../../utils/API/api-requests';

import styles from './ContentDescription.module.css';
import Header from '../../components/Description/Header/Header';
import Overview from '../../components/Description/Overview/Overview';
import Carousel from '../../components/UI/Carousel/Carousel';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';

const ContentDescription = () => {
  const [contentData, setContentData] = useState({
    isLoading: true,
    content: {},
    hasError: false,
    message: ''
  });

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
        if (!res.hasError) {
          setContentData((prevState) => ({
            ...prevState,
            isLoading: false,
            content: res
          }));
        } else {
          setContentData((prevState) => ({
            ...prevState,
            isLoading: false,
            hasError: true,
            message: res.message
          }));
        }
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [fetchData]);

  return (
    <main className={styles.description__main}>
      {!contentData.isLoading && !contentData.hasError && (
        <>
          <Header data={contentData.content} type={type} />
          <Overview
            type={type}
            text={contentData.content.overview}
            crew={
              type === 'movie'
                ? contentData.content.credits.crew
                : contentData.content.aggregate_credits.crew
            }
            genres={contentData.content.genres}
            createdBy={type === 'tv' ? contentData.content.created_by : []}
          />
          <Carousel
            title="Reparto"
            content={
              type === 'movie'
                ? contentData.content.credits.cast
                : contentData.content.aggregate_credits.cast
            }
            isPerson
          />
          {contentData.content.similar.results.length > 0 && (
            <Carousel
              title="Similares"
              content={contentData.content.similar.results}
            />
          )}
          {contentData.content.recommendations.results.length > 0 && (
            <Carousel
              title="Recomendadas"
              content={contentData.content.recommendations.results}
            />
          )}
        </>
      )}
      {!contentData.isLoading && contentData.hasError && (
        <ErrorMessage message={contentData.message} />
      )}
    </main>
  );
};

export default ContentDescription;
