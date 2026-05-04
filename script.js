document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const dotMenu = document.querySelector('.dot-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        dotMenu.classList.toggle('active');
    });
    
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        dotMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            dotMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 110,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#7c3aed"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7c3aed",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
    // Fetch GitHub Projects
    async function fetchGitHubProjects() {
        try {
            const response = await fetch('https://api.github.com/users/octocat/repos?sort=updated&per_page=6');
            const projects = await response.json();
            
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = '';
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card bg-white/70 dark:bg-gray-800/70 rounded-xl overflow-hidden backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300';
                
                projectCard.innerHTML = `
                    <div class="h-48 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <i class="fas fa-code text-4xl text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">${project.name}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">${project.description || 'No description available'}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.language ? `<span class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">${project.language}</span>` : ''}
                            <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200">
                                <i class="fas fa-star mr-1"></i> ${project.stargazers_count}
                            </span>
                            <span class="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                                <i class="fas fa-code-branch mr-1"></i> ${project.forks_count}
                            </span>
                        </div>
                        <a href="${project.html_url}" target="_blank" class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center">
                            View Project <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
            });
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = `
                <div class="col-span-3 text-center py-12">
                    <div class="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-exclamation-triangle text-red-500 dark:text-red-400 text-2xl"></i>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">Failed to load projects. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Call the function to fetch projects
    // fetchGitHubProjects();
    
    // Form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Scroll animation for sections
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize sections with fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check scroll position on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Trigger initial check
    checkScroll();
});