import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className="text-gray-500" />}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-[#bfa14f] hover:text-[#ffd700] transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className={item.isActive ? 'text-white font-semibold' : 'text-gray-400'}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
