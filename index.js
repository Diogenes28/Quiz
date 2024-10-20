const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual foi o nome do primeiro presidente do Brasil após a Proclamação da República em 1889?",
    answers: [
      { text: "Floriano Peixoto", correct: false },
      { text: "Washington Luís", correct: false },
      { text: "Marechal Deodoro da Fonseca", correct: true },
      { text: "Getúlio Vargas", correct: false }
    ]
  },
  {
    question: "Qual é o maior oceano do planeta Terra?",
    answers: [
      { text: "Oceano Pacífico", correct: true },
      { text: "Oceano Atlântico", correct: false },
      { text: "Oceano Índico", correct: false },
      { text: "Oceano Ártico", correct: false }
    ]
  },
  {
    question: 'Qual é a técnica de ataque cibernético que envolve a interceptação de comunicações entre duas partes para obter informações confidenciais, sem que as partes saibam?',
    answers: [
      { text: 'Man-in-the-Middle (MitM)', correct: true },
      { text: 'Phishing', correct: false },
      { text: 'DDoS', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'O arquivo JavaScript externo deve conter a tag <script>',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Qual é o nome do processo que consiste em verificar a identidade de um usuário antes de permitir o acesso a sistemas ou dados?',
    answers: [
      { text: 'Autorização', correct: false },
      { text: 'Autenticação', correct: true },
      { text: 'Criptografia', correct: false },
      { text: 'Auditoria', correct: false }
    ]
  },
  {
    question: 'Qual é o método de ataque cibernético que explora vulnerabilidades em aplicações web para manipular bancos de dados e obter informações não autorizadas?',
    answers: [
      { text: 'Cross-Site Scripting (XSS)', correct: false },
      { text: 'SQL Injection', correct: true },
      { text: 'Cross-Site Request Forgery (CSRF)', correct: false },
      { text: 'Directory Traversal', correct: false }
    ]
  },
  {
    question: 'Qual é o elemento químico representado pelo símbolo "Au" na tabela periódica?',
    answers: [
      { text: 'Argônio', correct: false },
      { text: 'Alumínio', correct: false },
      { text: 'Nenhuma das alternativas', correct: false },
      { text: 'Ouro', correct: true },
    ]
  },
]