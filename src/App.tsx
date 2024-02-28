import { useState } from "react";
import "./App.css";
import dehya_logo from './assets/dehya_logo.png'
import ig_logo from './assets/ig_logo.png'
import gh_logo from './assets/gh_logo.png'

type Note = {
 id: number;
 title: string;
 content: string;
}

const App = () => {
 const [ notes, setNotes ] = useState<
  Note[]	
 >([
  {
   id: 1,
   title: "note title 1",
   content: "content 1",
  },
  {
   id: 2,
   title: "note title 2",
   content: "content 2",
  },
  {
   id: 3,
   title: "note title 3",
   content: "content 3",
  },
  {
   id: 4,
   title: "note title 4",
   content: "content 4",
  },
  {
   id: 5,
   title: "note title 5",
   content: "content 5",
  },
 ]);

 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");

 const [selectedNote, setSelectedNote] =
  useState<Note | null>(null);

 const handleNoteClick = (note:Note) => {
  setSelectedNote(note);
  setTitle(note.title);
  setContent(note.content);
 }

 const handleAddNote = (
  event: React.FormEvent
 ) => {
  event.preventDefault();

  const newNote: Note = {
   id: notes.length + 1,
   title: title,
   content: content
  }

  setNotes([newNote, ...notes]);
  setTitle("");
  setContent("");
 };

 const handleUpdateNote = (
  event: React.FormEvent
 ) => {
  event.preventDefault();

  if(!selectedNote){
   return;
  }
 
 const updatedNote: Note = {
  id: selectedNote.id,
  title: title,
  content: content,
 }

 const updatedNotesList = notes.map((note)=>
  note.id === selectedNote.id
  ? updatedNote
  : note
 )

 setNotes(updatedNotesList)
 setTitle("")
 setContent("")
 setSelectedNote(null);

 };

 const handleCancel = () => {
  setTitle("")
  setContent("")
  setSelectedNote(null);
  
 }

 const deleteNote = (
  event: React.MouseEvent,
  noteId: number
 ) => {
  event.stopPropagation();

  const updatedNotes = notes.filter(
   (note) => note.id !== noteId
  )

  setNotes(updatedNotes);
 };

 const d = new Date();
 const currentYear = d.getFullYear();

 return (
  <>
  <div className="app-container">
   <form
   className="note-form"
   onSubmit={(event) => 
   selectedNote
   ? handleUpdateNote(event)
   : handleAddNote(event)
   }
   >
    <input
     value={title}
     onChange={(event)=>
      setTitle(event.target.value)
     }
     placeholder="Title"
     required
    ></input>
    <textarea
     value={content}
     onChange={(event)=>
      setContent(event.target.value)
     }
     placeholder="Content"
     rows={10}
     required
    ></textarea>

    {selectedNote ? (
     <div className="edit-buttons">
      <button type="submit">Save</button>
      <button onClick={handleCancel}>Cancel</button>
     </div>
    ) : (
    <button type="submit">
     Add Note
    </button>
     
    )}

   </form>
   <div className="notes-grid">
   {notes.map((note)=> (
    <div 
    className="notes-item"
    onClick={() => handleNoteClick(note)}
    >
     <div className="notes-header">
      <button
       onClick={(event) => 
        deleteNote(event, note.id)
       }
      >x
      </button>
     </div>
     <h2>{note.title}</h2>
     <p>{note.content}</p>
    </div>
   ))}
   </div>
   <footer>
   <tr>
    <td className="copyright">
      &#169; {currentYear} Dehya Notes 
    </td>
    <td>
    <a href="https://dehyabi.netlify.app" target="_blank"> <img src={dehya_logo} className="footer-img dehya-logo" alt='dehya logo'/> </a>
    </td>
    <td>
    <a href="https://instagram.com/dehyabi" target="_blank"> <img src={ig_logo} className="footer-img ig-logo" alt='instagram logo'/> </a>
    </td>
    <td>
    <a href="https://github.com/dehyabi" target="_blank"> <img src={gh_logo} className="footer-img gh-logo" alt='github logo'/> </a>
    </td>

   </tr>

   </footer>

  </div>
  </>

 );
};

export default App;
