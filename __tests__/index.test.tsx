/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import Home from '@/app/[locale]/(global)/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home params={{ locale: 'en' }} />);

    const heading = screen.getByRole('heading', {
      name: /Docs/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
