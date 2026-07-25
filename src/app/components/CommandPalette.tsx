import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  Home,
  Folder,
  FileText,
  User,
  Settings,
  Moon,
  Sun,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  CornerDownLeft,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
} from '@/app/components/ui/dialog';
import { useTranslation } from 'react-i18next';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  setOpen,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation('command');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }

      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      setInputValue('');
    }
  }, [open]);

  const isBikSearch = inputValue.toLowerCase().includes('bik');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-2xl
          overflow-hidden
          p-0

          border-[var(--border-color)]
          bg-[var(--bg-surface)]
          text-[var(--text-primary)]

          shadow-2xl
          ring-1
          ring-[var(--accent-primary)]/20
        "
      >
        <Command className="w-full bg-transparent" shouldFilter={!isBikSearch}>
          <div className="flex items-center border-b border-[var(--border-color)] px-4 py-3">
            <Search className="mr-2 h-5 w-5 text-[var(--text-secondary)]" />

            <Command.Input
              placeholder={t('placeholder')}
              value={inputValue}
              onValueChange={setInputValue}
              className="
                flex-1
                bg-transparent
                outline-none

                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]

                font-sans
                text-sm
              "
            />

            <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-[var(--border-color)] bg-[var(--bg-main)] px-1.5 font-mono text-[10px] font-medium text-[var(--text-secondary)]">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>

          <Command.List className="max-h-[320px] overflow-y-auto overflow-x-hidden p-2">
            {isBikSearch ? (
              <div className="space-y-1">
                <div className="px-2 py-1.5 text-xs font-mono text-[var(--text-secondary)]">
                  {t('bestMatch')}
                </div>

                <Command.Item
                  value="Project: Bikcraft"
                  className="
                    group
                    flex
                    cursor-pointer
                    items-center
                    rounded-md
                    border
                    border-[var(--accent-primary)]/20
                    bg-[var(--accent-primary)]/10
                    px-3
                    py-2
                    text-sm
                    text-[var(--text-primary)]
                  "
                >
                  <Folder
                    size={16}
                    className="mr-3 text-[var(--accent-primary)]"
                  />

                  <span className="flex-1 font-medium">
                    Project: Bikcraft
                  </span>

                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--accent-primary)]">
                      Application
                    </span>

                    <CornerDownLeft
                      size={14}
                      className="text-[var(--text-secondary)]"
                    />
                  </span>
                </Command.Item>

                <Command.Item className="group mt-2 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)]">
                  <Github
                    size={16}
                    className="mr-3 transition-colors group-hover:text-[var(--accent-primary)]"
                  />

                  <span className="flex-1">
                    {t('goToRepo')}
                  </span>

                  <ArrowRight className="ml-3 h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-[var(--accent-primary)]" />
                </Command.Item>
              </div>
            ) : (
              <>
                <Command.Empty className="py-6 text-center text-sm text-[var(--text-secondary)]">
                  {t('noResults')}
                </Command.Empty>

                <Command.Group heading={t('groups.navigation')}>
                  <CommandItem icon={<Home />} label={t('items.home')} shortcut="H" />
                  <CommandItem icon={<Folder />} label={t('items.projects')} shortcut="P" />
                  <CommandItem icon={<FileText />} label={t('items.notes')} shortcut="N" />
                  <CommandItem icon={<User />} label={t('items.about')} shortcut="A" />
                </Command.Group>

                <Command.Group heading={t('groups.system')}>
                  <CommandItem icon={<Settings />} label={t('items.settings')} />
                  <CommandItem icon={<Moon />} label={t('items.toggleDark')} />
                  <CommandItem icon={<Sun />} label={t('items.toggleLight')} />
                </Command.Group>

                <Command.Group heading={t('groups.social')}>
                  <CommandItem icon={<Github />} label="GitHub" />
                  <CommandItem icon={<Linkedin />} label="LinkedIn" />
                  <CommandItem icon={<Twitter />} label="Twitter" />
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandItem = ({
  icon,
  label,
  shortcut,
}: {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
}) => {
  return (
    <Command.Item
      onSelect={() => console.log(label)}
      className="
        group
        flex
        cursor-pointer
        items-center
        rounded-md

        px-3
        py-2

        text-sm

        text-[var(--text-secondary)]

        transition-colors

        hover:bg-[var(--accent-primary)]/10
        hover:text-[var(--text-primary)]

        aria-selected:bg-[var(--accent-primary)]/10
        aria-selected:text-[var(--text-primary)]
      "
    >
      <div className="mr-3 flex h-4 w-4 items-center justify-center transition-colors group-hover:text-[var(--accent-primary)]">
        {React.cloneElement(icon as React.ReactElement, {
          size: 16,
        })}
      </div>

      <span className="flex-1">{label}</span>

      {shortcut && (
        <span className="ml-auto text-xs font-mono text-[var(--text-secondary)]">
          ⌘{shortcut}
        </span>
      )}

      <ArrowRight className="ml-3 h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-[var(--accent-primary)]" />
    </Command.Item>
  );
};