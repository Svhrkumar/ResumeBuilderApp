import {
	ADD_EDUCATION_INFO,
	EDUCATION_INFO_REQUEST,
	EDUCATION_INFO_SUCCESS,
	UPDATE_EDUCATION_INFO_SUCCESS,
} from '../type';

export const educationInfo = (state = {}, action) => {
	switch (action.type) {
		case EDUCATION_INFO_REQUEST:
			return {
				loading: true,
			};
		case EDUCATION_INFO_SUCCESS:
			return {
				studyInfo: action.payload,
			};
		case UPDATE_EDUCATION_INFO_SUCCESS:
			return {
				studyInfo: action.payload,
			};
		case ADD_EDUCATION_INFO:
			return {
				studyInfo: action.payload,
			};
		default:
			return state;
	}
};
