import { SLIDER_NEXT } from '../type';

export const componentStates = (state = { Slider: 1 }, action) => {
	switch (action.type) {
		case SLIDER_NEXT:
			return {
				Slider: action.payload,
			};

		default:
			return state;
	}
};
