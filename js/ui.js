class UI {
    // Create a note
    createNote(note) {
        const noteCollection = document.querySelector(".notes-collections");
        let html = `
        <li class="note-item">
            <h4 class="title">${note.title}</h4><br>
            <span class="info"><i>${UI.getRealTime(note)}</i></span>
            <span class="id">${note.id}</span>
          </li>
        `;
        noteCollection.innerHTML += html;
    }

    // Decide if created or Edited
    static decider(note) {
        if (note.created && !note.modified) {
            return {
                info: "Created",
                rTime: note.created
            };
        } else {
            return {
                info: "Edited",
                rTime: note.modified
            };
        }
    }

    // set created or Edited
    static getRealTime(note) {
        const time = UI.decider(note);
        const now = new Date();
        const diff = now - time.rTime;
        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (day) {
            if (parseInt(day) === 1) {
                return `${time.info} ${day} day ago`;
            } else {
                return `${time.info} ${day} days ago`;
            }
        } else if (hours) {
            if (parseInt(hours) === 1) {
                return `${time.info} ${hours} hour ago`;
            } else {
                return `${time.info} ${hours} hours ago`;
            }
        } else if (mins) {
            if (parseInt(mins) === 1) {
                return `${time.info} a minute ago`;
            } else {
                return `${time.info} ${mins} minutes ago`;
            }
        } else if (secs) {
            return `${time.info} few seconds ago`;
        } else {
            return `${time.info} few seconds ago`;
        }
    }

    // display viewed note
    static viewNote(note) {
        const card = document.querySelector(".card-body");
        let html = `
        <div class="content">
            <h2 class="title">${note.title}</h2>
            <p class="text">${note.text}</p>
            <p class="info"><i>${UI.getRealTime(note)}</i></p>
        </div>
        `;
        card.innerHTML = html;
    }

    // Edit note
    static editNote(note) {
        const container = document.querySelector(".form-group");
        let html = `
        <div class="content">
        <input type="text" id="title-input" class="title-input" value="${note.title}">
            <textarea id="body-input" cols="30" rows="10">${note.text}</textarea>
        </div>
        `;
        container.innerHTML = html;
    }

    // Delete Note
    static deleteNote(note) {
        note.remove();
    }

    // Filter Notes
    static searchNotes(words) {
        const notesCollection = document.querySelector(".notes-collections");
        const notes = notesCollection.querySelectorAll("li.note-item");
        notes.forEach(note => {
            if (note.firstElementChild.innerHTML.toLowerCase().indexOf(words) > -1) {
                note.style.display = "";
            } else {
                note.style.display = "none";
            }
        });
    }

    // Populate DOM
    static populateDom(notes) {
        const ui = new UI();
        const domNotes = document.querySelectorAll(".note-item");
        if (domNotes) {
            domNotes.forEach(note => {
                note.remove();
            });
        }
        //  Append notes to DOM
        notes.forEach(note => {
            ui.createNote(note);
        });
    }

    // clear fields
    static clearFields() {
        document.querySelector("#title-input").value = "";
        document.querySelector("#body-input").value = "";
    }
}
