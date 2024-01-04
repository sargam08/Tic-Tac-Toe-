let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];




 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
       
        if(turnO){
            box.innerText="O";
            box.classList.remove("x-color");
            box.classList.add("o-color");
            turnO=false;
        }
        else{
            box.innerText="X";
            box.classList.remove("o-color");
            box.classList.add("x-color");
            turnO=true;
        }
        box.disabled=true; 
       
        checkWinnerOrDrawAndReset();
    });
   
});




const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };



  

const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

  const checkDraw = () => {
    // Check if all boxes are filled
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // At least one box is still empty
        }
    }
    return true; // All boxes are filled
};

const showDraw = () => {
    msg.innerText = " 🙁 oho! It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `🎉Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
  
const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
           
          showWinner(pos1Val);
          return true;
        }
      }
    }
  };

  const checkWinnerOrDrawAndReset = () => {
    if (checkWinner()) {
        return;
    } else if (checkDraw()) {
        showDraw();
    } else {
        // Continue the game
    }
};

  newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


