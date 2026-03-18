import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { MobileMenu } from './MobileMenu';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

describe('MobileMenu', () => {
  it('renders the toggle button', () => {
    render(<MobileMenu navItems={navItems} switchLabel="EN" switchPath="/en/" />);
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  it('is closed by default', () => {
    render(<MobileMenu navItems={navItems} switchLabel="EN" switchPath="/en/" />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('opens when toggle is clicked', async () => {
    render(<MobileMenu navItems={navItems} switchLabel="EN" switchPath="/en/" />);
    await userEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows all nav items when open', async () => {
    render(<MobileMenu navItems={navItems} switchLabel="EN" switchPath="/en/" />);
    await userEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('shows language switch when open', async () => {
    render(<MobileMenu navItems={navItems} switchLabel="EN" switchPath="/en/" />);
    await userEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByText('[EN]')).toBeInTheDocument();
  });

  it('closes when a link is clicked', async () => {
    render(<MobileMenu navItems={navItems} switchLabel="EN" switchPath="/en/" />);
    await userEvent.click(screen.getByLabelText('Toggle menu'));
    await userEvent.click(screen.getByText('About'));
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
