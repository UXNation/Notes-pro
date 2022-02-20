import React from 'react';
import Navbar from './Navbar';
import NotesSection from './NotesSection';

function Hero(){
 
    return(

       <section className="hero-container">
         <Navbar/>
         <NotesSection/>
         
       </section>
 
    );
}

export default Hero;