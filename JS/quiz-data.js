/* Quiz bank: 22 questions across four formats. */
var quizData = [
  {
    id: 1,
    type: "multiple-choice",
    question: "Which part of an email is the most reliable way to confirm who really sent it?",
    options: [
      "The display name shown in your inbox",
      "The full email address after the @ symbol",
      "The logo at the bottom of the message",
      "The signature at the end"
    ],
    answer: 1,
    explanation: "Display names and signatures are easy to fake. The domain after the @ is a stronger clue, and even that should be checked against the real organisation."
  },
  {
    id: 2,
    type: "true-false",
    question: "A padlock icon and 'https' in the address bar guarantee that a website is trustworthy.",
    options: ["True", "False"],
    answer: 1,
    explanation: "HTTPS only means the connection is encrypted. Scammers can obtain certificates too, so the padlock says nothing about intent."
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "You receive an email saying your account will be closed in 24 hours unless you click a link. What is the biggest warning sign?",
    options: [
      "The email arrived in the morning",
      "The message uses a generic greeting",
      "The message creates artificial urgency",
      "The email has a coloured button"
    ],
    answer: 2,
    explanation: "Pressure to act fast is a classic social engineering trigger. Real organisations rarely threaten instant closure by email."
  },
  {
    id: 4,
    type: "image",
    question: "Look at the email below. Which feature marks it as a phishing attempt?",
    sample: {
      from: "PayPal Service <security@paypal-verify-help.com>",
      subject: "URGENT: Your account is limited",
      body: "Dear Customer, we detected unusual activity. Verify your details within 12 hours to avoid permanent closure.",
      link: "http://paypal-verify-help.com/login"
    },
    options: [
      "The sender domain is not paypal.com",
      "The email was sent on a weekday",
      "The subject line is too short",
      "The message mentions PayPal at all"
    ],
    answer: 0,
    explanation: "The real domain is paypal.com. Anything like paypal-verify-help.com is a lookalike registered by the attacker."
  },
  {
    id: 5,
    type: "scenario",
    question: "A caller claims to be from IT support and asks you to read out the six-digit code you just received by text. What do you do?",
    options: [
      "Read out the code so they can fix the problem",
      "Share it only if they know your employee ID",
      "Refuse and call IT back on the official number",
      "Text the code to them instead"
    ],
    answer: 2,
    explanation: "That code is a one-time password. Nobody legitimate needs it from you. Hang up and verify using a number you looked up yourself."
  },
  {
    id: 6,
    type: "true-false",
    question: "It is safe to open an unexpected attachment if the email appears to come from a colleague.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Colleague accounts get compromised. Confirm through another channel before opening unexpected attachments."
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "Which URL is most likely to be a phishing site?",
    options: [
      "https://www.paypal.com/signin",
      "https://paypal.com.account-check.net/login",
      "https://www.paypal.com/help",
      "https://careers.paypal.com"
    ],
    answer: 1,
    explanation: "The real domain here is account-check.net. Everything before it is a subdomain the attacker controls to look convincing."
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "What does multi-factor authentication (MFA) add to your account security?",
    options: [
      "A longer password requirement",
      "A second proof of identity beyond your password",
      "Automatic antivirus scanning",
      "A backup email address only"
    ],
    answer: 1,
    explanation: "MFA combines something you know (password) with something you have or are, which blocks most stolen-password attacks."
  },
  {
    id: 9,
    type: "scenario",
    question: "You get an email from a supplier with new bank details and a request to update the payment file urgently. What is the safest next step?",
    options: [
      "Update the details and process the payment quickly",
      "Reply to the email asking them to confirm",
      "Call the supplier on a number you already have on file",
      "Forward the email to a colleague to decide"
    ],
    answer: 2,
    explanation: "This is invoice fraud. Reply emails may reach the attacker. Verify using contact details you already hold, ideally by phone."
  },
  {
    id: 10,
    type: "true-false",
    question: "Spelling and grammar mistakes are a reliable sign of phishing.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Many phishing emails are now written cleanly. Mistakes are a clue, but their absence proves nothing. Judge the request, not just the wording."
  },
  {
    id: 11,
    type: "image",
    question: "Review this message. What is the strongest reason to treat it as suspicious?",
    sample: {
      from: "HR Department <hr@g00gle-mail.com>",
      subject: "Salary revision document",
      body: "Please sign in with your work credentials to view your revised salary letter.",
      link: "https://g00gle-mail.com/hr/login"
    },
    options: [
      "It asks you to sign in through a link",
      "It mentions your salary",
      "It comes from HR",
      "It has a subject line"
    ],
    answer: 0,
    explanation: "Credentials should be entered on a known site you navigated to yourself, never through a link in an unexpected message."
  },
  {
    id: 12,
    type: "multiple-choice",
    question: "Why do attackers use a generic greeting such as 'Dear Customer'?",
    options: [
      "It is the required legal format",
      "They send the same message to many people and do not know names",
      "It appears more professional",
      "It avoids spam filters automatically"
    ],
    answer: 1,
    explanation: "Mass campaigns cannot personalise each message. A generic greeting is a weak but useful clue when the sender claims to know you."
  },
  {
    id: 13,
    type: "scenario",
    question: "A website pop-up says your device is infected and offers an immediate scan download. What should you do?",
    options: [
      "Download the scanner since the warning looks official",
      "Close the browser tab and run your own security software",
      "Click the button to dismiss it",
      "Enter your email to get the report"
    ],
    answer: 1,
    explanation: "These pop-ups are scareware. Close the tab. Never download tools offered by a web page. Use software you installed yourself."
  },
  {
    id: 14,
    type: "multiple-choice",
    question: "Which practice best protects you from reusing one leaked password across many sites?",
    options: [
      "Changing the last digit of the password",
      "Using a password manager to generate unique passwords",
      "Writing passwords in a notebook",
      "Using your birth year in each password"
    ],
    answer: 1,
    explanation: "A password manager creates a different strong password for every site, so one breach cannot unlock the rest."
  },
  {
    id: 15,
    type: "true-false",
    question: "If an email passes the spam filter, you can assume it is safe.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Filters catch many threats but never all. Skilled phishing messages are written to slip past them."
  },
  {
    id: 16,
    type: "image",
    question: "Compare the two messages. Which one is legitimate?",
    sample: {
      from: "Microsoft Account Team <no-reply@accountprotection.microsoft.com>",
      subject: "Verify your account now",
      body: "We noticed unusual sign-in activity. Confirm your password today or your account will be suspended.",
      link: "https://accountprotection.microsoft.com/verify"
    },
    options: [
      "Neither is legitimate",
      "Both are legitimate",
      "This one, because the domain ends in microsoft.com",
      "This one, because it mentions Microsoft"
    ],
    answer: 2,
    explanation: "The domain genuinely belongs to Microsoft. That does not make every request safe, but a correct domain is a good first check."
  },
  {
    id: 17,
    type: "scenario",
    question: "You realise you entered your password on a phishing page. What is the first thing to do?",
    options: [
      "Wait and watch for suspicious activity",
      "Change that password immediately and enable MFA",
      "Delete the browser history",
      "Report it to your friends"
    ],
    answer: 1,
    explanation: "Act fast: change the password on the real site, turn on MFA, and report the incident to your IT or security team."
  },
  {
    id: 18,
    type: "multiple-choice",
    question: "What is the safest way to visit your bank's website?",
    options: [
      "Click the link in the latest bank email",
      "Type the address you know or use your saved bookmark",
      "Search for it and click the first sponsored result",
      "Follow a link from a message you trust"
    ],
    answer: 1,
    explanation: "Typing a known address or using your own bookmark removes the chance of being redirected to a lookalike site."
  },
  {
    id: 19,
    type: "multiple-choice",
    question: "Which of these best describes social engineering?",
    options: [
      "Writing malicious computer code",
      "Manipulating people into revealing information or taking unsafe actions",
      "Breaking encryption with powerful hardware",
      "Flooding a server with traffic"
    ],
    answer: 1,
    explanation: "Social engineering targets people rather than systems, using trust, fear, urgency or curiosity to get what the attacker wants."
  },
  {
    id: 20,
    type: "true-false",
    question: "Software updates only change the look of an application and have little security benefit.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Updates frequently patch security flaws that attackers already know how to exploit. Keep systems and apps current."
  },
  {
    id: 21,
    type: "scenario",
    question: "A coworker messages you asking for the login to a shared admin tool, saying they are in a rush. What is your best response?",
    options: [
      "Send the password since they are a colleague",
      "Send it but ask them to change it later",
      "Decline and suggest they request access through the official process",
      "Post it in the team chat instead"
    ],
    answer: 2,
    explanation: "Credentials should never be shared over chat. Use the documented access process so the request is verified and logged."
  },
  {
    id: 22,
    type: "multiple-choice",
    question: "You spot a suspicious email at work. What is the recommended action?",
    options: [
      "Delete it and say nothing",
      "Reply asking the sender to stop",
      "Report it using your organisation's reporting process",
      "Forward it to the whole team as a warning"
    ],
    answer: 2,
    explanation: "Reporting helps the security team block the campaign and warn others. Deleting silently hides a threat that may affect colleagues."
  }
];

var QUIZ_PASS_MARK = 70;
