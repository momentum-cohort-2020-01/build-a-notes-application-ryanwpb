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

function renderNoteList(notes) {
  const notesHTML = createNotesHTML(notes);
  const notesSection = document.querySelector("#notes");
  notesSection.innerHTML = notesHTML;
}

getAllNotes().then(renderNoteList);
