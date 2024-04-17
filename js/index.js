/* ----------------------------------------------
Any New Feature
---------------------------------------------- */
// add any new javascript code here

/* ----------------------------------------------
Translation Feature
creds: rina-reimer
---------------------------------------------- */
class Translate {
	constructor(attribute, lng) {
		// initialization
		this.attribute = attribute;
		this.lng = lng;
	}
	// translate 
process() {
  var attr = this.attribute;
  var xrhFile = new XMLHttpRequest();
  // load content data 
  xrhFile.open("GET", "https://fernarey.github.io/lng/" + this.lng + ".json", false);
  console.log("got translate");
  xrhFile.onreadystatechange = function () {
    if (xrhFile.readyState === 4) {
      if (xrhFile.status === 200 || xrhFile.status == 0) {
        var LngObject = JSON.parse(xrhFile.responseText);
        var allDom = document.getElementsByTagName("*");
        for (var i = 0; i < allDom.length; i++) {
          var elem = allDom[i];
          var key = elem.getAttribute(attr);
          if (key != null) { 
            elem.innerHTML = LngObject[key];
          }
        }
      } else {
        console.error("Failed to load content data: " + xrhFile.status);
      }
    }
  };
  xrhFile.onerror = function() {
    console.error("Failed to load content data.");
  };
  xrhFile.send();
};
}

// This function will be called when user click changing language
function translate(lng, tagAttr){
  var translate = new Translate(tagAttr, lng);
  translate.process();
  // include updates to the css
}

$(document).ready(function(){
  // This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function(){
  translate('en', 'lng-tag');
  })
  // This is id of HTML element (Deutsch) with attribute lng-tag
  $("#deTranslator").click(function(){
  translate('de', 'lng-tag');
  });
});

/* ----------------------------------------------
General Functionality 
creds: BootstrapMade
---------------------------------------------- */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Translation buttons
   */
  on('click', '.trans-en', function(e) {
    translate('en', 'lng-tag');
  })
  
  // TODO: create a similar one for whatever other language you want
})()