import {
	ADD_PERSONAL_INFO,
	PERSONAL_INFO_REQUEST,
	PERSONAL_INFO_SUCCESS,
	UPDATE_PERSONAL_SUCCESS,
	USERLOGIN_FAIL,
	USERLOGIN_REQUEST,
	USERLOGIN_SUCCESS,
	USERREG_FAIL,
	USERREG_REQUEST,
	USERREG_SUCCESS,
} from '../type';

export const personalInfo = (state = {}, action) => {
	switch (action.type) {
		case PERSONAL_INFO_REQUEST:
			return {
				loading: true,
			};
		case PERSONAL_INFO_SUCCESS:
			return {
				personInfo: action.payload,
				loading: false,
			};
		case ADD_PERSONAL_INFO:
			return {
				personInfo: action.payload,
			};
		default:
			return state;
	}
};

export const userAuthLogin = (state = {}, action) => {
	switch (action.type) {
		case USERLOGIN_REQUEST:
			return {
				loading: true,
			};
		case USERLOGIN_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case UPDATE_PERSONAL_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case USERLOGIN_FAIL:
			return {
				loading: false,
				user: action.payload,
			};
		default:
			return state;
	}
};

export const userAuthReg = (state = {}, action) => {
	switch (action.type) {
		case USERREG_REQUEST:
			return {
				loading: true,
			};
		case USERREG_SUCCESS:
			return {
				loading: false,
				signedUp: action.payload,
			};
		case USERREG_FAIL:
			return {
				loading: false,
				signedUp: action.payload,
			};

		default:
			return state;
	}
};
