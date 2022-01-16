import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCreateNewUser } from 'store/asyncThunk';
import { useAppDispatch } from 'store/reduxHooks';
import { paths } from 'utils/constants';

import './Register.css';

const Register = (props) => {
  const { history } = props;
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [passwordValidityMessage, setPasswordValidityMessage] = useState('');

  const handleFormChange = (e, property) => {
    const newFormState = { ...formState, [property]: e.target.value };
    setFormState(newFormState);
  };

  const onRegister = async () => {
    try {
      if (!formState.email || !formState.password) {
        alert('ERROR: Missing parameters');
        return;
      }
      let userRegisterDetails = {
        email: formState.email,
        password: formState.password,
      };
      dispatch(fetchCreateNewUser(userRegisterDetails));
      history.push(paths.homePath);
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => handleFormChange(e, 'email')}
      />
      <br />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) => handleFormChange(e, 'password')}
      />
      <br />
      <input type="button" className="register-button" value="Sign up" onClick={onRegister} />
      <br />
      Already have an account? <Link to="/login">Sign in</Link>
    </div>
  );
};

export default Register;
