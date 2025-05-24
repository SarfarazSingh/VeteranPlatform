// Import styles
import '../styles/base.scss';

// Utility functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Theme management
const themeManager = {
  init() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.applyTheme();
    this.setupListeners();
  },

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  },

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  },

  setupListeners() {
    const themeToggle = document.querySelector('.dark-mode-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
};

// Navigation management
const navigation = {
  init() {
    this.setupMobileMenu();
    this.setupScrollSpy();
    this.setupSmoothScroll();
  },

  setupMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-collapse');

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('show');
        toggle.setAttribute('aria-expanded', 
          toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
      });
    }
  },

  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  },

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// Animation management
const animations = {
  init() {
    this.setupIntersectionObserver();
  },

  setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(element => observer.observe(element));
  }
};

// Form validation
const formValidation = {
  init() {
    this.setupFormListeners();
  },

  setupFormListeners() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
      form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
      });
    });
  },

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMessage = 'Please enter a valid email address';
        break;
      case 'tel':
        isValid = /^[\d\s-+()]{10,}$/.test(value);
        errorMessage = 'Please enter a valid phone number';
        break;
      default:
        isValid = value.length > 0;
        errorMessage = 'This field is required';
    }

    this.updateFieldStatus(field, isValid, errorMessage);
    return isValid;
  },

  updateFieldStatus(field, isValid, errorMessage) {
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!isValid) {
      field.classList.add('invalid');
      if (!errorElement) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = errorMessage;
        field.parentElement.appendChild(error);
      }
    } else {
      field.classList.remove('invalid');
      if (errorElement) {
        errorElement.remove();
      }
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Handle form submission
      console.log('Form is valid, submitting...');
      // Add your form submission logic here
    }
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  themeManager.init();
  navigation.init();
  animations.init();
  formValidation.init();
}); 