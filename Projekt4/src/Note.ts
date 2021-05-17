export class Note{
    Title:string;
    Text:string;
    IsPined:boolean;
    Color:string;
    ModificationDate:Date;
    Tags:string[];

    constructor(Title:string,Text:string,IsPined:boolean,Color:string,Tags:string[]){
        this.Title = Title;
        this.Text = Text;
        this.IsPined = IsPined;
        this.Color = Color;
        this.Tags = Tags;
        this.ModificationDate = new Date();
    }
    getTitle()
    {
        return this.Title;
    }
    getText()
    {
        return this.Text;
    }
    getColor()
    {
        return this.Color;
    }
    getDate()
    {
        return this.ModificationDate;
    }
}