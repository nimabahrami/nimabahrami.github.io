var step = 20;

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > step || document.documentElement.scrollTop > step)
    document.getElementById("myBtn").style.display = "block"
  else
    document.getElementById("myBtn").style.display = "none"

}

function topFunction() {
  if (document.body.scrollTop > step || document.documentElement.scrollTop > step) {
    document.body.scrollTop -= step
    document.documentElement.scrollTop -= step
    setTimeout(function() {
      topFunction()
    }, step)
  } else {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}