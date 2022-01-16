import React from 'react';
import PropTypes from 'prop-types';
import Place from '@material-ui/icons/Place';
import Headset from '@material-ui/icons/Headset';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';

import './EventButtons.scss';

const EventButtons = (props) => {
  return (
    <div className="event-footer">
      <div className="order-button">
        <button>לכרטיסים / שולחנות</button>
      </div>
      <div className="event-interaction-buttons">
        <button className="button-icon">
          <Place />
        </button>
        <button className="button-icon">
          <Headset />
        </button>
        <button className="button-icon">
          <RestaurantMenu />
        </button>
      </div>
    </div>
  );
};

EventButtons.propTypes = {};

export default EventButtons;
