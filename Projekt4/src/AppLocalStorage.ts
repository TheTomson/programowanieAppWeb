export class AppLocalStorage {
  static getData() {
    const data = localStorage.getItem("noteData");
    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  }

  static saveData(data: any) {
    localStorage.setItem("noteData", JSON.stringify(data));
  }
}
