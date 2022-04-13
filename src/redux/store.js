import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { skillApiCallsInfo } from './reducers/apiReducer';
import { componentStates } from './reducers/componentReducer';
import { educationInfo } from './reducers/educationInfoReducer';
import {
	personalInfo,
	userAuthLogin,
	userAuthReg,
} from './reducers/personalInfoReducer';
import { TechnicalInfoReducer } from './reducers/technicalInfoReducer';
import { workInfo } from './reducers/workInfoReducer';

export const initialState = {
	personInfo: {},
	educationInfo: {},
	studyInfo: [],
	workInfo: [],
};

const reducer = combineReducers({
	personDetails: personalInfo,
	educationDetails: educationInfo,
	workDetails: workInfo,
	skillsApiDetails: skillApiCallsInfo,
	userAuth: userAuthLogin,
	userAuthReg: userAuthReg,
	technicalDetails: TechnicalInfoReducer,
	componentState: componentStates,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
