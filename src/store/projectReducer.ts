// action - state management
import * as actionTypes from './actions';
import { DefaultRootStateProps } from 'types';

export interface ProjectProps {
    payload: string;
    type: string;
}

const initialState: DefaultRootStateProps['link'] = {
    link: '',
    language: []
};
const LINK = 'link';
// ==============================|| SNACKBAR REDUCER ||============================== //

const projectReducer = (state = initialState, action: ProjectProps) => {
    switch (action.type) {
        case LINK:
            return {
                ...state,
                link: action.payload
            };
        default:
            return state;
    }
};

export default projectReducer;
