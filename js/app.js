class Note {
    constructor(id, title, text, created, modified) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.created = created;
        this.modified = modified;
    }
}

// ==============
// Variables
// ==============
const createNoteBtn = document.querySelector("#create-note");
const cancelBtn = document.querySelector("#cancel-note");
const addNoteContainer = document.querySelector(".add-note-container");
const allNotesContainer = document.querySelector(".notes-container");
const noteCollections = document.querySelector(".notes-collections");
const filterNotes = document.querySelector("#filter-notes");
const sortNotes = document.querySelector("#sort");
const addNote = document.querySelector("#create");
const titleInput = document.querySelector("#title-input");
const textInput = document.querySelector("#body-input");


// =======================
// Event Listeners
// =======================

// DOMCONTENTLOADED
window.addEventListener("load", () => {
    const store = new Store();
    const notes = store.getNotes();
    // select option 1 edited
    sortNotes.options[0].selected = "selected";
    notes.sort((a, b) => {
        let editA = a.modified;
        let editB = b.modified;
        return b.modified - a.modified;
    });
    // populate Dom
    UI.populateDom(notes);
});

// =======================
// show add note on click
// =======================
createNoteBtn.addEventListener("click", () => {
    addNoteContainer.style.display = "block";
    allNotesContainer.style.display = "none";
    cancelBtn.style.display = "inline-block";
    createNoteBtn.style.display = "none";
    filterNotes.style.display = "none";
    sortNotes.style.display = "none";
});

// ==============================
// Cancel Add note Event Listener
// ==============================
cancelBtn.addEventListener("click", () => {
    // return page to default
    defaultPage();
});

// =======================
// Create Note Event Listener
// =======================
addNote.addEventListener("click", () => {
    // Get Note variables
    const id = getId();
    const title = titleInput.value;
    const text = textInput.value;
    const created = timeStamp();
    const modified = null;

    if (text === '') {
        console.log('Please Enter Text');
    } else {
    // Instantiate UI, Note and Storage
    const ui = new UI();
    const note = new Note(id, title, text, created, modified);
    const store = new Store();
    // Add note to dom
    ui.createNote(note);
    // save to storage
    store.saveNote(note);
    // Go back to the main page
    defaultPage();

    // clear fields
        UI.clearFields();
    }
});

// =========================
// View Note Event Listener
// =========================
allNotesContainer.addEventListener("click", e => {
    if (e.target.classList.contains("note-item")) {
        const store = new Store();
        let id = e.target.lastElementChild.textContent;
        const notes = store.getNotes();
        notes.forEach(note => {
            if (id == note.id) {
                location.assign(`./view.html#${id}`);
            }
        });
    }
});

// ========
// Filter
// ========
filterNotes.addEventListener("keyup", e => {
    let words = filterNotes.value.toLowerCase();
    //    filter notes
    UI.searchNotes(words);
});

// ===============
// Sort Notes
// ================
sortNotes.addEventListener("change", e => {
    const store = new Store();
    //   const ui = new UI();
    // Get notes from Local storage
    const notes = store.getNotes();

    //   Sort by alphabets
    if (e.target.value.toLowerCase() == "sort alphabetically") {
        notes.sort((a, b) => {
            let titleA = a.title.toLowerCase();
            let titleB = b.title.toLowerCase();
            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            }
        });
        // Populate Dom
        UI.populateDom(notes);

        //   Sort by Edited
    } else if (e.target.value.toLowerCase() == "sort by last edited") {
        notes.sort((a, b) => {
            let editA = a.modified;
            let editB = b.modified;
            return b.modified - a.modified;
        });
        // populate Dom
        UI.populateDom(notes);

        //   sort by Created
    } else if (e.target.value.toLowerCase() == "sort by date created") {
        notes.sort((a, b) => {
            let editA = a.created;
            let editB = b.created;
            return b.created - a.created;
        });
        //   Populate Dom
        UI.populateDom(notes);
    }
});

// =======================
// return page to default
// =======================
function defaultPage() {
    addNoteContainer.style.display = "none";
    allNotesContainer.style.display = "block";
    cancelBtn.style.display = "none";
    createNoteBtn.style.display = "inline-block";
    filterNotes.style.display = "inline-block";
    sortNotes.style.display = "inline-block";
}

