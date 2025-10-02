import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../page'

// Mock da API 'fetch'
global.fetch = jest.fn() as jest.Mock;

const mockProducts = [
  { id: '1', name: 'Produto 1', description: 'Descrição 1', price: 10.0, imageUrl: '/image1.jpg' },
  { id: '2', name: 'Produto 2', description: 'Descrição 2', price: 20.0, imageUrl: '/image2.jpg' },
];

describe('HomePage Component', () => {

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should render product cards after a successful fetch', async () => {
    (fetch as jest.mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });
    render(<HomePage />);
    const productCards = await screen.findAllByRole('link', { name: /poster da obra de arte/i });
    expect(productCards).toHaveLength(2);
    expect(screen.queryByText('Carregando produtos...')).not.toBeInTheDocument();
  });

  it('should show "no products found" message if fetch returns an empty array', async () => {
    (fetch as jest.mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });
    render(<HomePage />);
    const noProductsMessage = await screen.findByText(/Nenhum produto encontrado para sua busca/i);
    expect(noProductsMessage).toBeInTheDocument();
  });
});