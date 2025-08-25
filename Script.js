// Chat history array to keep context
let chatHistory = [];

// Function to add message to chat
function addMessage(sender, text) {
    const chatHistoryDiv = document.getElementById('chatHistory');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.innerHTML = text; // Use innerHTML to support formatted text
    chatHistoryDiv.appendChild(messageDiv);
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight; // Auto-scroll to bottom
    chatHistory.push({ sender, text });
}

// Function to simulate Leth AI's response with "thinking" delay and smarter logic
async function getLethAIResponse(userInput) {
    // Simulate thinking time (1-3 seconds)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

    // Improved response logic: Detect query type and respond accordingly
    userInput = userInput.toLowerCase();

    if (userInput.includes('math') || userInput.match(/\d+/) || userInput.includes('solve')) {
        // Simple math solver example (expand with real math lib or API)
        try {
            const equation = userInput.replace('solve', '').trim();
            const result = eval(equation); // WARNING: eval is insecure; use a parser in production
            return `Let's solve that step-by-step:<br>Equation: ${equation}<br>Result: ${result}<br><br>For complex math, integrate me with a tool like SymPy via API!`;
        } catch (e) {
            return 'Hmm, that math looks tricky. Try rephrasing, or integrate me with xAI API for advanced solving.';
        }
    } else if (userInput.includes('weather')) {
        // Simulate web search tool
        return `Simulating a web search for weather...<br>Weather in NYC: Sunny, 75°F (mock data). For real-time, connect to a weather API!`;
    } else if (userInput.includes('code') || userInput.includes('write code')) {
        // Simulate code execution tool
        return `Here's some sample code for a simple function:<br><pre><code>function helloWorld() {\n  console.log("Hello from Leth AI!");\n}</code></pre><br>Test it in your console. For execution, add a backend interpreter.`;
    } else if (userInput.includes('search') || userInput.includes('what is')) {
        // Simulate search
        return `Searching the web (simulated):<br>Your query: "${userInput}"<br>Result: Leth AI is super-smart! For real searches, use xAI's API or integrate with web tools.`;
    } else if (userInput.includes('who are you') || userInput.includes('about')) {
        return 'I am Leth AI, inspired by Grok from xAI. I adapt my responses—quick for facts, deep for reasoning. I can simulate tools like search, code, and more. To make me truly powerful, integrate with https://x.ai/api.';
    } else {
        // Fallback adaptive responses
        const responses = [
            `Deep dive: That's an interesting query! Here's my reasoned take: ${userInput} could mean many things, but let's explore...`,
            `Quick answer: Yes/No/Maybe? Actually, for "${userInput}", I'd say: [Smart insight here].`,
            `Leth AI thinking hard: Processing... Done! Response: I can handle that by simulating tools.`,
            `Adaptive mode: For simple stuff like this, the answer is straightforward. For deeper, let's reason step-by-step.`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Main send function
async function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    addMessage('user', userInput);
    document.getElementById('userInput').value = ''; // Clear input

    // Show thinking indicator
    const thinking = document.getElementById('thinking');
    thinking.style.display = 'block';

    // Get and add AI response
    const response = await getLethAIResponse(userInput);
    thinking.style.display = 'none';
    addMessage('ai', response);
}

// Enter key to send
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Initial welcome message
addMessage('ai', 'Hello! I\'m Leth AI, your super-smart assistant. Ask me anything—I adapt and can simulate doing basically everything. Try: "Solve 2x + 3 = 7" or "Search for AI news".');
