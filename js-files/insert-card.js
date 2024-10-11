

// MVC
// Model

const totalNumOfBalls = 75;
let bingoBalls = [];
let chosenBalls = [];
const bingoListLimit = [15, 30, 45, 60, 75];
const prototypeLimit = 20;
let savedBalls;
let savedCount;
let savedRounds;
let savedBallsProto20;
let savedBallsProto10;
let savedBallsProto5;


// creates an array of balls
// each balls will have a number and frequency
const arrayOfBalls = () => {
  let arrayOfBalls = []
  for(let i = 0; i < totalNumOfBalls; i++){
      arrayOfBalls.push({num: i + 1, freq: 0})
  }
  return arrayOfBalls
}


// initializes bingo balls for the first section
const initializeBalls = () => {
  bingoBalls.length = 0
  for(let i = 1; i <= totalNumOfBalls; i++){
    bingoBalls.push(i)
  }
}


// deletes a ball from the first section
const deleteBall = (index) => {
  bingoBalls.splice(index, 1)
}


// inserts balls to chosen balls array
const insertToChosenBalls = (value) => {
  chosenBalls.push(value)
}


// deletes the current content of the chosen balls
const deleteArrayChosenBalls = () => {
  chosenBalls.length = 0
}


// update the prototypes of the savedBalls
const updatePrototype = () => {

  if(localStorage.getItem("savedRounds")){
    savedRounds = JSON.parse(localStorage.getItem("savedRounds"))
  } else {
    savedRounds = []
  }


  if (savedRounds.length >= prototypeLimit) {
    savedRounds.shift()
    }
  savedRounds.unshift(chosenBalls)


  
  insertRoundsToProto()
}


// update
const insertRoundsToProto = () => {
  savedBallsProto20 = arrayOfBalls()
  savedBallsProto10 = arrayOfBalls()
  savedBallsProto5 = arrayOfBalls()

  if (savedRounds.length === 0) {
    return
  }
  

  for(let i = 0; i < savedRounds.length; i++){
    let innerArrayLength = savedRounds[i].length
    for(let j = 0; j < innerArrayLength; j++) {
      savedBallsProto20[savedRounds[i][j] - 1].freq += 1
      if (i < 10) {
        savedBallsProto10[savedRounds[i][j] - 1].freq += 1
      }
      if (i < 5) {
        savedBallsProto5[savedRounds[i][j] - 1].freq += 1
      }
    }
  }
}


const saveChosenBalls = () => {
  // insert current chosen balls
  
  for(let i = 0; i < chosenBalls.length; i++){
    savedBalls[chosenBalls[i] - 1].freq += 1
  }

  // save the rounds for the prototype
  updatePrototype()
  
  // save it to local storage  
  localStorage.setItem("savedBingoBalls", JSON.stringify(savedBalls))
  localStorage.setItem("savedRounds", JSON.stringify(savedRounds))
  
  // increment the num of times the save button has been used

  savedCount += 1
  localStorage.setItem("savedCount", JSON.stringify(savedCount))

}




// View


const bNum = document.querySelector("#b-num")
const iNum = document.querySelector("#i-num")
const nNum = document.querySelector("#n-num")
const gNum = document.querySelector("#g-num")
const oNum = document.querySelector("#o-num")
const midLeftSec = document.querySelector("#middle-first-section")
const insertBtn = document.querySelector("#insert-btn")
const saveBtn = document.querySelector("#save-btn")
const deleteBtn = document.querySelector("#delete-btn")
const undoBtn = document.querySelector("#undo-btn")
const inputValue = document.querySelector("#input-value")

const giveBallColorInCSS = (ballNum) => {
  return ballNum <= 15 
    ? "var(--sp-blue-color)" : ballNum <= 30
    ? "var(--sp-red-color)" : ballNum <= 45
    ? "var(--sp-white-color)" : ballNum <= 60
    ? "var(--sp-green-color)" : "var(--sp-yellow-color)"
}

const giveRateColorInCSS = (rate) => {
  return rate >= 80
    ? "var(--sp-excellent-color)" : rate >= 60
    ? "var(--sp-good-color)" : rate >= 40
    ? "var(--sp-average-color)" : rate >= 20
    ? "var(--sp-poor-color)" : "var(--sp-very-poor-color)"
}

const writeHtmlCode = (upperLimit, lowerLimit) => {
  let htmlCode = ""
  for(let i = 0; i < bingoBalls.length; i++){
    if (bingoBalls[i] <= upperLimit && bingoBalls[i] > lowerLimit) {
      htmlCode += `
      <li>
        <button id="num-${bingoBalls[i]}" class="bingo-num-class" value="${bingoBalls[i]}">
        ${bingoBalls[i]}
        </button>
      </li>
      `
    }
    else {
      continue
    }
  }
  
  return htmlCode
}

const renderBalls = () => {
  // erase all content first
  bNum.innerHtml = ""
  iNum.innerHtml = ""
  nNum.innerHtml = ""
  gNum.innerHtml = ""
  oNum.innerHtml = ""

  // render the innerHtml of each list by using a function that writes the numbers in html and returns it as a whole
  bNum.innerHTML = writeHtmlCode(bingoListLimit[0], 0)
  iNum.innerHTML = writeHtmlCode(bingoListLimit[1],bingoListLimit[0])
  nNum.innerHTML = writeHtmlCode(bingoListLimit[2], bingoListLimit[1])
  gNum.innerHTML = writeHtmlCode(bingoListLimit[3], bingoListLimit[2])
  oNum.innerHTML = writeHtmlCode(bingoListLimit[4], bingoListLimit[3])
}


const removeHtmlElement = (selector) => {
  document.querySelector(selector).remove()
}

const deleteHtmlCalledBalls = () => {
  midLeftSec.innerHTML = `
    <div id="right-arrow-symbol">
      &rarr;
    </div>
  `
}

const deleteLastCalledBall = (value) => {
  document.getElementById(`called-${value}`).remove()
}


const renderFirstSection = () => {
  deleteHtmlCalledBalls()
  deleteArrayChosenBalls()
  initializeBalls()
  renderBalls()
  addEventForNumClass()
}

const insertToMidLeftSec = (index, intInputValue) => {
  insertToChosenBalls(intInputValue)
  // assign the corresponding color of the ball
  ballColor = giveBallColorInCSS(intInputValue)

  let htmlCode = `
    <button id="called-${intInputValue}" class="called-balls"
    style="
    border-color: ${ballColor}">
      ${intInputValue}
    </button>
  `
  midLeftSec.innerHTML = htmlCode.concat(midLeftSec.innerHTML)
}

const insertBall = () => {
  // check which ball based on the input element's value
  if (parseInt(inputValue.value) != 0) {
  let intInputValue = parseInt(inputValue.value)
  let indexToRemove = bingoBalls.indexOf
  (intInputValue)
  // check first if chosen number is found
    if (indexToRemove > -1) {
    // delete the ball from the array and html and insert to middle left section
    deleteBall(indexToRemove)
    removeHtmlElement(`#num-${intInputValue}`)
    insertToMidLeftSec(indexToRemove, intInputValue)
    inputValue.value = 0
    }
  }
}

// Controller

const addEventForNumClass = () => {
  let bingoNumClass = document.querySelectorAll(".bingo-num-class")

  bingoNumClass.forEach(
    number => {
      number.addEventListener("click", () => {
        inputValue.value = number.value
      })
    }
  )
}

insertBtn.addEventListener("click", () => {
  insertBall()
})

saveBtn.addEventListener("dblclick", () => {
  if(chosenBalls.length === 0) {
    return
  }
  saveChosenBalls()
  renderFirstSection()
  renderStats(savedBalls, `All Time Statistics - (${savedCount}) round/s`, savedCount)
  displayStats()
  displayPatternsSelected()
})

deleteBtn.addEventListener("dblclick", () => {
  renderFirstSection()
})


undoBtn.addEventListener("click", () => {
  if(chosenBalls.length === 0) {
    return
  }
  // delete from chosen balls array and html
  valueToRemove = chosenBalls[chosenBalls.length - 1]
  chosenBalls.pop()
  deleteLastCalledBall(valueToRemove)

  // render balls html 

  initializeBalls()
  for(let i = 0; i < chosenBalls.length; i++){
    deleteBall(chosenBalls[i] - 1)
  }
  renderBalls()
  addEventForNumClass()
});


// initialize

// check if savedBalls, savedCount, and savedRounds exists within the local storage
const initializeFunc = () => {
  savedBalls = JSON.parse(localStorage.getItem("savedBingoBalls"))
  savedCount = JSON.parse(localStorage.getItem("savedCount"));
  savedRounds = JSON.parse(localStorage.getItem("savedRounds"));
  // check if saved balls is null
  if(!savedBalls) {
    // if null, create an object of array with 0 values for each element
    savedBalls = []
    savedBalls = arrayOfBalls()
  }
  
  if(!savedCount) {
    savedCount = 0
  }

  if(!savedRounds){
    savedRounds = []
  }

  savedBallsProto20 = arrayOfBalls()
  savedBallsProto10 = arrayOfBalls()
  savedBallsProto5 = arrayOfBalls()
}

initializeFunc()
insertRoundsToProto()
renderFirstSection()





