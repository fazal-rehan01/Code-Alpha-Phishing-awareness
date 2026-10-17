/* Module 3: branching scenario. */
(function () {
  "use strict";

  var stage = document.getElementById("scenario-stage");
  if (!stage) return;

  var scenario = {
    start: {
      text: "An email from the IT helpdesk says your password expires today. It asks you to click a link and reset it immediately. What do you do?",
      options: [
        { text: "Click the link and reset it straight away", next: "clicked" },
        { text: "Ignore the email and carry on working", next: "ignored" },
        { text: "Open the IT portal yourself and check there", next: "verify" }
      ]
    },
    clicked: {
      result: "risky",
      text: "The page looks exactly like the real portal, but the address bar reads it-portal-reset.com. Your old password is now in someone else's hands.",
      options: [
        { text: "Change the password on the real site and report it", next: "recover" },
        { text: "Wait to see whether anything happens", next: "wait" }
      ]
    },
    ignored: {
      result: "risky",
      text: "The email was indeed a fake, so nothing bad happened to you. But by ignoring it you left the campaign running against your colleagues.",
      options: [
        { text: "Report it to the security team", next: "recover" },
        { text: "Leave it for someone else to notice", next: "wait" }
      ]
    },
    verify: {
      result: "safe",
      text: "The portal shows your password is fine and no reset was requested. You identified the message as phishing without clicking anything.",
      options: [
        { text: "Report the email and warn your team", next: "recover" }
      ]
    },
    recover: {
      result: "safe",
      text: "Good. Reporting a suspicious message or a suspected compromise gives the security team the chance to block the campaign and protect everyone else.",
      options: [
        { text: "Start the scenario again", next: "start" }
      ]
    },
    wait: {
      result: "risky",
      text: "Waiting gives the attacker time to use the access they gained. Delay is what turns a small incident into a large one.",
      options: [
        { text: "Report it now", next: "recover" },
        { text: "Start the scenario again", next: "start" }
      ]
    }
  };

  function render(key) {
    var node = scenario[key];
    stage.textContent = "";

    if (node.result) {
      var badge = document.createElement("span");
      badge.className = "pill " + (node.result === "safe" ? "green" : "red");
      badge.textContent = node.result === "safe" ? "Safe choice" : "Risky choice";
      stage.appendChild(badge);
    }

    var text = document.createElement("p");
    text.textContent = node.text;
    stage.appendChild(text);

    var row = document.createElement("div");
    row.className = "btn-row";

    node.options.forEach(function (option) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn" + (option.next === "start" ? " btn-outline" : "");
      btn.textContent = option.text;
      btn.addEventListener("click", function () { render(option.next); });
      row.appendChild(btn);
    });

    stage.appendChild(row);
  }

  render("start");
})();
