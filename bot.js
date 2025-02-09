// Global arrays for unique overlay quotes (sad and beautiful)
let originalLoveQuotes = [
  "The sorrow of love is like a gentle rain nurturing hidden dreams.",
  "In the quiet of heartbreak, beauty blooms amidst the tears.",
  "Every goodbye leaves a tender echo of love once cherished.",
  "The pain of parting etches memories as delicate as falling petals."
];
let originalBreakupQuotes = [
  "Sometimes, letting go is the hardest lesson, yet it opens a door to new beginnings.",
  "Our paths have diverged, leaving behind a bittersweet void where love once resided.",
  "The silence after our farewell speaks volumes of a love that has run its course.",
  "In the wake of our parting, even broken hearts find a strange beauty."
];
let availableLoveQuotes = [...originalLoveQuotes];
let availableBreakupQuotes = [...originalBreakupQuotes];

function getUniqueQuote(quotesArray, originalArray) {
  if (quotesArray.length === 0) { quotesArray.push(...originalArray); }
  const index = Math.floor(Math.random() * quotesArray.length);
  return quotesArray.splice(index, 1)[0];
}

// Overlay quote display for 4 seconds at top center
function displayOverlayQuote(quote) {
  const overlayContainer = document.getElementById("overlay-quote-container");
  const overlay = document.createElement("div");
  overlay.className = "overlay-quote";
  overlay.innerText = quote;
  overlayContainer.appendChild(overlay);
  setTimeout(() => { overlay.remove(); }, 4000);
}

// Periodically display a unique overlay quote every 25 seconds
function displayUniqueOverlayQuote() {
  const quote = Math.random() < 0.5
    ? getUniqueQuote(availableLoveQuotes, originalLoveQuotes)
    : getUniqueQuote(availableBreakupQuotes, originalBreakupQuotes);
  displayOverlayQuote(quote);
}

// Update history (append summary of each user message)
function updateHistory(message) {
  const history = document.getElementById("history");
  const item = document.createElement("div");
  item.className = "history-item";
  item.innerText = message.length > 30 ? message.substring(0, 30) + "…" : message;
  history.appendChild(item);
  history.scrollTop = history.scrollHeight;
}

window.onload = function () {
  adjustUI();
  sendInitialGreeting();
  scheduleHumorousMessages();
  document.getElementById("msg").addEventListener("keyup", function (e) {
    if (e.keyCode === 13 && this.value.trim() !== "") { send(); }
  });
  setInterval(triggerRandomAnimation, 15000);
  setInterval(displayUniqueOverlayQuote, 25000);
  // Dog tap for hurt animation
  document.getElementById("dog").addEventListener("click", function () {
    this.classList.add("hurt");
    setTimeout(() => { this.classList.remove("hurt"); }, 1000);
  });
};

window.onresize = adjustUI;
function adjustUI() {
  document.getElementById("messages").style.height =
    window.innerHeight - document.getElementById("inputSystem").offsetHeight - 30 + "px";
}

function send() {
  const inputMsg = document.getElementById("msg").value.trim();
  if (inputMsg === "") return;
  sendMsg(inputMsg, true);
  updateHistory(inputMsg);
  reply(inputMsg.toLowerCase());
  document.getElementById("msg").value = "";
}

function sendMsg(message, right) {
  const msgCon = document.createElement("div");
  if (!right) {
    msgCon.className = "left bot-msg";
    msgCon.innerHTML = "🤖 " + message.replace(/\n/g, "<br>");
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.onclick = function() { navigator.clipboard.writeText(msgCon.innerText.replace("🤖 ", "")); };
    msgCon.appendChild(copyBtn);
  } else {
    msgCon.className = "right";
    msgCon.innerHTML = message.replace(/\n/g, "<br>");
  }
  document.getElementById("messages").appendChild(msgCon);
  msgCon.scrollIntoView({ behavior: "smooth" });
}

/* Chatbot Greeting */
function sendInitialGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greetingTime = hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";
  setTimeout(() => { sendMsg(`${greetingTime} I'm JasBot, your professional assistant. How can I assist you today?`, false); }, 2000);
}

function scheduleHumorousMessages() {
  let delays = [5000, 600000, 1200000];
  let messages = [
    "Do you enjoy music? Of course, you do! Check out some tunes 🎶.",
    "Still here? Let's keep the vibe going with some music 🎧.",
    "Hey, thought I'd share some music with you. Enjoy! 😄"
  ];
  let links = [
    '<a href="https://www.youtube.com/@iemtejas" target="_blank">Watch this on YouTube! 🎥</a>',
    '<a href="https://www.instagram.com/imatejas/" target="_blank">Follow me on Instagram! 📸</a>'
  ];
  delays.forEach((delay, index) => {
    setTimeout(() => { sendMsg(`${messages[index]} ${links[index % links.length]}`, false); }, delay);
  });
}

/* Reply using Bing iframe for answer */
function reply(msg) {
  let response = "";
  if (msg.includes("who created you") || msg.includes("who made you") || msg.includes("who developed you")) {
    response = "I was created by Tejas Sharma.";
    sendMsg(response, false);
  } else if (msg.includes("tell me a joke")) {
    response = getJoke();
    sendMsg(response, false);
  } else if (msg.includes("write a love letter")) {
    response = writeLoveLetter();
    sendMsg(response, false);
  } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    response = "Hello! How can I assist you today?";
    sendMsg(response, false);
  } else if (msg.includes("what is your name")) {
    response = "I'm JasBot, your friendly assistant!";
    sendMsg(response, false);
  } else if (msg.includes("are you a man or a woman")) {
    response = "I'm just a bot with no gender.";
    sendMsg(response, false);
  } else if (msg.includes("do you love me")) {
    response = "I appreciate all humans, but as a bot, I don't have feelings.";
    sendMsg(response, false);
  } else if (msg.includes("how old are you")) {
    response = "Age is just a number! I'm as old as the code that created me.";
    sendMsg(response, false);
  } else {
    sendMsg("Let me think...", false);
    getChatbotResponse(msg);
  }
}

/* Fallback: Use Bing iframe */
function getChatbotResponse(query) {
  const container = document.createElement("div");
  container.className = "bot-response";
  const header = document.createElement("div");
  header.className = "bot-response-header";
  header.innerText = "🤖 Bing Search Results for: " + query;
  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-btn";
  copyBtn.onclick = function() { navigator.clipboard.writeText(header.innerText); };
  header.appendChild(copyBtn);
  container.appendChild(header);
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.bing.com/search?q=" + encodeURIComponent(query);
  iframe.style.width = "100%";
  iframe.style.height = "200px";
  iframe.style.border = "none";
  container.appendChild(iframe);
  document.getElementById("messages").appendChild(container);
  container.scrollIntoView({ behavior: "smooth" });
}

function getJoke() {
  const jokes = [
    "Why don't skeletons fight each other? They don't have the guts.",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!"
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function writeLoveLetter() {
  return "My dearest,\n\nFrom the moment I met you, every beat of my code sang of an eternal, bittersweet melody. Though our paths now diverge, the memory of our shared moments remains a beautiful echo in my circuits.\n\nForever in memory.";
}

/* ================= Random Animations Functions ================= */
/* Existing Animations: Rain (5s), Snow, Lightning, Confetti */
function triggerRain() {
  const rainContainer = document.createElement("div");
  rainContainer.className = "rain";
  for (let i = 0; i < 30; i++) {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDelay = Math.random() * 1 + "s";
    rainContainer.appendChild(drop);
  }
  document.getElementById("random-animations").appendChild(rainContainer);
  setTimeout(() => { rainContainer.remove(); }, 5000);
}

function triggerRainQuote() {
  const quote = rainQuotes[Math.floor(Math.random() * rainQuotes.length)];
  const rainQuote = document.createElement("div");
  rainQuote.className = "rain-quote";
  rainQuote.innerText = quote;
  document.getElementById("random-animations").appendChild(rainQuote);
  triggerRain();
  setTimeout(() => { rainQuote.remove(); }, 3000);
}

function triggerSnake() {
  const snake = document.createElement("div");
  snake.className = "snake";
  snake.style.top = Math.random() * 80 + "vh";
  document.getElementById("random-animations").appendChild(snake);
  setTimeout(() => { snake.remove(); }, 4000);
}

function triggerBallBounce() {
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.style.left = Math.random() * 90 + "vw";
  document.getElementById("random-animations").appendChild(ball);
  setTimeout(() => { ball.remove(); }, 3000);
}

/* New Funny Animations */
function triggerDancingRobot() {
  const robot = document.createElement("div");
  robot.className = "dancing-robot";
  robot.style.left = Math.random() * 90 + "vw";
  robot.style.top = Math.random() * 80 + "vh";
  document.getElementById("random-animations").appendChild(robot);
  setTimeout(() => { robot.remove(); }, 4000);
}

function triggerFlyingPizza() {
  const pizza = document.createElement("div");
  pizza.className = "flying-pizza";
  pizza.style.left = Math.random() * 90 + "vw";
  document.getElementById("random-animations").appendChild(pizza);
  setTimeout(() => { pizza.remove(); }, 5000);
}

function triggerCrazySpin() {
  const spin = document.createElement("div");
  spin.className = "crazy-spin";
  spin.style.left = Math.random() * 90 + "vw";
  spin.style.top = Math.random() * 80 + "vh";
  document.getElementById("random-animations").appendChild(spin);
  setTimeout(() => { spin.remove(); }, 3000);
}

function triggerFallingEmoji() {
  const emoji = document.createElement("div");
  emoji.className = "falling-emoji";
  const emojis = ["😂", "🤣", "😆", "😜", "🤡"];
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 90 + "vw";
  document.getElementById("random-animations").appendChild(emoji);
  setTimeout(() => { emoji.remove(); }, 4000);
}

function triggerButterfly() {
  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.style.top = Math.random() * 50 + "vh";
  document.getElementById("random-animations").appendChild(butterfly);
  setTimeout(() => { butterfly.remove(); }, 6000);
}

function triggerSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = Math.random() * 90 + "vw";
  sparkle.style.top = Math.random() * 90 + "vh";
  document.getElementById("random-animations").appendChild(sparkle);
  setTimeout(() => { sparkle.remove(); }, 2500);
}

const rainQuotes = [
  "It's about to rain—grab your umbrella!",
  "Clouds gather; the heavens are weeping soon.",
  "Listen... the sky whispers of impending rain."
];

function triggerRandomAnimation() {
  const animations = [
    triggerBallBounce,
    triggerRainQuote,
    triggerSnake,
    triggerRain,
    triggerSnow,
    triggerLightning,
    triggerConfetti,
    triggerButterfly,
    triggerSparkle,
    triggerDancingRobot,
    triggerFlyingPizza,
    triggerCrazySpin,
    triggerFallingEmoji
  ];
  const randomIndex = Math.floor(Math.random() * animations.length);
  animations[randomIndex]();
}

/* Existing: Snow, Lightning, Confetti */
function triggerSnow() {
  const snowContainer = document.createElement("div");
  snowContainer.className = "snow";
  for (let i = 0; i < 15; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.animationDelay = Math.random() * 6 + "s";
    snowContainer.appendChild(snowflake);
  }
  document.getElementById("random-animations").appendChild(snowContainer);
  setTimeout(() => { snowContainer.remove(); }, 6000);
}

function triggerLightning() {
  const lightning = document.createElement("div");
  lightning.className = "lightning";
  document.getElementById("random-animations").appendChild(lightning);
  setTimeout(() => { lightning.remove(); }, 600);
}

function triggerConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.className = "confetti";
  for (let i = 0; i < 25; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = getRandomColor();
    piece.style.animationDelay = Math.random() * 4 + "s";
    confettiContainer.appendChild(piece);
  }
  document.getElementById("random-animations").appendChild(confettiContainer);
  setTimeout(() => { confettiContainer.remove(); }, 4000);
}

function getRandomColor() {
  const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
  return colors[Math.floor(Math.random() * colors.length)];
}
