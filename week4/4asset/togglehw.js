console.log('light mode');

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById('lightmode');
  slider.addEventListener('click', function() {
    document.body.classList.toggle('lightmode');
  });

});
