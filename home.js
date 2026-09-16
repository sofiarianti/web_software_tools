/**
 * Home Page Script with Dark / Light Mode Switch
 * Permintaan: Halaman home yang di tengahnya memiliki button switch mode gelap dan terang
 */

// 1. Inject Styles dynamically into <head>
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    /* Light Mode Tokens */
    --bg-main: #f1f5f9;
    --bg-gradient: radial-gradient(circle at 50% 0%, #ffffff 0%, #e2e8f0 100%);
    --card-bg: rgba(255, 255, 255, 0.8);
    --card-border: rgba(226, 232, 240, 0.8);
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --accent: #6366f1;
    --accent-glow: rgba(99, 102, 241, 0.25);
    --shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
    --switch-bg: #e2e8f0;
    --switch-border: #cbd5e1;
    --switch-knob: #ffffff;
    --switch-knob-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    --icon-sun: #f59e0b;
    --icon-moon: #94a3b8;
    --badge-bg: rgba(99, 102, 241, 0.1);
    --badge-text: #4f46e5;
  }

  [data-theme="dark"] {
    /* Dark Mode Tokens */
    --bg-main: #0b0f17;
    --bg-gradient: radial-gradient(circle at 50% 0%, #1e293b 0%, #0b0f17 100%);
    --card-bg: rgba(15, 23, 42, 0.75);
    --card-border: rgba(255, 255, 255, 0.08);
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent: #818cf8;
    --accent-glow: rgba(129, 140, 248, 0.35);
    --shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    --switch-bg: #1e293b;
    --switch-border: #334155;
    --switch-knob: #0f172a;
    --switch-knob-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    --icon-sun: #64748b;
    --icon-moon: #a855f7;
    --badge-bg: rgba(129, 140, 248, 0.15);
    --badge-text: #c084fc;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body {
    min-height: 100vh;
    background: var(--bg-main);
    background-image: var(--bg-gradient);
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    padding: 2rem;
  }

  /* Decorative Ambient Lights */
  .ambient-light {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
    filter: blur(40px);
  }

  /* Main Container Card */
  .home-container {
    position: relative;
    z-index: 1;
    max-width: 680px;
    width: 100%;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 32px;
    padding: 3.5rem 2.5rem;
    box-shadow: var(--shadow);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: var(--badge-bg);
    color: var(--badge-text);
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background-color: currentColor;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .title span {
    background: linear-gradient(135deg, var(--accent) 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 500px;
  }

  /* Centered Mode Switch Button Section */
  .switch-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .theme-switch-btn {
    position: relative;
    width: 220px;
    height: 64px;
    background: var(--switch-bg);
    border: 2px solid var(--switch-border);
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .theme-switch-btn:hover {
    box-shadow: 0 0 20px var(--accent-glow);
    border-color: var(--accent);
  }

  /* Knob Slider */
  .switch-knob {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 48px;
    height: 48px;
    background: var(--switch-knob);
    border-radius: 50%;
    box-shadow: var(--switch-knob-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s;
    z-index: 2;
  }

  [data-theme="dark"] .switch-knob {
    transform: translateX(156px);
  }

  /* Icons inside Switch */
  .switch-icon-option {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
    font-size: 0.875rem;
    font-weight: 700;
    transition: opacity 0.3s ease;
  }

  .icon-sun-wrapper {
    color: var(--icon-sun);
    padding-left: 8px;
  }

  .icon-moon-wrapper {
    color: var(--icon-moon);
    padding-right: 8px;
  }

  .switch-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .switch-label strong {
    color: var(--accent);
  }

  /* Feature Grid Footer */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--card-border);
    padding: 1rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .feature-card-icon {
    font-size: 1.5rem;
  }

  .feature-card-title {
    font-size: 0.85rem;
    font-weight: 700;
  }

  .feature-card-desc {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  @media (max-width: 600px) {
    .home-container {
      padding: 2rem 1.5rem;
    }
    .title {
      font-size: 1.8rem;
    }
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(style);

// 2. SVG Icons
const sunSvg = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m4.93 19.07 1.41-1.41"></path>
    <path d="m17.66 6.34 1.41-1.41"></path>
  </svg>
`;

const moonSvg = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
`;

// 3. Render Page Content Function
function renderHomePage() {
  // Check root container or body
  const app = document.getElementById('app') || document.body;

  // Initialize Theme from localStorage or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Build Layout HTML
  app.innerHTML = `
    <div class="ambient-light"></div>
    <div class="home-container">
      <div class="badge">
        <span class="badge-dot"></span> Mode Switcher App
      </div>

      <h1 class="title">
        Selamat Datang di <span>Home Page</span>
      </h1>

      <p class="subtitle">
        Nikmati pengalaman visual yang nyaman dengan mengubah mode tampilan terang dan gelap kapan saja.
      </p>

      <!-- Center Switch Button -->
      <div class="switch-wrapper">
        <button id="themeToggleBtn" class="theme-switch-btn" aria-label="Toggle Mode Terang / Gelap">
          <div class="switch-icon-option icon-sun-wrapper">
            ${sunSvg}
          </div>

          <div class="switch-knob" id="switchKnob">
            ${savedTheme === 'dark' ? moonSvg : sunSvg}
          </div>

          <div class="switch-icon-option icon-moon-wrapper">
            ${moonSvg}
          </div>
        </button>

        <div class="switch-label" id="switchLabel">
          Status: <strong id="themeStatus">${savedTheme === 'dark' ? 'Mode Gelap 🌙' : 'Mode Terang ☀️'}</strong>
        </div>
      </div>

      <!-- Feature Grid -->
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-card-icon">⚡</span>
          <span class="feature-card-title">Responsif</span>
          <span class="feature-card-desc">Transisi instan & mulus</span>
        </div>
        <div class="feature-card">
          <span class="feature-card-icon">🎨</span>
          <span class="feature-card-title">Desain Modern</span>
          <span class="feature-card-desc">Tampilan Glassmorphism</span>
        </div>
        <div class="feature-card">
          <span class="feature-card-icon">💾</span>
          <span class="feature-card-title">Auto Save</span>
          <span class="feature-card-desc">Tersimpan di browser</span>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listener to Button Switch
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeStatus = document.getElementById('themeStatus');
  const switchKnob = document.getElementById('switchKnob');

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Set Theme Attribute & localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update Label & Knob Icon
    if (newTheme === 'dark') {
      themeStatus.textContent = 'Mode Gelap 🌙';
      switchKnob.innerHTML = moonSvg;
    } else {
      themeStatus.textContent = 'Mode Terang ☀️';
      switchKnob.innerHTML = sunSvg;
    }
  });
}

// Execute on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderHomePage);
} else {
  renderHomePage();
}
