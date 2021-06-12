export enum storageType {
  AppLocalStorage,
  AppFirestorageStorage,
}

export const config = {
  storageType: storageType.AppFirestorageStorage,
};

export const firebaseConfig = {
  apiKey: "AIzaSyC3eXttY7h2KvhVjN8yCQ_CqSYr_l9NiMg",
  authDomain: "notekeeppa.firebaseapp.com",
  projectId: "notekeeppa",
  storageBucket: "notekeeppa.appspot.com",
  messagingSenderId: "115509379069",
  appId: "1:115509379069:web:59af03391d908b16fb2394",
};
