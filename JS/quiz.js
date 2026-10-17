/* Quiz engine: one question at a time, instant feedback, review mode. */
(function () {
  "use strict";

  var SCORE_KEY = "phishing-training-quiz-best";

  var stage = document.getElementById("quiz-stage");
  if (!stage || typeof quizData === "undefined") {
    return;
  }

  var order = quizData.slice();
  var index = 0;
  var answers = [];      // { id, chosen, correct }

  function bestScore() {
    try {
      return Number(localStorage.getItem(SCORE_KEY)) || 0;
    } catch (err) {
      return 0;
    }
  }

  function saveBest(percent) {
    if (percent > bestScore()) {
      try {
        localStorage.setItem(SCORE_KEY, String(percent));
      } catch (err) {
        /* ignore */
      }
    }
  }

  function makeEmail(sample) {
    var box = document.createElement("div");
    box.className = "email";

    var head = document.createElement("div");
    head.className = "email-head";

    [["From: ", sample.from], ["Subject: ", sample.subject]].forEach(function (pair) {
      var row = document.createElement("div");
      row.textContent = pair[0] + pair[1];
      head.appendChild(row);
    });

    var body = document.createElement("div");
    body.className = "email-body";
    body.textContent = sample.body;

    var link = document.createElement("p");
    var anchor = document.createElement("span");
    anchor.className = "link-tip";
    anchor.textContent = sample.link;
    link.appendChild(anchor);
    body.appendChild(link);

    box.appendChild(head);
    box.appendChild(body);
    return box;
  }

  function renderQuestion() {
    var q = order[index];
    stage.textContent = "";

    var head = document.createElement("div");
    head.className = "quiz-head";

    var meta = document.createElement("p");
    meta.className = "qmeta";
    meta.textContent = "Question " + (index + 1) + " of " + order.length + "  |  " + q.type.replace("-", " ");

    var scoreLine = document.createElement("p");
    scoreLine.className = "qmeta";
    scoreLine.textContent = "Best score: " + bestScore() + "%";

    head.appendChild(meta);
    head.appendChild(scoreLine);
    stage.appendChild(head);

    var card = document.createElement("div");
    card.className = "card";

    if (q.sample) {
      card.appendChild(makeEmail(q.sample));
    }

    var title = document.createElement("h2");
    title.className = "mt-0";
    title.textContent = q.question;
    card.appendChild(title);

    var list = document.createElement("ul");
    list.className = "options";

    q.options.forEach(function (text, i) {
      var item = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.textContent = text;
      btn.addEventListener("click", function () { choose(i, q, list); });
      item.appendChild(btn);
      list.appendChild(item);
    });

    card.appendChild(list);

    var feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.id = "feedback";
    card.appendChild(feedback);

    stage.appendChild(card);
    renderProgressDots();
  }

  function renderProgressDots() {
    var bar = document.getElementById("quiz-progress");
    if (!bar) return;
    bar.textContent = "";
    order.forEach(function (q, i) {
      var dot = document.createElement("span");
      dot.className = "pill";
      if (answers[i]) {
        dot.className = "pill " + (answers[i].correct ? "green" : "red");
        dot.textContent = answers[i].correct ? "correct" : "wrong";
      } else if (i === index) {
        dot.className = "pill amber";
        dot.textContent = "current";
      } else {
        dot.textContent = i + 1;
      }
      bar.appendChild(dot);
      bar.appendChild(document.createTextNode(" "));
    });
  }

  function choose(chosen, q, list) {
    if (answers[index]) return;

    var buttons = list.querySelectorAll("button");
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("correct");
      if (i === chosen && chosen !== q.answer) btn.classList.add("wrong");
    });

    var correct = chosen === q.answer;
    answers[index] = { id: q.id, chosen: chosen, correct: correct };

    var feedback = document.getElementById("feedback");
    feedback.className = "feedback show " + (correct ? "ok" : "err");
    feedback.textContent = (correct ? "Correct. " : "Not quite. ") + q.explanation;

    var next = document.createElement("button");
    next.type = "button";
    next.className = "btn";
    next.textContent = index === order.length - 1 ? "See results" : "Next question";
    next.addEventListener("click", function () {
      if (index === order.length - 1) {
        finish();
      } else {
        index += 1;
        renderQuestion();
      }
    });
    feedback.appendChild(document.createElement("br"));
    feedback.appendChild(next);

    renderProgressDots();
  }

  function finish() {
    var correctCount = answers.filter(function (a) { return a.correct; }).length;
    var percent = Math.round((correctCount / order.length) * 100);
    var passed = percent >= QUIZ_PASS_MARK;
    saveBest(percent);

    stage.textContent = "";

    var card = document.createElement("div");
    card.className = "card score-box";

    var heading = document.createElement("h2");
    heading.className = "mt-0";
    heading.textContent = passed ? "You passed" : "Keep practising";

    var big = document.createElement("p");
    big.className = "score-big";
    big.textContent = percent + "%";

    var detail = document.createElement("p");
    detail.textContent = correctCount + " of " + order.length + " correct. " +
      (passed ? "That meets the " + QUIZ_PASS_MARK + "% pass mark." :
        "You need " + QUIZ_PASS_MARK + "% to pass.");

    var best = document.createElement("p");
    best.className = "qmeta";
    best.textContent = "Best score so far: " + bestScore() + "%";

    var row = document.createElement("div");
    row.className = "btn-row";
    row.style.justifyContent = "center";

    var review = document.createElement("button");
    review.type = "button";
    review.className = "btn";
    review.textContent = "Review answers";
    review.addEventListener("click", renderReview);

    var again = document.createElement("button");
    again.type = "button";
    again.className = "btn btn-outline";
    again.textContent = "Try again";
    again.addEventListener("click", function () {
      index = 0;
      answers = [];
      renderQuestion();
    });

    row.appendChild(review);
    row.appendChild(again);

    card.appendChild(heading);
    card.appendChild(big);
    card.appendChild(detail);
    card.appendChild(best);
    card.appendChild(row);
    stage.appendChild(card);

    if (window.TrainingApp) {
      window.TrainingApp.saveProgress({ quizBest: percent });
    }
    renderProgressDots();
  }

  function renderReview() {
    stage.textContent = "";
    var heading = document.createElement("h2");
    heading.textContent = "Review";
    stage.appendChild(heading);

    order.forEach(function (q, i) {
      var a = answers[i];
      var item = document.createElement("div");
      item.className = "review-item " + (a && a.correct ? "ok" : "no");

      var title = document.createElement("h3");
      title.className = "mt-0";
      title.textContent = (i + 1) + ". " + q.question;
      item.appendChild(title);

      var your = document.createElement("p");
      your.className = "mb-0";
      your.textContent = "Your answer: " + (a ? q.options[a.chosen] : "not answered");

      var right = document.createElement("p");
      right.className = "mb-0";
      right.textContent = "Correct answer: " + q.options[q.answer];

      var why = document.createElement("p");
      why.className = "mb-0";
      why.textContent = q.explanation;

      item.appendChild(your);
      item.appendChild(right);
      item.appendChild(why);
      stage.appendChild(item);
    });

    var back = document.createElement("button");
    back.type = "button";
    back.className = "btn";
    back.textContent = "Back to results";
    back.addEventListener("click", finish);
    stage.appendChild(back);
  }

  /* Shuffle so the questions do not always appear in the same order. */
  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  var quizProgress = document.createElement("div");
  quizProgress.id = "quiz-progress";
  quizProgress.className = "btn-row no-print";
  stage.parentNode.insertBefore(quizProgress, stage);

  order = shuffle(order);
  renderQuestion();
})();
