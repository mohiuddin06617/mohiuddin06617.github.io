import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard, ArrowUp, Moon, Sun, Mail, Compass } from 'lucide-react';

export interface ShortcutItem {
  key: string;
  label: string;
  description: string;
  category: 'Navigation' | 'Actions' | 'General';
  action?: () => void;
}

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onToggleTheme: () => void;
  onOpenContact: () => void;
  onScrollToTop: () => void;
  isDarkMode: boolean;
}

export default function ShortcutsModal({
  isOpen,
  onClose,
  onNavigate,
  onToggleTheme,
  onOpenContact,
  onScrollToTop,
  isDarkMode,
}: ShortcutsModalProps) {
  const shortcutGroups = [
    {
      category: 'Navigation',
      icon: Compass,
      items: [
        { key: '1', label: 'Experience', description: 'Jump to Experience section', action: () => onNavigate('experience') },
        { key: '2', label: 'Projects', description: 'Jump to Projects section', action: () => onNavigate('projects') },
        { key: '3', label: 'Expertise', description: 'Jump to Expertise & Skills', action: () => onNavigate('expertise') },
        { key: '4', label: 'Education', description: 'Jump to Education section', action: () => onNavigate('education') },
        { key: '5', label: 'Publications', description: 'Jump to Publications section', action: () => onNavigate('publications') },
        { key: 'T', label: 'Top', description: 'Scroll back to the top', action: onScrollToTop },
      ],
    },
    {
      category: 'Actions & Preferences',
      icon: isDarkMode ? Sun : Moon,
      items: [
        {
          key: 'M',
          label: 'Theme',
          description: `Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`,
          action: onToggleTheme,
        },
        {
          key: 'C',
          label: 'Contact',
          description: 'Open contact & collaboration modal',
          action: onOpenContact,
        },
      ],
    },
    {
      category: 'General',
      icon: Keyboard,
      items: [
        { key: '?', label: 'Shortcuts', description: 'Toggle this keyboard shortcuts dialog', action: onClose },
        { key: 'Esc', label: 'Close', description: 'Close any active dialog or overlay', action: onClose },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="shortcuts-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                  <Keyboard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans">
                    Keyboard Shortcuts
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Navigate and trigger quick actions from anywhere
                  </p>
                </div>
              </div>
              <button
                id="close-shortcuts-modal"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close shortcuts modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="overflow-y-auto p-6 space-y-6">
              {shortcutGroups.map((group) => {
                const IconComponent = group.icon;
                return (
                  <div key={group.category} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <IconComponent className="h-3.5 w-3.5" />
                      <span>{group.category}</span>
                    </div>

                    <div className="grid gap-2">
                      {group.items.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            }
                            if (item.key !== '?' && item.key !== 'Esc') {
                              onClose();
                            }
                          }}
                          className="flex items-center justify-between rounded-xl p-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/50 group"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {item.label}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {item.description}
                            </span>
                          </div>

                          <kbd className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:border-indigo-300 dark:group-hover:border-indigo-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-all">
                            {item.key}
                          </kbd>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-3 text-xs text-slate-500 dark:text-slate-400">
              <span>Press <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 font-mono font-medium text-slate-700 dark:text-slate-300">?</kbd> anytime to open</span>
              <button
                onClick={onClose}
                className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
