import { AnimatedSection } from '@/components/react/AnimatedSection';
import { ContactForm } from '@/components/react/ContactForm';
import { useTranslation } from '@/hooks/useTranslation';

function ContactSection() {
  const { t } = useTranslation();
  const contact = t.contact;

  return (
    <section id="contact" className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-3 inline-block bg-primary px-3 py-1.5 pixel-corner sm:mb-4 sm:px-4 sm:py-2">
              <span className="pixel-text text-[10px] text-text-dark sm:text-xs md:text-sm">
                {contact.tag}
              </span>
            </div>
            <h2 className="pixel-text text-sm text-primary sm:text-xl md:text-2xl lg:text-3xl">
              {contact.title}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <AnimatedSection direction="left" className="h-full min-w-0">
            <div className="flex h-full flex-col gap-4 sm:gap-6">
              <div className="border-4 border-primary p-4 sm:p-5 md:p-6 pixel-corner">
                <h3 className="pixel-text mb-4 text-xs text-primary sm:mb-6 sm:text-sm md:text-base">
                  {contact.info_title}
                </h3>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary pixel-corner sm:h-10 sm:w-10 md:h-12 md:w-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-text-dark sm:h-5 sm:w-5"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="pixel-text text-[9px] text-accent sm:text-[10px] md:text-xs">
                        {contact.email_label}
                      </p>
                      <p className="pixel-text mt-0.5 text-[9px] text-text wrap-break-word sm:text-[10px] md:text-xs">
                        m.fajardo.1098@gmial.com
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary pixel-corner sm:h-10 sm:w-10 md:h-12 md:w-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-text-dark sm:h-5 sm:w-5"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="pixel-text text-[9px] text-accent sm:text-[10px] md:text-xs">
                        {contact.location_label}
                      </p>
                      <p className="pixel-text mt-0.5 text-[9px] text-text sm:text-[10px] md:text-xs">
                        {contact.location_value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability box */}
              <div className="flex flex-1 items-center border-4 border-accent bg-bg-surface p-4 sm:p-5 md:p-6 pixel-corner">
                <p className="pixel-text text-[9px] leading-relaxed text-primary sm:text-[10px] md:text-xs">
                  {contact.availability}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" className="h-full min-w-0">
            <ContactForm translations={contact.form} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export { ContactSection };
