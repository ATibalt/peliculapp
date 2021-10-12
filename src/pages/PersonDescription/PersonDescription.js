/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPersonData } from '../../utils/API/api-requests';

import styles from './PersonDescription.module.css';
import PersonHeader from '../../components/Description/PersonHeader/PersonHeader';
import Carousel from '../../components/UI/Carousel/Carousel';

const PersonDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentData, setContentData] = useState({});
  const [topWork, setTopWork] = useState({});

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    const data = await fetchPersonData(id);

    if (data.known_for_department === 'Acting') {
      let sortedCredits = data.combined_credits.cast.sort(
        (a, b) => b.popularity - a.popularity
      );
      sortedCredits = sortedCredits.filter(
        (role) =>
          role.character !== '' &&
          role.character !== 'Self - Guest' &&
          role.character !== 'Himself' &&
          role.character !== 'Self' &&
          role.character !== 'Self - Host'
      );
      sortedCredits = sortedCredits.filter((role) => role.release_date !== '');
      sortedCredits =
        sortedCredits.length > 15 ? sortedCredits.slice(0, 15) : sortedCredits;
      sortedCredits = sortedCredits.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );
      setTopWork(sortedCredits);
    } else {
      let sortedCredits = data.combined_credits.crew.filter(
        (role) => role.department === data.known_for_department
      );
      sortedCredits = sortedCredits.sort((a, b) => b.popularity - a.popularity);
      sortedCredits =
        sortedCredits.length > 15 ? sortedCredits.slice(0, 15) : sortedCredits;
      sortedCredits = sortedCredits.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );
      setTopWork(sortedCredits);
    }

    return data;
  }, [id]);

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
          <PersonHeader data={contentData} />
          <Carousel content={topWork} title="Conocido/a por" />
        </>
      )}
    </main>
  );
};

export default PersonDescription;
