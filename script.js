let textarea = document.getElementById('user-textarea')
let words = document.getElementById('stat-words')
let char = document.getElementById('stat-char')
let numStat = document.getElementById('stat-numbers')
let lines = document.getElementById('stat-lines')
let btnClear = document.getElementById('btn-clear')

// Limpar a area de texto
function clearTextarea(){
    textarea.value = ''
    words.textContent = '0'
    char.textContent = '0'
    numStat.textContent = '0'
}

// Contagem de caracteres
function countCharacter() {
    let textareaUser = textarea.value.length
    char.textContent = textareaUser
}

// Contagem de Palavras
function countWords() {
    let wordUser = textarea.value
    // Verifica se o campo de texto está vazio
    if(wordUser === ""){
        words.textContent = 0
        return
    }

    let wordsArray = wordUser.split(/\s+/)
    let filteredWords = wordsArray.filter(word => word.length > 0)
    words.textContent = filteredWords.length
}

//Contagem de Linhas
function countLines(){
    let linesTxt = textarea.value
    let linesSegments = linesTxt.split(/\n/)
    // Se o conteudo estiver vazio, retorna a 0
    if(linesTxt === ""){
        lines.innerHTML = 0
        return
    } 
    lines.textContent = linesSegments.length
}

//Contagem de Números
function countNumberStat(){
    let numsTextarea = textarea.value
    let regexNum = new RegExp(/\d/g) // expressão para aceitar cada digito individualmente
    let foundNums = numsTextarea.match(regexNum)

    //Para evitar erro causado por acessar o tamanho de um elemento null
    if(foundNums == null){
        numStat.textContent = 0
    }
    else{
        numStat.textContent = foundNums.length
    }

}

textarea.addEventListener('input', () => {
    countCharacter()
    countWords()
    countNumberStat()
    countLines()
})

btnClear.onclick = () => {
    clearTextarea()
}