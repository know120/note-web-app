import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import db from '../config/firebase.js';

function Note(props) {
    const [notes, setNotes] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [noteDetail, setNoteDetail] = useState(null);
    // for dialog element
    const dialog = document.querySelector("dialog");
    // for collection reference
    const colRef = collection(db, 'notes');

    useEffect(() => {
        loadData()
    }, [])

    // load notes
    async function loadData() {
        const docSnap = await getDocs(query(colRef));
        const docs = []
        docSnap.forEach((doc) => {
            docs.push({
                id: doc.id,
                note: doc.data().note
            });
        });
        // return docs;
        setNotes(docs);
    }

    // add && edit note
    function addNote() {
        let note = document.getElementById('note');

        if (isEdit) {
            // update note
            console.log(isEdit)
            setDoc(doc(db, "notes", `${noteId}`), { note: note.value }, { merge: true })
                .then(data => {
                    console.log(data);
                    setNotes([{ id: noteId, note: note.value }, ...notes.filter(note => note.id !== noteId)]);
                    note.value = '';
                    setIsEdit(!isEdit);
                })
                .catch(err => console.log(err));
        } else {
            // add note
            addDoc(colRef, { note: note.value })
                .then(data => {
                    console.log(data.id);
                    setNotes([...notes, { id: data.id, note: note.value }]);
                    note.value = '';
                    // setIsEdit(!isEdit);
                })
                .catch(err => console.log(err));
        }
    }

    // delete note 
    function deleteNote(id) {
        // confirm before deletion 
        if (window.confirm("Are You Sure !!!")) {
            deleteDoc(doc(db, "notes", `${id}`))
                .then(data => {
                    console.log(data);
                    setNotes(notes.filter(note => note.id !== id))
                })
                .catch(err => console.log(`some error occured: ${err.message}`));
        }
    }

    // update note
    function updateNote(doc) {
        let note = document.getElementById('note');
        note.value = doc.note;
        setIsEdit(!isEdit);
        setNoteId(doc.id)
    }

    function prepareNote(note) {
        return note.length > 50 ? note.substring(0, 50) + "..." : note;
    }

    function openDialog(note) {
        setNoteDetail(note.note);
        dialog.showModal();
    }

    function closeDialog() {
        setNoteId(null)
        dialog.close();
    }

    // final render component 
    return (
        <div className='app-view'>
            <div className="input-area">
                <div className="area">
                    <h3 className="note-header">New</h3>
                    <textarea name="note" id="note" rows="5"></textarea>
                    <br />
                    <button onClick={addNote}>{isEdit ? "Update Note" : "Add New Note"}</button>
                </div>
                <div className="area">
                    <h3>Dashboard</h3>
                    <ul>
                        <li>Added: <span>{0}</span></li>
                        <li>Edited: <span>{0}</span></li>
                        <li>Deleted: <span>{0}</span></li>
                    </ul>
                </div>
            </div>
            <div className={"note-area"}>
                {
                    notes.length > 0 ? notes.map((note, index) =>
                        <div className="area" key={note.id}>
                            <p className="note">{prepareNote(note.note)}</p>
                            <div className="action-buttons">
                                <button onClick={() => openDialog(note)}>Details</button>
                                <button onClick={() => updateNote(note)}>Edit</button>
                                <button onClick={() => deleteNote(note.id)}>Delete</button>
                            </div>
                        </div>
                    )
                        :
                        <div className="area no-notes">
                            <h3>Add some note to see here...</h3>
                        </div>
                }
            </div>
            {/* dialog for details view  */}
            <div>
                <dialog>
                    <p>{noteDetail}</p>
                    <button onClick={closeDialog} autoFocus>close</button>
                </dialog>
            </div>
        </div>
    );
}

export default Note;