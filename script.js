document.addEventListener("DOMContentLoaded", () => {
  const boardDiv = document.getElementById("board");

  const pieceMap = {
    "K": "white_king", "Q": "white_queen", "R": "white_rook",
    "B": "white_bishop", "N": "white_knight", "P": "white_pawn",
    "k": "black_king", "q": "black_queen", "r": "black_rook",
    "b": "black_bishop", "n": "black_knight", "p": "black_pawn"
  };

  // State Management
  let boardState = Array(8).fill(null).map(() => Array(8).fill(null).map(() => []));
  let selectedSquare = null; // Stores {row, col}

  const startLayout = [
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]
  ];

  // Initialize board data
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (startLayout[r][c] !== "") {
        boardState[r][c].push({
          type: startLayout[r][c],
          prob: 1,
          color: startLayout[r][c] === startLayout[r][c].toUpperCase() ? 'white' : 'black'
        });
      }
    }
  }

  function renderBoard() {
    // Clear old squares but keep the glass overlay
    const oldSquares = boardDiv.querySelectorAll('.square');
    oldSquares.forEach(s => s.remove());

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
        
        // Label the square for the click listener to find
        square.dataset.row = row;
        square.dataset.col = col;

        // Apply yellow highlight if this square is selected
        if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
          square.classList.add("selected");
        }

        const container = document.createElement("div");
        container.classList.add("piece-container");

        boardState[row][col].forEach(pieceData => {
          const img = document.createElement("img");
          img.src = `pieces/${pieceMap[pieceData.type]}.png`;
          img.classList.add("piece", pieceData.prob < 1 ? "split" : "full");
          container.appendChild(img);
        });

        square.appendChild(container);
        boardDiv.appendChild(square);
      }
    }
  }

  // Handle Clicks
  boardDiv.addEventListener("click", (e) => {
    const squareElement = e.target.closest(".square");
    if (!squareElement) return;

    const row = parseInt(squareElement.dataset.row);
    const col = parseInt(squareElement.dataset.col);

    if (selectedSquare) {
      // If same square is clicked, deselect
      if (selectedSquare.row === row && selectedSquare.col === col) {
        selectedSquare = null;
      } else {
        // Move piece to new square
        movePiece(selectedSquare.row, selectedSquare.col, row, col);
        selectedSquare = null;
      }
      renderBoard();
    } else {
      // Select if square contains a piece
      if (boardState[row][col].length > 0) {
        selectedSquare = { row, col };
        renderBoard();
      }
    }
  });

  function movePiece(fromRow, fromCol, toRow, toCol) {
    const pieces = boardState[fromRow][fromCol];
    if (pieces.length > 0) {
      // Simple Move Logic: Move the piece(s) to the new square
      // This will overwrite whatever is in the target square (Capture)
      boardState[toRow][toCol] = pieces; 
      boardState[fromRow][fromCol] = [];
    }
  }

  renderBoard();
});