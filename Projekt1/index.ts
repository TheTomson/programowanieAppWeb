class Stats
{
data1:HTMLInputElement;
data2:HTMLInputElement;
data3:HTMLInputElement;
data4:HTMLInputElement;

sum:HTMLInputElement;
avg:HTMLInputElement;
min:HTMLInputElement;
max:HTMLInputElement;

constructor()
{
    this.StartApp();
}
StartApp()
{
    this.getElements();
    this.searchElements();
}
getElements()
{
    this.data1 = document.querySelector('#data1')
    this.data2 = document.querySelector("#data2")
    this.data3 = document.querySelector("#data3")
    this.data4 = document.querySelector("#data4")

    this.sum = document.querySelector("#sum")
    this.avg = document.querySelector("#avg")
    this.min = document.querySelector("#min")
    this.max = document.querySelector("#max")

}
searchElements()
{
this.data1.addEventListener("input", () => this.showData())
this.data2.addEventListener("input", () => this.showData())
this.data3.addEventListener("input", () => this.showData())
this.data4.addEventListener("input", () => this.showData())

this.sum.addEventListener("input", () => this.showData())
this.avg.addEventListener("input", () => this.showData())
this.min.addEventListener("input", () => this.showData())
this.max.addEventListener("input", () => this.showData())
}
showData()
{
    const data1 =+this.data1.value;
    const data2 =+this.data2.value;
    const data3 =+this.data3.value;
    const data4 =+this.data4.value;

    const sum = data1+data2+data3+data4;
    const avg = sum/4;
    const min = Math.min(data1,data2,data3,data4);
    const max = Math.max(data1,data2,data3,data4);

    this.showStats(sum,avg,min,max);
}
showStats(sum:number,avg:number,min:number,max:number)
{
    this.sum.value= sum.toString();
    this.avg.value= avg.toString();
    this.min.value= min.toString();
    this.max.value= max.toString();
}
}
const StartApp = new Stats();