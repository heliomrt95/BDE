// src/components/features/blog/PostContent.tsx
// Renders markdown content with styled typography.
// Uses react-markdown for parsing.

import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils/cn';

interface PostContentProps {
  content: string;
  className?: string;
}

export default function PostContent({ content, className }: PostContentProps) {
  return (
    <div className={cn('post-content', className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-display-sm text-white mt-10 mb-5 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-heading text-white mt-8 mb-4 pb-2 border-b border-border/30 flex items-center gap-2">
              <span className="pixel-text text-pixel-sm text-brand-accent" aria-hidden="true">◈</span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-subheading text-white mt-6 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-body text-text-secondary leading-relaxed mb-4">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-brand-light italic">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 space-y-2 pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 space-y-2 pl-0 list-none counter-reset-[item]">{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li className="flex items-start gap-3 text-body text-text-secondary">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent/60 shrink-0" aria-hidden="true" />
              <span>{children}</span>
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-brand-accent hover:underline focus-brand rounded-sm"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 pl-5 border-l-2 border-brand-accent/50 text-text-secondary italic">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="my-5 p-5 rounded-xl bg-surface-raised/60 border border-border/40 overflow-x-auto">
                  <code className="text-small text-brand-light font-mono">{children}</code>
                </pre>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded-md bg-brand-mid/20 text-brand-accent text-small font-mono">
                {children}
              </code>
            );
          },
          hr: () => (
            <hr className="my-8 border-none h-[1px] bg-gradient-to-r from-brand-mid/40 via-brand-accent/30 to-transparent" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
