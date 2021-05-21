import {Note} from './Note';
import {Notes} from './Notes';
import {AppStorage} from './AppStorage';

export class App {
    localStorage:AppStorage;
    noteContainer:Notes;
    showPinned:HTMLDivElement;
    showUnPinned:HTMLDivElement;
    addNoteButton:HTMLButtonElement;
    redSpan: HTMLSpanElement;
    greenSpan: HTMLSpanElement;
    blueSpan: HTMLSpanElement;
    yellowSpan: HTMLSpanElement;
    noteTitle: string;
    noteContent:string;
    noteColor:string;
    noteTextArea:HTMLTextAreaElement;
    isNotePined:boolean;
    pinedNoteCheckbox:HTMLInputElement;


    constructor() {
        this.getShow();
        this.getButton();
        this.getSpans();
        this.getNoteText();
        this.getPined();
        this.addListener();
        this.noteContainer = new Notes();
        this.localStorage = new AppStorage();
        let savedNotes = this.localStorage.getData();
        if (savedNotes != {})
        {
            for(let noteArray in savedNotes)
            {
                for(let noteEntry in savedNotes[noteArray])
                {
                    let savedNoteData = savedNotes[noteArray][noteEntry];
                    console.log(savedNoteData);
                    let restoredNote = new Note(savedNoteData['Title'],savedNoteData['Text'],savedNoteData['IsPinned'],savedNoteData['Color'],savedNotes['CreationDate'],savedNoteData['Tags']);
                    this.noteContainer.Push(restoredNote);
                    this.renderNote(restoredNote);
                }
            }
        }
    }


    getButton()
    {
        this.addNoteButton = document.querySelector('#addNote');
    }

    getShow()
    {
        this.showPinned = document.querySelector("#pinedNotes");
        this.showUnPinned = document.querySelector("#notpinedNotes");
    }

    getNoteText()
    {
        this.noteTextArea = document.querySelector('#noteText');
    }

    getSpans = () =>{
        this.redSpan = document.querySelector('.reddot');
        this.greenSpan = document.querySelector('.greendot');
        this.blueSpan = document.querySelector('.bluedot');
        this.yellowSpan = document.querySelector('.yellowdot');
    }

    getPined = () =>{
        this.pinedNoteCheckbox = document.querySelector('#pin');
    }

    addListener = () =>{
        this.redSpan.addEventListener('click', () => this.setColor('red'));
        this.greenSpan.addEventListener('click', () => this.setColor('green'));
        this.blueSpan.addEventListener('click', () => this.setColor('blue'));
        this.yellowSpan.addEventListener('click', () => this.setColor('yellow'));
        this.addNoteButton.addEventListener('click', () => this.addNote());
    }

    setColor(color:string)
    {
        this.noteTextArea.style.backgroundColor = color;
        this.noteColor = color;
    }

    renderNote(note:Note)
    {
        const noteView = document.createElement('div');
        const header = document.createElement('h5');
        const text = document.createElement('div');
        const date = document.createElement('div');
        const deleteNote = document.createElement('img');
        const editNote = document.createElement('img');

        if(this.isNotePined){
           this.showPinned.appendChild(noteView);
        }
        else
        {
            this.showUnPinned.appendChild(noteView);
        }

        noteView.appendChild(header);
        noteView.appendChild(text);
        noteView.appendChild(date);
        noteView.appendChild(deleteNote);
        noteView.appendChild(editNote);

        header.textContent = note.getTitle();
        text.textContent = note.getText();
        text.id = "text";
        noteView.style.backgroundColor = note.getColor();
        date.textContent = note.getCreationDate().toLocaleString();
        deleteNote.src = './assets/delete.svg';
        deleteNote.className = 'controls';
        editNote.src = './assets/pencil.svg';
        editNote.className = 'controls';
        deleteNote.addEventListener('click', () => this.deleteNote(noteView,note));
        editNote.addEventListener('click', () => this.editNote(noteView,note));
    }
    
    addNote()
    {
     this.isNotePined = (document.querySelector('#pin') as HTMLInputElement).checked;
     this.noteTitle = (document.querySelector('#noteTitle') as HTMLInputElement).value;
     this.noteContent = this.noteTextArea.value;
     let note:Note = new Note(this.noteTitle,this.noteContent,this.isNotePined,this.noteColor,null,null);
     this.noteContainer.Push(note);
     this.localStorage.saveData(this.noteContainer);
     this.renderNote(note);
    }

    deleteNote(element:HTMLDivElement,note:Note)
    {
    element.remove();
    this.noteContainer.deleteNote(note);
    this.localStorage.saveData(this.noteContainer);
    }
    
    editNote(element:HTMLDivElement,note:Note)
    {   
        const applyChanges = document.createElement('img');
        applyChanges.src = './assets/checked.svg';
        applyChanges.className = 'controls';
        element.appendChild(applyChanges);
        applyChanges.addEventListener('click', () => this.applyChanges(element,note));

        const discardChanges = document.createElement('img');
        discardChanges.src = './assets/remove.svg';
        discardChanges.className = 'controls';
        element.appendChild(discardChanges);
        discardChanges.addEventListener('click', () => this.discardChanges(element));

        let i = document.createElement('input');
        let oldHeader = document.querySelector('h5');
        i.defaultValue = oldHeader.textContent;
        oldHeader.replaceWith(i);

        let i2 = document.createElement('input');
        let oldContent = document.querySelector('#text');
        i2.defaultValue = oldContent.textContent;
        oldContent.replaceWith(i2);
    }
    applyChanges(element:HTMLDivElement,note:Note)
    {

    }
    discardChanges(element:HTMLDivElement)
    {
        
    }
}  
