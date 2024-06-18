document.addEventListener('DOMContentLoaded', () => {
    displayNotes();
});

function addNote() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() === '') {
        alert('Please write something in the note.');
        return;
    }

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteInput);
    localStorage.setItem('notes', JSON.stringify(notes));

    document.getElementById('noteInput').value = '';
    displayNotes();
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.innerHTML = `
            <span class="note-content">${note}</span>
            <div class="note-actions">
                <button onclick="shareNote(${index})">Share</button>
                <button class="delete" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        noteList.appendChild(noteItem);
    });
}

function shareNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];
    if (navigator.share) {
        navigator.share({
            title: 'Note',
            text: note
        }).then(() => {
            console.log('Note shared successfully');
        }).catch((error) => {
            console.log('Error sharing note', error);
        });
    } else {
        alert('Your browser does not support the share feature.');
    }
}
