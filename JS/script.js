 window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.navbar-animate').classList.add('visible');
  });

   window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.banner-animate').classList.add('visible');
  });

 
  document.addEventListener('DOMContentLoaded', function() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.animate-left, .animate-right').forEach(el => {
      observer.observe(el);
    });
  });


  
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    let index = 0;
    const slideCount = slides.length;

    function showSlide(i) {
      track.style.transform = `translateX(-${i * 100}vw)`;
    }

    setInterval(() => {
      index = (index + 1) % slideCount;
      showSlide(index);
    }, 3000); 

    
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', startAuto);

    
  });


  document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.animate-fade-in');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('visible');
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(aboutSection);
  });



 
const cityMapUrls = {
  chennai:     'https://www.google.com/maps?q=Chennai&output=embed',
  madurai:     'https://www.google.com/maps?q=Madurai&output=embed',
  trichy:      'https://www.google.com/maps?q=Trichy&output=embed',
  nagercoil:   'https://www.google.com/maps?q=Nagercoil&output=embed'
};

const cityStats = {
  chennai:    { owned: 100, projects: 750 },
  madurai:    { owned: 100, projects: 420 },
  trichy:     { owned: 100, projects: 320 },
  nagercoil:  { owned: 100, projects: 170 }
};
const cityTabs = document.querySelectorAll('.tab-btn');
const mapIframe = document.getElementById('region-map-iframe');
let currentCity = 'chennai';

function updateCity(city) {
  currentCity = city;
  mapIframe.src = cityMapUrls[city];
  document.getElementById('stat-owned').textContent = '0%';
  document.getElementById('stat-projects').textContent = '0';
  startStatCount();
}

cityTabs.forEach(btn => {
  btn.addEventListener('click', function() {
    cityTabs.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    updateCity(this.getAttribute('data-city'));
  });
});

function startStatCount() {
  const statBlock = document.querySelector('.region-stats');
  let started = false;
  function animateStats() {
    if (started) return;
    started = true;
    let { owned, projects } = cityStats[currentCity];
    let ownedVal = document.getElementById('stat-owned');
    let projVal = document.getElementById('stat-projects');
    let i = 0, j = 0;
    let step = 2.4, stepProj = Math.ceil(projects / 40);
    let ownedInterval = setInterval(() => {
      i += step;
      if (i >= owned) {
        ownedVal.textContent = owned + '%';
        clearInterval(ownedInterval);
      } else {
        ownedVal.textContent = Math.round(i) + '%';
      }
    }, 16);
    let projInterval = setInterval(() => {
      j += stepProj;
      if (j >= projects) {
        projVal.textContent = projects + '+';
        clearInterval(projInterval);
      } else {
        projVal.textContent = j + '';
      }
    }, 16);
  }
  let observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          animateStats();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 }
  );
  observer.observe(statBlock);
}
updateCity('chennai');


const serviceContent = {
  consulting: "<h3>Consulting</h3><p>Get expert advice from seasoned professionals for your construction needs.</p>",
  estimate: "<h3>Estimate</h3><p>Receive quick and detailed cost estimates for any project.</p>",
  "plan-design": "<h3>Plan &amp; Design</h3><p>Modern plans and 3D designs for dream homes and offices.</p>",
  construction: "<h3>Construction</h3><p>Turn-key construction services for all project types—delivered on time, on budget.</p>",
  "flooring-work": "<h3>Flooring Work</h3><p>Premium tiles, wooden, vinyl, and custom flooring options, installed by pros.</p>",
  "painting-work": "<h3>Painting Work</h3><p>Quality interior &amp; exterior finishes using top brands and skilled painters.</p>",
  "3d-elevation-design": "<h3>3D Elevation Design</h3><p>Stunning 3D elevation visuals—see your building before it’s built.</p>",
  "electric-work": "<h3>Electric Work</h3><p>Safe, code-compliant electrical fit-outs and smart wiring solutions.</p>",
  "interior-work": "<h3>Interior Work</h3><p>Full interiors: ceilings, partitions, wall panels, false ceiling design and more.</p>",
  renovation: "<h3>Renovation</h3><p>Modernize or restore your property—structural and aesthetic upgrades.</p>",
  "interior-design": "<h3>Interior Design</h3><p>Space planning, mood boards, decor and turnkey interior styling.</p>",
  "carpentry-work": "<h3>Carpentry Work</h3><p>Custom woodwork, furniture, modular kitchens, wardrobes and more.</p>"
};

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const service = this.getAttribute('data-service');
    document.getElementById('popup-body').innerHTML = serviceContent[service] || "<h3>Service</h3><p>Details coming soon.</p>";
    document.getElementById('service-popup').classList.add('active');
    e.stopPropagation();
  });
});
document.querySelector('.popup-close').onclick = function() {
  document.getElementById('service-popup').classList.remove('active');
};
document.getElementById('service-popup').onclick = function(e) {
  if (e.target === this) this.classList.remove('active');
};


  document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer-animate');
    if (!footer) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('visible');
          obs.disconnect();
        }
      });
    }, { threshold: 0.17 });
    observer.observe(footer);
  });


document.getElementById('open-contact').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('contact-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
});
document.getElementById('close-contact').onclick = function() {
  document.getElementById('contact-modal').classList.remove('active');
  document.body.style.overflow = '';
};
document.getElementById('contact-modal').addEventListener('click', function(e){
  if(e.target === this) {
    this.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.getElementById('open-contact').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('contact-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
});
document.getElementById('close-contact').onclick = function() {
  document.getElementById('contact-modal').classList.remove('active');
  document.body.style.overflow = '';
};
document.getElementById('contact-modal').addEventListener('click', function(e){
  if(e.target === this) {
    this.classList.remove('active');
    document.body.style.overflow = '';
  }
});
document.getElementById('contact-form').addEventListener('submit', function (e) {

  const emailInput = document.getElementById('cf-email');
  const replytoInput = document.getElementById('hidden-replyto');
  const autoresponseInput = document.getElementById('hidden-autoresponse');

 
  if (emailInput && replytoInput && emailInput.value) {
    replytoInput.value = emailInput.value;
  }

  
  if (autoresponseInput) {
    const name = document.getElementById('cf-name').value;
    const phone = document.getElementById('cf-phone').value;
    const service = document.getElementById('cf-service').value;
    const message = document.getElementById('cf-message').value;

    autoresponseInput.value = `
Thank you for contacting PK Builders!

Here is a copy of your submitted details:

Full Name: ${name}
Email: ${emailInput.value}
Phone: ${phone}
Service: ${service}
Message: ${message}

We appreciate your interest and will get back to you as soon as possible.
`.trim();
  }

});





document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
});



document.querySelectorAll('.pricing-accordion').forEach(function(accordion) {
  accordion.querySelectorAll('.accordion-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
     
      accordion.querySelectorAll('.accordion-btn').forEach(function(otherBtn) {
        if (otherBtn !== btn) otherBtn.classList.remove('active');
      });
      accordion.querySelectorAll('.accordion-content').forEach(function(content) {
        if (content.previousElementSibling !== btn) content.style.display = "none";
      });
      btn.classList.toggle('active');
      let content = btn.nextElementSibling;
      content.style.display = btn.classList.contains('active') ? "block" : "none";
    });
  });
});


document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if(this.getAttribute('href') === '#') return; 
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    if(targetId === 'home') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      const targetElem = document.getElementById(targetId);
      if (targetElem) targetElem.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});


window.addEventListener('DOMContentLoaded', () => {
  const pricing = document.querySelector('.pricing-container');
  function showPricing() {
    if(pricing && pricing.getBoundingClientRect().top < window.innerHeight - 50) {
      pricing.classList.add('visible');
      window.removeEventListener('scroll', showPricing);
    }
  }
  showPricing();
  window.addEventListener('scroll', showPricing);
});
