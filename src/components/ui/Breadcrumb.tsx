import { motion } from 'framer-motion';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 flex-wrap"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-gray-600 text-sm select-none">›</span>
            )}
            {isLast || !item.onClick ? (
              <span
                className={`text-sm font-medium ${
                  isLast ? 'text-white' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="text-sm font-medium text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}
