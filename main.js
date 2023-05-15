const gen = document.querySelector(".gen")
const text =document.querySelector(".text")


function say_quote(texts) {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Create an instance of SpeechSynthesisUtterance
        var msg = new SpeechSynthesisUtterance();
    
        // Set the text to be spoken
        msg.text = texts;
    
        // Select the voice for speech synthesis
        msg.voice = speechSynthesis.getVoices()[0]; // You can choose a specific voice
    
        // Set other options
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; // 0 to 2
    
        // Speak the text
        speechSynthesis.speak(msg);
    }
}
function get_quote(e) {
    if (!gen.classList.contains('loader')){
        gen.classList.add('loader')
        e.preventDefault();
        $.ajax({
        type: 'GET',
        url: 'https://api.chucknorris.io/jokes/random',
        success: function(response) {
            let responseText = response.value
            responseText = responseText.toLowerCase()
            responseText = responseText.replace("chuck norris", "Idan")
            responseText = responseText.replace("norris chuck", "Idan")
            responseText = responseText.replace("chuck", "Idan")
            responseText = responseText.replace("norris", "Idan")
            text.textContent = responseText
            console.log(response)
            gen.classList.remove('loader')
        },
        error: function(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!\n Error code: 31013',
            footer: '<a href="https://codewithyembot.vercel.app">Why do I have this issue? Contact Me!</a>'
        })
        }
        });          
    }
}

gen.addEventListener('click', get_quote)
