import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { paths } from 'utils/constants';
import { useAppDispatch } from 'store/reduxHooks';
import { fetchLoginUser } from 'store/asyncThunk';

import './Login.css';

const Login = ({ history }) => {
  const dispatch = useAppDispatch();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    if (!email || !password) {
      alert('Error: Missing parameters');
      return;
    }
    try {
      let userLoginDetails = { email, password };
      const response = await dispatch(fetchLoginUser(userLoginDetails));
      if (response?.meta?.requestStatus === 'rejected') {
        alert(response.error.message);
      } else {
        history.push(paths.homePath);
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-message">
        Welcome to Your My Party! <br />
        Here you can find your next party. <br />
        To continue, please log in.
      </div>
      <div className="login">
        <input type="text" placeholder="Email" name="email" value={email} onChange={handleUsernameChange} />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <input type="button" className="login-button" value="Log in" onClick={login} />
        <br />
        <hr />
        <Link className="register-button" to="/register">
          Create new account
        </Link>
      </div>
    </div>
  );
};

export default Login;
