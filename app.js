const demoRows = [
  {ticker:"AAPL", name:"Apple (DEMO)", market:"EE. UU.", trend:"Alcista", entry:"—", stop:"—", target:"—", note:"Esperar datos reales", status:"wait"},
  {ticker:"MSFT", name:"Microsoft (DEMO)", market:"EE. UU.", trend:"Lateral", entry:"—", stop:"—", target:"—", note:"Sin señal validada", status:"wait"},
  {ticker:"NVDA", name:"NVIDIA (DEMO)", market:"EE. UU.", trend:"Alcista", entry:"—", stop:"—", target:"—", note:"Esperar confirmación", status:"wait"},
  {ticker:"SAN.MC", name:"Banco Santander (DEMO)", market:"España", trend:"Alcista", entry:"—", stop:"—", target:"—", note:"Esperar datos reales", status:"wait"},
  {ticker:"IBE.MC", name:"Iberdrola (DEMO)", market:"España", trend:"Lateral", entry:"—", stop:"—", target:"—", note:"Sin señal validada", status:"wait"}
];
const tbody = document.getElementById("opportunities");
const filter = document.getElementById("marketFilter");
function render(){
  const selected = filter.value;
  tbody.innerHTML = "";
  demoRows.filter(r => selected==="Todos" || r.market===selected).forEach(r=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><span class="ticker">${r.ticker}</span><span class="sub">${r.name}</span></td><td><span class="pill wait">${r.trend}</span></td><td>${r.entry}</td><td>${r.stop}</td><td>${r.target}</td><td>${r.note}</td>`;
    tbody.appendChild(tr);
  });
}
filter.addEventListener("change",render); render();

async function requestNotifications(){
  if(!("Notification" in window)){alert("Este navegador no admite notificaciones web.");return;}
  const result=await Notification.requestPermission();
  if(result==="granted"){
    new Notification("Asistente bursátil",{body:"Permiso de notificaciones concedido. Las alertas automáticas se activarán al conectar el servicio de análisis."});
    document.getElementById("notifyBtn").textContent="Avisos permitidos";
  } else alert("No se han permitido las notificaciones. Puedes activarlas en los ajustes del navegador.");
}
document.getElementById("notifyBtn").addEventListener("click",requestNotifications);
document.getElementById("testBtn").addEventListener("click",()=>{
  if("Notification" in window && Notification.permission==="granted"){
    new Notification("Notificación de prueba",{body:"La interfaz funciona. Las señales bursátiles reales aún no están conectadas."});
    document.getElementById("alertHistory").textContent="Notificación de prueba enviada. Aún no se han conectado cotizaciones ni análisis automáticos.";
  } else {
    alert("Primero pulsa «Activar avisos» y concede permiso al navegador.");
  }
});
if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
