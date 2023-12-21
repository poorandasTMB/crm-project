// authMiddleware.js
import { toast } from 'react-toastify';
import { setToken, setUser, logout } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

export const loginUser = (username, password,navigate) => async (dispatch) => {
    const baseUrl = 'https://dummyjson.com/auth/login'
    fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username:username,
        password: password,
      })
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        toast.success("Login Succesfully");
        dispatch(setUser(data));
        dispatch(setToken(data.token));
        // localStorage.setItem('userdata', JSON.stringify(data));
        navigate("/product")
        
      }
      else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });


};

export const logoutUser = () => (dispatch) => {
  // Clear user and token from Redux state
  dispatch(logout());
};
