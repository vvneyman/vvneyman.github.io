
        const canvas = document.getElementById('ovals');
        const ctx = canvas.getContext('2d');

  
        function generate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Configuration for the oval grid
            const ovalWidth = 100;
            const ovalHeight = 120;
            const padding = 10;
            const cols = Math.ceil(canvas.width / (ovalWidth + padding)) + 1;
            const rows = Math.ceil(canvas.height / (ovalHeight + padding)) + 1;
            // Set stroke style
            ctx.strokeStyle = '#ac6d10ff';
            ctx.lineWidth = 5;

            let rowDelay = 0;
            const rowDelayIncrement = 300; // milliseconds between each row

            // FOR LOOP: Iterate through each row
            for (let row = 0; row < rows; row++) {
                
                // Draw entire row at once with a delay
                setTimeout(() => {
                    
                    // FOR LOOP: Draw all ovals in this row
                    for (let col = 0; col < cols; col++) {
                        
                        // Calculate position
                        const x = col * (ovalWidth + padding) + (ovalWidth / 2) + padding;
                        const y = row * (ovalHeight + padding) + (ovalHeight / 2) + padding;

                        // IF CONDITION: Only draw if within canvas bounds
                        if (x + ovalWidth / 2 <= canvas.width && y + ovalHeight / 2 <= canvas.height) {
                            drawOval(x, y, ovalWidth, ovalHeight);
                        }
                    }
                    
                }, rowDelay);

                rowDelay += rowDelayIncrement;
            }
        }

        // Function to draw a simple oval
        function drawOval(centerX, centerY, width, height) {
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
            ctx.stroke();
        }