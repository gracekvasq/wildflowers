const players = [
  { name: "Player 1", AB: 10, H: 5, BB: 2 },
  { name: "Player 2", AB: 8, H: 3, BB: 1 },
  { name: "Player 3", AB: 12, H: 7, BB: 0 },
];

// Calculate stats
players.forEach(p => {
  p.AVG = (p.H / p.AB).toFixed(3);
  p.OBP = ((p.H + p.BB) / (p.AB + p.BB)).toFixed(3);
});

// Find leader
const topAvg = Math.max(...players.map(p => parseFloat(p.AVG)));

const tbody = document.querySelector("#statsTable tbody");

players.forEach(p => {
  const row = document.createElement("tr");

  if (parseFloat(p.AVG) === topAvg) {
    row.classList.add("leader");
  }

  row.innerHTML = `
    <td>${p.name}</td>
    <td>${p.AB}</td>
    <td>${p.H}</td>
    <td>${p.BB}</td>
    <td>${p.AVG}</td>
    <td>${p.OBP}</td>
  `;

  tbody.appendChild(row);
});
