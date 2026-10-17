/* Module 2: real-or-fake game and the URL decoder. */
(function () {
  "use strict";

  /* --- Real or fake game --- */
  document.querySelectorAll(".game-item").forEach(function (item) {
    var answer = item.getAttribute("data-answer");
    var feedback = item.querySelector(".feedback");
    var buttons = item.querySelectorAll("[data-guess]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var guess = btn.getAttribute("data-guess");
        var correct = guess === answer;

        buttons.forEach(function (b) { b.disabled = true; });

        feedback.className = "feedback show " + (correct ? "ok" : "err");
        feedback.textContent = (correct ? "Correct. " : "Not quite. ") +
          item.getAttribute("data-explain");
      });
    });
  });

  /* --- URL decoder --- */
  var input = document.getElementById("url-input");
  var button = document.getElementById("url-decode-btn");
  var output = document.getElementById("url-output");

  if (!input || !button || !output) return;

  /* Only text nodes are written to the page, so pasted markup is never executed. */
  function addRow(table, label, value) {
    var row = document.createElement("tr");
    var th = document.createElement("th");
    th.textContent = label;
    var td = document.createElement("td");
    td.textContent = value || "(none)";
    row.appendChild(th);
    row.appendChild(td);
    table.appendChild(row);
  }

  function splitHost(host) {
    var parts = host.split(".");
    if (parts.length <= 2) {
      return { subdomain: "", domain: host };
    }
    return {
      subdomain: parts.slice(0, parts.length - 2).join("."),
      domain: parts.slice(-2).join(".")
    };
  }

  function decode() {
    output.textContent = "";
    var raw = input.value.trim();

    if (!raw) {
      var empty = document.createElement("p");
      empty.className = "note";
      empty.textContent = "Enter a URL first.";
      output.appendChild(empty);
      return;
    }

    var withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw) ? raw : "http://" + raw;
    var parsed;

    try {
      parsed = new URL(withScheme);
    } catch (err) {
      var bad = document.createElement("p");
      bad.className = "note";
      bad.textContent = "That does not look like a valid URL.";
      output.appendChild(bad);
      return;
    }

    var host = splitHost(parsed.hostname);
    var table = document.createElement("table");
    table.className = "decode";
    table.appendChild(document.createElement("tbody"));

    addRow(table, "Full URL", parsed.href);
    addRow(table, "Scheme", parsed.protocol.replace(":", ""));
    addRow(table, "Subdomain", host.subdomain);
    addRow(table, "Domain (what matters)", host.domain);
    addRow(table, "Port", parsed.port);
    addRow(table, "Path", parsed.pathname);
    addRow(table, "Query", parsed.search);

    output.appendChild(table);

    var verdict = document.createElement("p");
    verdict.className = "note";
    verdict.textContent = "Trust decision: this page belongs to " + host.domain +
      ". If the message claims to come from a different organisation, treat it as suspicious.";
    output.appendChild(verdict);
  }

  button.addEventListener("click", decode);
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") decode();
  });
})();
