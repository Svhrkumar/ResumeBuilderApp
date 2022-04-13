import { SKILLSLISTS } from '../type';

export const skillApiCallsInfo = (state = {}, action) => {
	switch (action.type) {
		case SKILLSLISTS:
			return {
				skillsLists: action.payload,
			};

		default:
			return state;
	}
};
