function getAllNotes() {
  fetch("http://localhost:3000/notes/", {
    method: "GET"
  })
    .then(response => response.json())
    .then(notes => console.log("here ", notes));
  return notes;
}

getAllNotes();
