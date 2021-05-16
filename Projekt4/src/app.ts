export class App {
    btn: HTMLButtonElement;
    noteTytul: string;
    noteTresc:string;
    cardsContainer: HTMLDivElement;
    constructor() {
        this.getInput();
        this.addListener();
        this.getNoteInfo();
     
    }
     getInput = () =>{
    this.btn = document.querySelector('button');
    this.cardsContainer = document.querySelector('#showNote');
    }
    addListener = () =>{
        this.btn.addEventListener('click', () => this.getNoteInfo());
        }
    async getNoteInfo() {
        this.noteTytul = document.querySelector('input').value;
        document.querySelector('input').value = '';
    }
    }  
