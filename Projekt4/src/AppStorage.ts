export class AppStorage{

saveData(data: any) {

    localStorage.setItem('noteData', JSON.stringify(data));
}
getData() {
    const data = localStorage.getItem('noteData');
    if (data) {
        return JSON.parse(data);
    } else {
        return {};
    }
}
}