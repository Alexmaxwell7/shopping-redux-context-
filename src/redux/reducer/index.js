import {combineReducers} from 'redux';
import {itemsReducer,selecteditemsReducer} from './reducer';

const reducers= combineReducers({
    allitems:itemsReducer,
    selecteditem:selecteditemsReducer
});
export default reducers;