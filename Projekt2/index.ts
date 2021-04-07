let clapSoud: HTMLAudioElement;
let boomSoud: HTMLAudioElement;
let rideSoud: HTMLAudioElement;
let kickSoud: HTMLAudioElement;
let snareSoud: HTMLAudioElement;
let tinkSoud: HTMLAudioElement;

const chanell1: any[] = [];
const chanell2: any[] = [];
const chanell3: any[] = [];
const chanell4: any[] = [];
appStart();
function appStart(): void
{
window.addEventListener('keypress', onKeyDown);
const btnPlayChanell1 = document.querySelector('#playChanell1');
const btnPlayChanell2 = document.querySelector('#playChanell2');
const btnPlayChanell3 = document.querySelector('#playChanell3');
const btnPlayChanell4 = document.querySelector('#playChanell4');
btnPlayChanell1.addEventListener('click', onPlayChanell1);
btnPlayChanell2.addEventListener('click', onPlayChanell1);
btnPlayChanell3.addEventListener('click', onPlayChanell1);
btnPlayChanell4.addEventListener('click', onPlayChanell1);
getAudio();
}
function onPlayChanell1(): void{
    chanell1.forEach(sound => {
        setTimeout(() => {
           playSound(sound.key) 
        }, sound.time);
    });
}
function onPlayChanell2(): void{
    chanell2.forEach(sound => {
        setTimeout(() => {
           playSound(sound.key) 
        }, sound.time);
    });
}
function onPlayChanell3(): void{
    chanell3.forEach(sound => {
        setTimeout(() => {
           playSound(sound.key) 
        }, sound.time);
    });
}
function onPlayChanell4(): void{
    chanell4.forEach(sound => {
        setTimeout(() => {
           playSound(sound.key) 
        }, sound.time);
    });
}
function getAudio()
{
     clapSoud = document.querySelector('[data-sound="clap"]');
     boomSoud = document.querySelector('[data-sound="boom"]');
     rideSoud = document.querySelector('[data-sound="ride"]');
     kickSoud = document.querySelector('[data-sound="kick"]');
     snareSoud = document.querySelector('[data-sound="snare"]');
     tinkSoud = document.querySelector('[data-sound="tink"]');
}
function onKeyDown(ev: KeyboardEvent): void{
    const key = ev.key;
    const time = ev.timeStamp;

    chanell1.push({key,time})
    playSound(key);
    console.log(chanell1);
    chanell2.push({key,time})
    playSound(key);
    console.log(chanell2);
    chanell3.push({key,time})
    playSound(key);
    console.log(chanell3);
    chanell4.push({key,time})
    playSound(key);
    console.log(chanell4);
}
function playSound(key: string) {
    switch (key)
    {
        case 'q':
            clapSoud.currentTime = 0;
            clapSoud.play();
        break;
        case 'w':
            boomSoud.currentTime = 0;
            boomSoud.play();
        break;
        case 'e':
            rideSoud.currentTime = 0;
            rideSoud.play();
        break;
        case 'a':
            kickSoud.currentTime = 0;
            kickSoud.play();
        break;
        case 's':
            snareSoud.currentTime = 0;
            snareSoud.play();
        break;
        case 'd':
            tinkSoud.currentTime = 0;
            tinkSoud.play();
        break;
}
}