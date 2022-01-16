import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './HomepageSortButtons.scss';

const HomepageSortButtons = (props) => {
  const [sortType, setSortType] = useState('date');
  return (
    <div className="sort-select">
      <div className="sort-by-date">
        <button
          className={sortType === 'date' ? 'sort-button' : 'sort-button disabled'}
          onClick={() => setSortType('date')}
        >
          לפי תאריך
        </button>
      </div>
      <div className="sort-by-distance">
        <button
          className={sortType === 'distance' ? 'sort-button' : 'sort-button disabled'}
          onClick={() => setSortType('distance')}
        >
          לפי מרחק
        </button>
      </div>
    </div>
  );
};

HomepageSortButtons.propTypes = {};

export default HomepageSortButtons;
