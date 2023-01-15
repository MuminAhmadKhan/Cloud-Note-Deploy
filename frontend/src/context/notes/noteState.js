import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
  
   const inital = []
   const host =""     
    const [notes, setNotes] = useState(inital);
    //Fetch Notes
    const fetchNotes = async ()=>{
      //API Call
      const response = await fetch(`${host}/api/notes/fetch-notes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
       
        
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        
        
      });
      const resp = await response.json()
      setNotes(resp); 
    }
    
    


    //Adding a note
    
    const addNote =async  (title,description,category)=>{
      const response = await fetch(`${host}/api/notes/add-note`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       
        
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,category})
        
      });
      const added_note = await response.json()
      setNotes(notes.concat(added_note))
    }
    //Delete a note
    const deleteNote = async (id)=>{
    const newNote = notes.filter((note)=> {return note._id !== id})
    setNotes(newNote)

    //API CALL
    const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
     
      
      headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      
      
    });
  }





  
    const update = async (id,title,description,category)=>{
     
        const response = await fetch(`${host}/api/notes/update-note/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
         
          
          headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,category})
          
        });
                      // eslint-disable-next-line
        const updated_note = await response.json()
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index]
          if (element._id===id){
            newNotes[index].title=title
            newNotes[index].description=description
            newNotes[index].category=category
            break;
          }
          
          
        }
      setNotes(newNotes)
      }
     
    
    
    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,update,fetchNotes}}>
            { props.children }
        </noteContext.Provider>
    )
    }
export default NoteState;