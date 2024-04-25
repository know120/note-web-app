import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import db from '../config/firebase.js';
import Dashboard from "./dashboard.js";
import NoteCard from "./noteCard.js";

function NoteApp(props) {
    const [notes, setNotes] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [noteDetail, setNoteDetail] = useState(null);
    const [total, setTotal] = useState(0);
    // for dialog element
    const dialog = document.querySelector("dialog");
    // for collection reference
    const colRef = collection(db, 'notes');
    // listening to firestore
    const subscribe = onSnapshot(colRef, (snap) => {
        setTotal(snap.docs.length);
    });
    // print listener
    // console.log(subscribe);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // load notes
    async function getNotes() {
        const docSnap = await getDocs(query(colRef));
        const docs = []
        docSnap.forEach((doc) => {
            docs.push({
                id: doc.id,
                note: doc.data().note
            });
        });
        setNotes(docs);
    }

    function noNote() {
        return (
            <div className="area no-notes">
                <h3>Add some note to see here...</h3>
            </div>
        );
    }

    // render notes
    function renderNotes() {
        return notes.map((note, index) =>
            <NoteCard key={note.id} note={note} openDialog={openDialog} updateNote={updateNote} deleteNote={deleteNote} />
        )
    }

    // render dialog
    function dialogComponent() {
        return (
            <dialog>
                <p>{noteDetail}</p>
                <button onClick={closeDialog} autoFocus>close</button>
            </dialog>
        );
    }

    // render input area
    function inputArea() {
        return (
            <div className="area">
                <h3 className="note-header">New</h3>
                <textarea name="note" id="note" rows="5"></textarea>
                <br />
                <button onClick={addNote}>{isEdit ? "Update Note" : "Add New Note"}</button>
            </div>
        );
    }

    // add && edit note
    function addNote() {
        let note = document.getElementById('note');

        if (isEdit) {
            // update note
            setDoc(doc(db, "notes", `${noteId}`), { note: note.value }, { merge: true })
                .then(data => {
                    setNotes([{ id: noteId, note: note.value }, ...notes.filter(note => note.id !== noteId)]);
                    note.value = '';
                    setIsEdit(!isEdit);
                })
                .catch(err => console.log(err));
        } else {
            // add note
            addDoc(colRef, { note: note.value })
                .then(data => {
                    setNotes([...notes, { id: data.id, note: note.value }]);
                    note.value = '';
                })
                .catch(err => console.log(err));
        }
    }

    // delete note 
    function deleteNote(note) {
        // confirm before deletion 
        if (window.confirm("Are You Sure !!!")) {
            deleteDoc(doc(db, "notes", `${note.id}`))
                .then(data => {
                    setNotes(notes.filter(item => item.id !== note.id))
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

    // open dialog
    function openDialog(note) {
        setNoteDetail(note.note);
        dialog.showModal();
    }

    // close dialog
    function closeDialog() {
        setNoteId(null)
        dialog.close();
    }

    // final render component 
    return (
        <div className='app-view'>
            <div className="input-area">
                { inputArea() }
                <Dashboard total={total}/>
            </div>
            <div className="note-area">
                {notes.length > 0 ? renderNotes() : noNote()}
            </div>
            <div>
                {dialogComponent()}
            </div>
        </div>
    );
}

export default NoteApp;