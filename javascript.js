const gallery = document.getElementById("gallery");

window.onmousemove = e => {
  const mouseX = e.clientX,
        mouseY = e.clientY;
  
  const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;
  
  const maxX = gallery.offsetWidth - window.innerWidth,
        maxY = gallery.offsetHeight - window.innerHeight;
  
  const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
  
  gallery.animate({
    transform: `translate(${panX}px, ${panY}px)`
  }, {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  })
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleNavlinks() {
      var navlinks = document.querySelector('.navlinks');
  
      // Get the computed style of the element
      var computedStyle = window.getComputedStyle(navlinks);
  
      // Toggle between '0px' and '300px'
      navlinks.style.height = (computedStyle.height === '0px' || computedStyle.height === '0px') ? '200px' : '0px';
  }


function updateMenuButton() {
	$('.js-menu-button').find('.menu-icon').toggleClass('is-active');
}

$(document).ready(function() {

	$('.js-menu-button').click(function(e){

		e.preventDefault();
		updateMenuButton();

	});

});


