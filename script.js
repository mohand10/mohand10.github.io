// Portfolio Terminal Script - Interactive Linux-style Portfolio

// Command history management
let commandHistory = [];
let historyIndex = -1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('command-input');
    input.focus();
    
    // Keep input focused
    document.addEventListener('click', () => input.focus());
});

// Handle keyboard input
document.getElementById('command-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            handleCommand(command);
        }
        this.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete(this);
    }
});

// Command handler
function handleCommand(command) {
    const output = document.getElementById('terminal-output');
    
    // Display command
    output.innerHTML += `<p class="command-line"><span class="prompt">monty@portfolio</span>:<span class="path">~</span>$ <span class="user-command">${escapeHtml(command)}</span></p>`;
    
    // Parse command
    const cmd = command.toLowerCase().trim();
    
    // Command routing
    switch(cmd) {
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
        case 'about':
        case 'about-me':
        case 'whoami':
            showAbout();
            break;
        case 'experience':
        case 'exp':
        case 'work':
            showExperience();
            break;
        case 'projects':
        case 'ls projects':
        case 'ls -la projects':
        case 'cat projects':
            showProjects();
            break;
        case 'contact':
        case 'contact-me':
        case 'email':
            showContact();
            break;
        case 'skills':
        case 'tech':
        case 'technologies':
            showSkills();
            break;
        case 'resume':
        case 'cv':
        case 'download':
        case 'download resume':
            downloadResume();
            output.innerHTML += `<p class="success-text">✓ Downloading resume...</p>`;
            break;
        case 'clear':
        case 'cls':
            clearTerminal();
            return;
        case 'gui':
        case 'visual':
            switchTab('gui');
            break;
        case 'ls':
        case 'ls -la':
            listFiles();
            break;
        case 'pwd':
            output.innerHTML += `<p class="success-text">/home/monty/portfolio</p>`;
            break;
        case 'date':
            output.innerHTML += `<p class="success-text">${new Date().toString()}</p>`;
            break;
        case 'echo hello':
            output.innerHTML += `<p class="success-text">hello</p>`;
            break;
        case 'uname':
        case 'uname -a':
            output.innerHTML += `<p class="success-text">Linux portfolio 5.15.0 #1 SMP x86_64 GNU/Linux</p>`;
            break;
        case 'cat readme':
        case 'cat readme.txt':
            output.innerHTML += `<div class="section-content"><p>Welcome to my portfolio! I'm a C++ developer passionate about systems programming.</p><p>Feel free to explore using the available commands.</p></div>`;
            break;
        case 'achievements':
        case 'awards':
        case 'activities':
            showAchievements();
            break;
        case 'education':
            showEducation();
            break;
        case 'about-me':
        case 'hobbies':
            showAboutMe();
            break;
        case '':
            break;
        default:
            if (cmd.startsWith('echo ')) {
                output.innerHTML += `<p class="success-text">${escapeHtml(command.substring(5))}</p>`;
            } else {
                output.innerHTML += `<p class="error-text">bash: ${escapeHtml(command)}: command not found</p><p class="hint-text">Type 'help' for available commands</p>`;
            }
    }
    
    scrollToBottom();
}

// Command functions
function showHelp() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>Available Commands:</h3>
            <p><span class="highlight">about</span> / <span class="highlight">whoami</span> - Learn about me</p>
            <p><span class="highlight">experience</span> - View my work experience</p>
            <p><span class="highlight">projects</span> - See my projects</p>
            <p><span class="highlight">skills</span> - List technical skills</p>
            <p><span class="highlight">contact</span> - Get contact information</p>
            <p><span class="highlight">achievements</span> - Awards & activities</p>
            <p><span class="highlight">resume</span> - Download my resume (PDF)</p>
            <p><span class="highlight">gui</span> - Switch to visual mode</p>
            <p><span class="highlight">clear</span> - Clear terminal</p>
            <p><span class="highlight">education</span> - Education details</p>
            <p><span class="highlight">about-me</span> / <span class="highlight">hobbies</span> - Personal interests</p>
            <p>&nbsp;</p>
            <p><strong>Linux Commands:</strong></p>
            <p><span class="highlight">ls</span>, <span class="highlight">pwd</span>, <span class="highlight">date</span>, <span class="highlight">uname</span>, <span class="highlight">cat readme</span></p>
            <p>&nbsp;</p>
            <p class="hint-text">Tip: Use ↑/↓ arrow keys to navigate command history</p>
        </div>
    `;
}

function showAbout() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ whoami</h3>
            <p>Hello! I'm <strong>Mohan Degalwade</strong> (aka <span style="color: var(--accent-orange); font-weight: bold;">monty</span>)</p>
            <p>A <strong>High-Performance C++ Developer</strong> with 4.5+ years of experience in designing robust, multi-threaded, and multi-core software solutions for the telecom domain.</p>
            <p>&nbsp;</p>
            <p>🔧 Deep expertise in OOP, Network Signaling protocols (SIP/RTP), and Design Patterns</p>
            <p>💻 Proven track record in diagnosing complex runtime issues using GDB and PCAP analysis</p>
            <p>🐧 Expert in Linux-based systems programming and performance optimization</p>
            <p>⚡ Skilled in Python automation and Agile team environments</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">💻 Languages:</strong></p>
            <p>▹ C++ (C++11/14/17), C, Python, PHP, JavaScript, Shell Scripting</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">🛠️ Technologies & Frameworks:</strong></p>
            <p>▹ Multithreading, STL, OOP, Design Patterns, MySQL, REST API</p>
            <p>▹ Event-Driven Frameworks, Socket Programming</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">🔧 Tools & Debugging:</strong></p>
            <p>▹ Linux/Unix, GDB, Wireshark, Valgrind, Git/SVN, CI/CD</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">🌐 Network & Protocols:</strong></p>
            <p>▹ SIP/VoIP Signaling, TCP/UDP, RTP, PCAP Analysis</p>
            <p>&nbsp;</p>
            <p class="hint-text">Type 'skills' for detailed technical skills or 'experience' for work history</p>
        </div>
    `;
}

function showExperience() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ cat /var/log/experience.log</h3>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">[Jan 2021 - Present] Software Developer - C++</strong></p>
            <p style="color: var(--accent-blue);">Mitel Communications Pvt. Ltd. | Bengaluru, India</p>
            <p>▹ Resolved ~200 bugs across SIP/RTP/TCP/UDP signaling, call control, and UI; boosted stability and call setup reliability</p>
            <p>▹ Delivered 25+ features for enterprise IP phones, including high‑resolution display support and text‑based UX workflows</p>
            <p>▹ Owned Softkey modules (BLF, Transfer, Speed Dial) as SME; led configuration services and usability improvements</p>
            <p>▹ Designed Linux‑based C++ modules with scalable, multi‑threaded architectures; improved reliability and throughput</p>
            <p>▹ Diagnosed complex runtime defects using GDB and PCAP; reduced crashes and incident volume by ~30%</p>
            <p>▹ Optimized multi‑core performance and thread safety using STL/OOP & Design Patterns; cut latency and contention</p>
            <p>▹ Triaged protocol issues via Wireshark; prevented regressions across SIP/VoIP signaling stacks</p>
            <p>▹ Solved customer‑critical incidents end‑to‑end, coordinating hotfixes and RCA to restore service quickly</p>
            <p>▹ Partnered with QA/DevOps/Product in CI/CD; authored design notes and documentation for maintainability</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">[Jun 2019 - Jul 2019] Research Intern</strong></p>
            <p style="color: var (--accent-blue);">Indian Institute of Science (IISc) | Bengaluru, India</p>
            <p>▹ Built C‑based simulations for electro‑optic modulators; validated models against lab results</p>
            <p>▹ Executed embedded experiments; documented findings and performance characteristics</p>
        </div>
    `;
}

function showProjects() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ ls -la ~/projects/</h3>
            <p>&nbsp;</p>
            <p><strong>drwxr-xr-x</strong> <span style="color: var(--accent-blue);">voice-command-softkey/</span></p>
            <p>   🎤 Voice Command Softkey</p>
            <p>   Built speech-to-text + lightweight NLP for hands-free IP phone control</p>
            <p>   Showcased working PoC in SharkTank for UX & accessibility enhancement</p>
            <p>   Tech: C++, NLP, Speech Recognition, VoIP</p>
            <p>&nbsp;</p>
            <p><strong>drwxr-xr-x</strong> <span style="color: var(--accent-blue);">ip-phones-portal/</span></p>
            <p>   📱 IP Phones Management Portal</p>
            <p>   Designed secure CRUD APIs for vendor management and automation</p>
            <p>   Tech: PHP, MySQL, JavaScript, REST API</p>
            <p>&nbsp;</p>
            <p><strong>drwxr-xr-x</strong> <span style="color: var(--accent-blue);">gesture-robotic-car/</span></p>
            <p>   🤖 Gesture Controlled Robotic Car</p>
            <p>   Arduino-based gesture recognition for real-time robotic control</p>
            <p>   Tech: Embedded C, Arduino, Sensors, IoT</p>
            <p>&nbsp;</p>
            <p><strong>Achievements:</strong></p>
            <p>🏆 3rd place - Mitel Hackathon</p>
            <p>🌟 Innovation Day recognition & multiple Bravo awards</p>
            <p>💡 Delivered Tech Talks on various technical topics</p>
        </div>
    `;
}

function showSkills() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ echo $SKILLS</h3>
            <p>&nbsp;</p>
            <p><strong style="color: var(--text-primary);">⭐ Primary Skills:</strong></p>
            <p>▹ C++ (C++11/14/17) - Expert</p>
            <p>▹ Linux/Unix Systems - Advanced</p>
            <p>▹ Multithreading & Multi-core Programming - Advanced</p>
            <p>▹ STL & OOP - Expert</p>
            <p>▹ Design Patterns - Proficient</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-blue);">🌐 Network & Protocols:</strong></p>
            <p>▹ Socket Programming (TCP/UDP)</p>
            <p>▹ SIP/VoIP Signaling Stacks</p>
            <p>▹ RTP & Network Protocols</p>
            <p>▹ Network Debugging (Wireshark/PCAP)</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">💻 Backend & Scripting:</strong></p>
            <p>▹ Python - Automation & Scripting</p>
            <p>▹ PHP - Web Development</p>
            <p>▹ MySQL - Database Management</p>
            <p>▹ JavaScript - Frontend Development</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--text-secondary);">🛠️ Tools & Technologies:</strong></p>
            <p>▹ Debugging: GDB, Wireshark, PCAP analysis</p>
            <p>▹ Version Control: Git, SVN</p>
            <p>▹ System Programming & Performance Optimization</p>
            <p>▹ Event-Driven Frameworks</p>
            <p>▹ Agile Development Methodologies</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--text-primary);">📚 Core Concepts:</strong></p>
            <p>▹ Data Structures & Algorithms</p>
            <p>▹ System Design & Architecture</p>
            <p>▹ Embedded Systems (Arduino, C)</p>
            <p>▹ CI/CD Practices</p>
            <p>&nbsp;</p>
            <p><strong>Coding Profiles:</strong></p>
            <p>🔗 GeeksforGeeks: geeksforgeeks.org/user/montyy</p>
            <p>🔗 Active on LeetCode and coding competitions</p>
            <p>🔗 LeetCode: https://leetcode.com/pirateking585326/</p>
            <p>🔗 Active on LeetCode and coding competitions</p>
            https://leetcode.com/pirateking585326/
        </div>
    `;
}

function showContact() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ cat contact.txt</h3>
            <p>&nbsp;</p>
            <p>📧 <strong>Email:</strong> <a href="mailto:mohandegalwade@gmail.com">mohandegalwade@gmail.com</a></p>
            <p>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/mohan-degalwade" target="_blank">linkedin.com/in/mohan-degalwade</a></p>
            <p>💻 <strong>GeeksForGeeks:</strong> <a href="https://geeksforgeeks.org/user/montyy" target="_blank">geeksforgeeks.org/user/montyy</a></p>
            <p>📍 <strong>Location:</strong> Bidar, Karnataka, India</p>
            <p>&nbsp;</p>
            <p class="success-text">💡 Open to exciting opportunities in systems programming, telecom, and high-performance computing!</p>
            <p class="success-text">Feel free to reach out for collaborations, interesting projects, or just to chat about C++ and Linux! 🚀</p>
            <p>&nbsp;</p>
            <p><strong>Type <span class="highlight">'resume'</span> to download my full resume</strong></p>
        </div>
    `;
}

function listFiles() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <p>total 5</p>
            <p>drwxr-xr-x 2 monty monty 4096 Dec  4 2025 <span style="color: var(--accent-blue);">about/</span></p>
            <p>drwxr-xr-x 2 monty monty 4096 Dec  4 2025 <span style="color: var(--accent-blue);">experience/</span></p>
            <p>drwxr-xr-x 2 monty monty 4096 Dec  4 2025 <span style="color: var(--accent-blue);">projects/</span></p>
            <p>-rw-r--r-- 1 monty monty  256 Dec  4 2025 contact.txt</p>
            <p>-rw-r--r-- 1 monty monty  512 Dec  4 2025 readme.txt</p>
        </div>
    `;
}

function clearTerminal() {
    const output = document.getElementById('terminal-output');
    output.innerHTML = `
        <pre class="ascii-art">
                        __       
   ____ ___  ____  ____  / /___  __
  / __ \`__ \\/ __ \\/ __ \\/ __/ / / /
 / / / / / / /_/ / / / / /_/ /_/ / 
/_/ /_/ /_/\\____/_/ /_/\\__/\\__, /  
                          /____/   
</pre>
        <p class="welcome-text">Welcome to Mohan Degalwade's Portfolio Terminal v2.0</p>
        <p class="info-text">Linux-style interactive portfolio system</p>
        <p class="hint-text">Type <span class="highlight">'help'</span> to see available commands or <span class="highlight">'gui'</span> for visual mode</p>
        <p>&nbsp;</p>
    `;
}

// Tab switching
function switchTab(mode) {
    const terminalView = document.getElementById('terminal-view');
    const guiView = document.getElementById('gui-view');
    const tabs = document.querySelectorAll('.tab');
    
    if (mode === 'terminal') {
        terminalView.classList.remove('hidden');
        guiView.classList.add('hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
        document.getElementById('command-input').focus();
    } else {
        terminalView.classList.add('hidden');
        guiView.classList.remove('hidden');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// GUI section navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.gui-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Utility functions
function scrollToBottom() {
    const output = document.getElementById('terminal-output');
    output.scrollTop = output.scrollHeight;
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function autocomplete(input) {
    const commands = ['help', 'about', 'experience', 'projects', 'skills', 'contact', 'resume', 'download', 'clear', 'gui', 'ls', 'pwd', 'date'];
    const value = input.value.toLowerCase();
    const matches = commands.filter(cmd => cmd.startsWith(value));
    
    if (matches.length === 1) {
        input.value = matches[0];
    }
}

// Resume download function
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Mohan_Resume_Nov.pdf';
    link.download = 'Mohan_Degalwade_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Easter eggs
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        const output = document.getElementById('terminal-output');
        output.innerHTML += `<p class="hint-text">^C (Use 'clear' to clear terminal)</p>`;
        scrollToBottom();
    }
});

// Download resume function
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Mohan_Resume_Nov.pdf';
    link.download = 'Mohan_Degalwade_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Achievements terminal section
function showAchievements() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ cat achievements.txt</h3>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-orange);">Awards & Recognitions</strong></p>
            <p>▹ Multiple Bravo awards for technical contributions, reliability, and team impact</p>
            <p>▹ Recognized for solving customer‑critical issues and elevating product quality</p>
            <p>▹ Innovation Day recognition for rapid prototyping and feature ideation</p>
            <p>▹ 3rd place at Mitel Hackathon</p>
            <p>▹ SharkTank PoC presentation: Voice Command Softkey (accessibility)</p>
            <p>&nbsp;</p>
            <p><strong style="color: var(--accent-blue);">Community & Leadership</strong></p>
            <p>▹ Executive Member – NITK Beach Events (Incident Fest): coordinated large‑scale cultural programs</p>
            <p>▹ Coordinator – NITK Kannada Vedike Team: led club activities and student engagement</p>
            <p>▹ Committee Member – Phoenix Sports Club: organized sports events fostering teamwork</p>
            <p>▹ Delivered Tech Talks; active in coding and innovation contests</p>
            <p>▹ Contributor on GeeksforGeeks and LeetCode</p>
        </div>
    `;
}

// Education (terminal)
function showEducation() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ cat education.txt</h3>
            <p>🎓 NIT Karnataka, Surathkal — B.Tech, Electronics & Communication, CGPA 7.2 (2016–2020)</p>
            <p>🏫 Shri CBG PU Kardyal, Bidar — PUC Science, 98% (2014–2016)</p>
            <p>🏫 Shri CBG High School, Bidar — SSLC, 97% (2013–2014)</p>
        </div>
    `;
}

// About Me / Hobbies (terminal)
function showAboutMe() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `
        <div class="section-content">
            <h3>$ echo $ABOUT_ME</h3>
            <p>🌟 Interests: coding challenges, tech talks, drawing</p>
            <p>🏏 Sports: cricket, volleyball</p>
            <p>👥 Community: club coordination, event organization, leadership activities</p>
        </div>
    `;
}
