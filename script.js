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
    let heartInterval;

    // Function to create floating hearts
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }

    // Start the floating hearts
    function startHearts() {
        heartInterval = setInterval(createHeart, 500);
    }

    // Stop the floating hearts and form a flower
    function stopHeartsAndFormFlower() {
        clearInterval(heartInterval);

        // Remove floating hearts
        document.querySelectorAll(".heart").forEach((heart) => {
            heart.style.animation = "none";
            heart.style.position = "fixed";
            heart.style.left = "50%";
            heart.style.top = "50%";
            heart.style.transform = "translate(-50%, -50%)";
            heart.style.fontSize = "40px";
            heart.style.textShadow = "0px 0px 10px pink";
        });

        // After 1 second, replace hearts with a flower
        setTimeout(() => {
            document.querySelectorAll(".heart").forEach((heart) => heart.remove());

            const flower = document.createElement("div");
            flower.innerHTML = "🌸";
            flower.style.position = "fixed";
            flower.style.left = "75%";
            flower.style.top = "80%";
            flower.style.transform = "translate(-50%, -50%) scale(2)";
            flower.style.fontSize = "100px";
            flower.style.color = "#ff4d6d";
            flower.style.textShadow = "0px 0px 15px #ff99aa, 0px 0px 30px #ff4d6d";
            document.body.appendChild(flower);
        }, 1000);
    }

    // Type the poem line by line
    function typePoem() {
        if (lineIndex === 0 && charIndex === 0) {
            bgMusic.play().catch((error) => console.log("Music play issue:", error));
            playTypewriterSound();
            startHearts(); // Start floating hearts
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
            stopHeartsAndFormFlower(); // Stop hearts and form a flower
        }
    }

    // Typewriter sound
    function playTypewriterSound() {
        typewriterSound.loop = true;
        typewriterSound.play();
    }

    function stopTypewriterSound() {
        typewriterSound.pause();
        typewriterSound.currentTime = 0;
    }

    // Start the poem
    typePoem();

    // Flip postcard on click
    postcard.addEventListener("click", () => {
        postcard.classList.toggle("flipped");

        // Show message only when flipped
        if (postcard.classList.contains("flipped")) {
            hiddenMessage.style.opacity = "1";
            hiddenMessage.textContent = "I’m glad you opened this. You make my heart flutter.";
        } else {
            hiddenMessage.style.opacity = "0";
        }
    });

    // Play background music only after user interaction
    document.body.addEventListener("click", () => {
        bgMusic.play().catch((error) => console.error("Audio play failed:", error));
    });
});
