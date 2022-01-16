// App
import React, { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fetchAllEvents } from 'store/asyncThunk';
import { useAppDispatch } from 'store/reduxHooks';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { updateUserAuth } from 'store/slicers/userSlice';

// App Components
import RouterConfig from 'RouterConfig';
import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';

// Styles
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(updateUserAuth(currentUser));
  });

  const fetchOnloadData = () => {
    dispatch(fetchAllEvents());
  };

  useLayoutEffect(() => {
    fetchOnloadData();
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <main>
        <RouterConfig />
      </main>

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
