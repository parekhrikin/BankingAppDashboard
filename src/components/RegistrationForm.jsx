import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error'
// import Spinner from '../components/Spinner'
import { registerUser } from '../state/auth/authActions'

const RegistrationForm = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch')
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.username = data.username.toLowerCase()
    dispatch(registerUser(data))
  }
  return (
    <div style={{ marginTop: '100px', height: '60vh', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
        <div className='form-group'>
          <label htmlFor='fullname'>Full Name</label>
          <input
            type='text'
            className='form-input'
            {...register('fullname')}
            required
          />
        </div>
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
        <div className='form-group'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            className='form-input'
            {...register('confirmPassword')}
            required
          />
        </div>
        <button type='submit' className='button' disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
export default RegistrationForm

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function RegistrationForm({ handleRegistered }) {
//   const [username, setUsername] = useState('');
//   const [fullname, setFullName] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       "username": username,
//       "fullname": fullname,
//       "password": password
//     }

//     fetch('http://localhost:8080/api/customer/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload)
//     })
//     .then(response => {
//       if(response.status === 200) {
//         // Handle success
//         return response.json();
//       } else if(response.status === 304) {
//         // Handle Not Modified
//         return "Not Modified";
//       } else {
//         // Handle error
//         return response.json();
//         throw new Error('Failed to call endpoint');
//       }
//     })
//     .then(data => {
//       // Handle the response data
//       setDialogMessage("Customer registered successfully!");
//       setDialogOpen(true);
//     })
//     .catch(error => {
//       // Handle any errors that occur during the request
//     });
    
//     console.log("registered")

//     handleRegistered(username, fullname, password);
    
//     setUsername('');
//     setFullName('');
//     setPassword('');
    
//   };

//   return (
//     <div style={{ marginTop: '100px', height: '60vh', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <h2>Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="fullname">Full Name</label>
//           <input
//             type="text"
//             id="fullname"
//             value={fullname}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {/* <div>
//         <Link to="/login">Back to Login</Link>
//       </div> */}
//     </div>
//   );
// }

// export default RegistrationForm;
