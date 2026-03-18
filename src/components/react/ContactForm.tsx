import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { type ContactFormInput,contactSchema } from '@/schemas/contact.schema';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function ContactForm() {
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

  async function onSubmit(_data: ContactFormInput) {
    setSubmitStatus('submitting');
    try {
      // TODO: integrate with form endpoint (Formspree, Resend, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-4 border-primary p-4 pixel-corner sm:p-5 md:p-6"
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block pixel-text text-[9px] text-primary sm:mb-2 sm:text-[10px] md:text-xs">
            NAME
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="ENTER_NAME"
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
          <label htmlFor="email" className="mb-1.5 block pixel-text text-[9px] text-primary sm:mb-2 sm:text-[10px] md:text-xs">
            EMAIL
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="ENTER_EMAIL"
            className="w-full border-2 border-primary bg-bg-input px-3 py-2.5 pixel-text text-[9px] text-text transition-colors placeholder:text-text/30 focus:border-accent focus:outline-none sm:px-4 sm:py-3 sm:text-[10px] md:text-xs"
          />
          {errors.email && (
            <p className="mt-1 pixel-text text-[8px] text-accent sm:text-[9px]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block pixel-text text-[9px] text-primary sm:mb-2 sm:text-[10px] md:text-xs">
            MESSAGE
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            placeholder="ENTER_MESSAGE"
            className="w-full resize-none border-2 border-primary bg-bg-input px-3 py-2.5 pixel-text text-[9px] text-text transition-colors placeholder:text-text/30 focus:border-accent focus:outline-none sm:px-4 sm:py-3 sm:text-[10px] md:text-xs"
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
            {submitStatus === 'submitting' ? 'SENDING...' : 'SEND_MESSAGE'}
          </span>
          <Send className="h-3.5 w-3.5 text-text-dark sm:h-4 sm:w-4" />
        </button>

        {/* Feedback */}
        {submitStatus === 'success' && (
          <p className="pixel-text text-center text-[9px] text-accent sm:text-[10px]">
            MESSAGE_SENT.SUCCESS
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="pixel-text text-center text-[9px] text-primary sm:text-[10px]">
            ERROR_SENDING. TRY_AGAIN.
          </p>
        )}
      </div>
    </form>
  );
}

export { ContactForm };
