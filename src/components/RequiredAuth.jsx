import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/Error';
import { loginCustomer, loginStaff } from '../state/auth/authActions';
import RegistrationForm from './RegistrationForm';

const RequiredAuth = () => {
  const { loading, userInfo, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState('');

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const submitForm = (data) => {
    data.username = data.username.toLowerCase();
    data.userType = userType;
    console.log(data);
    if(userType == "customer"){
      dispatch(loginCustomer(data));
    } else {
      dispatch(loginStaff(data));
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle registration logic
    // Set state to show the registration form
    setShowRegistrationForm(true);
  };


  return (
    <div className="homepage">
      <header>
        <h1 style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>Welcome to XYZ Bank</h1>
      </header>
      <main style={{ display: 'flex' }}>
        <div className="bank-symbol" style={{ marginTop: '100px', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Symbolic representation of the bank */}
            {/* You can add an image or any other representation here */}
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" class="bi bi-bank" viewBox="0 0 16 16">
              <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
            </svg>
          </div>
          {showRegistrationForm ? (
            <RegistrationForm />
          ) : (
            <div className="login-form" style={{ marginTop: '100px', height: '60vh', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>Login</h2>
              <form onSubmit={handleSubmit(submitForm)}>
                {error && <Error>{error}</Error>}
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <input
                    type='text'
                    className='form-input'
                    {...register('username')}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='form-input'
                    {...register('password')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>User Type:</label>
                  <div>
                    <input 
                      type="radio" // Change checkboxes to radio buttons for exclusive selection
                      id="customer"
                      name="userType"
                      value="customer"
                      checked={userType === 'customer'}
                      onChange={() => setUserType('customer')} // Set userType to 'customer' when clicked
                    />
                    <label htmlFor="customer">Customer</label>
                  </div>
                  <div>
                    <input 
                      type="radio" // Change checkboxes to radio buttons for exclusive selection
                      id="staff"
                      name="userType"
                      value="staff"
                      checked={userType === 'staff'}
                      onChange={() => setUserType('staff')} // Set userType to 'staff' when clicked
                    />
                    <label htmlFor="staff">Staff</label>
                  </div>
                </div>
                <button type='submit' className='button' disabled={loading}>
                  {loading ? 'Loading...' : 'Login'}
                </button>
                <br/>
                <button type="button" className="button" onClick={handleRegister}>
                  Register
                </button>
              </form>
            </div>
          )}
      </main>
      <footer>
        <p style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>© {new Date().getFullYear()} XYZ Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RequiredAuth;

