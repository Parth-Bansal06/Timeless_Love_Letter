document.addEventListener("DOMContentLoaded", () => {
    const typewriterText = document.getElementById("typewriter");
    const postcard = document.getElementById("postcard");
    const hiddenMessage = document.getElementById("hiddenMessage");
    const bgMusic = document.getElementById("bgMusic");

    const poem = [
        "To my dearest,",
        "The stars above pale in comparison to your light,",
        "Your eyes, like twilight, shimmer so bright.",
        "Each moment with you is a dream come true,",
        "Forever and always, I’ll cherish you."
    ];

    let lineIndex = 0;
    let charIndex = 0;
    const typewriterSound = new Audio("typewriter.mp3");

    function playTypewriterSound() {
        typewriterSound.loop = true;
        typewriterSound.play();
    }

    function stopTypewriterSound() {
        typewriterSound.pause();
        typewriterSound.currentTime = 0;
        typewriterSound.loop = false;
    }

    function playBackgroundMusic() {
        bgMusic.play().catch(error => {
            console.log("Autoplay blocked. Music will play after user interaction.");
        });
    }

    document.addEventListener("click", () => {
        playBackgroundMusic(); // Start music on first click
    }, { once: true });

    function typePoem() {
        if (lineIndex === 0 && charIndex === 0) {
            playTypewriterSound();
            startHearts();
        }

        if (lineIndex < poem.length) {
            if (charIndex < poem[lineIndex].length) {
                typewriterText.innerHTML += poem[lineIndex][charIndex];
                charIndex++;
                setTimeout(typePoem, 100);
            } else {
                typewriterText.innerHTML += "<br>";
                charIndex = 0;
                lineIndex++;
                setTimeout(typePoem, 500);
            }
        } else {
            stopTypewriterSound();
            stopHeartsAndFormFlower();
        }
    }

    typePoem();

    postcard.addEventListener("click", () => {
        postcard.classList.toggle("flipped");
        if (postcard.classList.contains("flipped")) {
            hiddenMessage.style.opacity = "1";
            hiddenMessage.textContent = "I’m glad you opened this. You make my heart flutter.";
        } else {
            hiddenMessage.style.opacity = "0";
        }
    });
});
function startHearts() {
    heartInterval = setInterval(createHeart, 500); // Start hearts every 0.5s
}
