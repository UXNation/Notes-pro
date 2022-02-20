export default function getNotesFromStorage(){
   
    let notes = [];
    if(localStorage.getItem('noteItem')!==null){
      notes =  JSON.parse(localStorage.getItem('noteItem'))
      return notes;
    }
    else{
      return notes;
    }

}
