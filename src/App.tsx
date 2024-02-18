import { useState } from "react";
import "./App.css";

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

 const handleAddNote = (
  event: React.FormEvent
 ) => {
  event.preventDefault();
  console.log("title: ", title);
  console.log("content: ", content);

  const newNote: Note = {
   id: notes.length + 1,
   title: title,
   content: content
  }

  setNotes([newNote, ...notes]);
  setTitle("");
  setContent("");
 };

 return (
  <div className="app-container">
   <form
   className="note-form"
   onSubmit={(event) => handleAddNote(event)}
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
    <button type="submit">
     Add Note
    </button>
   </form>
   <div className="notes-grid">
   {notes.map((note)=> (
    <div className="notes-item">
     <div className="notes-header">
      <button>x</button>
     </div>
     <h2>{note.title}</h2>
     <p>{note.content}</p>
    </div>
   ))}
   </div> 
  </div>

 );
};

export default App;
