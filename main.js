const gen = document.querySelector(".gen")
const text =document.querySelector(".text")
const range =document.querySelector(".range")
const content =document.querySelector(".content")
const tooltip = document.querySelector('#tooltip');
const icon = document.querySelector('.bx');
const changeBg = document.querySelector('.change');
const bgElement = document.querySelector(".container");
var maxNum = 64;
var canTalk;


// set opacity state
var opacity = localStorage.getItem('opacity') ? localStorage.getItem('opacity') : 0.8
localStorage.setItem('opacity', opacity)
content.style.opacity = opacity
let values = opacity * 100
range.value = values
tooltip.textContent = `Visibility: ${values}%`

// set bg
var bgNum = localStorage.getItem('bg') ? localStorage.getItem('bg') : 28
bgElement.style.backgroundImage = `url('img/bg${bgNum}.png')`;

// set volume state
setVolume()

function changeBackground() {
  var num = Math.floor(Math.random() * 65);
  localStorage.setItem('bg', num)
  bgElement.style.backgroundImage = `url('img/bg${num}.png')`;
}

changeBg.addEventListener('click', changeBackground)

function setVolume() {
  // set volume state
  var volumeValue = localStorage.getItem('volume') ? localStorage.getItem('volume') : 'false'
  canTalk = volumeValue == 'true' ? true : false
  localStorage.setItem('volume', volumeValue)
  var volumeIcon = volumeValue == 'false' ? 'bxs-volume-mute' : 'bxs-volume-full'
  icon.classList.remove('bxs-volume-mute')
  icon.classList.remove('bxs-volume-full')
  icon.classList.add(volumeIcon)
}

let count = 0;
function say_quote(texts) {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Create an instance of SpeechSynthesisUtterance
        var msg = new SpeechSynthesisUtterance();
        var modifiedText = texts.replace(/idan/gi, 'Edone');
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
            if (canTalk){
              say_quote(responseText)
            }
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

function handleChange(e) {
  var values = range.value;
  value = values/100;
  content.style.opacity = value
  localStorage.setItem('opacity', value)
  tooltip.textContent = `Visibility: ${values}%`
  show();
}

function handleVolume(e) {
  let volumeValue = localStorage.getItem('volume')
  volumeState = volumeValue == 'false' ? 'true' : 'false'
  localStorage.setItem('volume', volumeState)
  setVolume()
}
icon.addEventListener('click', handleVolume)

gen.addEventListener('click', get_quote)
range.addEventListener('change', handleChange)

// Pass the button, the tooltip, and some options, and Popper will do the
// magic positioning for you:
const popperInstance = Popper.createPopper(range, tooltip, {
  placement: 'top',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ],
});

function show() {
  tooltip.setAttribute('data-show', '');

  // We need to tell Popper to update the tooltip position
  // after we show the tooltip, otherwise it will be incorrect
  popperInstance.update();
}

function hide() {
  tooltip.removeAttribute('data-show');
}

const showEvents = ['mouseenter', 'focus', 'touchstart'];
const hideEvents = ['mouseleave', 'blur', 'touchend'];

showEvents.forEach((event) => {
  range.addEventListener(event, show);
});

hideEvents.forEach((event) => {
  range.addEventListener(event, hide);
});