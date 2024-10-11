localStorage.setItem("sampleArray", JSON.stringify([[75]]))

let sampleArray = JSON.parse(localStorage.getItem("savedRounds"))
let anotherArray = [75]
sampleArray.push(anotherArray)
console.log(sampleArray, typeof(sampleArray))