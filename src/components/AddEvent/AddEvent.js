import React, { useState } from 'react';
import { useAppDispatch } from 'store/reduxHooks';
import { fetchAddNewEvent } from 'store/asyncThunk';
import axios from 'axios';

import './AddEvent.scss';

const AddEvent = (props) => {
  const { closeAddEventModal } = props;
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    eventName: '',
    minAge: null,
    hour: '22:00',
    eventDate: '',
    imageUrl: '',
    formData: null,
  });

  const handleFormChange = (e, property) => {
    const newFormState = { ...formState, [property]: e.target.value };
    setFormState(newFormState);
  };

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    let formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'imblmcyz');

    // Temp img
    const imageUrl = URL.createObjectURL(imageFile);
    setFormState({ ...formState, imageUrl, formData });
  };

  const handleAddEvent = async () => {
    try {
      // Image upload
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/my-party-media/image/upload';
      const { data: imageData } = await axios.post(cloudinaryUrl, formState.formData);
      if (imageData?.url) {
        let newEventDetails = {
          eventName: formState.eventName,
          hour: formState.hour,
          imageUrl: imageData.url, // Uploaded new image
          minAge: formState.minAge,
          eventDate: formState.eventDate,
        };
        const response = await dispatch(fetchAddNewEvent(newEventDetails));
        if (response) closeAddEventModal();
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <div className="add-event">
      <h2>Add Event</h2>
      <input
        type="text"
        placeholder="Enter event name"
        value={formState.eventName}
        onChange={(e) => handleFormChange(e, 'eventName')}
      />
      <br />
      <input
        type="time"
        placeholder="Enter hour"
        value={formState.hour}
        onChange={(e) => handleFormChange(e, 'hour')}
      />
      <br />
      <input
        type="number"
        placeholder="Enter min age"
        value={formState.minAge || ''}
        onChange={(e) => handleFormChange(e, 'minAge')}
      />
      <br />
      <input
        type="date"
        placeholder="Enter event date"
        value={formState.eventDate}
        onChange={(e) => handleFormChange(e, 'eventDate')}
      />
      <br />
      <input type="file" placeholder="Choose an image" name="eventImage" onChange={uploadImage} />
      {formState.imageUrl && (
        <div className="imgThumb">
          <img alt="thumbnail" src={formState.imageUrl} />
        </div>
      )}
      <br />
      <input type="button" className="add-event-button" value="Add event" onClick={handleAddEvent} /> <br />
      <br />
    </div>
  );
};

export default AddEvent;
