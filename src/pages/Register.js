import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signupForm, setSignupForm] = useState(false);
	const [signinForm, setSigninForm] = useState(true);
	const [register, setRegister] = useState({
		firstname: '',
		lastname: '',
		RegEmail: '',
		RegPassword: '',
		contact: '',
		country: '',
	});

	console.log('register state', register);
	const handleSignUp = async (e) => {
		e.preventDefault();
		const req = {
			email: email,
			password: password,
		};

		await axios
			.post('http://localhost:4040/api/v1/user/login', req)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	const handleSignUpForms = () => {
		if (!signupForm) {
			setSignupForm(true);
			setSigninForm(false);
		} else {
			setSignupForm(true);
		}
	};

	const handleSignInForms = () => {
		if (!signinForm) {
			setSigninForm(true);
			setSignupForm(false);
		} else {
			setSigninForm(true);
		}
	};

	const { firstname, lastname, RegEmail, RegPassword, contact, country } =
		register;

	const regOnchenge = (e) => {
		const { name, value } = e.target;
		setRegister({ [name]: value });
	};
	const Signup = () => {
		return (
			<div className='form-signup'>
				<form
					style={{
						height: '400px',
						marginTop: '5px',
						padding: '10px 20px',
						alignItems: 'center',
					}}>
					<center>
						<h5>Signup</h5>
					</center>

					<div className='form-row mt-4'>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='firstname'
								value={register.firstname}
								onChange={(e) => regOnchenge(e)}
								name='firstname'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='lastname'
								value={register.lastname}
								onChange={(e) => regOnchenge(e)}
								name='lastname'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='E-mail'
								value={register.RegEmail}
								onChange={(e) => regOnchenge(e)}
								name='RegEmail'
							/>
						</div>
						<div className='col mt-3'>
							<input
								type='password'
								className='form-control input-field'
								placeholder='Password'
								value={register.RegPassword}
								onChange={(e) => regOnchenge(e)}
								name='RegPassword'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='contact'
								value={register.contact}
								onChange={(e) => regOnchenge(e)}
								name='contact'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='country'
								value={register.country}
								onChange={(e) => regOnchenge(e)}
								name='country'
							/>
						</div>
						<div className='col mt-2 '>
							<center>
								<button className='submit-btn' onClick={handleSignUp}>
									Signup
								</button>
							</center>
						</div>
					</div>
				</form>
			</div>
		);
	};

	return (
		<div className='container-fluid outer-conatiner '>
			<div className='inner-container   '>
				<div className='' style={{ padding: '0px 15px' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-evenly',
							margin: '0px 0px',
							borderBottom: '1px solid grey',
						}}>
						<a className='signin-btn' onClick={handleSignInForms}>
							Signin
						</a>
						<a className='signup-btn' onClick={handleSignUpForms}>
							Signup
						</a>
					</div>
					<Signup />
				</div>
			</div>
		</div>
	);
};

export default Login;
