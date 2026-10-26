self.addEventListener("install", event => { self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
// Las notificaciones push en segundo plano requieren un servidor HTTPS y un servicio push.
// Este archivo solo prepara la base PWA; todavía no programa ni envía alertas de mercado.
