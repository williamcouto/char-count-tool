let textarea = document.getElementById('user-textarea')
let char = document.getElementById('stat-char')

// Contagem de caracteres
function countCharacter(){
     let textareaUser = textarea.value.length
     char.textContent = textareaUser
}
textarea.addEventListener('input', () => {
    countCharacter()
})