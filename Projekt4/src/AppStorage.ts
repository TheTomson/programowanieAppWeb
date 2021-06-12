import { storageType, config } from "./config";
import { AppLocalStorage } from "./AppLocalStorage";
import { AppFirestorageStorage } from "./AppFirestorageStorage";
import { Notes } from "./Notes";
import { Note } from "./Note";

export class AppStorage {
  constructor() {
    if (config.storageType === storageType.AppFirestorageStorage) {
      AppFirestorageStorage.initConnection();
    }
  }

  saveData(data: Notes) {
    AppLocalStorage.saveData(data.getNoteList());
  }

  saveNote(data: Note) {
    AppFirestorageStorage.saveNote(data);
  }

  deleteNote(id: string) {
    AppFirestorageStorage.deleteNote(id);
  }

  editNote(id: string, newNote: Note) {
    AppFirestorageStorage.editNote(id, newNote);
  }

  getData() {
    if (config.storageType === storageType.AppLocalStorage) {
      return AppLocalStorage.getData();
    } else {
      return AppFirestorageStorage.getData();
    }
  }
}
