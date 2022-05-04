// class BoardWord {
//   constructor(startx, starty, orientation, clue) {
//     this.startx = startx;
//     this.starty = starty;
//     this.orientation = orientation;
//     this.clue = clue;
//   }
//   // static initFromJson(wordJson) {
//   //   const { startx, starty, orientation, clue } = JSON.parse(wordJson);
//   //   console.log(JSON.parse(wordJson));
//   //   // return new boardWord(startx, starty, orientation, clue);
//   // }
// }

// export class BoardDescriber {
//   constructor(height, width, wordsDescription) {
//     this.height = height;
//     this.width = width;
//     this.wordsDescription = wordsDescription;
//   }
//   static initFromJson(boardJson) {
//     const { dimensions, boardWords } = JSON.parse(boardJson);
//     console.log(JSON.parse(boardJson));
//     const [height, width] = dimensions;
//     const wordsDescriptions = [];
//     boardWords.forEach((wordDescription) => {
//       let { startx, starty, orientation, clue } = wordDescription;
//       wordsDescriptions.push(
//         new BoardWord(parseInt(startx), parseInt(starty), orientation, clue)
//       );
//     });
//     return new BoardDescriber(height, width, wordsDescriptions);
//   }
// }
