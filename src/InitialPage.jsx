import React,{useState, useEffect} from 'react';
import Routerr from './Router';

export default function InitialPage(){
    const [isNameEmpty, setIsNameEmpty] = useState();
    
    useEffect(()=>{
      setIsNameEmpty(localStorage.getItem('userNickname'));
      console.log(isNameEmpty);  
    });

    return <Routerr> 
  
      </Routerr>
}