let intervalFinish
let interval

// initial starting time 30 seconds
let timeLeft = 30
// setting initial question index to 0
let currentQuestion = 0
// initial score to 0
let score = 0
let highScores = []
// array of objects for questions/answers
const questions =
  [
    {
      question: 'What is the term for when you add to arrays together?',
      answer: 'concatenate',
      choices: ['joining', 'slamming', 'dunking', 'concatenate']
    },
    {
      question: 'How do you turn a string into an integer for javascript?',
      answer: 'parseInt()',
      choices: ['showNumber()', 'toInterger()', 'dunking()', 'parseInt()']
    },

    {
      question: 'At what number does the index for an array start?',
      answer: '0',
      choices: ['1', '0', 'dunking', '-1']
    }
  ]
// display scores
const displayHighScores = () => {
  document.getElementById('highScores').innerHTML = highScores.reduce((allScores, highScore) => {
    return allScores + `${highScore.initials} - ${highScore.score}`
      + '<br>'
  }, '')
}

// on submit push score to highScores also show 
document.getElementById('form').onsubmit = (event) => {
  event.preventDefault()
  highScores.push({ initials: event.target.elements[0].value, score: score + timeLeft })
  displayHighScores()
  document.getElementById('initials').style.display = 'none'
}



// function taking 2 parameters if the question is right or wrong
const onClickChoice = (choice, answer) => {
  if (choice === answer) {
    score++
  }
  else {
    timeLeft -= 5
  }
  document.getElementById('score').innerText = score
  document.getElementById('timer').innerText = timeLeft
  currentQuestion++
  displayQuestion()
}

// guard for game over
// final score at the end
const finished = () => {
  if (timeLeft <= 0 || currentQuestion === questions.length) {
    document.getElementById('score').innerText = 'Your score is ' + score + ' Finished!'
    clearInterval(interval)
    clearInterval(intervalFinish)
    document.getElementById('initials').style.display = 'block'
    document.getElementById('questionBox').innerHTML = ''
    document.getElementById('answerBox').innerHTML = ''
  }
}
// what start btn will do - put question into question box and choices into answer box
// add question and 4 selections
let displayQuestion = () => {
  if (timeLeft <= 0 || currentQuestion === questions.length) {
    return
  }
  document.getElementById('questionBox').innerText = questions[currentQuestion].question
  document.getElementById('answerBox').innerHTML = `
  <button onclick="onClickChoice('${questions[currentQuestion].choices[0]}', '${questions[currentQuestion].answer}')" type="button" class="btn btn-default">
    ${questions[currentQuestion].choices[0]}
  </button>`
    +
    `<button onclick="onClickChoice('${questions[currentQuestion].choices[1]}', '${questions[currentQuestion].answer}')" type="button" class="btn btn-default">
  ${questions[currentQuestion].choices[1]}
  </button>`
    +
    `<button onclick="onClickChoice('${questions[currentQuestion].choices[2]}', '${questions[currentQuestion].answer}')" type="button" class="btn btn-default">
  ${questions[currentQuestion].choices[2]}
  </button>`
    +
    `<button onclick="onClickChoice('${questions[currentQuestion].choices[3]}', '${questions[currentQuestion].answer}')" type="button" class="btn btn-default">
  ${questions[currentQuestion].choices[3]}
  </button>`
}

// event listener for click to display new question/choices and subtracting 1 second off timer per second
document.getElementById('startBtn').addEventListener('click', () => {
  displayQuestion()
  interval = setInterval(() => {
    timeLeft--
    finished()
    document.getElementById('timer').innerText = timeLeft
    console.log(currentQuestion)
  }, 1000)

})
// constant check if the game is finished
intervalFinish = setInterval(() => {
  finished()
}, 500);

// show time left
document.getElementById('timer').innerText = timeLeft

