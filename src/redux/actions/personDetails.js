import {
	ADD_EDUCATION_INFO,
	ADD_PERSONAL_INFO,
	ADD_WORKINFO,
	SKILLSLISTS,
	TECHNICAL_INFO_FAIL,
	TECHNICAL_INFO_REQUEST,
	TECHNICAL_INFO_SUCCESS,
	UPDATE_EDUCATION_INFO_SUCCESS,
	UPDATE_PERSONAL_REQUEST,
	UPDATE_PERSONAL_SUCCESS,
	UPDATE_TECHNICAL_INFO_SUCCESS,
	UPDATE_WORKINFO_SUCCESS,
	USERLOGIN_FAIL,
	USERLOGIN_REQUEST,
	USERLOGIN_SUCCESS,
	USERREG_FAIL,
	USERREG_REQUEST,
	USERREG_SUCCESS,
} from '../type';
import axios from 'axios';

export const submitPersonInfo = (data) => (dispatch) => {
	axios
		.post('http://localhost:4040/api/v1/user/userpersonalinfo', data)
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);
			console.log(' personal info api', res.data);
			dispatch({
				type: ADD_PERSONAL_INFO,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});

	console.log('action');
};

export const submitEducationInfo = (req) => (dispatch) => {
	axios
		.post('http://localhost:4040/api/v1/user/usereduinfo', req)
		.then((res) => {
			dispatch({
				type: ADD_EDUCATION_INFO,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});

	console.log('educatin action', req);
};

export const submitWorkInfo = (req) => (dispatch) => {
	axios
		.post('http://localhost:4040/api/v1/user/userworkinfo', req)
		.then((res) => {
			dispatch({
				type: ADD_WORKINFO,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});

	console.log('workinfo action', req);
};

export const technicalInfo = (req) => (dispatch) => {
	axios
		.post('http://localhost:4040/api/v1/user/usertechnicalinfo', req)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: TECHNICAL_INFO_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: TECHNICAL_INFO_FAIL,
				payload: err.response && err.response.data,
			});
		});
};
export const SkillsInfo = () => (dispatch) => {
	axios
		.get('https://rkservices.herokuapp.com/api/v1/skills')
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);

			dispatch({
				type: SKILLSLISTS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updatePersonalInfo = (req) => async (dispatch) => {
	axios
		.put('http://localhost:4040/api/v1/user/personalinfo/update/', req)
		.then((res) => {
			dispatch({
				type: UPDATE_PERSONAL_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateEducationInfo = (req) => async (dispatch) => {
	axios
		.put('http://localhost:4040/api/v1/user/eduInfo/update/', req)
		.then((res) => {
			dispatch({
				type: UPDATE_EDUCATION_INFO_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateWorkInfo = (req) => async (dispatch) => {
	axios
		.put('http://localhost:4040/api/v1/user/workInfo/update/', req)
		.then((res) => {
			dispatch({
				type: UPDATE_WORKINFO_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateCarrerInfo = (req) => async (dispatch) => {
	axios
		.put('http://localhost:4040/api/v1/user/technicalinfo/update/', req)
		.then((res) => {
			dispatch({
				type: UPDATE_TECHNICAL_INFO_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const logoutHandler = () => async (dispatch) => {
	dispatch({
		type: USERLOGIN_SUCCESS,
		payload: null,
	});
};
export const signinHandler = (req) => async (dispatch) => {
	dispatch({
		type: USERLOGIN_REQUEST,
		payload: req,
	});
	await axios
		.post('http://localhost:4040/api/v1/user/login', req)
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);

			sessionStorage.setItem('token', JSON.stringify(res.data));
			const userData = sessionStorage.getItem('token');
			const user = JSON.parse(userData);
			dispatch({
				type: USERLOGIN_SUCCESS,
				payload: user,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: USERREG_FAIL,
				payload: err.response && err.response.data,
			});
		});
};

export const signupHandler = (req) => (dispatch) => {
	dispatch({
		type: USERREG_REQUEST,
	});
	axios
		.post('http://localhost:4040/api/v1/user/register', req)
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);

			dispatch({
				type: USERREG_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: USERREG_FAIL,
				payload: err.response && err.response.data,
			});
		});
};

export const getResumeDetails = (id) => (dispatch) => {
	axios
		.get(`http://localhost:4040/api/v1/user/userperonal/${id}`)
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);

			dispatch({
				type: ADD_PERSONAL_INFO,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
	axios
		.get(`http://localhost:4040/api/v1/user/workInfo/${id}`)
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);

			dispatch({
				type: ADD_WORKINFO,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
	axios
		.get(`http://localhost:4040/api/v1/user/eduInfo/${id}`)
		.then((res) => {
			// const list = res.data.map((skills) => skills.label);

			dispatch({
				type: ADD_EDUCATION_INFO,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});

	axios
		.get(`http://localhost:4040/api/v1/user/technicalinfo/${id}`)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: TECHNICAL_INFO_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: TECHNICAL_INFO_FAIL,
				payload: err.response && err.response.data,
			});
		});
};
