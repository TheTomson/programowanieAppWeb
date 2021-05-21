export class Note{
    Title:string;
    Text:string;
    IsPined:boolean;
    Color:string;
    creationDate:Date;
    Tags:string[];

    constructor(Title:string,Text:string,IsPined:boolean,Color:string,creationDate:Date,Tags:string[]){
        this.Title = Title;
        this.Text = Text;
        this.IsPined = IsPined;
        this.Color = Color;
        this.Tags = Tags;
        if(creationDate == null)
        {
            this.creationDate = new Date();
        }
        else
        {
            this.creationDate = creationDate;
        }
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
    getCreationDate()
    {
        return this.creationDate;
    }
}