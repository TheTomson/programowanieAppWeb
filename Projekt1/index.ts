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
    this.data2 = document.getElementById("#data2")
    this.data3 = document.getElementById("#data3")
    this.data4 = document.getElementById("#data4")

    this.sum = document.getElementById("#sum")
    this.avg = document.getElementById("#avg")
    this.min = document.getElementById("#min")
    this.max = document.getElementById("#max")

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
}
}