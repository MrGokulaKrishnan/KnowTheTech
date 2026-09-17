import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Send, CheckCircle2, Copy } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { GradientButton } from '@/components/ui/GradientButton';
import { PageTransition } from '@/components/common/PageTransition';

// Clean sanitization helper against script tags
const sanitizeText = (text: string) => text.replace(/<[^>]*>?/gm, '').trim();

const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' })
    .refine((val) => !/[<>{}]/.test(val), { message: 'Name contains invalid characters' }),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address' })
    .max(120, { message: 'Email cannot exceed 120 characters' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters' })
    .max(150, { message: 'Subject cannot exceed 150 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    const cleanData: ContactFormData = {
      name: sanitizeText(data.name),
      email: sanitizeText(data.email),
      subject: sanitizeText(data.subject),
      message: sanitizeText(data.message),
    };
    setSubmittedData(cleanData);
  };

  const handleCopy = () => {
    if (!submittedData) return;
    const formatted = `Name: ${submittedData.name}\nEmail: ${submittedData.email}\nSubject: ${submittedData.subject}\n\nMessage:\n${submittedData.message}`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const mailtoHref = submittedData
    ? `mailto:?subject=${encodeURIComponent(`[KnowTheTech] ${submittedData.subject}`)}&body=${encodeURIComponent(
        `From: ${submittedData.name} (${submittedData.email})\n\n${submittedData.message}`
      )}`
    : '#';

  return (
    <PageTransition>
      <SEOHead
        title="Contact & Feedback"
        description="Get in touch regarding the KnowTheTech ecosystem, share product feedback, or discuss engineering collaboration."
        canonical="https://knowthetech.web.app/contact"
      />

      <div className="pt-32 pb-24 md:pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Connect"
            title="Get In Touch"
            description="Have feedback, a suggestion for a new tool, or an architectural inquiry about the KnowTheTech ecosystem? Send a direct message below."
          />

          {submittedData ? (
            /* Success & Direct Action Card */
            <GlassCard className="p-8 sm:p-12 border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-[#06152E]/80 text-center animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-display font-bold text-white mb-2">
                Message Prepared Successfully
              </h2>

              <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-lg mx-auto mb-8">
                In line with KnowTheTech's client-first privacy philosophy, your form data is processed directly inside your browser. You can launch your email client to send it directly, or copy the formatted text.
              </p>

              <div className="bg-slate-950/60 border border-white/10 rounded-xl p-5 text-left text-xs font-mono text-slate-300 mb-8 space-y-2 max-w-md mx-auto">
                <div><span className="text-sky-400 font-semibold">From:</span> {submittedData.name} ({submittedData.email})</div>
                <div><span className="text-sky-400 font-semibold">Subject:</span> {submittedData.subject}</div>
                <div className="pt-2 border-t border-white/5 whitespace-pre-wrap">{submittedData.message}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <GradientButton
                  href={mailtoHref}
                  icon={<Mail className="w-4 h-4" />}
                >
                  Open in Email Client
                </GradientButton>

                <GradientButton
                  variant="secondary"
                  onClick={handleCopy}
                  icon={<Copy className="w-4 h-4" />}
                >
                  {copied ? "Copied to Clipboard!" : "Copy Details"}
                </GradientButton>

                <GradientButton
                  variant="glass"
                  onClick={() => {
                    setSubmittedData(null);
                    reset();
                  }}
                >
                  Send Another Message
                </GradientButton>
              </div>
            </GlassCard>
          ) : (
            /* Form Card */
            <GlassCard className="p-8 sm:p-12 border-white/10 shadow-glass">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                      Your Name <span className="text-sky-400">*</span>
                    </label>
                    <Input
                      id="name"
                      placeholder="e.g. Alex Chen"
                      {...register('name')}
                      error={errors.name?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                      Email Address <span className="text-sky-400">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                    Subject <span className="text-sky-400">*</span>
                  </label>
                  <Input
                    id="subject"
                    placeholder="Product feedback / inquiry topic"
                    {...register('subject')}
                    error={errors.subject?.message}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                    Message <span className="text-sky-400">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Write your note, question, or ecosystem feedback here..."
                    rows={5}
                    {...register('message')}
                    error={errors.message?.message}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400 font-sans">
                    Client-validated with zero external spam trackers.
                  </p>

                  <GradientButton
                    type="submit"
                    disabled={isSubmitting}
                    iconRight={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </GradientButton>
                </div>
              </form>
            </GlassCard>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
