let clapSoud: HTMLAudioElement;
let boomSoud: HTMLAudioElement;
let rideSoud: HTMLAudioElement;
let kickSoud: HTMLAudioElement;
let snareSoud: HTMLAudioElement;

const chanell1: any[] = [];
const chanell2: any[] = [];
const chanell3: any[] = [];
const chanell4: any[] = [];
appStart();
function appStart(): void
{
window.addEventListener('keypress', onKeyDown);
const btnPlayChanell1 = document.querySelector('#playChanell1');
btnPlayChanell1.addEventListener('click', onPlayChanell1);
getAudio();
}
function onPlayChanell1(): void{
    chanell1.forEach(sound => {
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
}
function onKeyDown(ev: KeyboardEvent): void{
    const key = ev.key;
    const time = ev.timeStamp;

    chanell1.push({key,time})
    playSound(key);
    console.log(chanell1);
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
}
}