const backBtn = document.querySelector("#back");
const deleteBtn = document.querySelector("#delete");
const updateBtn = document.querySelector("#update");
const url = window.location.hash;
const id = url.slice(1);
const store = new Store();

// ===================
// Event Listeners
// ===================
// Back to View
backBtn.addEventListener("click", () => {
    window.location.assign(`./view.html#${id}`);
});

// Update Note Event Listener
updateBtn.addEventListener("click", () => {
    const notes = store.getNotes();
    const title = document.querySelector("#title-input").value;
    const text = document.querySelector("#body-input").value;
    notes.forEach(note => {
        if (id == note.id) {
            // Update Note
            note.title = title;
            note.text = text;
            note.modified = timeStamp();
            console.log(note);
        }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.assign(`./view.html#${id}`);
});

// Delete Note Event Listener
deleteBtn.addEventListener("click", () => {
    const notes = store.getNotes();
    notes.forEach((note, i) => {
        if (id == note.id) {
            if (confirm("Are you sure?")) {
                //    delete note
                notes.splice(i, 1);
            }
        }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    // Go back to all notes
    window.location.assign("./index.html");
});

// Edit Note
function editPickedNote() {
    const notes = store.getNotes();
    notes.forEach(note => {
        if (id == note.id) {
            // Edit Note
            UI.editNote(note);
        }
    });
}

editPickedNote();
