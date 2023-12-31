import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Addnote from "./Addnote";
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getnote ,editnote} = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")){
      getnote();
    }
    else{
       navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
  
    const updatenote = (currentnote) => {
      ref.current.click();
      setNote({id: currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
    }

  const handleclick = (e)=>{
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showalert("Book upadated successsfully","success")

}

const onchange = (e)=>{
setNote({...note ,[e.target.name]: e.target.value} )
} 
  return (
    <div>
      <div className="row my-3">
        <Addnote showalert={props.showalert}/>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className='my-3'>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}onChange={onchange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<4 || note.edescription.length<4}type="button" className="btn btn-primary" onClick={handleclick}>Upadte Note</button>
              </div>
            </div>
          </div>
        </div>

        <h2>Books Availability</h2>
        <div className="container">
          {notes.length===0 && "No Books to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updatenote={updatenote} />;
        })}
      </div>
    </div>
  )
}

export default Notes
