const custPattBtn1 = document.querySelector("#cust-patt-btn-1")
const custPattBtn2 = document.querySelector("#cust-patt-btn-2")
const custPattBtn3 = document.querySelector("#cust-patt-btn-3")
const custPattBtn4 = document.querySelector("#cust-patt-btn-4")
const saveCustPattBtn = document.querySelector("#save-cust-patt-btn")
const cancelCustPattBtn = document.querySelector("#cancel-cust-patt-btn")

let cardNum = 0

// initialize the default patterns
const patternsSelected = [
  [
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,0,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1]
  ],
  [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,0,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ],
  [
    [1,1,0,0,0],
    [1,1,0,0,0],
    [1,1,0,0,0],
    [1,1,0,0,0],
    [1,1,0,0,0]
  ]
]



// Model




const getPattern = () => {
  const pattern = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      // check if the current position is the free position 
      if (i === 2 && j === 2) {
        continue
      }
      let isCheck = document.querySelector(`#check${i + 1}-${j + 1}`).checked
      if (isCheck) {
        pattern[i][j] = 1
      }
    }
  }
  initializeCustPatt()
  closeCustPatt()
  return pattern
}




const saveCustPatt = (newPattern) => {
  // recommend a card based on the pattern
  const statsSelector = document.querySelector("#stats-selector")
  let recommendedCard;
  let savedBallsCopy;
  if (statsSelector.value === "allTime") {
    savedBallsCopy = Object.create(savedBalls)
    recommendedCard = recommendCard(savedBallsCopy, newPattern)
  }
  else if (statsSelector.value === "last20") {
    savedBallsCopy = Object.create(savedBallsProto20)
    recommendedCard = recommendCard(savedBallsCopy, newPattern)
  }
  else if (statsSelector.value === "last10") {
    savedBallsCopy = Object.create(savedBallsProto10)
    recommendedCard = recommendCard(savedBallsCopy, newPattern)
  }
  else if (statsSelector.value === "last5") {
    savedBallsCopy = Object.create(savedBallsProto5)
    recommendedCard = recommendCard(savedBallsCopy, newPattern)
  }

  // display the card on the bingo card
  displayCard(recommendedCard)
  // display the pattern from the patt btn
  displayPatt(newPattern)
}


// View

const initializeCustPatt = () => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // check if the current position is the free position 
      if (i === 2 && j === 2) {
        continue
      }
      document.querySelector(`#check${i + 1}-${j + 1}`).checked = false

    }
  }
}

const closeCustPatt = () => {
  document.querySelector("#cust-patt").style.display = "none"
}

const displayCustPattCard = () => {
  document.querySelector("#cust-patt").style.display = "flex"
}

const displayCard = (recommendCard) => {
  for(let i = 0; i < recommendCard.length; i++) {
    document.querySelector(`#card-${cardNum}-${i+1}`).innerHTML = ""
    for(let j = 0; j< recommendCard[i].length; j++) {
      if (i === 2 && j === 2) {
        document.querySelector(`#card-${cardNum}-${i+1}`).innerHTML += `
        <li></li>
        `
        continue
      }
      document.querySelector(`#card-${cardNum}-${i+1}`).innerHTML += `
        <li>${recommendCard[i][j]}</li>
      `
    }
  }
} 

const displayPatt = (pattern) => {
    for(let i = 0; i < pattern.length; i++) {
    document.querySelector(`#patt-${cardNum}-${i+1}`).innerHTML = ""
    for(let j = 0; j< pattern[i].length; j++) {
      const newLiEl = document.createElement("li")
      if (i === 2 && j === 2) {
        newLiEl.style.background= "linear-gradient(135deg, rgba(2, 196, 171, 1) 51%, rgba(0, 171, 182, 1) 100%)"
      }
      else if (pattern[i][j] === 1) {
        newLiEl.style.background = "linear-gradient(135deg, rgba(2, 196, 171, 1) 51%, rgba(0, 171, 182, 1) 100%)"
      }
      else {
        newLiEl.style.background = "linear-gradient(180deg, rgba(0, 116, 169, 1) 61%, rgba(0, 144, 183, 1) 100%)"
      }
      document.querySelector(`#patt-${cardNum}-${i+1}`).appendChild(newLiEl)
    }
  }
}






// Controller

cancelCustPattBtn.addEventListener("click", () => {
  initializeCustPatt()
  closeCustPatt()
})

saveCustPattBtn.addEventListener("click", () => {
  // get the pattern
  const newPattern = getPattern()

  saveCustPatt(newPattern)
})

custPattBtn1.addEventListener("click", () => {
  // display customize pattern card
  cardNum = 1
  displayCustPattCard()
})

custPattBtn2.addEventListener("click", () => {
  // display customize pattern card
  cardNum = 2
  displayCustPattCard()
})

custPattBtn3.addEventListener("click", () => {
  // display customize pattern card
  cardNum = 3
  displayCustPattCard()
})

custPattBtn4.addEventListener("click", () => {
  // display customize pattern card
  cardNum = 4
  displayCustPattCard()
})


const displayPatternsSelected = () => {
  for(let i = 0; i < patternsSelected.length; i++) {
    cardNum = i + 1
    saveCustPatt(patternsSelected[i])
  }
}

displayPatternsSelected()