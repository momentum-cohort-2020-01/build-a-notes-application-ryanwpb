function getAllNotes() {
  return fetch("http://localhost:3000/notes/", {
    method: "GET"
  }).then(response => response.json());
}

function createNotesHTML(notes) {
  console.log(notes);
  let notesStr = '<ul id="notes-list">';
  for (const note of notes) {
    notesStr += createNoteHTML(note);
  }
  notesStr += "</ul>";
  return notesStr;
}

getAllNotes().then(createNotesHTML);

function createNoteHTML(note) {
  return `<li data-note-id="${note.id}">${note.title}<li data-note-id="${note.id}">${note.note} <button class="edit">Edit</button><button class="delete">Delete</button></li>`;
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
  });
}

function deleteNote() {
  let noteSection = document.querySelector("#notes");
  noteSection.addEventListener("click", function(e) {
    if (e.target.matches(".delete")) {
      let noteId = e.target.parentElement.dataset.noteId;
      e.target.parentElement.classList.add("delete-note");
      deleteThisNote(noteId);
    }
  });
}

deleteNote();

function editThisNote(noteId) {
  return fetch("http://localhost:3000/notes/" + noteId, {
    method: "PATCH"
  });
}

function editNote() {
  let noteSection = document.querySelector("#notes");
  noteSection.addEventListener("click", function(e) {
    if (e.target.matches(".edit")) {
      let noteId = e.target.parentElement.dataset.noteId;
      e.target.parentElement.classList.add("edit-note");
      editThisNote(noteId);
    }
  });
}

editNote();

let noteSubmit = document.querySelector("#new-note-form");
noteSubmit.addEventListener("submit", event => {
  event.preventDefault();
  const titleTextField = document.querySelector("#note-title");
  const noteTextField = document.querySelector("#note-text");
  const titleText = titleTextField.value;
  const noteText = noteTextField.value;
  titleText.value = "";
  noteTextField.value = "";
  postNewNote(titleText, noteText).then();
});

function postNewNote(titleText, noteText) {
  return fetch("http://localhost:3000/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleText,
      note: noteText,
      done: false,
      created: moment().format()
    })
  }).then(response => response.json());
}
