import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'store/reduxHooks';

import UserPanel from 'components/UserPanel/UserPanel';
import EventCard from 'components/EventCard/EventCard';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import HomepageSortButtons from 'components/HomepageSortButtons/HomepageSortButtons';
import AgePickerSlider from 'components/AgePickerSlider/AgePickerSlider';

import './Events.css';

const Events = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { events } = useAppSelector((state) => state.eventsSlice);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <div className="events">
      <AgePickerSlider />
      <HomepageSortButtons />
      {isAdmin && (
        <>
          <AdminNavbar />
          <UserPanel />
        </>
      )}
      <div className="event-cards">
        {events.map((event) => {
          return <EventCard key={event.id} event={event} isAdmin={isAdmin} />;
        })}
      </div>
    </div>
  );
};

export default Events;
