import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Footer from '@/app/components/Footer'


describe('Footer Component', () => {
  it('should render the copyright text correctly', () => {
    render(<Footer />)
    const copyrightText = screen.getByText('ArtStore. Todos os direitos reservados.', { exact: false })
    expect(copyrightText).toBeInTheDocument()
  })
})