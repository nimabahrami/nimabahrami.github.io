const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const brain = document.getElementById('brain');
        const wordsContainer = document.getElementById('words');
        const socialLinks = document.querySelectorAll('.social-link');

        let width, height, centerX, centerY;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            centerX = width / 2;
            centerY = height / 2;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const words = ['Renewable Energy', 'Game Theory', 'Sustainability', 'Economics', 'Probability'];
        const colors = ['#b2ffc8', '#b2ffc8', '#b2ffc8', '#b2ffc8', '#b2ffc8'];

        function drawFuzzySpline(x, y, scale) {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);

            const splinePoints = [];

            for (let i = 0; i < 5; i++) {
                const controlX1 = Math.random() * width;
                const controlY1 = Math.random() * height;
                const controlX2 = Math.random() * width;
                const controlY2 = Math.random() * height;
                const endX = x + (Math.random() - 0.5) * 100 * scale;
                const endY = y + (Math.random() - 0.5) * 100 * scale;

                ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);

                for (let t = 0; t <= 1; t += 0.2) {
                    const sx = Math.pow(1-t, 3) * centerX + 3 * Math.pow(1-t, 2) * t * controlX1 + 3 * (1-t) * Math.pow(t, 2) * controlX2 + Math.pow(t, 3) * endX;
                    const sy = Math.pow(1-t, 3) * centerY + 3 * Math.pow(1-t, 2) * t * controlY1 + 3 * (1-t) * Math.pow(t, 2) * controlY2 + Math.pow(t, 3) * endY;
                    splinePoints.push({x: sx, y: sy});
                }
            }

            const edgeDistance = Math.min(x, y, width - x, height - y) / Math.min(width, height);
            const splineColor = edgeDistance < 0.15 ? '#171717' : `rgba(190,194,197, ${scale})`;

            ctx.strokeStyle = splineColor;
            ctx.lineWidth = 2 * scale;
            ctx.stroke();

            wordsContainer.innerHTML = '';
            if (edgeDistance >= 0.15) {
                const placedWords = [];
                words.forEach((word, index) => {
                    let placed = false;
                    let attempts = 0;
                    while (!placed && attempts < 50) {
                        const point = splinePoints[Math.floor(Math.random() * splinePoints.length)];
                        if (isValidPosition(point, placedWords)) {
                            const wordElem = document.createElement('div');
                            wordElem.textContent = word;
                            wordElem.className = 'word';
                            wordElem.style.left = `${point.x}px`;
                            wordElem.style.top = `${point.y}px`;
                            wordElem.style.color = colors[index % colors.length];
                            wordElem.style.fontSize = `${Math.max(16, 24 * scale)}px`;
                            wordElem.style.opacity = scale;
                            wordsContainer.appendChild(wordElem);
                            
                            placedWords.push({
                                x: point.x,
                                y: point.y,
                                width: wordElem.offsetWidth,
                                height: wordElem.offsetHeight
                            });
                            placed = true;
                        }
                        attempts++;
                    }
                });
            }
        }

        function isValidPosition(point, placedWords) {
            const margin = 10;
            for (const placedWord of placedWords) {
                if (
                    point.x < placedWord.x + placedWord.width + margin &&
                    point.x + 100 > placedWord.x - margin &&
                    point.y < placedWord.y + placedWord.height + margin &&
                    point.y + 30 > placedWord.y - margin
                ) {
                    return false;
                }
            }
            return true;
        }

        function handleInteraction(x, y) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(width * width + height * height) / 2;
            const scale = Math.max(0.01, 1 - distance / maxDistance);

            brain.style.transform = `scale(${1 + scale * 0.5})`;
            drawFuzzySpline(x, y, scale);
        }

        canvas.addEventListener('mousemove', (e) => handleInteraction(e.clientX, e.clientY));
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            handleInteraction(touch.clientX, touch.clientY);
        });

        // Initial draw
        handleInteraction(centerX, centerY);
