import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/brandData';
import {
  Sparkles,
  Send,
  Bot,
  User,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  Volume2,
  VolumeX,
  Calendar,
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Loader2,
  Briefcase
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAudioPlaying?: boolean;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAudit: () => void;
  onNavigate: (route: PageRoute) => void;
}

const STARTER_PROMPTS = [
  '🛡️ How does Trademark & Legal protection work at ORIXNAL?',
  '⚡ What is included in Brand Naming & Digital Web engineering?',
  '📅 How do I schedule a 1-on-1 Audit with Founder Asim Khan?',
  '🚀 What are the 8 Core Pillars of ORIXNAL Brand Development?',
  '💡 Why choose ORIXNAL over a traditional branding agency?'
];

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onClose,
  onOpenAudit,
  onNavigate
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to **ORIXNAL AI Strategic Advisor** — powered by Gemini 3.6 Flash.

I am trained on ORIXNAL's 8 core brand development pillars: **Name, Legal, Studio, Digital, Marketing, Ads, Event, and Consultancy**.

How can I assist your business or brand development today?

---
### ⚡ Recommended Next Steps
- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Audit with Founder Asim Khan
- [[CTA:EMAIL_FOUNDER]] Email Founder Directly (hello@orixnal.com)
- [[CTA:EXPLORE_SERVICES]] View ORIXNAL 8 Service Pillars`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [brandTone, setBrandTone] = useState<'professional' | 'creative'>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isTtsLoading, setIsTtsLoading] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          tone: brandTone,
          messages: messages.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content }))
        })
      });

      const data = await response.json();
      let replyContent = data.reply || 'Thank you for your inquiry. How else can I help your brand?';

      // Ensure every response has CTAs appended if not present
      if (!replyContent.includes('[[CTA:')) {
        replyContent += `\n\n---\n### ⚡ Recommended Next Steps\n- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Audit with Founder Asim Khan\n- [[CTA:EMAIL_FOUNDER]] Email Us Directly (hello@orixnal.com)\n- [[CTA:EXPLORE_SERVICES]] View ORIXNAL 8 Service Pillars`;
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat request failed:', err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `I am ready to assist you with ORIXNAL's Brand Strategy, Legal Incorporation, Trademarks, Visual Identity, or Web App Engineering.

---
### ⚡ Recommended Next Steps
- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Audit with Founder Asim Khan
- [[CTA:EMAIL_FOUNDER]] Email Us Directly (hello@orixnal.com)
- [[CTA:EXPLORE_SERVICES]] View ORIXNAL 8 Service Pillars`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Chat history reset. How can I assist your brand development journey today?

---
### ⚡ Recommended Next Steps
- [[CTA:BOOK_AUDIT]] Schedule a 1-on-1 Brand Audit with Founder Asim Khan
- [[CTA:EMAIL_FOUNDER]] Email Us Directly (hello@orixnal.com)
- [[CTA:EXPLORE_SERVICES]] View ORIXNAL 8 Service Pillars`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleTextToSpeech = async (msgId: string, text: string) => {
    if (activePlayingId === msgId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActivePlayingId(null);
      return;
    }

    // Strip CTA tags for TTS
    const cleanText = text
      .replace(/\[\[CTA:[^\]]+\]\]/g, '')
      .replace(/###|---|\*\*|\*/g, '')
      .trim();

    setIsTtsLoading(msgId);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voice: 'Kore' })
      });

      const data = await response.json();
      if (data.audio) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0))],
          { type: 'audio/wav' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setActivePlayingId(null);
        };

        await audio.play();
        setActivePlayingId(msgId);
      }
    } catch (err) {
      console.error('Failed to play TTS:', err);
    } finally {
      setIsTtsLoading(null);
    }
  };

  // Helper to parse text and extract CTA buttons
  const renderMessageContent = (content: string) => {
    // Split text into main body and CTA tags
    const ctaMatches: { type: string; label: string }[] = [];
    const ctaRegex = /\[\[CTA:(BOOK_AUDIT|EMAIL_FOUNDER|EXPLORE_SERVICES|CALCULATE_BRAND)\]\]\s*([^,\n\r]+)/g;

    let match;
    while ((match = ctaRegex.exec(content)) !== null) {
      ctaMatches.push({
        type: match[1],
        label: match[2]?.trim() || 'Take Action'
      });
    }

    // Clean display text without raw CTA brackets
    const displayBody = content.replace(/\[\[CTA:[^\]]+\]\]/g, '').trim();

    return (
      <div className="space-y-4">
        <div className="prose prose-sm max-w-none text-neutral-800 space-y-2 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
          {displayBody}
        </div>

        {/* Render Interactive CTA Action Buttons Bar */}
        <div className="pt-3 border-t border-neutral-200/90 space-y-2">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-purple-600" />
            <span>Interactive CTA Actions:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                onOpenAudit();
                onClose();
              }}
              className="orixnal-gradient-bg text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Brand Audit</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="orixnal-gradient-bg text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>

            <a
              href={`mailto:${COMPANY_DETAILS.email}?subject=ORIXNAL AI Advisor Inquiry`}
              className="bg-white text-purple-950 border border-purple-200 font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-purple-50 transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-purple-700" />
              <span>Email Us</span>
            </a>

            <button
              onClick={() => {
                onNavigate('services');
                onClose();
              }}
              className="bg-neutral-100 text-neutral-800 border border-neutral-200 font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-neutral-200/70 transition-all inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>8 Service Pillars</span>
            </button>

            <button
              onClick={() => {
                onNavigate('foooz');
                onClose();
              }}
              className="bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-purple-100 transition-all inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Brand Health Score</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed z-50 bg-white border border-neutral-300 shadow-2xl rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'inset-4 sm:inset-10 lg:inset-20'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] h-[620px] max-h-[85vh]'
        }`}
      >
        {/* Header Bar */}
        <div className="orixnal-gradient-bg text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 p-0.5 flex items-center justify-center shadow-2xs">
              <div className="w-full h-full bg-white text-purple-700 rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-700" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                  ORIXNAL AI Strategic Advisor
                </h3>
                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Gemini 3.6
                </span>
              </div>
              <p className="text-[11px] text-purple-100">
                24/7 AI Guidance with Instant CTA Execution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              title="Reset Chat History"
              className="p-2 text-purple-100 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Minimize Window' : 'Expand Window'}
              className="p-2 text-purple-100 hover:text-white hover:bg-white/20 rounded-xl transition-colors hidden sm:block"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              title="Close Chat"
              className="p-2 text-purple-100 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brand Voice Tone Switch Bar */}
        <div className="bg-[#FAF8F5] border-b border-neutral-200 px-4 py-2 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              Brand Voice:
            </span>
            <div className="inline-flex items-center bg-neutral-200/80 p-0.5 rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setBrandTone('professional')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  brandTone === 'professional'
                    ? 'orixnal-gradient-bg text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Briefcase className={`w-3.5 h-3.5 ${brandTone === 'professional' ? 'text-white' : 'text-neutral-500'}`} />
                <span>Professional</span>
              </button>

              <button
                type="button"
                onClick={() => setBrandTone('creative')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  brandTone === 'creative'
                    ? 'orixnal-gradient-bg text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${brandTone === 'creative' ? 'text-amber-300' : 'text-purple-600'}`} />
                <span>Creative</span>
              </button>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 shrink-0 hidden sm:inline-block">
            {brandTone === 'professional' ? 'Executive & Structured' : 'Visionary & Storytelling'}
          </span>
        </div>

        {/* Global Action Quick Bar */}
        <div className="bg-[#FAF9F6] border-b border-neutral-200 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto shrink-0 gap-2">
          <span className="font-mono text-[10px] font-bold uppercase text-neutral-500 shrink-0">
            Quick Actions:
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onOpenAudit();
                onClose();
              }}
              className="text-purple-700 hover:text-purple-900 font-bold inline-flex items-center gap-1 hover:underline text-xs"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Audit</span>
            </button>
            <span className="text-neutral-300">•</span>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="text-neutral-700 hover:text-neutral-900 font-bold inline-flex items-center gap-1 hover:underline text-xs"
            >
              <Mail className="w-3 h-3" />
              <span>Email Founder</span>
            </a>
            <span className="text-neutral-300">•</span>
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="text-neutral-700 hover:text-neutral-900 font-bold inline-flex items-center gap-1 hover:underline text-xs"
            >
              <Phone className="w-3 h-3" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* Chat Stream Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#FAF9F6]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs text-xs font-bold ${
                  msg.role === 'user'
                    ? 'orixnal-gradient-bg text-white'
                    : 'bg-purple-100 text-purple-800 border border-purple-200'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-purple-700" />}
              </div>

              {/* Message Content Bubble */}
              <div className={`space-y-1 max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 justify-between px-1">
                  <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                    {msg.role === 'user' ? 'You' : 'ORIXNAL AI Advisor'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm border shadow-2xs ${
                    msg.role === 'user'
                      ? 'orixnal-gradient-bg text-white border-transparent rounded-tr-xs'
                      : 'bg-white text-neutral-900 border-neutral-200/90 rounded-tl-xs space-y-3'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    <>
                      {renderMessageContent(msg.content)}

                      {/* Text-To-Speech Listen Button */}
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-400 font-mono">
                          Listen with AI Voice
                        </span>
                        <button
                          onClick={() => handleTextToSpeech(msg.id, msg.content)}
                          disabled={isTtsLoading === msg.id}
                          className="inline-flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 font-bold bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          {isTtsLoading === msg.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : activePlayingId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                          <span>
                            {isTtsLoading === msg.id
                              ? 'Generating Voice...'
                              : activePlayingId === msg.id
                              ? 'Stop Audio'
                              : 'Listen Answer'}
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl orixnal-gradient-bg text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                  <span>
                    ORIXNAL Gemini AI ({brandTone === 'creative' ? 'Creative Tone' : 'Professional Tone'}) is crafting response & CTAs...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Starter Prompt Chips (When Chat is fresh) */}
          {messages.length <= 2 && !isLoading && (
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                Frequently Asked Inquiries:
              </p>
              <div className="flex flex-col gap-2">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left text-xs bg-white hover:bg-purple-50/80 border border-neutral-200 hover:border-purple-200 p-3 rounded-xl transition-all font-medium text-neutral-700 hover:text-purple-950 flex items-center justify-between group shadow-2xs"
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-neutral-200 space-y-2 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask AI Advisor about trademark, naming, web dev, or pricing..."
              className="flex-1 bg-neutral-100 border border-neutral-200/90 rounded-2xl px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="orixnal-gradient-bg text-white p-3 rounded-2xl font-bold text-xs shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all shrink-0 inline-flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono px-1">
            <span>Guaranteed CTAs in every AI message</span>
            <span>Powered by Gemini 3.6 Flash</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
