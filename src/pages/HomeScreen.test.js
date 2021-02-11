import { render, screen } from '@testing-library/react';
import HomeScreen from './HomeScreen';

test('renders learn react link', () => {
  render(<HomeScreen />);
  const linkElement = screen.getByText(/E-Hub.lk/i);
  expect(linkElement).toBeInTheDocument();
});