// Reusable admin table — brand-styled, minimal, scannable.

import { cn } from '@/lib/utils/cn';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface AdminTableProps<T> {
  columns: Column[];
  rows: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

export default function AdminTable<T>({
  columns,
  rows,
  renderRow,
  emptyMessage = 'Aucune donnée.',
}: AdminTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-brand-mid/20">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-brand-mid/20 bg-brand-mid/10">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-left font-pixel text-[10px] uppercase tracking-widest text-brand-light/50',
                  col.width,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-brand-light/40 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  'transition-colors duration-100',
                  i < rows.length - 1 && 'border-b border-brand-mid/10',
                  i % 2 === 0 ? 'bg-transparent' : 'bg-brand-mid/5',
                  'hover:bg-brand-mid/10',
                )}
              >
                {renderRow(row, i)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Shared table cell ─────────────────────────────────────────────────────────

export function Td({
  children,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('px-4 py-3 text-brand-light/80 align-middle', className)}
      {...props}
    >
      {children}
    </td>
  );
}
