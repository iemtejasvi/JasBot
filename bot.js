// Bot Libre SDK initialization for API use only
SDK.applicationId = "5862133149696133480";
SDK.lang = "en";
var sdk = new SDKConnection();
var web = new WebChatbotListener();
web.connection = sdk;
web.instance = "58247963";

// Overlay quote display for 4 seconds at top center
function displayOverlayQuote(quote) {
  const overlayContainer = document.getElementById("overlay-quote-container");
  const overlay = document.createElement("div");
  overlay.className = "overlay-quote";
  overlay.innerText = quote;
  overlayContainer.appendChild(overlay);
  setTimeout(() => { overlay.remove(); }, 4000);
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
  reply(inputMsg);
  document.getElementById("msg").value = "";
}

function sendMsg(message, right) {
  const msgCon = document.createElement("div");
  if (!right) {
    msgCon.className = "left bot-msg";
    msgCon.innerHTML = "🤖 " + message.replace(/\n/g, "<br>");
    // Removed copy button
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
  setTimeout(() => { sendMsg(`${greetingTime} I'm Brainrot Bot. How can I assist you today?`, false); }, 2000);
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

/* Reply using Bot Libre REST API */
function reply(msg) {
  // Bot Libre REST API endpoint and parameters
  const instance = "58247963"; // Bot Libre bot instance
  const applicationId = "5862133149696133480"; // Your application ID
  const url = "https://www.botlibre.com/rest/json/chat";
  const payload = {
    application: applicationId,
    instance: instance,
    message: msg
  };
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      if (data && data.message) {
        sendMsg(data.message, false);
      } else {
        sendMsg("Sorry, I did not get a response from the bot.", false);
      }
    })
    .catch(() => {
      sendMsg("Sorry, there was an error connecting to the bot.", false);
    });
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
function triggerRandomAnimation() {
  // No rain or other effects
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

// --- New Dog Animation Script ---
(function() {
  function init() {
    const elements = {
      body: document.querySelector('.wrapper'),
      wrapper: document.querySelector('.wrapper'),
      dog: document.querySelector('.dog'),
      marker: document.querySelectorAll('.marker'),
    };
    const animationFrames = {
      rotate: [[0], [1], [2], [3], [5], [3, 'f'], [2, 'f'], [1, 'f']]
    };
    const directionConversions = {
      360: 'up', 45: 'upright', 90: 'right', 135: 'downright', 180: 'down', 225: 'downleft', 270: 'left', 315: 'upleft',
    };
    const angles = [360, 45, 90, 135, 180, 225, 270, 315];
    const defaultEnd = 4;
    const partPositions = [
      {leg1: { x: 26, y: 43 },leg2: { x: 54, y: 43 },leg3: { x: 26, y: 75 },leg4: { x: 54, y: 75 },tail: { x: 40, y: 70, z: 1 }},
      {leg1: { x: 33, y: 56 },leg2: { x: 55, y: 56 },leg3: { x: 12, y: 72 },leg4: { x: 32, y: 74 },tail: { x: 20, y: 64, z: 1 }},
      {leg1: { x: 59, y: 62 },leg2: { x: 44, y: 60 },leg3: { x: 25, y: 64 },leg4: { x: 11, y: 61 },tail: { x: 4, y: 44, z: 1 }},
      {leg1: { x: 39, y: 63 },leg2: { x: 60, y: 56 },leg3: { x: 12, y: 52 },leg4: { x: 28, y: 50 },tail: { x: 7, y: 21, z: 0 }},
      {leg1: { x: 23, y: 54 },leg2: { x: 56, y: 54 },leg3: { x: 24, y: 25 },leg4: { x: 54, y: 25 },tail: { x: 38, y: 2, z: 0 }},
      {leg1: { x: 21, y: 58 },leg2: { x: 41, y: 64 },leg3: { x: 53, y: 50 },leg4: { x: 69, y: 53 },tail: { x: 72, y: 22, z: 0 }},
      {leg1: { x: 22, y: 59 },leg2: { x: 30, y: 64 },leg3: { x: 56, y: 60 },leg4: { x: 68, y: 62 },tail: { x: 78, y: 40, z: 0 }},
      {leg1: { x: 47, y: 45 },leg2: { x: 24, y: 53 },leg3: { x: 68, y: 68 },leg4: { x: 47, y: 73 },tail: { x: 65, y: 65, z: 1 }}
    ];
    const control = {x: null, y: null, angle: null};
    const distance = 30;
    const nearestN = (x, n) => x === 0 ? 0 : (x - 1) + Math.abs(((x - 1) % n) - n);
    const px = num => `${num}px`;
    const radToDeg = rad => Math.round(rad * (180 / Math.PI));
    const degToRad = deg => deg / (180 / Math.PI);
    const overlap = (a, b) => {const buffer = 20; return Math.abs(a - b) < buffer;};
    const rotateCoord = ({ angle, origin, x, y }) => {
      const a = degToRad(angle);
      const aX = x - origin.x;
      const aY = y - origin.y;
      return {
        x: (aX * Math.cos(a)) - (aY * Math.sin(a)) + origin.x,
        y: (aX * Math.sin(a)) + (aY * Math.cos(a)) + origin.y,
      };
    };
    const setStyles = ({ target, h, w, x, y }) => {
      if (h) target.style.height = h;
      if (w) target.style.width = w;
      target.style.transform = `translate(${x || 0}, ${y || 0})`;
    };
    const targetAngle = dog => {
      if (!dog) return;
      const angle = radToDeg(Math.atan2(dog.pos.y - control.y, dog.pos.x - control.x)) - 90;
      const adjustedAngle = angle < 0 ? angle + 360 : angle;
      return nearestN(adjustedAngle, 45);
    };
    const reachedTheGoalYeah = (x, y) => {
      return overlap(control.x , x) && overlap(control.y, y);
    };
    const positionLegs = (dog, frame) => {
      [5, 7, 9, 11].forEach((n, i) => {
        const { x, y } = partPositions[frame][`leg${i + 1}`];
        setStyles({target: dog.childNodes[n], x: px(x), y: px(y)});
      });
    };
    const moveLegs = dog => {
      [5, 11].forEach(i => dog.childNodes[i].childNodes[1].classList.add('walk-1'));
      [7, 9].forEach(i => dog.childNodes[i].childNodes[1].classList.add('walk-2'));
    };
    const stopLegs = dog => {
      [5, 11].forEach(i => dog.childNodes[i].childNodes[1].classList.remove('walk-1'));
      [7, 9].forEach(i => dog.childNodes[i].childNodes[1].classList.remove('walk-2'));
    };
    const positionTail = (dog, frame) => {
      setStyles({target: dog.childNodes[13], x: px(partPositions[frame].tail.x), y: px(partPositions[frame].tail.y)});
      dog.childNodes[13].style.zIndex = partPositions[frame].tail.z;
      dog.childNodes[13].childNodes[1].classList.add('wag');
    };
    const animateDog = ({ target, frameW, currentFrame, end, data, part, speed, direction }) => {
      const offset = direction === 'clockwise' ? 1 : -1;
      target.style.transform = `translateX(${px(data.animation[currentFrame][0] * -frameW)})`;
      if (part === 'body') {
        positionLegs(data.dog, currentFrame);
        moveLegs(data.dog);
        positionTail(data.dog, currentFrame);
      } else {
        target.parentNode.classList.add('happy');
      }
      data.angle = angles[currentFrame];
      data.index = currentFrame;
      target.parentNode.classList[data.animation[currentFrame][1] === 'f' ? 'add' : 'remove']('flip');
      let nextFrame = currentFrame + offset;
      nextFrame = nextFrame === -1 ? data.animation.length - 1 : nextFrame === data.animation.length ? 0 : nextFrame;
      if (currentFrame !== end) {
        data.timer[part] = setTimeout(()=> animateDog({target, data, part, frameW, currentFrame: nextFrame, end, direction, speed}), speed || 150);
      } else if (part === 'body') {
        control.angle = angles[end];
        data.walk = true;
        setTimeout(()=> {stopLegs(data.dog);}, 200);
        setTimeout(()=> {document.querySelector('.happy')?.classList.remove('happy');}, 5000);
      }
    };
    const triggerDogAnimation = ({ target, frameW, start, end, data, speed, part, direction }) => {
      clearTimeout(data.timer[part]);
      data.timer[part] = setTimeout(()=> animateDog({target, data, part, frameW, currentFrame: start, end, direction, speed}), speed || 150);
    };
    const getDirection = ({ pos, facing, target }) => {
      const dx2 = facing.x - pos.x;
      const dy1 = pos.y - target.y;
      const dx1 = target.x - pos.x;
      const dy2 = pos.y - facing.y;
      return dx2 * dy1 > dx1 * dy2 ? 'anti-clockwise' : 'clockwise';
    };
    const turnDog = ({ dog, start, end, direction }) => {
      triggerDogAnimation({target: dog.dog.childNodes[3].childNodes[1], frameW: 31 * 2, start, end, data: dog, speed: 100, direction, part: 'head'});
      setTimeout(()=>{
        triggerDogAnimation({target: dog.dog.childNodes[1].childNodes[1], frameW: 48 * 2, start, end, data: dog, speed: 100, direction, part: 'body'});
      }, 200);
    };
    const createDog = () => {
      const { dog } = elements;
      const { width, height, left, top } = dog.getBoundingClientRect();
      dog.style.left = px(left);
      dog.style.top = px(top);
      positionLegs(dog, 0);
      const index = 0;
      const dogData = {
        timer: {head: null, body: null, all: null},
        pos: {x: left + (width / 2), y: top + (height / 2)},
        actualPos: {x: left, y: top},
        facing: {x: left + (width / 2), y: top + (height / 2) + 30},
        animation: animationFrames.rotate,
        angle: 360,
        index,
        dog,
      };
      elements.dog = dogData;
      turnDog({dog: dogData, start: index, end: defaultEnd, direction: 'clockwise'});
      positionTail(dog, 0);
    };
    const checkBoundaryAndUpdateDogPos = (x, y, dog, dogData) => {
      const lowerLimit = -40;
      const upperLimit = 40;
      if (x > lowerLimit && x < (elements.body.clientWidth - upperLimit)){
        dogData.pos.x = x + 48;
        dogData.actualPos.x = x;
      }
      if (y > lowerLimit && y < (elements.body.clientHeight - upperLimit)){
        dogData.pos.y = y + 48;
        dogData.actualPos.y = y;
      }
      dog.style.left = px(x);
      dog.style.top = px(y);
    };
    const positionMarker = (i, pos) => {
      elements.marker[i].style.left = px(pos.x);
      elements.marker[i].style.top = px(pos.y);
    };
    const moveDog = () => {
      clearInterval(elements.dog.timer.all);
      const { dog } = elements.dog;
      elements.dog.timer.all = setInterval(()=> {
        const { left, top } = dog.getBoundingClientRect();
        const start = angles.indexOf(elements.dog.angle);
        const end = angles.indexOf(targetAngle(elements.dog));
        if (reachedTheGoalYeah(left + 48, top + 48)) {
          clearInterval(elements.dog.timer.all);
          const { x, y } = elements.dog.actualPos;
          dog.style.left = px(x);
          dog.style.top = px(y);
          stopLegs(dog);
          turnDog({dog: elements.dog, start, end: defaultEnd, direction: 'clockwise'});
          return;
        }
        let { x, y } = elements.dog.actualPos;
        const dir = directionConversions[targetAngle(elements.dog)];
        if (dir !== 'up' && dir !== 'down') x += (dir.includes('left')) ? -distance : distance;
        if (dir !== 'left' && dir !== 'right') y += (dir.includes('up')) ? -distance : distance;
        positionMarker(0, elements.dog.pos);
        positionMarker(1, control);
        const { x: x2, y: y2 } = rotateCoord({angle: elements.dog.angle, origin: elements.dog.pos, x: elements.dog.pos.x, y: elements.dog.pos.y - 100});
        elements.dog.facing.x = x2;
        elements.dog.facing.y = y2;
        positionMarker(2, elements.dog.facing);
        if (start === end) {
          elements.dog.turning = false;
        }
        if (!elements.dog.turning && elements.dog.walk) {
          if (start !== end) {
            elements.dog.turning = true;
            const direction = getDirection({pos: elements.dog.pos, facing: elements.dog.facing, target: control});
            turnDog({dog: elements.dog, start, end, direction});
          } else {
            checkBoundaryAndUpdateDogPos(x, y, dog, elements.dog);
            moveLegs(dog);
          }
        }
      }, 200);
    };
    createDog();
    const triggerTurnDog = () => {
      const dog = elements.dog;
      dog.walk = false;
      control.angle = null;
      const direction = getDirection({pos: dog.pos, facing: dog.facing, target: control});
      const start = angles.indexOf(dog.angle);
      const end = angles.indexOf(targetAngle(dog));
      turnDog({dog, start, end, direction});
    };
    // Remove mousemove and click event listeners for the dog
    // elements.body.addEventListener('mousemove', e => {
    //   control.x = e.pageX;
    //   control.y = e.pageY;
    //   triggerTurnDog();
    // });
    // elements.body.addEventListener('click', moveDog);
    // Add random movement interval
    setInterval(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const randX = Math.floor(Math.random() * (w - 100)) + 50;
      const randY = Math.floor(Math.random() * (h - 200)) + 100;
      control.x = randX;
      control.y = randY;
      // Simulate a click to move the dog
      if (typeof moveDog === 'function') moveDog();
    }, 3000);
  }
  window.addEventListener('DOMContentLoaded', init);
})();
// --- End New Dog Animation Script ---
