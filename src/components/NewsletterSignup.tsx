import React, { useState } from 'react';
import { Mail, Sparkles, Check, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

// Mock API service for newsletter subscription
export const mockSubscribeNewsletter = async (email: string, interest: string): Promise<{ success: boolean; message: string; subscriberNumber?: number }> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Simulated error condition
  if (email.toLowerCase().includes('fail') || email.toLowerCase().includes('error')) {
    throw new Error('This email address could not be processed by our subscriber engine. Please try another address.');
  }

  // Generate mock subscriber order
  const mockSubCount = 4820 + Math.floor(Math.random() * 50);

  return {
    success: true,
    message: `Welcome to Brand Intelligence. A confirmation dispatch has been sent to ${email}.`,
    subscriberNumber: mockSubCount
  };
};

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState<string>('Brand Strategy & Naming');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{ message: string; subNumber?: number } | null>(null);

  const validateEmail = (input: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(input.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your work or personal email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. founder@company.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await mockSubscribeNewsletter(email, selectedInterest);
      setStatus('success');
      setSuccessData({ message: res.message, subNumber: res.subscriberNumber });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xs relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-50/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Editorial Info */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>EDITORIAL DISPATCH</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Subscribe to <span className="text-rose-600">Brand Intelligence™</span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg">
            Bi-weekly founder dispatches dissecting trademark legal strategy, non-verbal design dialects, Class 35/42 IP protection, and high-performance React architecture. Written directly by Founder Asim Khan.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>4,800+ Founders & Executives</span>
            </span>
            <span>•</span>
            <span>No Marketing Spam</span>
            <span>•</span>
            <span>Unsubscribe Anytime</span>
          </div>
        </div>

        {/* Right Column: Interactive Form or Success Banner */}
        <div className="lg:col-span-6 bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
          {status === 'success' && successData ? (
            <div className="space-y-4 py-2 animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  SUBSCRIBER #{successData.subNumber} CONFIRMED
                </span>
                <h4 className="text-base font-extrabold text-neutral-900">
                  You’re on the Brand Intelligence Dispatch list.
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {successData.message}
                </p>
              </div>

              <button
                onClick={() => {
                  setStatus('idle');
                  setEmail('');
                  setSuccessData(null);
                }}
                className="text-xs font-mono font-bold text-rose-600 hover:text-rose-700 underline"
              >
                Subscribe another email address →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Interest Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 block">
                  Select Primary Topic Focus:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Brand Strategy & Naming',
                    'Class 35/42 Trademark IP',
                    'React Web Performance',
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedInterest(topic)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        selectedInterest === topic
                          ? 'orixnal-gradient-bg text-white shadow-xs'
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input & Submit Button */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your corporate or work email..."
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-neutral-200/90 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-rose-500 font-medium transition-colors"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="orixnal-gradient-bg text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl hover:opacity-95 transition-all shadow-2xs shrink-0 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe Free</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {status === 'error' && errorMessage && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <p className="text-[10px] text-neutral-400 leading-snug">
                By subscribing, you agree to receive editorial dispatches from ORIXNAL®. We respect your privacy and will never share your address.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
