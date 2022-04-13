import {
	ADD_WORKINFO,
	UPDATE_WORKINFO_SUCCESS,
	WORKINFO_REQUEST,
	WORKINFO_SUCCESS,
} from '../type';

export const workInfo = (state = {}, action) => {
	switch (action.type) {
		case WORKINFO_REQUEST:
			return {
				loading: true,
			};
		case WORKINFO_SUCCESS:
			return {
				workData: action.payload,
			};
		case UPDATE_WORKINFO_SUCCESS:
			return {
				workData: action.payload,
			};
		case ADD_WORKINFO:
			return {
				workData: action.payload,
			};

		default:
			return state;
	}
};
