import { createSlice } from "@reduxjs/toolkit";
import getNotesFromStorage from './getNotes';

function getNoteIdFromStorage(){
    let int;
    if(localStorage.getItem('noteId')!==null){
    int = localStorage.getItem('noteId');
    return int;
    }
    else{
     return 0;
    }

}

const initialState = {
    width:'73.5',
    leftMargin:'0',
    navbarIndex:0,
    isNameWindowActive:false,
    currentDisplayNoteTitle:"",
    currentDisplayNoteDesc:"",
    currentDisplayNoteIndex:0,
    searchQuery:"",
    searchPlaceHolder:"",
    deleteNoteWindowBg:{
        visibility:'hidden'
    },
    deleteNoteWindow:{
     
    },
    nameWindowStyles:{
        display:'none',
    },
    addNoteStyles:{
        display:'none',        
    },
    noteDialogBgFilter:{
        visibility:'hidden'
    },
    noteDialogState:{
        
    },
    noteId:getNoteIdFromStorage(),
    notes: getNotesFromStorage(),
    filteredArray:[]
   
}


const counterSlice = createSlice({
    name : 'AppSlice',
    initialState,
    reducers:{
        updateSearchQuery:(state, action)=>{
            state.searchQuery = action.payload;
        },
        updateSearchPlaceHolder:(state, action)=>{
            state.searchPlaceHolder = action.payload;
        },
        setNoteId:(state)=>{
            state.noteId++;
            localStorage.setItem('noteId', state.noteId);
        },
        changeCurrentWidth:(state,action)=>{
            state.width = action.payload;
        },
        changeCurrentMargin:(state, action)=>{
            state.leftMargin= action.payload;
        },
        changeNavbarIndex:(state, action)=>{
            state.navbarIndex = action.payload;
        },
        changeDeleteNoteWindowBg:(state,action)=>{
            state.deleteNoteWindowBg = action.payload;
        },
        changeDeleteWindowState:(state,action)=>{
            state.deleteNoteWindow = action.payload; 
        },
        changeAddNoteStyles:(state, action)=>{
            state.addNoteStyles = action.payload;
        },
        changeNameWindowState:(state, action)=>{
            state.isNameWindowActive = action.payload;
        },
        changeNameWindowStyles:(state, action)=>{
            state.nameWindowStyles = action.payload;
        },
        changeNoteDialogBgFilter:(state, action)=>{
            state.noteDialogBgFilter=action.payload
        },
        changeNoteDialogState:(state, action)=>{
            state.noteDialogState =action.payload;
        },
        updateFilteredArray:(state,action)=>{
            if(action.payload.type==="init"){
                state.filteredArray = state.notes;
            }
            else if(action.payload.type==="fav"){ 
            state.filteredArray=state.notes.filter(
                x=>x.isFav
            )
           }
           else if(action.payload.type==="imp"){ 
            state.filteredArray=state.notes.filter(
                x=>x.isImp
            )
           }
        },
        updateDisplayNoteIndex:(state, action)=>{
            state.currentDisplayNoteIndex = action.payload;
        },
        updateNotesSection:(state, action)=>{
       
         if(action.payload.type==="delete") {
          state.notes.splice(action.payload.index,1);
          localStorage.setItem('noteItem', JSON.stringify(state.notes));
          state.filteredArray = state.notes; 
        }
         else if(action.payload.type==="addNote"){
           state.notes.unshift(action.payload.note);  
           localStorage.setItem('noteItem',JSON.stringify(state.notes));
           state.filteredArray = state.notes; 
          }
        },
        updateNotesArray:(state,action)=>{
            state.notes[action.payload.index].noteTitle = action.payload.title;
            state.notes[action.payload.index].noteDesc = action.payload.desc;
            localStorage.setItem('noteItem',JSON.stringify(state.notes));
            state.filteredArray = state.notes;
        },
        updateImpNotes:(state,action)=>{
            state.notes[action.payload.index].isImp = action.payload.actionType;
            localStorage.setItem('noteItem',JSON.stringify(state.notes));
        },
        updateFavNotes:(state,action)=>{
            state.notes[action.payload.index].isFav = action.payload.actionType;
            localStorage.setItem('noteItem',JSON.stringify(state.notes));
        }
        
    }
})


export const {
    updateSearchQuery,
    setNoteId,
    updateSearchPlaceHolder,
    changeCurrentWidth,
    changeCurrentMargin,
    changeNavbarIndex,
    changeDeleteWindowState,
    changeDeleteNoteWindowBg,
    changeNoteDialogBgFilter, 
    changeNoteDialogState, 
    updateFavNotes,
    updateImpNotes, 
    updateFilteredArray,
    updateDisplayNoteIndex,
    changeNameWindowState, 
    updateNotesSection, 
    updateNotesArray,
    changeAddNoteStyles, 
    changeNameWindowStyles} = counterSlice.actions;
export default counterSlice.reducer;