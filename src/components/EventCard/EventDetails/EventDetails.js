import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import './EventDetails.scss';

const EventDetails = (props) => {
  const { event } = props;
  console.log(event);
  return (
    <div className="event-details">
      <p>גיל: {event.minAge}+</p> |
      <p>
        תאריך: <Moment format="DD/MM/YY">{event.eventDate}</Moment>
      </p>
      |<p>שעה: {event.hour}</p>
    </div>
  );
};

EventDetails.propTypes = { event: PropTypes.object };

export default EventDetails;
