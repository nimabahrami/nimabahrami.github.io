const selectElement = (s) => document.querySelector(s);

selectElement('.open').addEventListener('click', () => {
    selectElement('.nav-list').classList.add('active');
});

selectElement('.close').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active');
});

selectElement('.nav-items').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active')
});

selectElement('.nav-items-2').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active')
});

window.onscroll = function() {
    // We add pageYOffset for compatibility with IE.
    if (window.scrollY >= 100 || window.pageYOffset >= 100) {
      document.getElementsByTagName("header")[0].classList.add("header-bg");
    } else {
      document.getElementsByTagName("header")[0].classList.remove("header-bg");
    }
  };
  
