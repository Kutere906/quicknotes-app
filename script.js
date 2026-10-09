const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes";

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function validate(text) {
  if (text === "") return "Please type a note first.";
  if (text.length > MAX_LENGTH) return "Notes must be 200 characters or fewer.";
  return "";
}

function addNote(text, category) {
  notes.unshift({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter(function (note) { return note.id !== id; });
  saveNotes();
  render();
}

function countMessage() {
  if (notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have 1 note.";
  return "You have " + notes.length + " notes.";
}

function render() {
  notesList.replaceChildren();

  const query = searchInput.value.trim().toLowerCase();
  const visible = notes.filter(function (note) {
    return note.text.toLowerCase().includes(query);
  });

  if (notes.length > 0 && visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  }

  visible.forEach(function (note) {
    const li = document.createElement("li");
    li.className = "note category-" + note.category;

    const body = document.createElement("div");

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("span");
    date.textContent = " · " + note.createdAt;

    meta.append(label, date);
    body.append(text, meta);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", function () { deleteNote(note.id); });

    li.append(body, del);
    notesList.appendChild(li);
  });

  noteCount.textContent = countMessage();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();
  const error = validate(text);
  errorMessage.textContent = error;
  if (error) return;
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

searchInput.addEventListener("input", render);

document.querySelector("#clear-all").addEventListener("click", function () {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
