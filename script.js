const selectElement = (s) => document.querySelector(s);

selectElement('.open').addEventListener('click', () => {
    selectElement('.nav-list').classList.add('active').remove('clicked');
});

selectElement('.close').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active').add('clicked');
});

selectElement('.nav-items').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active').add('clicked');
});

selectElement('.nav-items-2').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active').add('clicked');
});

