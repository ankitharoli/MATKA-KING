const games = [
  {name: "JAIPUR MATKA", time: "12:55"},
  {name: "SADAR BAZAR", time: "13:30"},
  {name: "GWALIOR", time: "14:30"},
  {name: "DELHI BAZAR", time: "15:00"},
  {name: "SHREE GANESH", time: "16:25"},
  {name: "SURAT BAZAR", time: "17:25"},
  {name: "FARIDABAD", time: "17:55"},
  {name: "FARIDKOT", time: "19:30"},
  {name: "GAZIABAD", time: "21:30"},
  {name: "DWARKA", time: "22:25"},
  {name: "GALI", time: "23:30"},
  {name: "DISAWAR", time: "01:30"}
];

let results = JSON.parse(localStorage.getItem('matkaResults')) || {};

function startClock() {
  setInterval(() => {
    const time = new Date().toLocaleTimeString('en-IN', { hour12: false });
    document.getElementById('clock').textContent = time;
  }, 1000);
}

function renderGames() {
  const container = document.getElementById('gameList');
  container.innerHTML = `<h2 style="text-align:center; color:#ffd700; margin:20px 0;">Today's Timetable</h2>`;

  games.forEach(game => {
    const result = results[game.name] || "---";
    const div = document.createElement('div');
    div.className = `game-item ${Math.random() > 0.6 ? 'active' : ''}`;
    div.innerHTML = `
      <div><strong>\( {game.name}</strong><br><small style="color:#aaa;"> \){game.time}</small></div>
      <div style="font-size:1.6rem; color:#ffd700; font-weight:bold;">${result}</div>
    `;
    container.appendChild(div);
  });
}

function openAdminPanel() {
  const pass = prompt("Enter Admin Password:");
  if (pass !== "ankit123") return alert("❌ Wrong Password");

  let html = `<h2>Admin Panel</h2>`;
  games.forEach(game => {
    const current = results[game.name] || "";
    html += `<div style="margin:15px 0;"><strong>${game.name}</strong><br>
             <input type="text" id="inp-\( {game.name}" value=" \){current}" style="width:100%;padding:10px;font-size:1.1rem;"></div>`;
  });
  html += `<button onclick="saveResults()" style="padding:15px 40px;width:100%;font-size:1.2rem;">SAVE ALL</button>`;

  const win = window.open("", "_blank", "width=450,height=750");
  win.document.write(html);
}

function saveResults() {
  games.forEach(game => {
    const val = document.getElementById(`inp-${game.name}`);
    if (val && val.value) results[game.name] = val.value;
  });
  localStorage.setItem('matkaResults', JSON.stringify(results));
  alert("✅ Saved Successfully!");
  window.opener.location.reload();
}

startClock();
renderGames();
