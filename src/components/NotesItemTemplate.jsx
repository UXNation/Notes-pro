import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { updateImpNotes, updateFavNotes } from '../counterSlice';

export default function NotesItemTemplate(props){
   
     const heartIcon = {
      notFav:'./images/heart.svg',
      fav:'./images/heart-fill.svg'
      }
     const alertIcon = {
      notImp:'./images/imp.svg',
      imp:'./images/alert-fill.png',

      }
     const [isImp, setisImp] = useState();
     const [isFav, setisFav] = useState();
     const dispatch = useDispatch();

     useEffect(()=>{
   
         setisImp(props.isImp);
         setisFav(props.isFav);
       
       },[props.isImp,props.isFav])

     return (
        
        <section className="notes-item-template" onClick={
            ()=>{
              props.onNoteItemClick() ;
              
             }
           }>
             <div className="notes-item-animated">
           <h1>{props.noteTitle}</h1>
           <p className="desc">{props.noteDesc}</p>
            
           <div className="action-tabs">
              <img src={isImp?alertIcon.imp:alertIcon.notImp} onClick={
                (e)=>{ 
                   if(isImp===true){
                      e.stopPropagation();
                      setisImp(false)
                      dispatch(updateImpNotes({
                         index:props.index,
                         actionType:false
                      }))
                                 
                   }
                   else{
                      e.stopPropagation();
                      dispatch(updateImpNotes({
                         index:props.index,
                         actionType:true
                      }))
                      setisImp(true)
                  
                   }
                }
              } alt=""></img>
              <img src={isFav?heartIcon.fav:heartIcon.notFav} onClick={
                (e)=>{ if(isFav===true){
                      e.stopPropagation();
                      setisFav(false)
                      dispatch(updateFavNotes({
                         index:props.index,
                         actionType:false
                      }))
                   }
                   else{
                      e.stopPropagation();
                      setisFav(true);
                      dispatch(updateFavNotes({
                         index:props.index,
                         actionType:true
                      }))
                   }} 
              } alt=""></img>
              <div className="button" onClick={(e)=>{
                   e.stopPropagation();
                   props.onDelete();
               }
              }>
              <p className="delete-btn">Delete note</p> 
              <img src="./images/trash.svg" alt=""></img>
              </div>
           </div>
           </div>
        </section>
        );
}