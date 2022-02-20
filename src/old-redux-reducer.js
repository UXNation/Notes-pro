//  This is just a temporary file created to test redux and an be deleted ////////////////////


import { combineReducers, createStore } from "redux"

const initialState = {
    width:'73.5',
    leftMargin:'0'
}

const anyValue={
    value:'1'
}

const indicatorWidth = (state=initialState, action) => {
    
    console.log('reducer',action);
    switch(action.type){
        case 'changeCurrentIndex':
        return Object.assign({}, state,{width:action.width, leftMargin:action.leftMargin});
        default:
        return state;        
    }
}

const secondReducer=(state=anyValue,action)=>{
    console.log('secondReducer', action);
    switch(action.type){
        case 'setValue':
        return state;
        default:
        return state;        
    }
}

let myStore = createStore(combineReducers({indicatorWidth, secondReducer}));
export {myStore};
