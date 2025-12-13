const canvas = document.getElementById('squares');
     const ctx = canvas.getContext('2d');

function generate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const maxSize = 550;
    const numSquares = 20; 
    const sizeDecrement = 25; 
    const delay = 100;

    ctx.strokeStyle = '#8c88a4ff';
    ctx.lineWidth = 2;

    //loop to draw squares (biggest to smallest)
    for (let i = 0; i < numSquares; i++) {
        setTimeout(() => {
            //how big the current square is
            const currentSize = maxSize - (i * sizeDecrement);
            //if condition: only draw if large enough to be visible
            if (currentSize > 0) {
                const cornerRadius = currentSize * 0.1;
                //centering the squares
                const x = centerX - (currentSize / 2);
                const y = centerY - (currentSize / 2);

                drawRoundedSquare(x, y, currentSize, cornerRadius);
            }
        }, i * delay);
    }
}

function drawRoundedSquare(x, y, size, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + size - radius, y);
            ctx.arcTo(x + size, y, x + size, y + radius, radius);
            ctx.lineTo(x + size, y + size - radius);
            ctx.arcTo(x + size, y + size, x + size - radius, y + size, radius);
            ctx.lineTo(x + radius, y + size);
            ctx.arcTo(x, y + size, x, y + size - radius, radius);
            ctx.lineTo(x, y + radius);
            ctx.arcTo(x, y, x + radius, y, radius);
            ctx.closePath();
            ctx.stroke();
        }