class Store {

    // Get Note from Storage
    getNotes() {
        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }
        return notes;
    }

    // Save Note to storage
    saveNote(note) {
        const notes = this.getNotes();
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
