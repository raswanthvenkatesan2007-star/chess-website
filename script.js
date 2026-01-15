let boardState = Array(8).fill(null).map(() => Array(8).fill(null).map(() => []));

// Helper to add pieces initially
function addPiece(row, col, type, prob = 1) {
  boardState[row][col].push({
    type: type,
    prob: prob, // 1.0 for full, 0.5 for split
    color: type === type.toUpperCase() ? 'white' : 'black'
  });
}

// Example: Placing a full Rook and a split Pawn
addPiece(7, 0, "R"); // Full Rook
addPiece(6, 0, "P", 0.5); // Half Pawn

function renderBoard() {
  boardDiv.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
      
      const container = document.createElement("div");
      container.classList.add("piece-container");

      const piecesInSquare = boardState[row][col]; // This is now an array

      piecesInSquare.forEach(pieceData => {
        const img = document.createElement("img");
        img.src = `pieces/${pieceMap[pieceData.type]}.png`;
        img.classList.add("piece");
        
        // Apply "split" class if probability is less than 1
        if (pieceData.prob < 1) {
          img.classList.add("split");
        } else {
          img.classList.add("full");
        }
        
        container.appendChild(img);
      });

      square.appendChild(container);
      boardDiv.appendChild(square);
    }
  }
}

function performSplitMove(startRow, startCol, target1, target2) {
  const piece = boardState[startRow][startCol].pop(); // Take the piece
  
  // Create two "half" versions
  const halfPiece1 = { ...piece, prob: 0.5 };
  const halfPiece2 = { ...piece, prob: 0.5 };

  // Place them in the new locations
  boardState[target1.row][target1.col].push(halfPiece1);
  boardState[target2.row][target2.col].push(halfPiece2);

  renderBoard();
}