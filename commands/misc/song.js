// const commando = require('discord.js-commando');
// const MidiWriter = require('midi-writer-js');
// const fs = require('fs');
// const synth = require('synth-js');

// import SynthJS from 'synth-javascript';

// class SongCommand extends commando.Command {
//     constructor(client){
//         super(client, {
//             name: 'song',
//             group: 'misc',
//             memberName: 'song',
//             description: 'Generates a song from a word'
//         });
//     }

//     async run(message, args){
//         const composition = new SynthJS({
//             tempo: 128,
//             instrument: 'square',
//             timeSig: '3/4',
//             loop: true
//         });

//         composition.update({notes: `
//             t d4, t d_4,
//             t d4, q a#5,
//             q b5, q rest
//         `});

//         composition.play();
//     }

//     // async run(message, args){
//     //     // Start with a new track
//     //     var track = new MidiWriter.Track();

//     //     // Define an instrument (optional):
//     //     track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 2}));

//     //     // Add some notes: 
//     //     // var note = new MidiWriter.NoteEvent({pitch: ['C4', 'D4', 'E4'], duration: '4'});
//     //     // track.addEvent(note);

//     //     track.addEvent([
//     //         new MidiWriter.NoteEvent({pitch: ['E4', 'D4'], duration: '4'}),
//     //         new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
//     //         new MidiWriter.NoteEvent({pitch: ['E4', 'D4'], duration: '4'}),
//     //         new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
//     //         new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
//     //         new MidiWriter.NoteEvent({pitch: ['E4', 'D4'], duration: '4'}),
//     //         new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
//     //     ], function(event, index){
//     //         return {sequential: true};
//     //     });

//     //     // Generate a data URI
//     //     var write = new MidiWriter.Writer(track);
//     //     fs.writeFileSync('sound/midi/hotcrossbuns.mid', write.buildFile());

        

//     //     let midiBuffer = fs.readFileSync('sound/midi/hotcrossbuns.mid');
//     //     let wavBuffer = synth.midiToWav(midiBuffer).toBuffer();
//     //     fs.writeFileSync('sound/wav/hotcrossbuns.wav', wavBuffer, {encoding: 'binary'});

//     //     message.channel.send({
//     //         files: [{
//     //             attachment: 'sound/wav/hotcrossbuns.wav',
//     //             name: 'hotcrossbuns.wav'
//     //         }]
//     //     });
//     // }
// }

// module.exports = SongCommand;