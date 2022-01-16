import React from 'react';
import { Link } from 'react-router-dom';
import { fetchLogout } from 'store/asyncThunk';
import { useAppDispatch, useAppSelector } from 'store/reduxHooks';

import './UserPanel.css';

const UserPanel = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);

  const onLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <div className="user-panel">
      <p>Welcome, {user?.email}</p>
      <p onClick={onLogout}>Logout</p>
    </div>
  );
};

export default UserPanel;
