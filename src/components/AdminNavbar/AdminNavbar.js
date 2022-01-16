import Modal from 'components/UI/Modal/Modal';
import React, { useState } from 'react';
import AddEvent from 'components/AddEvent/AddEvent';

import './AdminNavbar.scss';

const AdminNavbar = () => {
  const [isAddEventModalShown, setIsAddEventModalShown] = useState(false);
  const onAddEvent = () => {
    setIsAddEventModalShown(true);
  };

  return (
    <>
      <div className="admin-nav">
        <button className="add-event-button" onClick={onAddEvent}>
          Add Event
        </button>
      </div>
      <Modal isModalShown={isAddEventModalShown} onCloseModal={() => setIsAddEventModalShown(false)}>
        <AddEvent closeAddEventModal={() => setIsAddEventModalShown(false)} />
      </Modal>
    </>
  );
};

export default AdminNavbar;
