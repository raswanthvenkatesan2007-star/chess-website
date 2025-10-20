document.addEventListener("DOMContentLoaded", () => {
  const boardDiv = document.getElementById("board");

  const initialBoard = [
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]
  ];

  const pieceMap = {
    "K": "white_king", "Q": "white_queen", "R": "white_rook",
    "B": "white_bishop", "N": "white_knight", "P": "white_pawn",
    "k": "black_king", "q": "black_queen", "r": "black_rook",
    "b": "black_bishop", "n": "black_knight", "p": "black_pawn"
  };

  function renderBoard() {
    boardDiv.innerHTML = "";

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");

        const piece = initialBoard[row][col];
        if (piece) {
          const img = document.createElement("img");
          img.src = `pieces/${pieceMap[piece]}.png`;
          square.appendChild(img);
        }

        boardDiv.appendChild(square);
      }
    }
  }

  renderBoard();
});