import React from 'react';

function NoteCard({note,openDialog, updateNote, deleteNote}) {

    function prepareNote(note) {
        return note.length > 50 ? note.substring(0, 50) + "..." : note;
    }

    return (
        <div className="area">
            <p className="note">{prepareNote(note.note)}</p>
                            <div className="action-buttons">
                                <button onClick={() => openDialog(note)}>Details</button>
                                <button onClick={() => updateNote(note)}>Edit</button>
                                <button onClick={() => deleteNote(note)}>Delete</button>
                            </div>    
        </div>
    );
}

export default NoteCard;