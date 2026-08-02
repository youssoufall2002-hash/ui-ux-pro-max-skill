/* =================================================================
   §6/§7 — Slider prima/dopo trascinabile.
   Vanilla JS, nessun framework (§9). L'unica animazione JS del sito.
   Supporta: mouse, touch (Pointer Events) e tastiera (frecce).
   ================================================================= */
(function () {
  "use strict";

  var ba = document.querySelector(".ba");
  if (!ba) return;

  var before = ba.querySelector(".ba__img--before");
  var handle = ba.querySelector(".ba__handle");

  // Posizione 0..100 (percentuale visibile della foto "prima", da sinistra)
  function setPos(pct) {
    pct = Math.max(0, Math.min(100, pct));
    before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    handle.style.left = pct + "%";
    ba.setAttribute("aria-valuenow", Math.round(pct));
  }

  function pctFromClientX(clientX) {
    var rect = ba.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  var dragging = false;

  function onDown(e) {
    dragging = true;
    ba.setPointerCapture && e.pointerId != null && ba.setPointerCapture(e.pointerId);
    setPos(pctFromClientX(e.clientX));
  }
  function onMove(e) {
    if (!dragging) return;
    setPos(pctFromClientX(e.clientX));
  }
  function onUp() { dragging = false; }

  // Pointer Events copre mouse + touch + pen
  ba.addEventListener("pointerdown", onDown);
  ba.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  // §9 — accessibilità tastiera
  ba.addEventListener("keydown", function (e) {
    var now = parseFloat(ba.getAttribute("aria-valuenow")) || 50;
    var step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { setPos(now - step); e.preventDefault(); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { setPos(now + step); e.preventDefault(); }
    else if (e.key === "Home") { setPos(0); e.preventDefault(); }
    else if (e.key === "End") { setPos(100); e.preventDefault(); }
  });

  // Stato iniziale
  setPos(50);
})();
