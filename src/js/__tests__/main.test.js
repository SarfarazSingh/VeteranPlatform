import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/dom';

describe('Theme Management', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="dark-mode-toggle" aria-label="Toggle dark mode">
        <i class="fas fa-moon"></i>
      </button>
    `;
  });

  test('toggles theme when dark mode button is clicked', () => {
    const themeToggle = screen.getByLabelText('Toggle dark mode');
    fireEvent.click(themeToggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('Navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="/" class="nav-link active">Home</a>
          </li>
        </ul>
      </div>
    `;
  });

  test('toggles mobile menu when navbar toggle is clicked', () => {
    const toggle = screen.getByLabelText('Toggle navigation');
    const menu = document.querySelector('.navbar-collapse');
    
    fireEvent.click(toggle);
    expect(menu.classList.contains('show')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('Form Validation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div class="form-group">
          <input type="email" id="email" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  });

  test('validates email field', () => {
    const emailInput = screen.getByRole('textbox');
    const form = document.querySelector('form');

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    expect(emailInput.classList.contains('invalid')).toBe(true);

    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    expect(emailInput.classList.contains('invalid')).toBe(false);
  });
}); 