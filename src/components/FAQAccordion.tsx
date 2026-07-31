import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';
import { FAQ_LIST } from '../data/brandData';
import { ChevronDown, Search, Sparkles, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface FAQAccordionProps {
  items?: FAQItem[];
  defaultOpenId?: string | null;
  allowSearch?: boolean;
  allowCategoryFilter?: boolean;
  className?: string;
  onOpenAudit?: () => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items = FAQ_LIST,
  defaultOpenId = 'faq-1',
  allowSearch = true,
  allowCategoryFilter = true,
  className = '',
  onOpenAudit
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filtered FAQs based on query and category
  const filteredItems = useMemo(() => {
    return items.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls: Search and Categories */}
      {(allowSearch || allowCategoryFilter) && (
        <div className="space-y-4">
          {allowSearch && (
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search questions (e.g. legal, trademark, pricing, timeline)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs font-bold text-neutral-400 hover:text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {allowCategoryFilter && categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isActive
                        ? 'orixnal-gradient-bg text-white border-transparent shadow-2xs'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Accordion Item Cards */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-purple-400 mx-auto" />
            <p className="text-sm font-bold text-neutral-800">No matching questions found</p>
            <p className="text-xs text-neutral-500">
              Try adjusting your search query or switching category filters.
            </p>
            {onOpenAudit && (
              <button
                onClick={onOpenAudit}
                className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900"
              >
                <span>Ask Founder Asim Khan directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          filteredItems.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white border transition-all rounded-2xl overflow-hidden ${
                  isOpen
                    ? 'border-purple-300 shadow-sm ring-1 ring-purple-100'
                    : 'border-neutral-200/90 shadow-2xs hover:border-neutral-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    {faq.category && (
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 mb-1">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isOpen
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-neutral-100 text-neutral-500 group-hover:bg-purple-50 group-hover:text-purple-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 space-y-3">
                        <p>{faq.answer}</p>

                        <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-purple-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Direct Founder Strategic Oversight & Custom Execution</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
