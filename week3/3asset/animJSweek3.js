const btn = document.querySelector('.btn');
const body = document.body;
const lightElement = document.querySelector('.light');

const moths = [
    document.getElementById('moth1'),
    document.getElementById('moth2'),
    document.getElementById('moth3')
];

let mothPositions = [
    { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0.02 },
    { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0.015 },
    { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0.025 }
];

let isLightOn = false;
let animationId;

function initializeMoths() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    mothPositions.forEach((moth, index) => {
        moth.x = centerX;
        moth.y = centerY;
        moth.targetX = centerX;
        moth.targetY = centerY;
        
        if (moths[index]) {
            moths[index].style.left = moth.x + 'px';
            moths[index].style.top = moth.y + 'px';
        }
    });
}

btn.addEventListener('click', function() {
    toggleLight();
});

function toggleLight() {
    isLightOn = !isLightOn;
    
    if (isLightOn) {
        body.classList.add('on');
        
        
        initializeMoths();
        
        setTimeout(() => {
            moths.forEach(moth => {
                if (moth) moth.classList.add('visible');
            });
        }, 400); 
        
        startMothAnimation();
    } else {
        body.classList.remove('on');
        
        moths.forEach(moth => {
            if (moth) moth.classList.remove('visible');
        });

        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        document.removeEventListener('mousemove', updateMousePosition);
    }
}

function startMothAnimation() {
    if (!isLightOn) return;
    document.addEventListener('mousemove', updateMousePosition);
    animateMoths();
}

function updateMousePosition(e) {
    if (!isLightOn) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    mothPositions.forEach((moth, index) => {
        const offset = 50 + (index * 30);
        const angle = (index * Math.PI * 2) / 3 + Date.now() * 0.001;
        moth.targetX = mouseX + Math.cos(angle) * offset;
        moth.targetY = mouseY + Math.sin(angle) * offset;
    });
}

function animateMoths() {
    if (!isLightOn) return;

    mothPositions.forEach((moth, index) => {
        if (moths[index]) {
            moth.x += (moth.targetX - moth.x) * moth.speed;
            moth.y += (moth.targetY - moth.y) * moth.speed;

            moths[index].style.left = moth.x + 'px';
            moths[index].style.top = moth.y + 'px';
        }
    });

    animationId = requestAnimationFrame(animateMoths);
}
