function askLethAI() {
    const userInput = document.getElementById('userInput').value;
    const responseBox = document.getElementById('response');

    if (!userInput) {
        responseBox.innerHTML = "Please ask me something!";
        return;
    }

    // Simulate Leth AI's super-smart response
    const responses = [
        "I'm processing that at light speed! Here's my take: *brilliant solution incoming*.",
        "Wow, that's a great question! Leth AI says: I can do *anything*, so let's dive into that.",
        "Analyzing... Done! Here's what I think: *insert cosmic-level wisdom*.",
        "Leth AI at your service! For that, I'd suggest: *mind-blowing idea*."
    ];

    // Pick a random response for fun
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    responseBox.innerHTML = `You asked: "${userInput}"<br>Leth AI: ${randomResponse}`;
}
