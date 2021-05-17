import {Note} from './Note';
import {Notes} from './Notes';
import {AppStorage} from './AppStorage';

export class App {
    LocalStorage:AppStorage;
    NoteContainer:Notes;
    showPinned:HTMLDivElement;
    showUnPinned:HTMLDivElement;
    btn:HTMLButtonElement;
    redspan: HTMLSpanElement;
    greenspan: HTMLSpanElement;
    bluespan: HTMLSpanElement;
    yellowspan: HTMLSpanElement;
    noteTytul: string;
    noteTresc:string;
    color:string;
    NoteText:HTMLTextAreaElement;
    isPined:boolean;
    PinedCheckbox:HTMLInputElement;
    constructor() {
        this.getShow();
        this.getButton();
        this.getSpans();
        this.getNoteText();
        this.getPined();
        this.addListener();
        this.NoteContainer = new Notes();
        this.LocalStorage = new AppStorage();
    }
    getButton()
    {
        this.btn = document.querySelector('#addNote');
    }
    getShow()
    {
        this.showPinned = document.querySelector("#pinedNotes");
        this.showUnPinned = document.querySelector("#notpinedNotes");
    }
    getNoteText()
    {
        this.NoteText = document.querySelector('#noteText');
    }
    getSpans = () =>{
        this.redspan = document.querySelector('.reddot');
        this.greenspan = document.querySelector('.greendot');
        this.bluespan = document.querySelector('.bluedot');
        this.yellowspan = document.querySelector('.yellowdot');
    }
    getPined = () =>{
        this.PinedCheckbox = document.querySelector('#pin');
    }
    addListener = () =>{
        this.redspan.addEventListener('click', () => this.setColor('red'));
        this.greenspan.addEventListener('click', () => this.setColor('green'));
        this.bluespan.addEventListener('click', () => this.setColor('blue'));
        this.yellowspan.addEventListener('click', () => this.setColor('yellow'));
        this.btn.addEventListener('click', () => this.addNote());
    }
    setColor(color:string)
    {
        this.NoteText.style.backgroundColor = color;
        this.color = color;
    }
    addNote()
    {
     this.isPined = (document.querySelector('#pin') as HTMLInputElement).checked;
     this.noteTytul = (document.querySelector('#noteTitle') as HTMLInputElement).value;
     this.noteTresc = this.NoteText.value;
     let note:Note = new Note(this.noteTytul,this.noteTresc,this.isPined,this.color,null);
     this.NoteContainer.Push(note);
     this.LocalStorage.saveData(this.NoteContainer);
     const noteView = document.createElement('div');
     const header = document.createElement('h5');
     const text = document.createElement('div');
     const date = document.createElement('div');
     if(this.isPined){
        this.showPinned.appendChild(noteView);
     }
     else
     {
         this.showUnPinned.appendChild(noteView);
     }
     noteView.appendChild(header);
     noteView.appendChild(text);
     noteView.appendChild(date);
     header.textContent = note.getTitle();
     text.textContent = note.getText();
     noteView.style.backgroundColor = note.getColor();
     date.textContent = note.getDate().toLocaleString();
    }
    }  
