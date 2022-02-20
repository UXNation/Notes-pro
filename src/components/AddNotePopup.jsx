import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAddNoteStyles,setNoteId, updateNotesSection } from '../counterSlice';

function AddNotePopup(){
    const dispatch = useDispatch();
    const inputNoteTitle = useRef(null);
    const inputNoteText = useRef(null);
    const isFavCheckBox = useRef(null);
    const isImpCheckbox = useRef(null);
    const errorText = useRef(null);
    const noteId = useSelector(state=>state.counter.noteId);
    const styles = useSelector(state=>state.counter.addNoteStyles);
   
    function saveNoteItem(){
  
      var noteItem = {
        noteId:noteId,
        noteTitle:inputNoteTitle.current.value,
        noteDesc : inputNoteText.current.value,
        isImp : isImpCheckbox.current.checked,
        isFav : isFavCheckBox.current.checked,
      }
  
       dispatch(updateNotesSection({
         type:'addNote',
         note: noteItem
       }));

       dispatch(changeAddNoteStyles({
        animation:'fadeOut .2s forwards',   
       })
      );
      dispatch(setNoteId());
      inputNoteText.current.value="";
      inputNoteTitle.current.value="";
      isImpCheckbox.current.checked = false;
      isFavCheckBox.current.checked = false;

    }
  
    return (<div style={styles} className="add-note-popup" id="add-note-popup">
        <div  className="note-dialogue-box">
          <h1 className="title">Note Title</h1>
          <img className="close" src="./images/close.png" alt="" onClick={
            ()=>{
                   dispatch(changeAddNoteStyles({
                    animation:'fadeOut .2s forwards',       
                 })
                );
                errorText.current.style.display='none';

            }

          }></img>
          <input ref={inputNoteTitle} spellCheck={false} maxLength="25" className="title-input" type="text"></input>
          <br></br>
          <h1 className="your-note-title">Your Note...</h1>
          <textarea ref={inputNoteText} spellCheck={false} className="note-input"></textarea><br/>
          <p ref={errorText}>Title and note should not be left empty</p>

          <section className="section-checkboxes">
         
          <label className="control control-checkbox">
           Set this note as important
            <input type="checkbox" ref={isImpCheckbox} />
           <div className="control_indicator"></div>
          </label>

          <label className="control
           control-checkbox">
           Save this note to favourites
            <input type="checkbox" ref={isFavCheckBox} />
           <div className="control_indicator"></div>
          </label>

          </section>
          
          <button onClick={
             ()=>{
               if(inputNoteTitle.current.value!==""&&inputNoteText!==""){
                saveNoteItem();
                errorText.current.style.display='none';

               }
               else{
                 errorText.current.style.display='inline-block';
               }
            }
          }>Add this note</button>
        </div>  
      </div>);

}

export default AddNotePopup;