Phishing Awareness Training
A simple, interactive web-based training module designed to educate users on recognizing phishing attacks and social engineering tactics. Built with vanilla HTML, CSS, and JavaScript with no external dependencies.
Features
4 Learning Modules: Covers email anatomy, fake website detection, social engineering psychology, and defensive best practices.
Interactive Elements: Click-to-reveal hotspots in emails, URL breakdown tool, and scenario-based decision making.
Assessment Center: 20+ question quiz with immediate feedback and score tracking.
Progress Persistence: Tracks completion across modules using localStorage.
Security First: Implements input sanitization to prevent XSS and uses a strict Content Security Policy (CSP).
Zero Dependencies: Runs entirely offline without frameworks or CDNs.
Getting Started
Clone or download this repository.
Open index.html in any modern web browser (Chrome, Firefox, Safari, Edge).
No local server or build process is required.
Note: For the URL analyzer tool to function correctly when opening files directly via file://, ensure your browser allows local file access. Some browsers may restrict certain APIs in this context; using a simple local server (e.g., python3 -m http.server) resolves this if needed.



Project Structure: 
── index.html          # Landing page and navigation
├── module1.html        # Phishing email anatomy & interactive viewer
├── module2.html        # Fake website detection & URL analyzer
├── module3.html        # Social engineering tactics & scenarios
├── module4.html        # Best practices & defense checklist
├── quiz.html           # Assessment center and scoring engine
├── resources.html      # Glossary and reference materials
├── css/
│   └── style.css       # Responsive styles and print layout
└── js/
    ├── main.js         # Progress tracking and input sanitization
    └── quiz-data.js    # Quiz questions and assessment logic

Security Implementation
This project demonstrates secure coding practices suitable for educational purposes:
XSS Prevention: All user-generated content and dynamic strings pass through a sanitization utility that escapes HTML entities before rendering.
Content Security Policy: A meta-tag CSP restricts script execution to local files only, preventing inline script injection.
Safe Storage: localStorage operations are wrapped in try/catch blocks to handle private browsing modes gracefully.
No External Assets: Eliminates supply chain risks associated with third-party libraries and CDNs.
Customization
Quiz Questions: Edit the questions array in js/quiz-data.js to add, remove, or modify assessment items.
Styling: Update CSS variables in css/style.css under :root to change the color scheme globally.
Module Content: Each module is a standalone HTML file. Text and interactive elements can be edited directly without affecting other pages.
