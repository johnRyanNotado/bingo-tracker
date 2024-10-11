// Model



const hasNoData = () => {
  return savedCount === 0? true : false
}


const sortArrayOfObject = (upperLimit, lowerLimit, calledBalls) => {

  
  let sortedArray = []
  for(let i = 0; i < calledBalls.length; i++){
    if(calledBalls[i].freq === 0 ||
       calledBalls[i].num <= lowerLimit){
      continue
    }
    else if (calledBalls[i].num > upperLimit) {
      break
    }
    else {
      // push it to another array that will be sorted

      sortedArray.push(calledBalls[i])
    }
  }

  sortedArray.sort((a, b) => {return a.freq - b.freq}).reverse()

  return sortedArray
}

const clearLocalStorage = () => {
  localStorage.removeItem("savedBalls")
  localStorage.removeItem("savedBingoBalls")
  localStorage.removeItem("savedRounds")
  localStorage.removeItem("savedCount")
}



// View

// AT = All Time
const bATNum = document.querySelector("#b-at-num")
const iATNum = document.querySelector("#i-at-num")
const nATNum = document.querySelector("#n-at-num")
const gATNum = document.querySelector("#g-at-num")
const oATNum = document.querySelector("#o-at-num")
const statsSelector = document.querySelector("#stats-selector")
const deleteStatsBtn = document.querySelector("#delete-stats-btn")

const writeStatsHtmlCode = (upperLimit, lowerLimit, calledBalls, countCopy) => {
  // sort the array first
  let sortedArray = sortArrayOfObject(upperLimit, lowerLimit, calledBalls)

  let htmlCode = ""
  for(let i = 0; i < sortedArray.length; i++) {

    // find the rate of appearance based on the count and frequency
    let rateOfAppearance = Math.round(sortedArray[i].freq / countCopy * 100)

    let ballColor = giveBallColorInCSS(sortedArray[i].num)
    let rateColor = giveRateColorInCSS(rateOfAppearance)
    htmlCode+= `
    <li>
      <div class="list-of-num" style="
      border-color: ${ballColor};">
        ${sortedArray[i].num}
      </div>
      <div class="rate-of-appearance" style="
      background-color: ${rateColor}
      ">
        ${rateOfAppearance}%
      </div>
      
    </li>`
  }
  return htmlCode
}

// AT = All time

const renderStatsContainer = (savedBallsCopy, countCopy) => {
  bATNum.innerHTML = writeStatsHtmlCode(bingoListLimit[0], 0, savedBallsCopy, countCopy)
  iATNum.innerHTML = writeStatsHtmlCode(bingoListLimit[1], bingoListLimit[0], savedBallsCopy, countCopy)
  nATNum.innerHTML = writeStatsHtmlCode(bingoListLimit[2], bingoListLimit[1], savedBallsCopy, countCopy)
  gATNum.innerHTML = writeStatsHtmlCode(bingoListLimit[3], bingoListLimit[2], savedBallsCopy, countCopy)
  oATNum.innerHTML = writeStatsHtmlCode(bingoListLimit[4], bingoListLimit[3], savedBallsCopy, countCopy)
}

const renderStats = (savedBallsCopy, headerTitle, countCopy) => {
   document.querySelector("#stats-title").innerHTML = headerTitle

  // if there is no data yet, dont show
  if(hasNoData()) {
    return
  }

  // display it in view for each letter
  renderStatsContainer(savedBallsCopy, countCopy)
}

if(statsSelector.value === "allTime"){
  renderStats(savedBalls, 
        `All Time Statistics - 
        <span id="num-of-rounds">(${savedCount})</span> 
        round/s`, 
        savedCount)
}

const displayStats = () => {
  let countCopy = 0
  console.log(savedBalls)
  // choose which stat to show first then render it
  switch(statsSelector.value) {
    case "allTime": 
      renderStats(savedBalls, 
        `All Time Statistics - 
        <span class="num-of-rounds">(${savedCount})</span> 
        round/s`, 
        savedCount)
      break
    case "last20":
      countCopy = savedRounds.length < 20 ? savedRounds.length : 20
      console.log(countCopy)
      renderStats(savedBallsProto20, 
        `Statistics - Last <span id="num-of-rounds">(20)</span> Rounds`, 
        savedRounds.length)
      break
    case "last10": 
      countCopy = savedRounds.length < 10 ? savedRounds.length : 10
      console.log(countCopy)
      renderStats(savedBallsProto10, 
        `Statistics - Last <span id="num-of-rounds">(10)</span> Rounds`, 
        countCopy)
      break
    case "last5":
      countCopy = savedRounds.length < 5 ? savedRounds.length : 5
      console.log(countCopy)
      renderStats(savedBallsProto5, 
        `Statistics - Last <span id="num-of-rounds">(5)</span> Rounds`, 
        countCopy)
      break
    default: 
      console.log("something wrong with select statement")
  }
}


// Controller

statsSelector.addEventListener("click", () => {
  displayStats()
  displayPatternsSelected()
})


deleteStatsBtn.addEventListener("click", () => {
  if (confirm(`Are you sure you want to delete the stats?\nPress "OK" to confirm.`) ) {
    clearLocalStorage()
    initializeFunc()
    displayStats()
    renderStatsContainer(savedBalls, savedCount)
  }
})