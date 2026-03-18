import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { type ContactFormInput, contactSchema } from '@/schemas/contact.schema';

interface FormTranslations {
  name: string;
  name_placeholder: string;
  email: string;
  email_placeholder: string;
  message: string;
  message_placeholder: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
}

interface ContactFormProps {
  translations: FormTranslations;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function ContactForm({ translations: t }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(data: ContactFormInput) {
    setSubmitStatus('submitting');
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send');

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col border-4 border-primary p-4 pixel-corner sm:p-5 md:p-6"
    >
      <div className="flex flex-1 flex-col space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block pixel-text text-[9px] text-primary sm:mb-2 sm:text-[10px] md:text-xs"
          >
            {t.name}
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder={t.name_placeholder}
            className="w-full border-2 border-primary bg-bg-input px-3 py-2.5 pixel-text text-[9px] text-text transition-colors placeholder:text-text/30 focus:border-accent focus:outline-none sm:px-4 sm:py-3 sm:text-[10px] md:text-xs"
          />
          {errors.name && (
            <p className="mt-1 pixel-text text-[8px] text-accent sm:text-[9px]">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block pixel-text text-[9px] text-primary sm:mb-2 sm:text-[10px] md:text-xs"
          >
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder={t.email_placeholder}
            className="w-full border-2 border-primary bg-bg-input px-3 py-2.5 pixel-text text-[9px] text-text transition-colors placeholder:text-text/30 focus:border-accent focus:outline-none sm:px-4 sm:py-3 sm:text-[10px] md:text-xs"
          />
          {errors.email && (
            <p className="mt-1 pixel-text text-[8px] text-accent sm:text-[9px]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="message"
            className="mb-1.5 block pixel-text text-[9px] text-primary sm:mb-2 sm:text-[10px] md:text-xs"
          >
            {t.message}
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            placeholder={t.message_placeholder}
            className="w-full flex-1 resize-none border-2 border-primary bg-bg-input px-3 py-2.5 pixel-text text-[9px] text-text transition-colors placeholder:text-text/30 focus:border-accent focus:outline-none sm:px-4 sm:py-3 sm:text-[10px] md:text-xs"
          />
          {errors.message && (
            <p className="mt-1 pixel-text text-[8px] text-accent sm:text-[9px]">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 transition-colors hover:bg-accent disabled:opacity-50 pixel-corner sm:py-4 group"
        >
          <span className="pixel-text text-[10px] text-text-dark sm:text-xs md:text-sm">
            {submitStatus === 'submitting' ? t.submitting : t.submit}
          </span>
          <Send className="h-3.5 w-3.5 text-text-dark sm:h-4 sm:w-4" />
        </button>

        {/* Feedback */}
        {submitStatus === 'success' && (
          <p className="pixel-text text-center text-[9px] text-accent sm:text-[10px]">
            {t.success}
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="pixel-text text-center text-[9px] text-primary sm:text-[10px]">
            {t.error}
          </p>
        )}
      </div>
    </form>
  );
}

export { ContactForm };
