[main 02d087d] Add validation, delete and countcat
 1 file changed, 2 insertions(+), 2 deletions(-)

document.querySelector("#clear-all").addEventListener("click", function () {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
