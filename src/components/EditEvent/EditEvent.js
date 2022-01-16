import Popup from 'components/UI/Popup/Popup';
import React, { useState, useEffect } from 'react';
import { updateEventById } from 'store/asyncThunk';
import { useAppDispatch } from 'store/reduxHooks';
import './EditEvent.css';

const EditEvent = (props) => {
  const { eventToEdit, onCloseEditModal } = props;
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    destination: '',
    description: '',
    imageUrl: '',
    price: undefined,
    startDate: '',
    endDate: '',
    formData: null,
  });
  const [isConfirmPopupShown, setIsConfirmPopupShown] = useState(false);

  const handleFormChange = (value, property) => {
    const newFormState = { ...formState, [property]: value };
    setFormState(newFormState);
  };

  const onUpdateEvent = () => {
    let isFormChanged = false;
    Object.entries(eventToEdit).forEach((prop) => {
      if (formState[prop[0]] !== prop[1] && prop[0] !== 'id') {
        isFormChanged = true;
      }
    });
    if (isFormChanged) {
      setIsConfirmPopupShown(true);
    } else {
      console.log('why');
    }
  };

  const updateEvent = async () => {
    let updatedEventData = {};
    Object.entries(eventToEdit).forEach((prop) => {
      if (formState[prop[0]] !== prop[1] && prop[0] !== 'id') {
        updatedEventData = { ...updatedEventData, [prop[0]]: formState[prop[0]] };
      }
    });

    const response = await dispatch(updateEventById({ updatedEventData, eventId: eventToEdit.id }));
    if (response) {
      setIsConfirmPopupShown(false);
      onCloseEditModal();
    }
  };

  useEffect(() => {
    if (eventToEdit) {
      setFormState({ ...formState, ...eventToEdit });
    }
  }, [eventToEdit]);

  return (
    <div className="edit-event">
      <input
        type="text"
        placeholder="Enter destination"
        value={formState.destination}
        onChange={(e) => handleFormChange(e.target.value, 'destination')}
      />
      <br />
      <input
        type="text"
        placeholder="Enter description"
        value={formState.description}
        onChange={(e) => handleFormChange(e.target.value, 'description')}
      />
      <br />
      <input
        type="number"
        placeholder="Enter price"
        value={formState.price || ''}
        onChange={(e) => handleFormChange(e.target.value, 'price')}
      />
      <br />
      <input
        type="date"
        placeholder="Enter start date"
        value={formState.startDate}
        onChange={(e) => handleFormChange(e.target.value, 'startDate')}
      />
      <br />
      <input
        type="date"
        placeholder="Enter end date"
        value={formState.endDate}
        onChange={(e) => handleFormChange(e.target.value, 'endDate')}
      />
      <input type="button" className="change-event-button" value="Change vaction" onClick={onUpdateEvent} />
      <Popup
        popupTitle="Edit Event"
        togglePopupFunc={() => setIsConfirmPopupShown(false)}
        isPopupShown={isConfirmPopupShown}
        acceptFunction={updateEvent}
        cancelFunction={() => setIsConfirmPopupShown(false)}
        cancelLabel={'No'}
        acceptLabel={'Yes'}
      >
        Are you sure you want to edit event {eventToEdit.id}?
      </Popup>
    </div>
  );
};

export default EditEvent;
