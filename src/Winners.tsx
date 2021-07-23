import React from 'react';
import { useParams } from 'react-router';
import useFetch from './use-fetch';
import './Winners.css';

const Winners = () => {
  const { year } = useParams<{ year: string }>();
  const { data, loading, error } = useFetch(year);

  if (error) {
    return (
      <div className="container">
        <p>Error</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="container">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="container">
      <ol>
        {data.map(({ Driver, points }) => (
          <li key={Driver.driverId}>{Driver.givenName} {Driver.familyName} ({Driver.permanentNumber}) with {points} points</li>
        ))}
      </ol>
    </div>
  );
};

export default Winners;
