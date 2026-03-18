import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ContactForm } from './ContactForm';

const translations = {
  name: 'NAME',
  name_placeholder: 'ENTER_NAME',
  email: 'EMAIL',
  email_placeholder: 'ENTER_EMAIL',
  message: 'MESSAGE',
  message_placeholder: 'ENTER_MESSAGE',
  submit: 'SEND_MESSAGE',
  submitting: 'SENDING...',
  success: 'MESSAGE_SENT.SUCCESS',
  error: 'ERROR_SENDING. TRY_AGAIN.',
};

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm translations={translations} />);
    expect(screen.getByLabelText('NAME')).toBeInTheDocument();
    expect(screen.getByLabelText('EMAIL')).toBeInTheDocument();
    expect(screen.getByLabelText('MESSAGE')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm translations={translations} />);
    expect(screen.getByText('SEND_MESSAGE')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<ContactForm translations={translations} />);
    await userEvent.click(screen.getByText('SEND_MESSAGE'));
    await waitFor(() => {
      expect(screen.getAllByText(/required|min_length/i).length).toBeGreaterThan(0);
    });
  });

  it('accepts valid input without showing errors', async () => {
    render(<ContactForm translations={translations} />);
    await userEvent.type(screen.getByLabelText('NAME'), 'Manuel');
    await userEvent.type(screen.getByLabelText('EMAIL'), 'contact@xiza.dev');
    await userEvent.type(screen.getByLabelText('MESSAGE'), 'Hello, this is a test message!');
    await userEvent.click(screen.getByText('SEND_MESSAGE'));

    await waitFor(() => {
      expect(screen.queryByText('required')).not.toBeInTheDocument();
    });
  });
});
