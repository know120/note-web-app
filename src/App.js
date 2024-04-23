import './App.css';
import Nav from './components/nav.js';
import Note from './components/note.js'

function App() {
  return (
    <div className="App">
      {/* <h1>NoteBook</h1> */}
      {/* <header className="App-header"> */}
        {/* <h1 className="note-header">Note</h1> */}
        <Nav />
        <Note />
      {/* </header> */}
    </div>
  );
}

export default App;
