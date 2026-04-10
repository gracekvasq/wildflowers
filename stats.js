let players = [
  { name: "Player 1", AB: 10, H: 5, BB: 2, TB: 8 },
  { name: "Player 2", AB: 8, H: 3, BB: 1, TB: 5 },
  { name: "Player 3", AB: 12, H: 7, BB: 0, TB: 10 },
];

function calculateStats() {
  players.forEach(p => {
    p.AVG = (p.H / p.AB || 0).toFixed(3);
    p.OBP = ((p.H + p.BB) / (p.AB + p.BB) || 0).toFixed(3);
    p.SLG = (p.TB / p.AB || 0).toFixed(3);
    p.OPS = (parseFloat(p.OBP) + parseFloat(p.SLG)).toFixed(3);
  });
}

function renderTable(data) {
  const tbody = document.querySelector("#statsTable tbody");
  tbody.innerHTML = "";

  data.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.AB}</td>
      <td>${p.H}</td>
      <td>${p.BB}</td>
      <td>${p.AVG}</td>
      <td>${p.OBP}</td>
      <td>${p.SLG}</td>
      <td>${p.OPS}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderLeaders() {
  const leadersDiv = document.getElementById("leaders");

  const topAVG = [...players].sort((a,b)=>b.AVG-a.AVG)[0];
  const topH = [...players].sort((a,b)=>b.H-a.H)[0];
  const topOPS = [...players].sort((a,b)=>b.OPS-a.OPS)[0];

  leadersDiv.innerHTML = `
    <div class="card">AVG Leader<br>${topAVG.name} (${topAVG.AVG})</div>
    <div class="card">Hits Leader<br>${topH.name} (${topH.H})</div>
    <div class="card">OPS Leader<br>${topOPS.name} (${topOPS.OPS})</div>
  `;
}

function sortTable(key) {
  players.sort((a,b) => {
    if (key === "name") return a.name.localeCompare(b.name);
    return b[key] - a[key];
  });
  renderTable(players);
}

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = players.filter(p => p.name.toLowerCase().includes(value));
  renderTable(filtered);
});

calculateStats();
renderLeaders();
renderTable(players);
