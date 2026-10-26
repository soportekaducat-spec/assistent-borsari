ASISTENTE BURSÁTIL — PROTOTIPO PWA

Contenido:
- Interfaz adaptable a móvil y ordenador.
- Filtros de mercado.
- Pantalla de oportunidades con datos claramente demostrativos.
- Solicitud de permiso para notificaciones y botón de prueba.
- Manifest y service worker iniciales.

IMPORTANTE:
Este prototipo NO consulta cotizaciones reales, NO calcula señales bursátiles reales y NO envía notificaciones automáticas programadas. No usar las filas de demostración para invertir.

Para convertirlo en un servicio real:
1. Publicar la web mediante HTTPS.
2. Conectar un proveedor de datos que cubra EE. UU. y Mercado Continuo español.
3. Crear el backend que descargue históricos, calcule indicadores y seleccione 20–50 oportunidades.
4. Programar dos análisis/avisos por mercado, respetando festivos, horarios y cambios de hora.
5. Configurar suscripciones push seguras para que las notificaciones lleguen con la app cerrada.
6. Probar la estrategia con históricos antes de utilizar sus señales.

Para instalar como PWA:
- Debe servirse desde un dominio HTTPS (o localhost para pruebas).
- Abre la web en el navegador del móvil y utiliza “Añadir a pantalla de inicio” / “Instalar aplicación”.
- Las notificaciones requieren permiso del usuario y soporte del navegador/dispositivo.
