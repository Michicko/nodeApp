const url = location.hash;
const id = url.slice(1);
const store = new Store();
const notes = store.getNotes();
const editBtn = document.querySelector('#edit');
const backBtn = document.querySelector('#back');

// Display viewed note
notes.forEach((note) => {
    if (id == note.id) {
        // view note
        UI.viewNote(note);
        // change page title
        document.title = note.title
    }
});

// EVent Listeners
// Go Back Event Listener
backBtn.addEventListener('click', () => {
    window.location.assign('./index.html');
});

// Edit Btn Event Listener
editBtn.addEventListener('click', () => {
    window.location.assign(`./edit.html#${id}`);
});
