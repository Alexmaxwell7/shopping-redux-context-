import {ActionItemTypes} from '../actionstypes/action_types';

const intialState={
    items:[],
  }

  export const itemsReducer = (state = intialState, {type, payload})=>{
      console.log("reducerpayload",type);
    switch(type){
      case ActionItemTypes.SET_ITEMS:
        return {...state, items:payload};
      default:
        return state;
    }
  }

  export const selecteditemsReducer = (state = intialState, { type, payload }) => {
    console.log("reducerpayload_itemreducer",payload);
    switch (type) {
      case ActionItemTypes.SELECTED_ITEM:
        return { ...state, items:payload };
      case ActionItemTypes.REMOVE_LOAD_ITEM:
        return {};
      default:
        return state;
    }
  };