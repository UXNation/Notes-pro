import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import outsideClickListener from '../OutsideClickListener';
import { changeAddNoteStyles,updateSearchQuery, changeNameWindowStyles, changeNameWindowState } from '../counterSlice';

function Header(){
    const dispatch = useDispatch();
    const [nickName, setnickName] = useState('Jane Doe');
    const searchPlaceHolder = useSelector(state=>state.counter.searchPlaceHolder);
    const wrapperRef = useRef(null);
    outsideClickListener(wrapperRef);

    const styles = useSelector(state=>state.counter.nameWindowStyles);

    useEffect(()=>{
        setnickName(localStorage.getItem('userNickname'));

    },[])

    return (
        <div className="header">
           <h1>Notes Pro</h1>
           <button onClick={
               ()=>{
                  dispatch(changeAddNoteStyles({
                    animation: 'fadeIn .3s forwards',  
                    opacity: '1',                   
                    visibility:'visible',                     
                  }));
               }
           }>create note +</button>
           <div className ="search-box">
           <img src="./images/search.svg" alt=""></img>
           <input type="search" placeholder={'search '+searchPlaceHolder+'notes'} onChange={(e)=>{
              
               dispatch(updateSearchQuery(e.target.value));
             
           }}></input>
           
           </div>
           
           {/* RIGHT COL ------------ */}
           <div className="right-col">            
           <h2>{nickName}</h2>
           <img src="./images/write.png" alt="" onClick={()=>{
              
              dispatch(changeNameWindowStyles({
                  animation:'slide-in .3s forwards',
              }));
              dispatch(changeNameWindowState(true)); 
            
              
           }}></img>
           </div>
          {outsideClickListener(wrapperRef)}
           {/* ENTER NAME WINDOW -------- */}
           <div ref={wrapperRef} style={styles} className="enter-name-window">
                <h2>Your Nickname</h2>
                <input autoFocus={true} type="text" maxLength="15" onChange={
                    (e)=>{setnickName(e.target.value);
                    localStorage.setItem('userNickname', e.target.value);
                }}></input>
                <img src='./images/close.png' alt="" onClick={
                    ()=>{
                        dispatch(changeNameWindowStyles({
                         animation:'slide-out .3s forwards',
                      })) 
                        dispatch(changeNameWindowState(false));
                    }
                }></img>
           </div>
        
        </div>

       
    );
} 

export default Header;