import React from 'react';
import AddNotePopup from './components/AddNotePopup';
import DisplayNote from './components/DisplayNote';
import DeleteNote from './components/DeleteNote';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
 
  return (
    <div>
      <DeleteNote/>
      <AddNotePopup/>
      <DisplayNote/>
    
      <Header/>
      
      <Hero></Hero>
     
    </div>
  );
}

export default App;
