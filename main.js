function getAllNotes() {
  return fetch("http://localhost:3000/notes/", {
    method: "GET"
  })
    .then(response => response.json())
    .then(notes => {
      // Prints result from `response.json()` in getRequest
      //and throw the data into our empty object
      return notes;
    });
}
getAllNotes().then(createNotesHTML);

function createNotesHTML(notes) {
  let notessStr = '<ul id="notes-list">';
  for (let note of notes) {
    notessStr += note.body;
  }
  notessStr += "</ul>";
  return notessStr;
}

function createNoteHTML(note) {
  console.log(note);
  return `<li data-todo-id="${note.id}">${note.note}</li>`;
}

function renderNoteList(note) {
  const noteHTML = createNoteHTML(note);
  const noteList = document.querySelector("#note-list");
  noteList.insertAdjacentHTML("beforeend", noteHTML);
}

getAllNotes().then(renderNoteList);

let noteSubmit = document.querySelector("#new-note-form");
noteSubmit.addEventListener("submit", event => {
  event.preventDefault();
  console.log(event);
  const noteTextField = document.querySelector("#note-text");
  const noteText = noteTextField.value;
  noteTextField.value = "";
  postNewNote(noteText).then(renderNewNote);
});

function postNewNote(noteText) {
  return fetch("http://localhost:3000/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      note: id,
      note: noteText,
      done: false,
      created: moment().format()
    })
  }).then(response => response.json());
}
