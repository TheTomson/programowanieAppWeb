export class Note {
  Title: string;
  Text: string;
  IsPinned: boolean;
  Color: string;
  creationDate: Date;
  Tags: string[];
  ID: string;

  constructor(
    Title: string,
    Text: string,
    IsPinned: boolean,
    Color: string,
    creationDate: Date,
    Tags: string[],
    id: string = null
  ) {
    this.Title = Title;
    this.Text = Text;
    this.IsPinned = IsPinned;
    this.Color = Color;
    this.Tags = Tags;
    this.ID = id;
    if (creationDate == null) {
      this.creationDate = new Date();
    } else {
      this.creationDate = creationDate;
    }
  }

  getTitle() {
    return this.Title;
  }
  getText() {
    return this.Text;
  }
  getColor() {
    return this.Color;
  }
  getCreationDate() {
    return this.creationDate;
  }
  getPinned() {
    return this.IsPinned;
  }

  getId() {
    return this.ID;
  }

  setTitle(title: string) {
    this.Title = title;
  }
  setText(text: string) {
    this.Text = text;
  }
  setPinned(pinned: boolean) {
    this.IsPinned = pinned;
  }
}
