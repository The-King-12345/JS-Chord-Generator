class Chord {
    constructor(chordsToInclude) {
      this.chords = this.generateChords(chordsToInclude);
      this.shuffledChords = this.shuffleChords(this.chords.slice());
      this.currentIndex = 0;
    }

    generateChords(chordsToInclude){
        const rootNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
        const chordTypes = ["maj7", "7", "m7"]

        const allChords = [];
        for (const rootNote of rootNotes) {
            for (const chordType of chordTypes) {
              const chord = { rootNote, chordType };
              allChords.push(chord);
            }
        }
      
        const filteredChords = allChords.filter(chord => {
            const chordName = `${chord.rootNote}${chord.chordType}`;
            return chordsToInclude.includes(chordName);
        });
        
        return filteredChords;
    }

    shuffleChords(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    getNextChord() {
      if (this.currentIndex >= this.shuffledChords.length) {
        this.shuffledChords = this.shuffleChords(this.chords.slice());
        this.currentIndex = 0;
      }
  
      const currentChord = this.shuffledChords[this.currentIndex];
      this.currentIndex++;
  
      return currentChord;
    }

    getCurrentIndex(){
      const indexPercentDone = this.currentIndex/this.shuffledChords.length
      return indexPercentDone;
    }
  }



var chordsToInclude = [];
var chord = new Chord(chordsToInclude);

const dropDownButton = document.getElementById("dropdownButton");
const chordCheckboxes = document.getElementsByClassName("chord-checkbox")

const progressBar = document.getElementById("progress");


//dropdown
dropDownButton.addEventListener("click", toggleDropdown);
Array.from(chordCheckboxes).forEach(checkbox => {
  checkbox.addEventListener("change", handleChordSelection);
});

function toggleDropdown() {
  const chordList = document.getElementById("chordList");
  chordList.style.display = chordList.style.display === "flex" ? "none" : "flex";
}

function handleChordSelection(event) {
  const selectedChords = Array.from(chordCheckboxes)
  .filter(checkbox => checkbox.checked)
  .map(checkbox => checkbox.value);

  chordsToInclude = selectedChords;
  chord = new Chord(chordsToInclude);
  updateProgressBar();
}

//generating random chord
function generateRandomChord() {
  const nextChord = chord.getNextChord();
  document.getElementById('chordDisplay').innerHTML = `${nextChord.rootNote}${nextChord.chordType}`;
  updateProgressBar();
}

//progress bar
function updateProgressBar(){
  const precentDone = chord.getCurrentIndex() * 100
  progressBar.style.width = precentDone + "%";
}


handleChordSelection();
generateRandomChord();