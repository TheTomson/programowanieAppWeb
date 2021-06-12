import { AppStorage } from "./AppStorage";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { Note } from "./Note";
import { Notes } from "./Notes";

export class AppFirestorageStorage {
  static db: firebase.firestore.Firestore;

  static initConnection() {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    AppFirestorageStorage.db = firebaseApp.firestore();
  }

  static saveNote(note: Note) {
    this.db
      .collection("notes")
      .add({
        Title: note.getTitle(),
        Text: note.getText(),
        IsPinned: note.getPinned(),
        Color: note.getColor(),
        Tags: null,
        creationDate: note.getCreationDate(),
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  static async getData(): Promise<Array<Note>> {
    //{"NoteList":[{"Title":"test","Text":"sasa","IsPinned":false,"Color":"yellow","Tags":null,"creationDate":"2021-06-08T22:43:55.298Z"},
    //{"Title":"test","Text":"sasa","IsPinned":false,"Color":"blue","Tags":null,"creationDate":"2021-06-08T22:43:56.352Z"},
    //{"Title":"test","Text":"sasa","IsPinned":false,"Color":"green","Tags":null,"creationDate":"2021-06-08T22:43:57.521Z"}]}
    let restoredNoteData = new Array<Note>();

    const res = await this.db
      .collection("notes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let id = doc.id;
          console.log(id);
          let data = doc.data();
          let tmpNote = new Note(
            data["Title"],
            data["Text"],
            data["IsPinned"],
            data["Color"],
            data["creationDate"].toDate(),
            null,
            id
          );
          restoredNoteData.push(tmpNote);
        });
      });

    console.log(restoredNoteData);
    return restoredNoteData;
  }
  static async deleteNote(id: string) {
    await AppFirestorageStorage.db.collection("notes").doc(id).delete();
  }

  static async editNote(id: string, newNote: Note) {
    await AppFirestorageStorage.db.collection("notes").doc(id).set({
      Title: newNote.getTitle(),
      Text: newNote.getText(),
      IsPinned: newNote.getPinned(),
      Color: newNote.getColor(),
      Tags: null,
      creationDate: newNote.getCreationDate(),
    });
  }
}
