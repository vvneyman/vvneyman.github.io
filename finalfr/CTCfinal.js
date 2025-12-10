function createThreadingPattern() {
const pattern = Array(8).fill(null).map(() => Array(16).fill(false));

for (let threadNum = 0; threadNum < 16; threadNum++) {
    const shaftNum = threadNum % 8;
    pattern[shaftNum][threadNum] = true;
}

return pattern;
}

const state = {
    threading: createThreadingPattern(),
    tieup: Array(4).fill(null).map(() => Array(6).fill(false)),
    activeTreadles: Array(6).fill(false),
    reedDensity: 16,
    fabricRows: [],
    timer: 0,
    warpColor: '#ffffffff',
    weftColor: '#000000ff'
};

const TIMER_DURATION = 90;
state.timer = TIMER_DURATION;
let timerInterval = null;

state.hoversEnabled = true;
function createTooltips() {
    const controls = document.querySelectorAll('[data-tooltip]');

controls.forEach(control => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = control.dataset.tooltip;
        control.appendChild(tooltip);
    });
}

const hoverToggleBtn = document.getElementById('hoverToggleBtn');
hoverToggleBtn.addEventListener('click', () => {
    state.hoversEnabled = !state.hoversEnabled;
    hoverToggleBtn.textContent = state.hoversEnabled ? 'Hovers: On' : 'Hovers: Off';

    document.body.classList.toggle('hovers-off', !state.hoversEnabled);
});

createTooltips();

const threadingDraft = document.getElementById('threadingDraft');
for (let shaft = 0; shaft < 8; shaft++) {
    for (let end = 0; end < 16; end++) {
        const cell = document.createElement('button');
        cell.className = 'toggle-cell';
        cell.onclick = () => toggleThreading(shaft, end);
        threadingDraft.appendChild(cell);
    }
}

const tieupDraft = document.getElementById('tieupDraft');
for (let shaft = 0; shaft < 4; shaft++) {
    for (let treadle = 0; treadle < 6; treadle++) {
        const cell = document.createElement('button');
        cell.className = 'toggle-cell';
        cell.onclick = () => toggleTieup(shaft, treadle);
        tieupDraft.appendChild(cell);
    }
}

const treadlingSection = document.getElementById('treadlingSection');
for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.className = 'treadle-row';
    
    const btn = document.createElement('button');
    btn.className = 'treadle-btn';
    btn.textContent = `Treadle ${i + 1}`;
    btn.onclick = () => toggleTreadle(i);
    row.appendChild(btn);
    
    treadlingSection.appendChild(row);
}

const reedSlider = document.getElementById('reedDensity');
const reedValue = document.getElementById('reedValue');
reedSlider.oninput = (e) => {
    state.reedDensity = parseInt(e.target.value);
    reedValue.textContent = state.reedDensity;
};

function toggleThreading(shaft, end) {
    state.threading[shaft][end] = !state.threading[shaft][end];
    updateThreadingDisplay();
}

function toggleTieup(shaft, treadle) {
    state.tieup[shaft][treadle] = !state.tieup[shaft][treadle];
    updateTieupDisplay();
}

function toggleTreadle(index) {
    state.activeTreadles[index] = !state.activeTreadles[index];
    updateTreadlingDisplay();
}

function updateThreadingDisplay() {
    const cells = threadingDraft.querySelectorAll('.toggle-cell');
    cells.forEach((cell, index) => {
        const shaft = Math.floor(index / 16);
        const end = index % 16;
        cell.classList.toggle('active', state.threading[shaft][end]);
    });
}

function updateTieupDisplay() {
    const cells = tieupDraft.querySelectorAll('.toggle-cell');
    cells.forEach((cell, index) => {
        const shaft = Math.floor(index / 6);
        const treadle = index % 6;
        cell.classList.toggle('active', state.tieup[shaft][treadle]);
    });
}

function updateTreadlingDisplay() {
    const buttons = treadlingSection.querySelectorAll('.treadle-btn');
    buttons.forEach((btn, index) => {
        btn.classList.toggle('active', state.activeTreadles[index]);
    });
}


// color //
const warpColorPicker = document.getElementById('warpColor');
const weftColorPicker = document.getElementById('weftColor');


warpColorPicker.value = state.warpColor;
weftColorPicker.value = state.weftColor;

warpColorPicker.oninput = (e) => {
    state.warpColor = e.target.value;
}

weftColorPicker.oninput = (e) => {
    state.weftColor = e.target.value;
};


//*AUUUUUUGHHHHHHH*//


function calculateRaisedWarps() {
    const raised = Array(state.reedDensity).fill(false);
    

const raisedShafts = Array(4).fill(false);
for (let treadle = 0; treadle < 6; treadle++) {
    if (state.activeTreadles[treadle]) {
        for (let shaft = 0; shaft < 4; shaft++) {
            if (state.tieup[shaft] && state.tieup[shaft][treadle]) {
                raisedShafts[shaft] = true;
            }
        }
    }
}

for (let i = 0; i < state.reedDensity; i++) {
    const threadCol = i % 16;
    for (let shaft = 0; shaft < 8; shaft++) { 
        const mapped = shaft % 4;
        if (state.threading[shaft][threadCol] && raisedShafts[shaft]) {
            raised[i] = true;
            break;
        }
    }
}

return raised;
}

document.getElementById('beaterBtn').onclick = () => {
    const raisedWarps = calculateRaisedWarps();

state.fabricRows.unshift({
    raisedWarps: raisedWarps,
    warpColor: state.warpColor,
    weftColor: state.weftColor
});

if (state.fabricRows.length > 200) {
    state.fabricRows.pop();
}

updateFabricDisplay();

state.activeTreadles.fill(false);
updateTreadlingDisplay();
};

function updateFabricDisplay() {
    const canvas = document.getElementById('fabricCanvas');
    canvas.innerHTML = '';

    state.fabricRows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'fabric-row';

        row.raisedWarps.forEach(isRaised => {
            const thread = document.createElement('div');
            thread.className = 'warp-thread';

            thread.style.backgroundColor = isRaised ? row.warpColor : row.weftColor;

            rowDiv.appendChild(thread);
        });

        canvas.appendChild(rowDiv);
    });
}

//evil dumb timer that is ruining my life//

//function updateTimerDisplay() {
    //const minutes = Math.floor(state.timer / 60).toString().padStart(2, '0');
    //const seconds = (state.timer % 60).toString().padStart(2, '0');
    //document.getElementById('timer').textContent = `${minutes}:${seconds}`;
//}

function startTimer() {
if (timerInterval !== null) return; 
    timerInterval = setInterval(() => {
        state.timer--;

    if (state.timer <= 0) {
        state.fabricRows = [];
        updateFabricDisplay();

        state.timer = TIMER_DURATION;
    }

    updateTimerDisplay();
}, 1000);
}

const welcomeModal = document.getElementById('welcomeModal');
const startGameBtn = document.getElementById('startGameBtn');

startGameBtn.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
    startTimer();
});

updateThreadingDisplay();
updateTieupDisplay();
updateTreadlingDisplay();
updateTimerDisplay();