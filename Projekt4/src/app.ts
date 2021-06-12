import { Note } from "./Note";
import { Notes } from "./Notes";
import { AppStorage } from "./AppStorage";
import { storageType, config } from "./config";

export class App {
  appStorage: AppStorage;
  noteContainer: Notes;
  showPinned: HTMLDivElement;
  showUnPinned: HTMLDivElement;
  addNoteButton: HTMLButtonElement;
  redSpan: HTMLSpanElement;
  greenSpan: HTMLSpanElement;
  blueSpan: HTMLSpanElement;
  yellowSpan: HTMLSpanElement;
  noteTitle: string;
  noteContent: string;
  noteColor: string;
  noteTextArea: HTMLTextAreaElement;
  isNotePined: boolean;
  pinedNoteCheckbox: HTMLInputElement;

  constructor() {
    this.getShow();
    this.getButton();
    this.getSpans();
    this.getNoteText();
    this.getPined();
    this.addListener();
    this.noteContainer = new Notes();
    this.appStorage = new AppStorage();
    let savedNotes = this.appStorage.getData();
    console.log("Saved data: ", savedNotes);
    if (config.storageType === storageType.AppLocalStorage) {
      if (savedNotes != {}) {
        for (let noteArray in savedNotes) {
          for (let noteEntry in savedNotes[noteArray]) {
            let savedNoteData = savedNotes[noteArray][noteEntry];
            let restoredNote = new Note(
              savedNoteData["Title"],
              savedNoteData["Text"],
              savedNoteData["IsPinned"],
              savedNoteData["Color"],
              savedNotes["CreationDate"],
              savedNoteData["Tags"]
            );
            this.noteContainer.Push(restoredNote);
            this.renderNote(restoredNote);
          }
        }
      }
    } else {
      // HandlePromise
      savedNotes.then((notes: Array<Note>) => {
        notes.forEach((restoredNote) => {
          this.noteContainer.Push(restoredNote);

          this.renderNote(restoredNote);
        });
      });
    }
  }

  getButton() {
    this.addNoteButton = document.querySelector("#addNote");
  }

  getShow() {
    this.showPinned = document.querySelector("#pinedNotes");
    this.showUnPinned = document.querySelector("#notpinedNotes");
  }

  getNoteText() {
    this.noteTextArea = document.querySelector("#noteText");
  }

  getSpans = () => {
    this.redSpan = document.querySelector(".reddot");
    this.greenSpan = document.querySelector(".greendot");
    this.blueSpan = document.querySelector(".bluedot");
    this.yellowSpan = document.querySelector(".yellowdot");
  };

  getPined = () => {
    this.pinedNoteCheckbox = document.querySelector("#pin");
  };

  addListener = () => {
    this.redSpan.addEventListener("click", () => this.setColor("red"));
    this.greenSpan.addEventListener("click", () => this.setColor("green"));
    this.blueSpan.addEventListener("click", () => this.setColor("blue"));
    this.yellowSpan.addEventListener("click", () => this.setColor("yellow"));
    this.addNoteButton.addEventListener("click", () => this.addNote());
  };

  setColor(color: string) {
    this.noteTextArea.style.backgroundColor = color;
    this.noteColor = color;
  }

  renderNote(note: Note) {
    const noteView = document.createElement("div");
    const header = document.createElement("h5");
    const text = document.createElement("div");
    const date = document.createElement("div");
    const deleteNote = document.createElement("img");
    const editNote = document.createElement("img");

    const pinnedInput = document.createElement("input");
    pinnedInput.type = "checkbox";
    pinnedInput.id = "pinnedInp";
    pinnedInput.hidden = true;

    if (note.getPinned()) {
      this.showPinned.appendChild(noteView);
    } else {
      this.showUnPinned.appendChild(noteView);
    }

    noteView.appendChild(header);
    noteView.appendChild(text);
    noteView.appendChild(date);
    noteView.appendChild(deleteNote);
    noteView.appendChild(editNote);
    noteView.appendChild(pinnedInput);

    noteView.id = "noteDiv";
    header.textContent = note.getTitle();
    text.textContent = note.getText();
    text.id = "text";
    noteView.style.backgroundColor = note.getColor();
    date.textContent = note.getCreationDate().toLocaleString();
    deleteNote.src = "./assets/delete.svg";
    deleteNote.className = "controls";
    editNote.src = "./assets/pencil.svg";
    editNote.className = "controls";
    deleteNote.addEventListener("click", () => this.deleteNote(noteView, note));
    editNote.addEventListener("click", () => this.editNote(noteView, note));

    const applyChanges = document.createElement("img");
    applyChanges.src = "./assets/checked.svg";
    applyChanges.className = "controls";
    applyChanges.id = "apply";
    applyChanges.hidden = true;
    noteView.appendChild(applyChanges);
    applyChanges.addEventListener("click", () =>
      this.applyChanges(noteView, note)
    );

    const discardChanges = document.createElement("img");
    discardChanges.src = "./assets/remove.svg";
    discardChanges.className = "controls";
    discardChanges.id = "discard";
    discardChanges.hidden = true;
    noteView.appendChild(discardChanges);
    discardChanges.addEventListener("click", () =>
      this.discardChanges(noteView, note)
    );
  }

  addNote() {
    this.isNotePined = (
      document.querySelector("#pin") as HTMLInputElement
    ).checked;
    this.noteTitle = (
      document.querySelector("#noteTitle") as HTMLInputElement
    ).value;
    this.noteContent = this.noteTextArea.value;
    let note: Note = new Note(
      this.noteTitle,
      this.noteContent,
      this.isNotePined,
      this.noteColor,
      null,
      null
    );
    this.noteContainer.Push(note);

    if (config.storageType === storageType.AppLocalStorage) {
      this.appStorage.saveData(this.noteContainer);
    } else {
      this.appStorage.saveNote(note);
    }

    this.renderNote(note);
  }

  deleteNote(element: HTMLDivElement, note: Note) {
    element.remove();
    this.noteContainer.deleteNote(note);

    if (config.storageType === storageType.AppLocalStorage) {
      this.appStorage.saveData(this.noteContainer);
    } else {
      this.appStorage.deleteNote(note.getId());
    }
  }

  editNote(element: HTMLDivElement, note: Note) {
    let applyButton = element.querySelector("#apply") as HTMLImageElement;
    applyButton.hidden = false;

    let discardButton = element.querySelector("#discard") as HTMLImageElement;
    discardButton.hidden = false;

    let titleInput = document.createElement("input");
    titleInput.id = "t1";
    let oldHeader = element.querySelector("h5");
    titleInput.defaultValue = oldHeader.textContent;
    oldHeader.replaceWith(titleInput);

    let textInput = document.createElement("input");
    textInput.id = "t2";
    let oldContent = element.querySelector("#text");
    textInput.defaultValue = oldContent.textContent;
    oldContent.replaceWith(textInput);

    let pinnedInput = element.querySelector("#pinnedInp") as HTMLInputElement;
    pinnedInput.hidden = false;

    if (note.getPinned()) {
      pinnedInput.checked = true;
    }
  }
  applyChanges(element: HTMLDivElement, note: Note) {
    note.setTitle(
      (element.querySelector("#titleId") as HTMLInputElement).value
    );
    note.setText((element.querySelector("#textId") as HTMLInputElement).value);
    note.setPinned(
      (element.querySelector("#pinnedInp") as HTMLInputElement).checked
    );

    let titleH5 = document.createElement("h5");
    let oldElement = document.querySelector("#titleId") as HTMLInputElement;
    titleH5.textContent = oldElement.value;
    oldElement.replaceWith(titleH5);

    let textDiv = document.createElement("div");
    textDiv.id = "text";
    oldElement = document.querySelector("#textId") as HTMLInputElement;
    textDiv.textContent = oldElement.value;
    oldElement.replaceWith(textDiv);

    let applyButton = element.querySelector("#apply") as HTMLImageElement;
    applyButton.hidden = true;

    let discardButton = element.querySelector("#discard") as HTMLImageElement;
    discardButton.hidden = true;

    let pinnedInput = element.querySelector("#pinnedInp") as HTMLInputElement;
    pinnedInput.hidden = true;

    this.renderNote(note);
    this.deleteNote(element, note);
    this.noteContainer.Push(note);

    if (config.storageType === storageType.AppLocalStorage) {
      this.appStorage.saveData(this.noteContainer);
    } else {
      this.appStorage.editNote(note.getId(), note);
    }
  }

  discardChanges(element: HTMLDivElement, note: Note) {
    let titleH5 = document.createElement("h5");
    let oldElement = document.querySelector("#titleId") as HTMLInputElement;
    titleH5.textContent = note.getTitle();
    oldElement.replaceWith(titleH5);

    let textDiv = document.createElement("div");
    textDiv.id = "text";
    textDiv.textContent = note.getText();
    oldElement = document.querySelector("#textId") as HTMLInputElement;
    oldElement.replaceWith(textDiv);

    let applyButton = element.querySelector("#apply") as HTMLImageElement;
    applyButton.hidden = true;

    let discardButton = element.querySelector("#discard") as HTMLImageElement;
    discardButton.hidden = true;

    let pinnedInput = element.querySelector("#pinnedInp") as HTMLInputElement;
    pinnedInput.hidden = true;
  }
}
