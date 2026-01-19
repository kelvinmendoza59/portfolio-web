// Proyectos data
const projects = [
    {
        title: "Riptoforex.com",
        description: "Financial news platform for Forex & Crypto traders | Next.js + FastAPI + PostgreSQL",
        category: "featured",
        tech: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
        link: "https://github.com/kelvinmendoza59/Riptoforex-2025",
        demo: "https://riptoforex.com",
        featured: true
    },
    {
        title: "User Management API",
        description: "REST API with JWT authentication and MongoDB | Node.js + Express",
        category: "javascript",
        tech: ["Node.js", "Express", "MongoDB", "JWT"],
        link: "https://github.com/kelvinmendoza59/user-management-api",
        demo: null
    },
    {
        title: "Task Manager API",
        description: "Task management REST API with Flask and SQLAlchemy",
        category: "python",
        tech: ["Python", "Flask", "SQLAlchemy", "SQLite"],
        link: "https://github.com/kelvinmendoza59/task-manager-api",
        demo: null
    },
    {
        title: "Biblioteca API",
        description: "Library management REST API | Spring Boot + JPA + H2",
        category: "java",
        tech: ["Java", "Spring Boot", "JPA", "H2"],
        link: "https://github.com/kelvinmendoza59/biblioteca-api-spring",
        demo: null
    },
    {
        title: "Notes API",
        description: "Simple notes REST API built with Node.js and Express",
        category: "javascript",
        tech: ["Node.js", "Express", "JavaScript"],
        link: "https://github.com/kelvinmendoza59/api-notas-node",
        demo: null
    },
    {
        title: "CS50x Finance",
        description: "Stock trading simulator with real-time quotes | Flask + SQLite",
        category: "python",
        tech: ["Python", "Flask", "SQLite", "IEX API"],
        link: "https://github.com/kelvinmendoza59/finance",
        demo: null
    }
];

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Render Projects
const projectsGrid = document.getElementById('projects-grid');

function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = project.featured ? 'project-card featured' : 'project-card';
        projectCard.setAttribute('data-category', project.category);

        const techStack = project.tech ? `<div class="tech-stack">${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>` : '';
        const demoLink = project.demo ? `<a href="${project.demo}" target="_blank" class="demo-link">Live Demo</a>` : '';

        projectCard.innerHTML = `
            ${project.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
            <span class="project-tag">${project.category.toUpperCase()}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${techStack}
            <div class="project-links">
                <a href="${project.link}" target="_blank" class="project-link">GitHub <i class="fab fa-github"></i></a>
                ${demoLink}
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

// Initialize projects
renderProjects();

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Filter projects
        const filter = button.getAttribute('data-filter');
        renderProjects(filter);
    });
});

// Smooth Scrolling for nav links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError('name-error', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email-error', 'Por favor ingresa un email válido');
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        showError('message-error', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }

    // If all valid, show success
    if (isValid) {
        contactForm.reset();
        formSuccess.style.display = 'block';

        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 3000);
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll to top button (future enhancement)
// TODO: Add scroll to top button for better UX
