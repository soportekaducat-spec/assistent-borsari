```javascript
// ASISTENTE BURSÁTIL
// Preparado para conectar datos reales mediante un servicio seguro.
// IMPORTANTE: todavía no hay cotizaciones reales conectadas.

const demoRows = [
  {
    ticker: "AAPL",
    name: "Apple",
    market: "EE. UU.",
    trend: "Sin datos",
    entry: "—",
    stop: "—",
    target: "—",
    note: "Pendiente de conectar datos reales",
    status: "wait"
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    market: "EE. UU.",
    trend: "Sin datos",
    entry: "—",
    stop: "—",
    target: "—",
    note: "Pendiente de conectar datos reales",
    status: "wait"
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    market: "EE. UU.",
    trend: "Sin datos",
    entry: "—",
    stop: "—",
    target: "—",
    note: "Pendiente de conectar datos reales",
    status: "wait"
  },
  {
    ticker: "SAN.MC",
    name: "Banco Santander",
    market: "España",
    trend: "Sin datos",
    entry: "—",
    stop: "—",
    target: "—",
    note: "Pendiente de conectar datos reales",
    status: "wait"
  },
  {
    ticker: "IBE.MC",
    name: "Iberdrola",
    market: "España",
    trend: "Sin datos",
    entry: "—",
    stop: "—",
    target: "—",
    note: "Pendiente de conectar datos reales",
    status: "wait"
  }
];

const tbody = document.getElementById("opportunities");
const filter = document.getElementById("marketFilter");

function render() {
  if (!tbody || !filter) return;

  const selected = filter.value;
  tbody.innerHTML = "";

  const rows = demoRows.filter(row =>
    selected === "Todos" || row.market === selected
  );

  rows.forEach(row => {
    const tr = document.createElement("tr");

    const tickerCell = document.createElement("td");
    const ticker = document.createElement("span");
    ticker.className = "ticker";
    ticker.textContent = row.ticker;

    const name = document.createElement("span");
    name.className = "sub";
    name.textContent = row.name;

    tickerCell.append(ticker, name);

    const trendCell = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = "pill wait";
    pill.textContent = row.trend;
    trendCell.appendChild(pill);

    tr.append(
      tickerCell,
      trendCell,
      createCell(row.entry),
      createCell(row.stop),
      createCell(row.target),
      createCell(row.note)
    );

    tbody.appendChild(tr);
  });
}

function createCell(value) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

if (filter) {
  filter.addEventListener("change", render);
}

render();

// Notificaciones del navegador
async function requestNotifications() {
  if (!("Notification" in window)) {
    alert("Este navegador no admite notificaciones web.");
    return;
  }

  try {
    const result = await Notification.requestPermission();

    if (result === "granted") {
      new Notification("Asistente bursátil", {
        body: "Notificaciones activadas. Las alertas de mercado estarán disponibles cuando se conecten los datos reales."
      });

      const button = document.getElementById("notifyBtn");
      if (button) button.textContent = "Avisos permitidos";
    } else {
      alert("No se han permitido las notificaciones. Puedes activarlas en los ajustes del navegador.");
    }
  } catch (error) {
    alert("No se ha podido activar la notificación en este navegador.");
  }
}

const notifyBtn = document.getElementById("notifyBtn");
if (notifyBtn) {
  notifyBtn.addEventListener("click", requestNotifications);
}

// Notificación de prueba
const testBtn = document.getElementById("testBtn");

if (testBtn) {
  testBtn.addEventListener("click", () => {
    if (!("Notification" in window)) {
      alert("Este navegador no admite notificaciones web.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Notificación de prueba", {
        body: "Las notificaciones funcionan. Las cotizaciones y señales reales todavía no están conectadas."
      });

      const history = document.getElementById("alertHistory");
      if (history) {
        history.textContent =
          "Prueba enviada. Pendiente de conectar cotizaciones y análisis automáticos.";
      }
    } else {
      alert("Primero pulsa «Activar avisos» y concede permiso al navegador.");
    }
  });
}

// Registro del service worker
if ("serviceWorker" in navigator &&
    location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(error => {
        console.warn("No se pudo registrar el service worker:", error);
      });
  });
}
```

