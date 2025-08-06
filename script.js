let textarea = document.getElementById('user-textarea')
let words = document.getElementById('stat-words')
let char = document.getElementById('stat-char')
let numStat = document.getElementById('stat-numbers')
let lines = document.getElementById('stat-lines')
let btnClear = document.getElementById('btn-clear')
let progress = document.querySelector('[data-progress]')
let counter = document.querySelector('[data-counter]')
let select = document.getElementById('sel-plataform')
let limitPlataform = document.querySelector('[data-limit]')
let currentNum = document.querySelector('[data-current]')


// Limpar a area de texto
function clearTextarea() {
    textarea.value = ''
    words.textContent = '0'
    char.textContent = '0'
    numStat.textContent = '0'
}

// Contagem de caracteres
function countCharacter() {
    let textareaUser = textarea.value.length
    char.textContent = textareaUser
    currentNum.textContent = textareaUser
    return textareaUser
}

// Contagem de Palavras
function countWords() {
    let wordUser = textarea.value
    // Verifica se o campo de texto está vazio
    if (wordUser === "") {
        words.textContent = 0
        return
    }

    let wordsArray = wordUser.split(/\s+/)
    let filteredWords = wordsArray.filter(word => word.length > 0)
    words.textContent = filteredWords.length
}

//Contagem de Linhas
function countLines() {
    let linesTxt = textarea.value
    let linesSegments = linesTxt.split(/\n/)
    // Se o conteudo estiver vazio, retorna a 0
    if (linesTxt === "") {
        lines.innerHTML = 0
        return
    }
    lines.textContent = linesSegments.length
}

//Contagem de Números
function countNumberStat() {
    let numsTextarea = textarea.value
    let regexNum = new RegExp(/\d/g)
    //expressão para aceitar cada digito individualmente
    let foundNums = numsTextarea.match(regexNum)

    //Para evitar erro causado por acessar o tamanho de um elemento null
    if (foundNums == null) {
        numStat.textContent = 0
    }
    else {
        numStat.textContent = foundNums.length
    }
}

function updateProgressBar(textareaUser) {
    const limitNum = Number(limitPlataform.dataset.limit)
    progress.max = limitNum
    progress.value = textareaUser
    let percent = (textareaUser / limitNum) * 100

    if (percent > 80) {
        currentNum.classList.add('warning-limit')
    }
    else {
        currentNum.classList.remove('warning-limit')
    }
}

select.addEventListener('change', (Event) => {
    const newLimit = Event.target.value
    limitPlataform.dataset.limit = newLimit
    limitPlataform.textContent = newLimit
    updateProgressBar(textarea.value.length)
})

textarea.addEventListener('input', () => {
    let lengthBar = countCharacter()
    countWords()
    countNumberStat()
    updateProgressBar(lengthBar)
    countLines()
})

btnClear.onclick = () => {
    clearTextarea();
}