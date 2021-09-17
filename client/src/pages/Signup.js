import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup (props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <form>
      <div className="mb-3">
              <label for="firstname" className="form-label">First Name</label>
              <input type="firstname" placeholder="First Name" name="firstname" className="form-control" id="firstname" onChange={handleChange}></input>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
      <div className="mb-3">
              <label for="InputLastName" className="form-label">Last Name</label>
              <input type="lastname" className="form-control" id="lastname"></input>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
          <div className="mb-3">
              <label for="InputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp"></input>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
              <div className="mb-3">
                  <label for="InputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="InputPassword1"></input>
            </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="Check1"></input>
                    <label className="form-check-label" for="Check1">Check me out</label>
            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default Signup;