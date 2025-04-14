const socket = io();
let roomId = "";
let myHand = [];
let selectedCards = [];

function joinRoom() {
  roomId = document.getElementById("roomId").value;
  socket.emit("joinRoom", roomId);
  myHand = getFakeCards();
  renderHand();
}

function getFakeCards() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(`${suit}${rank}`);
    }
  }
  deck.sort(() => Math.random() - 0.5);
  return deck.slice(0, 13);
}

function renderHand() {
  const area = document.getElementById("hand");
  area.innerHTML = "";
  myHand.forEach(card => {
    const btn = document.createElement("button");
    btn.textContent = card;
    btn.onclick = () => toggleCard(card);
    if (selectedCards.includes(card)) {
      btn.style.backgroundColor = "gold";
    }
    area.appendChild(btn);
  });
}

function toggleCard(card) {
  if (selectedCards.includes(card)) {
    selectedCards = selectedCards.filter(c => c !== card);
  } else {
    selectedCards.push(card);
  }
  renderHand();
}

function playCards() {
  if (selectedCards.length === 0) return alert("請選擇要出的牌！");
  alert("你出了：" + selectedCards.join(", "));
  selectedCards = [];
  renderHand();
}

socket.on("updatePlayers", (players) => {
  document.getElementById("playerList").innerText = "目前玩家：" + players.join(", ");
});
