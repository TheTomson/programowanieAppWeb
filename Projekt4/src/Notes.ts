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
}