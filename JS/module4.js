/* Module 4: save the defence plan in localStorage. */
(function () {
  "use strict";

  var PLAN_KEY = "phishing-training-defence-plan";
  var list = document.getElementById("defence-list");
  if (!list) return;

  var boxes = list.querySelectorAll("input[data-plan]");
  var progress = document.querySelector("[data-plan-progress]");

  function load() {
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(PLAN_KEY)) || {};
    } catch (err) {
      saved = {};
    }
    boxes.forEach(function (box) {
      box.checked = Boolean(saved[box.getAttribute("data-plan")]);
    });
  }

  function save() {
    var data = {};
    var count = 0;
    boxes.forEach(function (box) {
      if (box.checked) {
        data[box.getAttribute("data-plan")] = true;
        count += 1;
      }
    });
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(data));
    } catch (err) {
      /* ignore storage errors */
    }
    if (progress) {
      progress.textContent = count + " of " + boxes.length + " steps selected";
    }
  }

  boxes.forEach(function (box) {
    box.addEventListener("change", save);
  });

  var reset = document.querySelector("[data-plan-reset]");
  if (reset) {
    reset.addEventListener("click", function () {
      boxes.forEach(function (box) { box.checked = false; });
      save();
    });
  }

  load();
  save();
})();
