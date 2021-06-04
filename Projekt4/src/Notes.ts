import {Note} from './Note';

export class Notes{
    NoteList: Array<Note>;
    constructor(){
        
         this.NoteList = new Array<Note>();
    }
    Push(Note:Note)
    {
        this.NoteList.push(Note);

    }
    setNoteList(list:Array<Note>)
    {
    this.NoteList = list;
    }
    getNoteList()
    {
    return this.NoteList;
    }
    deleteNote(note:Note)
    {
        let i = this.NoteList.indexOf(note);
        this.NoteList[i] = null;
        this.NoteList.sort();
        this.NoteList.pop();
      }
}