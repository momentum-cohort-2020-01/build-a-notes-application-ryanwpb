function getAllNotes() {
  return fetch("http://localhost:3000/notes/", {
    method: "GET"
  }).then(response => response.json());
}

function createNotesHTML(notes) {
  let notesStr = '<ul id="notes-list">';
  for (const note of notes) {
    notesStr += createNoteHTML(note);
  }
  notesStr += "</ul>";
  return notesStr;
}

getAllNotes().then(createNotesHTML);

function createNoteHTML(note) {
  return `<li data-note-id="${note.id}">${note.note} <button class="delete">Delete</button></li>`;
}

function renderNoteList(notes) {
  const noteHTML = createNotesHTML(notes);
  const noteList = document.querySelector("#notes");
  noteList.insertAdjacentHTML("beforeend", noteHTML);
}

getAllNotes().then(renderNoteList);

function deleteThisNote(noteId) {
  return fetch("http://localhost:3000/notes/" + noteId, {
    method: "DELETE"
  }).then(response => response.json());
}

function deleteNote() {
  let noteSection = document.querySelector("#notes");
  noteSection.addEventListener("click", function(e) {
    if (e.target.matches(".delete")) {
      let noteId = e.target.parentElement.dataset.noteId;
      console.log(noteId);
      e.target.parentElement.classList.add("delete-note");
      deleteThisNote(noteId);
    }
  });
}

deleteNote();

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
      note: noteText,
      done: false,
      created: moment().format()
    })
  }).then(response => response.json());
}
