import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';
import cartReducer from './cartReducer';
import kanbanReducer from './kanbanReducer';
import projectReducer from './projectReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,

    link: persistReducer(
        {
            key: 'link',
            storage,
            keyPrefix: 'berry-'
        },
        projectReducer
    ),
    kanban: kanbanReducer
});

export default reducer;
