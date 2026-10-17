/* Shared behaviour for every page. */
(function () {
  "use strict";

  var STORAGE_KEY = "phishing-training-progress";

  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (err) {
      return {};
    }
  }

  function writeProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      /* storage unavailable, progress simply will not persist */
    }
  }

  /* Merge new values into the stored progress object. */
  function saveProgress(update) {
    var data = readProgress();
    Object.keys(update).forEach(function (key) {
      data[key] = update[key];
    });
    writeProgress(data);
    return data;
  }

  function markDone(module) {
    saveProgress({ [module]: true });
    refreshProgress();
  }

  /* Highlight the link for the page we are on. */
  function markActiveLink() {
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-header nav a").forEach(function (link) {
      if (link.getAttribute("href") === here) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* Fill in the current year in the footer. */
  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* Update every progress bar and completion label on the page. */
  function refreshProgress() {
    var modules = ["module1", "module2", "module3", "module4"];
    var data = readProgress();
    var done = modules.filter(function (m) { return data[m]; }).length;
    var percent = Math.round((done / modules.length) * 100);

    document.querySelectorAll("[data-progress-fill]").forEach(function (el) {
      el.style.width = percent + "%";
    });
    document.querySelectorAll("[data-progress-text]").forEach(function (el) {
      el.textContent = done + " of " + modules.length + " modules complete";
    });
    document.querySelectorAll("[data-progress-item]").forEach(function (el) {
      var key = el.getAttribute("data-progress-item");
      el.classList.toggle("done", Boolean(data[key]));
      var tag = el.querySelector("[data-status]");
      if (tag) {
        tag.textContent = data[key] ? "Done" : "Not started";
      }
    });
    document.querySelectorAll("[data-complete-btn]").forEach(function (btn) {
      var key = btn.getAttribute("data-complete-btn");
      if (data[key]) {
        btn.textContent = "Module complete";
        btn.disabled = true;
      }
    });
  }

  /* Wire up "mark module complete" buttons and any progress reset link. */
  function initControls() {
    document.querySelectorAll("[data-complete-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        markDone(btn.getAttribute("data-complete-btn"));
      });
    });

    document.querySelectorAll("[data-reset-progress]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        writeProgress({});
        refreshProgress();
      });
    });
  }

  /* Add a click-to-reveal handler for hotspot elements inside an email. */
  function initHotspots(options) {
    var found = 0;
    var total = options.ids.length;
    var counter = options.counter;

    options.ids.forEach(function (id) {
      var el = document.querySelector('[data-flag="' + id + '"]');
      var note = document.querySelector('[data-flag-note="' + id + '"]');
      if (!el) return;

      el.addEventListener("click", function () {
        if (!el.classList.contains("found")) {
          el.classList.add("found");
          found += 1;
          if (counter) {
            counter.textContent = found + " of " + total + " found";
          }
        }
        if (note) {
          note.classList.add("show");
        }
      });
    });
  }

  /* Copy text from an element when a button is pressed. */
  function initCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var source = document.querySelector(btn.getAttribute("data-copy"));
        if (!source) return;
        var text = source.textContent;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = "Copied";
            setTimeout(function () { btn.textContent = "Copy"; }, 1500);
          });
        }
      });
    });
  }

  /* Print buttons used on the resources page. */
  function initPrint() {
    document.querySelectorAll("[data-print]").forEach(function (btn) {
      btn.addEventListener("click", function () { window.print(); });
    });
  }

  window.TrainingApp = {
    readProgress: readProgress,
    saveProgress: saveProgress,
    markDone: markDone,
    refreshProgress: refreshProgress
  };

  markActiveLink();
  setYear();
  refreshProgress();
  initControls();
  initCopyButtons();
  initPrint();

  window.TrainingApp.initHotspots = initHotspots;
})();
