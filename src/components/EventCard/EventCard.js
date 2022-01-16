import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from 'store/reduxHooks';
import { fetchRemoveEventById } from 'store/asyncThunk';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Favorite from '@material-ui/icons/Favorite';
import Popup from 'components/UI/Popup/Popup';
import Modal from 'components/UI/Modal/Modal';
import EditEvent from 'components/EditEvent/EditEvent';

import './EventCard.scss';
import EventDetails from './EventDetails/EventDetails';
import EventButtons from './EventButtons/EventButtons';

const EventCard = (props) => {
  const dispatch = useAppDispatch();
  const { event, isAdmin } = props;
  const { id: eventId } = event;
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [isChangeEventModalShown, setIsChangeEventModalShown] = useState(false);
  const [isRemovePopupShown, setIsRemovePopupShown] = useState(false);

  const addToFavorites = (favoritesList) => {
    const newFavoritesList = [event.id, ...favoritesList];
    localStorage.setItem('favoritesList', JSON.stringify(newFavoritesList));
    setIsInFavorites(true);
  };

  const removeFromFavorites = (favoritesList) => {
    const favoriteItemIndex = favoritesList.findIndex((favoriteItem) => favoriteItem === event.id);
    if (favoriteItemIndex >= 0) {
      const newFavoritesList = [...favoritesList];
      newFavoritesList.splice(favoriteItemIndex, 1);
      localStorage.setItem('favoritesList', JSON.stringify(newFavoritesList));
      setIsInFavorites(false);
    }
  };

  const onAddRemoveToFavorites = () => {
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];
    if (!isInFavorites) {
      addToFavorites(favoritesList);
    } else {
      removeFromFavorites(favoritesList);
    }
  };
  useEffect(() => {
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];
    const inFavorites = favoritesList?.some((key) => key === event.id);
    setIsInFavorites(inFavorites);
  }, []);

  const onRemoveEvent = () => {
    setIsRemovePopupShown(true);
  };

  const removeEvent = async () => {
    dispatch(fetchRemoveEventById(eventId));
    setIsRemovePopupShown(false);
  };

  return (
    <>
      <div className="card">
        <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}>
          <div className="like-button">
            <button className="icon-style" onClick={onAddRemoveToFavorites}>
              <Favorite className={isInFavorites ? 'followed' : 'unfollowed'} />
            </button>
          </div>
          <div className="event-title">
            <h3>{event.eventName}</h3>
          </div>
        </div>

        <div className="event-content">
          <EventDetails event={event} />
          <EventButtons event={event} />

          {isAdmin && (
            <div className="right">
              <>
                <button className="icon-style" onClick={onRemoveEvent}>
                  <DeleteIcon fontSize="large" />
                </button>
                <button className="icon-style" onClick={() => setIsChangeEventModalShown(true)}>
                  <EditIcon fontSize="large" />
                </button>
              </>
            </div>
          )}
        </div>
      </div>
      {isAdmin && (
        <>
          <Popup
            popupTitle="Remove Event"
            togglePopupFunc={() => setIsRemovePopupShown(false)}
            isPopupShown={isRemovePopupShown}
            acceptFunction={removeEvent}
            cancelFunction={() => setIsRemovePopupShown(false)}
            cancelLabel={'No'}
            acceptLabel={'Yes'}
          >
            Are you sure you want to remove event {event.id}?
          </Popup>
          <Modal isModalShown={isChangeEventModalShown} onCloseModal={() => setIsChangeEventModalShown(false)}>
            <EditEvent eventToEdit={event} onCloseEditModal={() => setIsChangeEventModalShown(false)} />
          </Modal>
        </>
      )}
    </>
  );
};

EventCard.propTypes = {};

export default EventCard;
