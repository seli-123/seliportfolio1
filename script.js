
// --- CONSTANTS ---
const THEMES = {
  blossom: {
    id: 'blossom',
    name: 'Pink Blossom',
    colors: {
      bg: '#fff0f5',
      bgGradient: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#1a0f15',
      muted: '#5c3a4b',
      accent: '#c2185b',
      accent2: '#e91e63',
      border: 'rgba(194, 24, 91, 0.3)',
    },
  },
  lilac: {
    id: 'lilac',
    name: 'Purple Dream',
    colors: {
      bg: '#f3f0ff',
      bgGradient: 'linear-gradient(135deg, #f3f0ff 0%, #e6dcfc 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#120821',
      muted: '#433360',
      accent: '#6200ea',
      accent2: '#7c4dff',
      border: 'rgba(98, 0, 234, 0.3)',
    },
  },
  brown: {
    id: 'brown',
    name: 'Brown Blossom',
    colors: {
      bg: '#fef8f2',
      bgGradient: 'linear-gradient(135deg, #fef8f2 0%, #faebd7 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#261406',
      muted: '#5c402b',
      accent: '#8d5524',
      accent2: '#c68642',
      border: 'rgba(141, 85, 36, 0.3)',
    },
  },
  black: {
    id: 'black',
    name: 'Black Gold',
    colors: {
      bg: '#111111',
      bgGradient: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)',
      card: 'rgba(25, 25, 25, 0.95)',
      text: '#ffffff',
      muted: '#d4d4d4',
      accent: '#ffd700',
      accent2: '#ffea85',
      border: 'rgba(255, 215, 0, 0.3)',
    },
  },
};


const SKILLS = [
  { 
    id: 1, 
    name: 'Arts', 
    image: 'https://picsum.photos/id/30/400/300',
    desc: 'Exploring visual aesthetics, color theory, and creative composition to bring ideas to life through digital and traditional media.'
  },
  { 
    id: 2, 
    name: 'Database', 
    image: 'https://picsum.photos/id/1/400/300',
    desc: 'Designing efficient schema structures, managing data integrity, and optimizing queries for high-performance information systems.'
  },
  { 
    id: 3, 
    name: 'Coding', 
    image: 'https://picsum.photos/id/2/400/300',
    desc: 'Building robust applications with clean, maintainable code, utilizing modern algorithms and software development best practices.'
  },
  { 
    id: 4, 
    name: 'Udacity', 
    image: 'uda.jpg',
    desc: 'Continuous learning through specialized Nanodegrees, mastering industry-relevant skills in emerging technologies.'
  },
];

const PROJECTS = [
  { 
    id: 1, 
    title: 'E-Commerce Hub', 
    image: 'https://picsum.photos/id/180/600/400', 
     desc: 'A modern shopping platform featuring real-time inventory, secure payments, and an intuitive dashboard.' 
  },
  { 
    id: 2, 
    title: 'Task Master', 
    image: 'https://picsum.photos/id/366/600/400', 
    desc: 'Productivity powerhouse for teams to track tasks, manage deadlines, and collaborate efficiently.' 
  },
  { 
    id: 3, 
    title: 'Finance Tracker', 
    image: 'https://picsum.photos/id/119/600/400', 
    desc: 'Personal finance assistant helping users track expenses, set budgets, and visualize savings goals.' 
  },
  { 
    id: 4, 
    title: 'Travel Journal', 
    image: 'https://picsum.photos/id/214/600/400', 
     desc: 'Digital diary for wanderers to document trips, pin locations, and share travel stories.' 
  },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/seli', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/seli', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg' },
  { name: 'Telegram', url: 'https://telegram.com/seli', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg' },
  { name: 'Instagram', url: 'https://instagram.com/seli', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg' },
];

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about-me' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

// --- STATE ---
let currentThemeId = localStorage.getItem('seli-theme') || 'blossom';
if (!THEMES[currentThemeId]) currentThemeId = 'blossom';
let currentView = 'home';
let typewriterInterval = null;

// --- DOM REFERENCES ---
const root = document.documentElement;
const appRoot = document.getElementById('app-root');
const themeMenu = document.getElementById('theme-menu');
const mobileMenu = document.getElementById('mobile-menu');
const navbarWrapper = document.getElementById('navbar-wrapper');

// --- CORE FUNCTIONS ---

function setTheme(id) {
  const theme = THEMES[id];
  currentThemeId = id;
  localStorage.setItem('seli-theme', id);
  
  // Update CSS Variables
  root.style.setProperty('--c-bg', theme.colors.bg);
  root.style.setProperty('--c-bg-grad', theme.colors.bgGradient);
  root.style.setProperty('--c-card', theme.colors.card);
  root.style.setProperty('--c-text', theme.colors.text);
  root.style.setProperty('--c-muted', theme.colors.muted);
  root.style.setProperty('--c-accent', theme.colors.accent);
  root.style.setProperty('--c-accent2', theme.colors.accent2);
  root.style.setProperty('--c-border', theme.colors.border);

  // Re-render to update any JS-driven styles (like icons)
  renderNavigation();
  renderView();
}

function navigateTo(viewId) {
  currentView = viewId;
  renderNavigation();
  renderView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  mobileMenu.classList.add('hidden');
}

// --- RENDERERS ---

function renderNavigation() {
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.getElementById('mobile-nav-links');

  // Desktop
  desktopNav.innerHTML = NAV_LINKS.map(link => `
    <button onclick="navigateTo('${link.id}')" 
      class="relative text-base font-semibold tracking-wide transition-all duration-300 hover:scale-105 ${currentView === link.id ? 'font-bold' : 'opacity-80 hover:opacity-100'}"
      style="color: ${currentView === link.id ? 'var(--c-accent)' : 'var(--c-text)'}">
      ${link.label}
    </button>
  `).join('');

  // Mobile
  mobileNav.innerHTML = NAV_LINKS.map(link => `
    <button onclick="navigateTo('${link.id}')" 
      class="text-left px-4 py-3 rounded-2xl font-medium transition-all hover:bg-black/5 ${currentView === link.id ? 'bg-black/5' : ''}"
      style="color: ${currentView === link.id ? 'var(--c-accent)' : 'var(--c-text)'}">
      ${link.label}
    </button>
  `).join('');

  // Theme Options
  const themeOptions = document.getElementById('theme-options');
  themeOptions.innerHTML = Object.values(THEMES).map(t => `
    <button onclick="setTheme('${t.id}'); toggleThemeMenu()" 
       class="w-full flex items-center gap-3 p-2.5 rounded-xl text-sm hover:bg-black/5 transition-colors mb-1 group theme-text">
       <div class="w-5 h-5 rounded-full shadow-sm border border-black/10 group-hover:scale-110 transition-transform" style="background: ${t.colors.accent}"></div>
       <span class="font-medium">${t.name}</span>
    </button>
  `).join('');
}

function renderView() {
  // Cleanup intervals
  if (typewriterInterval) clearInterval(typewriterInterval);

  let content = '';
  const theme = THEMES[currentThemeId];
  // Use JS to determine card styling that CSS vars might not cover fully if mixed opacity
  const floatBorder = currentThemeId === 'black' ? 'rgba(20,20,20,0.8)' : 'rgba(255,255,255,0.6)';

  if (currentView === 'home') {
    content = `
      <section id="home" class="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 px-4 py-8 lg:px-12 overflow-hidden relative animate-fade-in">
        <div class="flex-1 space-y-8 text-center lg:text-left z-10">
           <h1 class="text-4xl lg:text-7xl font-bold font-poppins leading-tight drop-shadow-sm theme-text">
              Hi, I'm <br/>
              <div class="min-h-[1.5em] flex items-center justify-center lg:justify-start mt-2">
                <span id="typewriter" class="font-cursive text-5xl lg:text-7xl block py-1 tracking-wide leading-tight theme-text-accent" style="line-height: 1.2"></span>
                <span class="animate-pulse ml-1 theme-text-accent">|</span>
              </div>
           </h1>
           <p class="text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium drop-shadow-sm theme-text-muted">
              I am an Information Systems student passionate about designing efficient systems, analyzing data, and creating technology solutions that make an impact.
           </p>
           <div class="flex gap-5 justify-center lg:justify-start pt-4">
              ${SOCIAL_LINKS.map(link => `
                <a href="${link.url}" target="_blank" class="p-4 rounded-full border-2 theme-border-accent hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                  <img src="${link.icon}" class="w-6 h-6" style="filter: hue-rotate(${currentThemeId === 'black' ? '0deg' : '-45deg'})" />
                </a>
              `).join('')}
           </div>
        </div>
        <div class="flex-1 flex justify-center lg:justify-end z-10 w-full pb-10 lg:pb-0">
           <div class="relative group w-72 h-72 lg:w-[450px] lg:h-[450px] animate-float">
              <div class="absolute -inset-1 rounded-full blur opacity-20 transition duration-500" style="background: linear-gradient(45deg, var(--c-accent), var(--c-accent2))"></div>
              <div class="relative z-10 rounded-full overflow-hidden shadow-xl backdrop-blur-sm h-full w-full" style="background-color: ${floatBorder}">
                 <img src="qq.jpg" class="w-full h-full object-cover rounded-full" />
              </div>
           </div>
        </div>
      </section>
    `;
  } else if (currentView === 'about-me') {
    content = `
      <section class="py-12 px-4 animate-fade-in">
         <div class="max-w-6xl mx-auto rounded-[3rem] p-8 lg:p-12 shadow-lg relative theme-bg-card">
            <div class="flex flex-col md:flex-row items-center gap-12 relative z-10">
               <div class="flex-1 order-2 md:order-1">
                  <div class="mb-8"><h2 class="text-4xl font-bold font-poppins text-left theme-text">About Me</h2></div>
                  <p class="leading-loose text-lg mb-6 font-medium theme-text-muted">I’m Selihom, a 3rd year Information Systems student driven by curiosity and innovation. I enjoy exploring how technology can improve processes, solve real-world problems, and make life easier.</p>
                  <p class="leading-loose text-lg font-medium theme-text-muted">From coding and databases to designing intuitive systems, I strive to deliver solutions that are both functional and creative. Learning constantly, I aim to grow as a tech professional and contribute to meaningful projects.</p>
               </div>
               <div class="w-full md:w-1/3 order-1 md:order-2 flex justify-center perspective-1000">
                  <div class="relative w-72 h-[28rem] group">
                     <div class="absolute inset-0 rounded-[2rem] shadow-md transform -rotate-6 transition-transform duration-500 group-hover:-rotate-12 origin-bottom-left theme-bg-card opacity-60"></div>
                     <div class="absolute inset-0 rounded-[2rem] shadow-md transform rotate-6 transition-transform duration-500 group-hover:rotate-12 origin-bottom-right theme-bg-card opacity-60"></div>
                     <div class="relative z-10 w-full h-full rotate-2 hover:rotate-0 transition-transform duration-500 rounded-[2rem] shadow-xl overflow-hidden border-2 theme-border bg-white/60 backdrop-blur-sm">
                        <img src="se.jpg" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:animate-shine pointer-events-none z-20"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    `;
  } else if (currentView === 'skills' || currentView === 'projects') {
     const items = currentView === 'skills' ? SKILLS : PROJECTS;
     const title = currentView === 'skills' ? 'Skills' : 'Projects';
     
     content = `
       <section class="py-12 px-4 animate-fade-in">
          <div class="max-w-7xl mx-auto">
             <div class="flex items-center justify-center mb-16">
                <h2 class="text-3xl md:text-5xl font-bold px-8 font-poppins text-center theme-text">My ${title}</h2>
             </div>
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                ${items.map((item, index) => `
                  <div class="flex flex-col group animate-fade-in block" style="animation-delay: ${index * 100}ms; animation-fill-mode: both;">
                     <!-- Image Container -->
                     <div class="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-lg backdrop-blur-sm border-2 theme-border bg-white/60 mb-6 transition-transform duration-500 hover:-translate-y-2">
                        <img src="${item.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <!-- Shine Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:animate-shine pointer-events-none z-20"></div>
                     </div>
                     <!-- Content Below -->
                     <div class="text-center px-2">
                        <h3 class="font-bold text-2xl mb-3 theme-text">${item.name || item.title}</h3>
                        <p class="text-base leading-relaxed theme-text-muted font-medium">
                           ${item.desc || 'Description available upon request.'}
                        </p>
                     </div>
                  </div>
                `).join('')}
             </div>
          </div>
       </section>
     `;
  } else if (currentView === 'contact') {
     const inputClass = "w-full p-4 rounded-2xl outline-none transition-all bg-black/5 focus:bg-white focus:shadow-md focus:scale-[1.01] theme-text";
     const cardBg = currentThemeId === 'black' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)';
     
     content = `
      <section class="py-12 px-4 pb-32 animate-fade-in">
         <div class="max-w-4xl mx-auto rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md theme-bg-card">
            <div class="text-center mb-10">
               <h2 class="text-3xl font-bold mb-4 theme-text">Get In Touch</h2>
               <p class="theme-text-muted">Have a project or question? Send me a message.</p>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
               <div class="space-y-8">
                  <div class="flex items-center gap-4 p-4 rounded-3xl border-2 transition-transform hover:scale-105 shadow-md theme-border-accent" style="background: ${cardBg}">
                     <div class="p-3 rounded-full shrink-0" style="background: var(--c-bg); color: var(--c-accent)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                     </div>
                     <div>
                        <p class="text-sm font-bold theme-text-muted">Phone</p>
                        <p class="font-medium theme-text">+251 900 879 328</p>
                     </div>
                  </div>
                  <div class="flex items-center gap-4 p-4 rounded-3xl border-2 transition-transform hover:scale-105 shadow-md theme-border-accent" style="background: ${cardBg}">
                     <div class="p-3 rounded-full shrink-0" style="background: var(--c-bg); color: var(--c-accent)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                     </div>
                     <div>
                        <p class="text-sm font-bold theme-text-muted">Email</p>
                        <a href="mailto:seliayimen23@gmail.com" class="font-medium hover:underline theme-text">seliayimen23@gmail.com</a>
                     </div>
                  </div>
               </div>
               <form onsubmit="event.preventDefault(); alert('Thank you for your message!');" class="flex flex-col gap-4">
                  <input type="text" placeholder="Your Name" class="${inputClass}" required />
                  <input type="email" placeholder="Your Email" class="${inputClass}" required />
                  <textarea rows="4" placeholder="Your Message" class="${inputClass} resize-none" required></textarea>
                  <div class="flex gap-3 mt-2">
                     <button type="submit" class="flex-[2] py-4 px-8 rounded-full font-bold text-white shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2" style="background: linear-gradient(90deg, var(--c-accent), var(--c-accent2))">
                        Send Message <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                     </button>
                     <button type="reset" class="flex-1 py-4 px-6 rounded-full font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 border-2 theme-border-accent theme-text-accent">
                        Reset <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>
     `;
  }

  appRoot.innerHTML = content;

  if (currentView === 'home') {
    startTypewriter();
  }
}

// --- TYPEWRITER LOGIC ---
function startTypewriter() {
  const textElement = document.getElementById('typewriter');
  if (!textElement) return;

  const phrases = ["Selihom Aychal", "Information Systems Student"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentPhrase = phrases[0];

  function tick() {
    if (!document.getElementById('typewriter')) return; // Guard if view changed

    currentPhrase = phrases[phraseIndex % phrases.length];
    
    if (isDeleting) {
       textElement.innerText = currentPhrase.substring(0, charIndex - 1);
       charIndex--;
    } else {
       textElement.innerText = currentPhrase.substring(0, charIndex + 1);
       charIndex++;
    }

    let delta = 150;
    if (isDeleting) delta /= 2;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delta = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      delta = 500;
    }

    typewriterInterval = setTimeout(tick, delta);
  }

  tick();
}

// --- EVENT HANDLERS ---

function toggleThemeMenu() {
  themeMenu.classList.toggle('hidden');
}

function toggleMobileMenu() {
   mobileMenu.classList.toggle('hidden');
}

// Scroll Handler
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
     navbarWrapper.classList.add('-translate-y-full');
  } else {
     navbarWrapper.classList.remove('-translate-y-full');
  }
  lastScrollY = window.scrollY;
});

// Click Shadow Effect
window.addEventListener('click', (e) => {
   const shadow = document.createElement('div');
   shadow.className = 'fixed rounded-full pointer-events-none z-[9999]';
   const size = 20;
   shadow.style.left = `${e.clientX}px`;
   shadow.style.top = `${e.clientY}px`;
   shadow.style.width = `${size}px`;
   shadow.style.height = `${size}px`;
   shadow.style.transform = 'translate(-50%, -50%)';
   shadow.style.backgroundColor = getComputedStyle(root).getPropertyValue('--c-accent').trim();
   shadow.style.opacity = '0.5';
   
   const animation = shadow.animate([
      { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.8 },
      { transform: 'translate(-50%, -100%) scale(3)', opacity: 0 }
   ], {
      duration: 600,
      easing: 'ease-out',
      fill: 'forwards'
   });
   
   document.body.appendChild(shadow);
   animation.onfinish = () => shadow.remove();
});

// --- INITIALIZATION ---
setTheme(currentThemeId);
renderNavigation(); // Initial render
