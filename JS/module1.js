/* Module 1: reveal a note when each red flag is clicked. */
(function () {
  "use strict";

  if (!window.TrainingApp) return;

  window.TrainingApp.initHotspots({
    ids: ["sender", "urgency", "attachment", "greeting", "link"],
    counter: document.querySelector("[data-flag-counter]")
  });
})();
