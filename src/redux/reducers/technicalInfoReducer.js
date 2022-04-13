import {
	TECHNICAL_INFO_FAIL,
	TECHNICAL_INFO_REQUEST,
	TECHNICAL_INFO_SUCCESS,
	UPDATE_TECHNICAL_INFO_SUCCESS,
} from '../type';

export const TechnicalInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case TECHNICAL_INFO_REQUEST:
			return {
				loading: true,
			};
		case TECHNICAL_INFO_SUCCESS:
			return {
				technicalData: action.payload,
				loading: false,
			};
		case UPDATE_TECHNICAL_INFO_SUCCESS:
			return {
				technicalData: action.payload,
				loading: false,
			};
		case TECHNICAL_INFO_FAIL:
			return {
				loading: false,
				technicalData: action.payload,
			};
		default:
			return state;
	}
};
