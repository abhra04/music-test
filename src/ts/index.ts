import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE, Pitch, Accidental } from "./musical-score";


function playMusic() {

    const notes = notesToPlayInOrder;
    const n:number = notes.length;

    //recursive function to play the notes in required order.
    function playNote(idx : number) {


        console.log('Playing Note Number:'+idx);

        //terminate the current recursive call if the note is out of index
        if (idx>=n) return;
        
        let note : any = notes[idx];

        //If accidental value is present assign it, otherwise assign it to an empty string.
        if (!note['accidental']){
            note['accidental'] = '';
        }
        let accidental: Accidental = note['accidental'];

        //Assigning the variables
        let pitch : Pitch = note['pitch'];
        let octave : number = note['octave'];
        let beats : number = note['beats'];
        let musicId : string = `${pitch}${octave}${accidental}`;
        let music = document.getElementById(musicId) as HTMLAudioElement;
    
        //Start playing the present note
        music.play();
        
        //Timeout to take care of the beats frquency
        setTimeout(() => {
            music.pause();
            //Recursive Call
            playNote(idx + 1);
             }, BEATS_PER_MINUTE * beats );
    
    }

    let start:number = 0;

    //Initialize the function with zero and call the function
    playNote(start);
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
