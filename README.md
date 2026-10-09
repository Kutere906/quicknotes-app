# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can add short notes, file them under Personal, Work or Study, search through them and delete the ones you no longer need. Notes are saved in your browser with localStorage, so they are still there after you refresh the page.

## Features

- Add notes (1 to 200 characters) with a category: Personal, Work or Study
- Clear error messages for empty or too-long notes
- Delete any note
- Live, case-insensitive search with a "No notes match your search." message
- Note count that reads correctly for zero, one and many notes
- A different coloured left border for each category
- Notes saved with localStorage (JSON.stringify and JSON.parse)
- Responsive layout: the form stacks vertically on screens 600px or narrower
- Clear all button with a confirmation

## How to run locally

1. Clone the repository: `git clone https://github.com/Kutere906/quicknotes-app.git`
2. Open the folder: `cd quicknotes-app`
3. Open `index.html` in your browser, or use the Live Server extension in VS Code.

No installation or build step is needed.

## What I learned

- How to structure a page with semantic HTML (header, main, sections, footer) and link a label to its input with `for` and `id`.
- How to lay out a form with Flexbox and change it on small screens with `@media (max-width: 600px)`.
- How to keep data in an array of objects and rebuild the page with a `render()` function using `createElement` and `textContent`, which is safer than `innerHTML`.
- How to save and load data with localStorage using `JSON.stringify` and `JSON.parse`.
- How to make one small commit for each finished task.
