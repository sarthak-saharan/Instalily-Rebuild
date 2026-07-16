// ---- header + banner offset ----
const header = document.getElementById('main-header');
const banner = document.getElementById('disclaimer-banner');
function positionHeader(){ header.style.top = banner.offsetHeight + 'px'; }
positionHeader();
window.addEventListener('resize', positionHeader);

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- mobile hamburger (simple toggle of nav links) ----
document.querySelector('.hamburger').addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  const isOpen = nav.style.display === 'flex';
  nav.style.display = isOpen ? 'none' : 'flex';
  nav.style.cssText += isOpen ? '' : 'position:fixed;top:'+ (banner.offsetHeight+58) +'px;left:0;right:0;background:#fff;flex-direction:column;padding:20px;border-bottom:1px solid var(--border);gap:18px;';
});

// ============ WORKFLOW SIMULATOR ============
const simTabs = [...document.querySelectorAll('.sim-tab')];
const simPanels = [...document.querySelectorAll('.sim-panel')];
const simDots = [...document.querySelectorAll('#sim-dots span')];
let simStep = 0;
function setSimStep(i){
  simStep = Math.max(0, Math.min(simTabs.length - 1, i));
  simTabs.forEach((t,idx)=>t.classList.toggle('active', idx===simStep));
  simPanels.forEach((p,idx)=>p.classList.toggle('active', idx===simStep));
  simDots.forEach((d,idx)=>d.classList.toggle('active', idx===simStep));
}
simTabs.forEach(t => t.addEventListener('click', () => setSimStep(+t.dataset.step)));
document.getElementById('sim-prev').addEventListener('click', () => setSimStep(simStep-1));
document.getElementById('sim-next').addEventListener('click', () => setSimStep(simStep+1 > simTabs.length-1 ? 0 : simStep+1));

// ============ ROI CALCULATOR ============
const roiProfiles = {
  distribution: { label:'Quotes per month', unit:'quote', hrsPer:1.5, defaultVol:300, note:'Active rep time saved per quote; InstaLILY\'s published cycle time drops ~2 days to ~4 hours end-to-end.', defaultCost:65 },
  fieldservice: { label:'Service calls per month', unit:'call', hrsPer:0.25, defaultVol:600, note:'Based on diagnosis time dropping from ~15 minutes to under 10 seconds.', defaultCost:55 },
  logistics: { label:'Dispatches per month', unit:'dispatch', hrsPer:0.2, defaultVol:900, note:'Based on routing time cut from ~15 minutes to ~3 minutes.', defaultCost:45 },
  construction: { label:'Branch tickets per month', unit:'ticket', hrsPer:0.5, defaultVol:250, note:'Estimated from typical branch-ops and routing friction reduction.', defaultCost:50 },
  healthcare: { label:'Triage/admin cases per month', unit:'case', hrsPer:0.3, defaultVol:500, note:'Estimated from administrative workflow throughput gains.', defaultCost:60 },
};
const industryEl = document.getElementById('roi-industry');
const volumeEl = document.getElementById('roi-volume');
const volumeValEl = document.getElementById('roi-volume-val');
const volumeLabelEl = document.getElementById('roi-volume-label');
const baselineNoteEl = document.getElementById('roi-baseline-note');
const costEl = document.getElementById('roi-cost');
const costValEl = document.getElementById('roi-cost-val');
const hoursEl = document.getElementById('roi-hours');
const hoursSubEl = document.getElementById('roi-hours-sub');
const dollarsEl = document.getElementById('roi-dollars');

function applyProfile(key){
  const p = roiProfiles[key];
  volumeLabelEl.textContent = p.label;
  volumeEl.value = p.defaultVol;
  volumeValEl.textContent = p.defaultVol;
  baselineNoteEl.textContent = p.note;
  costEl.value = p.defaultCost;
  costValEl.textContent = '$' + p.defaultCost + '/hr';
  computeRoi();
}

function computeRoi(){
  const p = roiProfiles[industryEl.value];
  const vol = +volumeEl.value;
  const cost = +costEl.value;
  volumeValEl.textContent = vol;
  costValEl.textContent = '$' + cost + '/hr';
  const hours = Math.round(vol * p.hrsPer);
  const dollars = Math.round(hours * cost);
  hoursEl.textContent = hours.toLocaleString() + ' hrs';
  hoursSubEl.textContent = 'Across ' + vol.toLocaleString() + ' ' + p.unit + 's / month';
  dollarsEl.textContent = '$' + dollars.toLocaleString();
}

industryEl.addEventListener('change', () => applyProfile(industryEl.value));
volumeEl.addEventListener('input', computeRoi);
costEl.addEventListener('input', computeRoi);
applyProfile('distribution');

// ============ LILY CO-PILOT ============
const lilyPanel = document.getElementById('lily-panel');
const lilyBody = document.getElementById('lily-body');
const lilyAvatarBtn = document.getElementById('lily-avatar-btn');
const lilyCloseBtn = document.getElementById('lily-close');
const lilyProgress = document.getElementById('lily-tour-progress');
const lilyTourNav = document.getElementById('lily-tour-nav');
const lilyTourBack = document.getElementById('lily-tour-back');
const lilyTourNext = document.getElementById('lily-tour-next');
const lilyGreeting = document.getElementById('lily-greeting');
const lilyGreetingClose = document.getElementById('lily-greeting-close');

let spotlightEl = null;
function clearSpotlight(){ if(spotlightEl){ spotlightEl.classList.remove('spotlight'); spotlightEl = null; } }
function spotlight(el){ clearSpotlight(); spotlightEl = el; el.classList.add('spotlight'); }

function hideGreeting(){ lilyGreeting.classList.remove('show'); }

function openPanel(){ hideGreeting(); lilyPanel.classList.add('open'); }
function closePanel(){ lilyPanel.classList.remove('open'); clearSpotlight(); }
lilyAvatarBtn.addEventListener('click', () => { lilyPanel.classList.contains('open') ? closePanel() : (showMenu(), openPanel()); });
lilyCloseBtn.addEventListener('click', closePanel);

// greeting bubble: pop up once after a short delay, clicking it opens the full co-pilot
setTimeout(() => {
  if(!lilyPanel.classList.contains('open')) lilyGreeting.classList.add('show');
}, 1400);
lilyGreeting.addEventListener('click', () => { showMenu(); openPanel(); });
lilyGreetingClose.addEventListener('click', (e) => { e.stopPropagation(); hideGreeting(); });

function showMenu(){
  lilyProgress.style.display = 'none';
  lilyTourNav.style.display = 'none';
  clearSpotlight();
  lilyBody.innerHTML = `
    <div class="lily-msg">Hi, I'm Lily. Want the tour, or do you already know what you're looking for?</div>
    <div class="lily-menu">
      <button class="lily-menu-btn" id="menu-tour"><span>Take the 5-stop tour</span><span class="arrow">&rarr;</span></button>
      <button class="lily-menu-btn" id="menu-sim"><span>Show me how you build a workflow</span><span class="arrow">&rarr;</span></button>
      <button class="lily-menu-btn" id="menu-roi"><span>Calculate my ROI</span><span class="arrow">&rarr;</span></button>
      <button class="lily-menu-btn" id="menu-cta"><span>I'm ready &mdash; book a demo</span><span class="arrow">&rarr;</span></button>
    </div>
  `;
  document.getElementById('menu-tour').addEventListener('click', startTour);
  document.getElementById('menu-sim').addEventListener('click', () => { jumpTo('simulator'); showStandalone('simulator'); });
  document.getElementById('menu-roi').addEventListener('click', () => { jumpTo('roi'); showStandalone('roi'); });
  document.getElementById('menu-cta').addEventListener('click', () => { jumpTo('cta'); closePanel(); });
}

function jumpTo(id){
  const el = document.getElementById(id);
  el.scrollIntoView({ behavior:'smooth', block:'start' });
}

function showStandalone(kind){
  lilyProgress.style.display = 'none';
  lilyTourNav.style.display = 'none';
  const el = document.getElementById(kind === 'simulator' ? 'sim-wrap' : 'roi-card');
  setTimeout(() => spotlight(el), 400);
  lilyBody.innerHTML = `
    <button class="lily-back-menu" id="back-menu">&larr; Back</button>
    <div class="lily-msg">${kind === 'simulator'
      ? "This is a real quoting deployment. Click Map, Build, Deploy, Learn to see how I actually shipped it."
      : "Pick your workflow and monthly volume on the left, I'll estimate the hours and value on the right."}</div>
  `;
  document.getElementById('back-menu').addEventListener('click', showMenu);
}

// ---- guided tour ----
const tourSteps = [
  { id:'hero', title:'The pitch', text:"I learn how your business works, build the software the work needs, and get it running inside the systems you already use. No rip-and-replace." },
  { id:'how-it-works', title:'How I work', text:"Three steps: I learn the business, build the agents, then run and keep improving. Nothing ships until it's proven on real work." },
  { id:'use-cases', title:'Where I fit', text:"I was built first for the hardest enterprise workflows: quoting, dispatch, diagnosis, triage. Find the one closest to yours." },
  { id:'simulator', title:'Watch me build', text:"Here's a real quoting deployment, broken into Map, Build, Deploy, Learn. Try clicking through the stages yourself.", target:'sim-wrap' },
  { id:'roi', title:'Your numbers', text:"Now the important part: pick your workflow and volume, and I'll estimate what this would save your team every month.", target:'roi-card' },
];
let tourIndex = 0;

function startTour(){
  tourIndex = 0;
  lilyProgress.style.display = 'flex';
  lilyTourNav.style.display = 'flex';
  renderTourStep();
}

function renderTourStep(){
  const step = tourSteps[tourIndex];
  [...lilyProgress.children].forEach((s,i)=>s.classList.toggle('done', i<=tourIndex));
  lilyBody.innerHTML = `
    <div class="eyebrow" style="margin-bottom:8px;">Stop ${tourIndex+1} of ${tourSteps.length}</div>
    <h3 style="color:#fff;margin-bottom:10px;">${step.title}</h3>
    <div class="lily-msg">${step.text}</div>
  `;
  jumpTo(step.id);
  setTimeout(() => spotlight(document.getElementById(step.target || step.id)), 350);
  lilyTourBack.style.visibility = tourIndex === 0 ? 'hidden' : 'visible';
  lilyTourNext.textContent = tourIndex === tourSteps.length - 1 ? 'Finish' : 'Next →';
}

lilyTourNext.addEventListener('click', () => {
  if(tourIndex === tourSteps.length - 1){ showMenu(); return; }
  tourIndex++;
  renderTourStep();
});
lilyTourBack.addEventListener('click', () => {
  if(tourIndex === 0) return;
  tourIndex--;
  renderTourStep();
});

// seed initial menu content so panel isn't empty before first open
showMenu();
