import React, { useId, useRef, useState } from 'react';

export interface SeoFaq {
  q: string;
  a: string;
}

interface SeoContentProps {
  title: string;
  summary: string;
  content: string[];
  faqs: SeoFaq[];
}

const SeoContent: React.FC<SeoContentProps> = ({ title, summary, content, faqs }) => {
  const [expanded, setExpanded] = useState(false);
  const baseId = useId();
  const buttonId = `${baseId}-toggle`;
  const panelId = `${baseId}-panel`;
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const toggle = () => {
    if (!expanded) {
      setMaxHeight(innerRef.current?.scrollHeight ?? 0);
    }
    setExpanded(v => !v);
  };

  return (
    <section className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-left">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{summary}</p>
        </div>

        <button
          id={buttonId}
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={toggle}
          className="shrink-0 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700"
        >
          {expanded ? 'Mostrar menos' : 'Saiba mais'}
        </button>
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!expanded}
        style={{ maxHeight: expanded ? maxHeight : 0, opacity: expanded ? 1 : 0 }}
        className="overflow-hidden transition-all duration-300 ease-out"
      >
        <div ref={innerRef} className="pt-4">
          <div className="space-y-3">
            {content.map((paragraph, idx) => (
              <p key={idx} className="text-sm text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {faqs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">FAQ</h3>
              <dl className="mt-3 space-y-3">
                {faqs.map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <dt className="text-sm font-black text-slate-900">{item.q}</dt>
                    <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeoContent;
