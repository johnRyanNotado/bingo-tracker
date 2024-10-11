
// checks if a given array has an element that has a value of 0
const isFull = (array) => {
  if (array.includes(0)) {
    return false
  }
  else {
    return true
  }
}

const giveAppropriateLetter = (value) => {
      return value <= 15 ? 0 
      : value <= 30 ? 1
      : value <= 45 ? 2
      : value <= 60 ? 3
      : 4
}

// adds a random card (range of numbers is based on the specified value of the parameter)
const addRandomBall = (index, array) => {
  
  let randomBall = 0
  while(true) {
    randomBall = Math.floor(Math.random() * 15 + 1) + ((index) * 15)
    if (array.includes(randomBall)){
      continue
    }
    else {
      break
    }
  }
  return randomBall
}




const recommendCard = (calledBalls, pattern) => {

  // get the best cards for each letter 
  const tempoCard = [[], [], [], [], []]
  const bestCard = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]

  // sort each array by the numbers frequency
  calledBalls.sort((a, b) => {
    return b.freq - a.freq
  })
  
  // loop through each sorted called balls and push it to the tempoCard
  for(let i = 0; i < calledBalls.length; i++){
    // if the ball is called, push the element
    if(calledBalls[i].freq != 0) {
      // sort them by letter where B = 0, I = 1, N = 2, G = 3, 0 = 4
      let approLetter = giveAppropriateLetter(calledBalls[i].num)  
      
      tempoCard[approLetter].push(calledBalls[i].num)
    }
    else {
      break
    }
  }

  // insert the best/most frequent balls to the card and put it to a position with a higher priority
  for(let i = 0; i < pattern.length; i++){
    for(let j = 0; j < pattern[i].length; j++){
      if(tempoCard[i].length === 0) {
        break
      }
      // check if the current position is a priority
      // check if the current value is already inserted in the best card
      if(pattern[i][j] === 0 || bestCard[i].includes(pattern[i][j])){
        continue
      } 

      bestCard[i][j] = tempoCard[i][0]
      // delete the tempoCard's value so that it won't be inserted again
      tempoCard[i].shift()
    } 
  }

  // insert the remaining balls from the tempoCard

  for(let i = 0; i < pattern.length; i++){
    if(isFull(bestCard[i]) === true) {
      continue
    }   
    for(let j = 0; j < pattern[i].length; j++){
      // check if there is already a card in the current position
      // check if current position is the "free position"
      if(bestCard[i][j] != 0){
        continue
      }
      if(i === 2 && j === 2){
        continue
      }

      // add random card if there is no more balls that is called
      if(tempoCard[i].length === 0) {
        bestCard[i][j] = addRandomBall(i, bestCard[i])
        if(bestCard[i][j] === undefined) {
          console.log(i, j)
        }
      }
      else {
        bestCard[i][j] = tempoCard[i][0]
        tempoCard[i].shift()
      }
    }
  }
  // return the card with numbers

  return bestCard
}