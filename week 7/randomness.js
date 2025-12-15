function weave() {
    const isBlack = Math.random() < 0.5;

    const row = document.createElement('div');
    row.className = 'weave-row ' + (isBlack ? 'black' : 'white');

    document.getElementById('weaveContainer').appendChild(row);
}