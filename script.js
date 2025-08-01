let textarea = document.getElementById('user-textarea')
let words = document.getElementById('stat-words')
let char = document.getElementById('stat-char')
let btnClear = document.getElementById('btn-clear')

// Limpar a area de texto
function clearTextarea(){
    textarea.value = ''
    words.textContent = '0'
    char.textContent = '0'
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

textarea.addEventListener('input', () => {
    countCharacter()
    countWords()
})

btnClear.onclick = () => {
    clearTextarea()
}