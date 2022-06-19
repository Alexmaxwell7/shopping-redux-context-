import {ActionItemTypes} from '../actionstypes/action_types';

export const getitems=(items)=>{
    console.log("actiondata",items);
    return{
        type:"SET_ITEMS",
        payload:items,
    }
}

export const itemdetails=(items)=>{
    console.log("itemdetais_action",items)
    return{
        type:"SELECTED_ITEM",
        payload:items,
    }
}
