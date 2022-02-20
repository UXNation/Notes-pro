import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {updateNotesSection, changeDeleteNoteWindowBg, changeDeleteWindowState } from '../counterSlice';

export default function DeleteNote(){
    

    const dispatch = useDispatch();
    const deleteNoteWindowBg = useSelector(state=>state.counter.deleteNoteWindowBg);
    const deleteNoteWindow = useSelector(state=>state.counter.deleteNoteWindow);
    const noteIndex = useSelector(state=>state.counter.currentDisplayNoteIndex);
    
    function closeDeleteNoteDialog(){
        dispatch(changeDeleteWindowState({
            animation:'slide-up .3s forwards ease'
         }));
         dispatch(changeDeleteNoteWindowBg({
            animation:'bg-filter-remove .3s forwards ease',
         }));
    }
    
    return (
        <div style={deleteNoteWindowBg} className="delete-note">
            <div style={deleteNoteWindow} className='delete-note-section'>
                <h1>Are you sure you want to<br/> delete this note</h1>
               <button onClick={async()=>{
                 await dispatch(updateNotesSection({
                   type:'delete',
                   index:noteIndex               
                 })); 
                 closeDeleteNoteDialog();
               }}>Delete</button>
               <button className='cancel-btn' onClick={
                ()=>{
                  closeDeleteNoteDialog();    
                }
               }>cancel</button>
            </div>
        </div>
    );
}