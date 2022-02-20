import React from 'react';
import NotesItemTemplate from './NotesItemTemplate';
import {useEffect,useState} from 'react';
import {changeDeleteNoteWindowBg,changeDeleteWindowState,updateFilteredArray,updateDisplayNoteIndex, changeNoteDialogBgFilter, changeNoteDialogState} from '../counterSlice.js';
import { useSelector,useDispatch } from 'react-redux';

  function NotesSection(){
   let noteItems = useSelector(state=>state.counter.notes);
   const filteredArray = useSelector(state=>state.counter.filteredArray);
   const dispatch = useDispatch();
   const [emptyNotesSectionStyle, setEmptyNotesSectionStyle] = useState({display:'none'});
   const query = useSelector(state=>state.counter.searchQuery);
   const heartIcon = {
    notFav:'./images/heart.svg',
    fav:'./images/heart-fill.svg'
    }
   const alertIcon = {
    notImp:'./images/imp.svg',
    imp:'./images/alert-fill.png',
    }    
   
    function openNoteDialog(index){
      dispatch(changeNoteDialogBgFilter({
         animation:'bg-blur .3s forwards ease',
      }));
      dispatch(changeNoteDialogState({
         animation:'slide-down .2s ease-in forwards',      
      }));     
      dispatch(updateDisplayNoteIndex(index));      
    }

    function openDeleteNoteDialogue(index){
      dispatch(changeDeleteNoteWindowBg({
        animation:'bg-filter .3s forwards ease'
      }));
      dispatch(changeDeleteWindowState({
        animation:'slide-down .3s forwards ease'
      }));
      dispatch(updateDisplayNoteIndex(index))
    }
    
     useEffect(()=>{
      dispatch(updateFilteredArray({type:"init"}))     
     },[]);
     
     useEffect(()=>{
      if(noteItems.length===0){
        setEmptyNotesSectionStyle({display:'flex'}); 
      }
      else{
        setEmptyNotesSectionStyle({display:'none'}); 
      }
     },[noteItems])
       
      return (
       <section className="notes-section">
       <div className='empty-notes-section' style={emptyNotesSectionStyle}>
       <img src='../images/sad.svg' alt=""></img>
       <h1>Oops, No notes found, why not create one ?</h1>
       </div> 
        <ul className="notes-grid-view">    
          {  filteredArray.filter(
             x=>x.noteTitle.toLowerCase().includes(query.toLowerCase())
             ).map((Note)=>{
               return <NotesItemTemplate
               key={Note.noteId}
               noteTitle = {Note.noteTitle}
               noteDesc = {Note.noteDesc}
               isFav = {Note.isFav}
               isImp = {Note.isImp}
               onNoteItemClick = {()=>{   
                openNoteDialog(noteItems.findIndex(x=>x.noteId===Note.noteId))
             }}
             favIcon = {Note.isFav?heartIcon.fav:heartIcon.notFav}
             impIcon = {Note.isImp?alertIcon.imp:alertIcon.notImp}
             index = {noteItems.findIndex(x=>x.noteId===Note.noteId)}
             onDelete = {()=>{
               openDeleteNoteDialogue(noteItems.findIndex(x=>x.noteId===Note.noteId));         
             }}>
            </NotesItemTemplate>
             })     
            }
       </ul>
    </section>
   );
  
}


export default NotesSection;