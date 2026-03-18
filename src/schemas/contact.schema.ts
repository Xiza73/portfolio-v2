import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'required').max(100, 'max_length'),
  email: z.string().min(1, 'required').email('invalid_email'),
  message: z.string().min(10, 'min_length').max(1000, 'max_length'),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
