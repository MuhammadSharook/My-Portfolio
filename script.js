// Custom Cursor Effect
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);

  // update the gradient position
  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
});

// Hover Effect for cursor
// const hoverElements = document.querySelectorAll('a, button, .skill-item, .project-card');

// hoverElements.forEach(el => {
//      el.addEventListener('mouseenter', () => {
//           cursor.style.transform = 'translate(-50%, -50%) scale(5)';
//           cursor.style.backgroundColor = 'rgba(0,180,216,0.8)';
//           cursorFollower.style.transform = 'translate(-50%,-50%) scale(0.5)';
//      });
//      el.addEventListener('mouseleave', () => {
//           cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//           cursor.style.backgroundColor = 'rgba(0,180,216,0.5)';
//           cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
//      });
// });

// Scroll animations
const sections = document.querySelectorAll("section");

const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate project cards separately
      if (entry.target.classList.contains("projects")) {
        const projectCards = entry.target.querySelectorAll(".project-card");
        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 200); // stagger the animation
        });
      }
    }
  });
}, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navlinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
     navlinks.classList.toggle('active');
     menuToggle.innerHTML = navlinks.classList.contains('active') ? 
     '<i class="fas fa-times"></i>' :
     '<i class="fas fa-bars"></i>';

});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
          navlinks.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
     });
});

// Highlight active nav links on scroll

window.addEventListener('scroll', () => {
     const ScrollPosition = window.scrollY;
     
     document.querySelectorAll('section').forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');

          if(ScrollPosition >= sectionTop && ScrollPosition < sectionTop + sectionHeight) {
               document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                         link.classList.add('active');
                    }
               });
          }
     });
});

//  Form validation 

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
     e.preventDefault();

     const name = document.getElementById('name').value.trim();
     const email = document.getElementById('email').value.trim();
     const message = document.getElementById('message').value.trim();
     const subject = document.getElementById('subject').value.trim();

     if(!name || !email || !subject || !message) {
          alert("Please fill in all fields.");
          return;
     }
     if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert("Please enter a valid email address.");
          return;
     }

     const formData = {
          name: name,
          email: email,
          subject: subject,
          message: message
     };

     // Send form data using FormSubmit.co
     fetch('https://formsubmit.co/ajax/sk.sharook106@gmail.com', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
     })
     .then(response => response.json())
     .then(data => {
          alert("Thank you for your message! I'll get back to you soon.");
          contactForm.reset();
     })
     .catch(error => {
          console.error("Error submitting form:", error);
          alert("There was an error submitting your form. Please try again later.");
     });
});

// Initialize animations for the home section on load
window.addEventListener('load', () => {
     document.querySelector('.home').classList.add('visible');
});


//  Logo animation

document.addEventListener('DOMContentLoaded', () => {

     const logo = document.getElementById('logo');
     const logoContainer = document.querySelector('logoContainer');
     const word = "MS";

     // create each letter with individual animation delay
     for(let i = 0; i < word.length; i++) {
          const letter = document.createElement('span');
          letter.className = 'letter';
          letter.textContent = word[i];
          letter.style.animationDelay = `${i * 0.15}s`; // stagger the animation
          logo.appendChild(letter);
     }

});
