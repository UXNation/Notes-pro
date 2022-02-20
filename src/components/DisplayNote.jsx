import React,{useRef,useEffect, useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {changeNoteDialogState,changeNoteDialogBgFilter, updateNotesArray} from '../counterSlice';
import { useDispatch,useSelector } from 'react-redux';

function DisplayNote(){
  
  const noteItems = useSelector(state=>state.counter.notes);
  const index =  useSelector(state=>state.counter.currentDisplayNoteIndex);
  const bgStyles = useSelector(state=>state.counter.noteDialogBgFilter);
  const noteDialogStyles = useSelector(state=>state.counter.noteDialogState);
  const [isEditingEnabled, setEditingEnabled] = useState(false);
  const textAreaRef = useRef();
  const buttonRef = useRef();
  const actionTabs = useRef();
  const noteDialog = useRef();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errorText, setErrorText] = useState({display:'none'});

  useEffect(()=>{
    if(noteItems.length>0){
     setEditingEnabled(false);
     setTitle(noteItems[index].noteTitle);
     setDesc(noteItems[index].noteDesc);
    }
  },[noteItems,index]);

  function closeNoteDialog(){
    dispatch(changeNoteDialogBgFilter({
      animation:'bg-blur-remove .2s forwards',        
  }));
    dispatch(changeNoteDialogState({
       animation:'slide-up .3s forwards ease'     
    }));
    setEditingEnabled(false);
    setErrorText({display:'none'});

  }

  return (
      <div style={bgStyles} className="display-note">
          <section ref={noteDialog} style={noteDialogStyles} className="display-note-section">
             <div className="head">
             <input spellCheck={false} maxLength="24" placeholder="Note title" suppressContentEditableWarning={true} contentEditable={isEditingEnabled?true:false}
             value={title} onChange={(e)=>{  
             setTitle(e.target.value)
             e.target.value===("")?setErrorText({display:'block'}):setErrorText({display:'none'});
             }}></input>
             <div className="right-col">
             <button ref={buttonRef} style={{display:isEditingEnabled?'none':'initial'}} className="edit-btn" onClick={
               ()=>{
                 isEditingEnabled?setEditingEnabled(false):setEditingEnabled(true);
                 buttonRef.current.style.display="none";
                 textAreaRef.current.focus();
               }
             }>edit<img src="./images/pencil.png" alt=""></img></button>
               <img src="./images/close.png" alt="" onClick={()=>{
                 closeNoteDialog();
                
               }}></img>
              
             </div>
             </div>
            
            <TextareaAutosize ref={textAreaRef} style={{pointerEvents:isEditingEnabled?null:"none"}} autoFocus={isEditingEnabled?true:false} readOnly={isEditingEnabled?false:true} spellCheck={false}
            value={desc} onChange={(e)=>{setDesc(e.target.value)
              e.target.value===("")?setErrorText({display:'block'}):setErrorText({display:'none'});
            }}>            
            </TextareaAutosize>
            <p style={errorText}>Title or description not should not be left empty</p>
            <div ref={actionTabs} style={{display:isEditingEnabled?'flex':'none'}} className = "action-tabs">
              <button className="cancel-btn" onClick={()=>{
                setTitle(noteItems[index].noteTitle);
                setDesc(noteItems[index].noteDesc);
                setEditingEnabled(false);
                setErrorText({display:'none'});
              }}>cancel</button>
              <button onClick={()=>{
                if(title!==""&& desc!==""){
                   dispatch(updateNotesArray({
                     index:index,
                     title:title,
                     desc:desc
                   }));
                   closeNoteDialog();
                }
                
              }}>update note</button>
            </div>
          </section>
      </div>
      );
   }


export default DisplayNote;