const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span"); 


let userMessage;
const API_KEY = "86313db55dmsha7bfc8769d127e7p1ab6cejsnb8deb6801fff";

const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            'x-rapidapi-key': '1506507a57msh0bf52594b4a5213p1a2b83jsn6dbf411aba23',
		    'x-rapidapi-host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com',
		    'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: userMessage
        })
    };

    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                messageElement.textContent = data.response;
            } else {
                messageElement.textContent = "No response received.";
            }
        })
        .catch(error => {
            console.error('Error fetching AI response:', error);
            messageElement.textContent = "Oops! Something went wrong.";
        }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}



const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


