import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginPage from '../page'


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Login Page', () => {
  // Teste 1: Verifica se os elementos essenciais são renderizados
  it('should render the email field, password field, and submit button', () => {
    render(<LoginPage />);

    // Procura o campo de email pelo seu "papel" e nome (label)
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    // Procura o campo de senha pela sua label
    const passwordInput = screen.getByLabelText(/senha/i);
    // Procura o botão pelo seu "papel" e nome
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  // Teste 2: Simula a digitação do usuário
  it('should allow a user to type into the email and password fields', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);

    // Simula o usuário digitando no campo de email
    await user.type(emailInput, 'teste@email.com');
    // Simula o usuário digitando no campo de senha
    await user.type(passwordInput, 'senha123');

    // Verifica se os campos foram preenchidos corretamente
    expect(emailInput).toHaveValue('teste@email.com');
    expect(passwordInput).toHaveValue('senha123');
  });
});