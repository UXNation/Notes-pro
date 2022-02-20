import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage(){
    const [name, setName] = useState();
    const [style,setStyle] = useState({display:'none'})
    const [nameStyle,setNameStyle] = useState();

    return <div className='login-page'>
        <div className='login-page-section'>
         <div style={nameStyle} className='name-section'>
         <h1>Notes Pro</h1>
         <h2></h2>
         <input placeholder='Your name bitch' spellCheck={false} maxLength={15} onChange={
         (e)=>{
             setName(e.target.value);
             if(e.target.value===''){
                setNameStyle({transform:'translateY(10px)'})
                setStyle({display:'none'})
             }
             else{                 
                 setNameStyle({transform:'translateY(-30px)'})
                 setStyle({display:'inline-block'})
             }
         }    
         }></input>
         </div>
         <Link to={'/notes'}>
         <button style={style} onClick={()=>{
          localStorage.setItem('userNickname',name);
         }}
         >Get started with notes</button>
         </Link>
        </div>
      
      <h3>Made with love by UX Nation</h3>
    </div>
}