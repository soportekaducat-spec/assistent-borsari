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

// Elementos de la tabla y del filtro
const tbody = document.getElementById("opportunities");
const filter = document.getElementById("marketFilter");

// Mostrar las oportunidades
function render() {
  if (!tbody || !filter) {
    console.error(
      "No se encuentra la tabla de oportunidades o el filtro de mercado."
    );
    return;
  }

  const selected = filter.value.trim().toLowerCase();

  // Limpiar las filas anteriores
  tbody.innerHTML = "";

  // Filtrar las acciones según el mercado seleccionado
  const rows = demoRows.filter(row =>
    !selected ||
    ["todos", "all", "tots"].includes(selected) ||
    row.market.toLowerCase() === selected
  );

  // Crear una fila para cada acción
  rows.forEach(row => {
    const tr = document.createElement("tr");

    // Columna del ticker y nombre
    const tickerCell = document.createElement("td");

    const ticker = document.createElement("span");
    ticker.className = "ticker";
    ticker.textContent = row.ticker;

    const name = document.createElement("span");
    name.className = "sub";
    name.textContent = row.name;

    tickerCell.append(ticker, name);

    // Columna de tendencia
    const trendCell = document.createElement("td");

    const pill = document.createElement("span");
    pill.className = "pill wait";
    pill.textContent = row.trend;

    trendCell.appendChild(pill);

    // Añadir todas las columnas a la fila
    tr.append(
      tickerCell,
      trendCell,
      createCell(row.entry),
      createCell(row.stop),
      createCell(row.target),
      createCell(row.note)
    );

    // Añadir la fila a la tabla
    tbody.appendChild(tr);
  });

  console.log("Acciones mostradas:", rows.length);
}

// Crear una celda de la tabla
function createCell(value) {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
}

// Actualizar la tabla cuando cambia el filtro
if (filter) {
  filter.addEventListener("change", render);
}

// Mostrar las acciones al iniciar
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
        body:
          "Notificaciones activadas. Las alertas de mercado estarán disponibles cuando se conecten los datos reales."
      });

      const button = document.getElementById("notifyBtn");

      if (button) {
        button.textContent = "Avisos permitidos";
      }
    } else {
      alert(
        "No se han permitido las notificaciones. Puedes activarlas en los ajustes del navegador."
      );
    }
  } catch (error) {
    console.error("Error al solicitar notificaciones:", error);

    alert(
      "No se ha podido activar la notificación en este navegador."
    );
  }
}

// Botón para activar las notificaciones
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
        body:
          "Las notificaciones funcionan. Las cotizaciones y señales reales todavía no están conectadas."
      });

      const history = document.getElementById("alertHistory");

      if (history) {
        history.textContent =
          "Prueba enviada. Pendiente de conectar cotizaciones y análisis automáticos.";
      }
    } else {
      alert(
        "Primero pulsa «Activar avisos» y concede permiso al navegador."
      );
    }
  });
}

// Registro del service worker
if (
  "serviceWorker" in navigator &&
  location.protocol.startsWith("http")
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(error => {
        console.warn(
          "No se pudo registrar el service worker:",
          error
        );
      });
  });
}
