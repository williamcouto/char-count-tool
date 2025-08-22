let textarea = document.getElementById('user-textarea')
let words = document.getElementById('stat-words')
let char = document.getElementById('stat-char')
let numStat = document.getElementById('stat-numbers')
let lines = document.getElementById('stat-lines')
let space = document.getElementById('stat-spaces')
let progressBar = document.querySelector('.progress-bar')
let fillProgress = document.querySelector('.progress-bar-fill')
fillProgress.style.width = 0

let btnClear = document.getElementById('btn-clear')
let btnCopy = document.getElementById('btn-copy')
let progress = document.querySelector('[data-progress]')
let counter = document.querySelector('[data-counter]')
let select = document.getElementById('sel-plataform')
let limitPlataform = document.querySelector('[data-limit]')
let currentNum = document.querySelector('[data-current]')
let chips = document.querySelectorAll('.btn-chips')

// Limpar a area de texto
function clearTextarea() {
    textarea.value = ''
    words.textContent = '0'
    char.textContent = '0'
    space.textContent = '0'
    lines.textContent = '0'
    numStat.textContent = '0'
    currentNum.textContent = '0'
    currentNum.classList.remove('warning-limit')
    progress.value = 0
    fillProgress.style.width = "0"
    //fillProgress.style.backgroundColor = '#5740C3'
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

// Contagem de Espaços
function countSpaces(){
    let spaceText = textarea.value
    let spaces = spaceText.split(/\s+/g)
    space.textContent = spaces.length
}

//Contagem de Números
function countNumberStat() {
    let numsTextarea = textarea.value
    let regexNum = new RegExp(/\d/g) //expressão para aceitar cada digito individualmente
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
    let percent = (textareaUser / limitNum) * 100

    fillProgress.style.width = percent + '%'
    fillProgress.value = Math.min(percent, 100)

    if (percent > 100) {
        currentNum.classList.add('warning-limit')
        fillProgress.style.width = "100%"
    }
    else {
        currentNum.classList.remove('warning-limit')
    }

    // Calculo de caracteres restantes
    let halfLimitNum = Math.floor(limitNum / 2)
    let charRemain = limitNum - textareaUser
    
    if(charRemain == halfLimitNum){
        textNotification.open({
            type: "warning",
            message: `Atenção: Restam ${charRemain} caracteres`
        })
    }
}
// função para copiar texto
async function copyText(){
    try{
        let textValue = textarea.value
        // Se a area estiver vazia
        if(!textValue){
            alert("Erro: Campo de texto vazio!")
        }
        await navigator.clipboard.writeText(textValue)
    }
    catch(error){
        alert(error)
    }
}

// Lógica dos botões de limite
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'))
        chip.classList.add('active')
        //Atualizando valores
        limitPlataform.dataset.limit = chip.dataset.limit
        limitPlataform.textContent = chip.dataset.limit

        updateProgressBar(textarea.value.length)
        textNotification.open({
            type: "success",
            message: "Limite definido!"
        })
    })
})

let textNotification = new Notyf({
    duration: 2000,
    position: {
        x: "center",
        y: "top"
    },
    types: [
        {
            type: "error",
            background: "#DC2626"
        },
        {
            type: "warning",
            background: "#F59E0B"
        },
        {
            type: "success",
            background: "#16A43A"
        }
    ]
})

textarea.addEventListener('input', () => {
    let lengthBar = countCharacter()
    countWords();
    countNumberStat();
    countSpaces();
    updateProgressBar(lengthBar);
    countLines();
})

btnClear.addEventListener('click', () => {
    clearTextarea();
})
btnCopy.addEventListener('click', copyText)