const gen = document.querySelector(".gen")
const text =document.querySelector(".text")

let count = 0;
function say_quote(texts) {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Create an instance of SpeechSynthesisUtterance
        var msg = new SpeechSynthesisUtterance();
        var modifiedText = texts.replace(/idan/gi, '<prosody level="slow" pitch="+20%"><emphasis level="strong" pitch="+50%">E</emphasis>done</prosody>');
        // Set the text to be spoken
        // msg.text = texts;
        console.log("mod", modifiedText)
        msg.text = modifiedText;

        msg.lang = 'en-US';
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
            say_quote(responseText)
            gen.classList.remove('loader')
            count = count + 1
        },
        error: function(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!\n Error code: 31013',
            footer: '<a href="https://codewithyembot.vercel.app">Why do I have this issue? Contact Me!</a>'
        })
        gen.classList.remove('loader')
        }
        });          
    }
    if (count >= 7){
        Swal.fire({
            icon: 'success',
            title: 'Hire Idan👨‍💻',
            text: 'Let Me Create Your next Website or Project👩‍💻!!!',
            allowOutsideClick: false,
            footer: '<a href="https://codewithyembot.vercel.app">Hire Me!!!</a>'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Idan Don Tire🥱',
                html: 'Buy Idan coffee😭!!!',
                imageUrl: '/img/profile.png',
                imageWidth: 400,
                imageHeight: 200,
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: 'Yes, Sure💖!',
                cancelButtonText: 'Nope Not Today😰',
                reverseButtons: true,
                imageAlt: 'Adekojo Adeyemi',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.open("https://bmc.link/yembot", "_blank");

                }
              })
            }
          })
        count = 0
    }
}

gen.addEventListener('click', get_quote)
