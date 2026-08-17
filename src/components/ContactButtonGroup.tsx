import React from 'react';
import { Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/brandData';

interface ContactButtonGroupProps {
  onOpenConsultation?: () => void;
  consultationText?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left' | 'right';
  showConsultation?: boolean;
  showPhone?: boolean;
  showEmail?: boolean;
  className?: string;
  phoneText?: string;
  emailText?: string;
}

export const ContactButtonGroup: React.FC<ContactButtonGroupProps> = ({
  onOpenConsultation,
  consultationText = 'Brand Discovery Consultation',
  size = 'md',
  align = 'center',
  showConsultation = true,
  showPhone = true,
  showEmail = true,
  className = '',
  phoneText = 'Call Us',
  emailText = 'Email Us',
}) => {
  const sizeClasses = {
    sm: {
      height: 'h-10',
      padding: 'px-3.5',
      text: 'text-xs font-bold',
      icon: 'w-3.5 h-3.5',
      rounded: 'rounded-xl',
    },
    md: {
      height: 'h-11 sm:h-12',
      padding: 'px-5 sm:px-6',
      text: 'text-xs sm:text-sm font-bold',
      icon: 'w-4 h-4',
      rounded: 'rounded-2xl',
    },
    lg: {
      height: 'h-12 sm:h-14',
      padding: 'px-6 sm:px-8',
      text: 'text-xs sm:text-sm md:text-base font-extrabold',
      icon: 'w-4 h-4 sm:w-5 sm:h-5',
      rounded: 'rounded-2xl',
    },
  }[size];

  const alignClasses = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
  }[align];

  const handleConsultationClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const el = document.getElementById('calendly-scheduler') || document.getElementById('calendly-booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.pathname = '/contact';
      }
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center ${alignClasses} gap-2.5 sm:gap-3.5 w-full sm:w-auto ${className}`}>
      {showConsultation && (
        <button
          type="button"
          onClick={handleConsultationClick}
          className={`${sizeClasses.height} ${sizeClasses.padding} ${sizeClasses.rounded} ${sizeClasses.text} orixnal-gradient-bg text-white shadow-md hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer group active:scale-[0.98] shrink-0`}
        >
          <Calendar className={`${sizeClasses.icon} text-amber-300 shrink-0`} />
          <span>{consultationText}</span>
          <ArrowRight className={`${sizeClasses.icon} text-white shrink-0 group-hover:translate-x-0.5 transition-transform`} />
        </button>
      )}

      {showPhone && (
        <a
          href={COMPANY_DETAILS.phoneRaw}
          className={`${sizeClasses.height} ${sizeClasses.padding} ${sizeClasses.rounded} ${sizeClasses.text} bg-white text-purple-950 border border-purple-200 shadow-2xs hover:bg-purple-50 hover:border-purple-300 transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] shrink-0`}
        >
          <Phone className={`${sizeClasses.icon} text-purple-700 shrink-0`} />
          <span>{phoneText}</span>
        </a>
      )}

      {showEmail && (
        <a
          href={COMPANY_DETAILS.emailRaw}
          className={`${sizeClasses.height} ${sizeClasses.padding} ${sizeClasses.rounded} ${sizeClasses.text} bg-white text-neutral-800 border border-neutral-300 shadow-2xs hover:bg-neutral-50 hover:border-neutral-400 transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] shrink-0`}
        >
          <Mail className={`${sizeClasses.icon} text-purple-700 shrink-0`} />
          <span>{emailText}</span>
        </a>
      )}
    </div>
  );
};
