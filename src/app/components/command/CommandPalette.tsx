import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  Home,
  User,
  Briefcase,
  Code2,
  Folder,
  Award,
  Terminal,
  Mail,
  Moon,
  Sun,
  Eye,
  ZapOff,
  Github,
  Linkedin,
  ArrowRight,
  CornerDownLeft,
  Copy,
  Check,
} from 'lucide-react';

import { Dialog, DialogContent } from '@/app/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { contactData } from '@/app/data/contact';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, setOpen }) => {
  const [inputValue, setInputValue] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { t } = useTranslation('command');
  const { theme, toggleTheme, preferences, updatePreference } = useAccessibility();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      setInputValue('');
      setCopiedEmail(false);
    }
  }, [open]);

  const scrollToSection = (id: string) => {
    setOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    void navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const openBikcraft = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('open-project', { detail: 'bikcraft' }));
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isBikSearch = inputValue.toLowerCase().includes('bik');
  const github = contactData.socials.find(social => social.icon === 'github');
  const linkedin = contactData.socials.find(social => social.icon === 'linkedin');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-2xl overflow-hidden p-0
          border-[var(--border-color)]
          bg-[var(--bg-surface)]/95 backdrop-blur-md
          text-[var(--text-primary)] shadow-2xl
          ring-1 ring-[var(--accent-primary)]/20
          [&>button]:hidden
        "
      >
        <Command
          className="
            w-full bg-transparent
            [&_[cmdk-group-heading]]:px-3
            [&_[cmdk-group-heading]]:py-1.5
            [&_[cmdk-group-heading]]:font-mono
            [&_[cmdk-group-heading]]:text-[10px]
            [&_[cmdk-group-heading]]:font-semibold
            [&_[cmdk-group-heading]]:uppercase
            [&_[cmdk-group-heading]]:tracking-wider
            [&_[cmdk-group-heading]]:text-[var(--text-secondary)]
          "
          shouldFilter={!isBikSearch}
        >
          <div className="flex items-center border-b border-[var(--border-color)] px-4 py-3">
            <Search className="mr-2 h-5 w-5 text-[var(--accent-primary)] shrink-0" />

            <Command.Input
              placeholder={t('placeholder')}
              value={inputValue}
              onValueChange={setInputValue}
              className="
                flex-1 bg-transparent outline-none
                text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
                font-sans text-sm
              "
            />

            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-[var(--border-color)] bg-[var(--bg-main)] px-2 font-mono text-[10px] font-medium text-[var(--text-secondary)]">
              <span>ESC</span>
            </kbd>
          </div>

          <Command.List className="max-h-[360px] overflow-y-auto overflow-x-hidden p-2 space-y-2">
            {isBikSearch ? (
              <div className="space-y-1">
                <div className="px-2 py-1.5 font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {t('bestMatch')}
                </div>

                <Command.Item
                  value="Project: Bikcraft"
                  onSelect={openBikcraft}
                  className="
                    group flex cursor-pointer items-center rounded-md border
                    border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10
                    px-3 py-2 text-sm text-[var(--text-primary)]
                    aria-selected:bg-[var(--accent-primary)]/20
                  "
                >
                  <Folder size={16} className="mr-3 text-[var(--accent-primary)] shrink-0" />
                  <span className="flex-1 font-medium">Project: Bikcraft</span>
                  <span className="ml-auto flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)]">
                    <span>{t('goToRepo')}</span>
                    <CornerDownLeft size={14} />
                  </span>
                </Command.Item>
              </div>
            ) : (
              <>
                <Command.Empty className="py-8 text-center font-mono text-xs text-[var(--text-secondary)]">
                  {t('noResults')}
                </Command.Empty>

                <Command.Group heading={t('groups.navigation')}>
                  <CommandItem icon={<Home />} label={t('items.home')} onSelect={() => scrollToSection('top')} />
                  <CommandItem icon={<User />} label={t('items.about')} onSelect={() => scrollToSection('about')} />
                  <CommandItem icon={<Briefcase />} label={t('items.experience')} onSelect={() => scrollToSection('experience')} />
                  <CommandItem icon={<Code2 />} label={t('items.skills')} onSelect={() => scrollToSection('skills')} />
                  <CommandItem icon={<Folder />} label={t('items.projects')} onSelect={() => scrollToSection('projects')} />
                  <CommandItem icon={<Award />} label={t('items.qualifications')} onSelect={() => scrollToSection('qualifications')} />
                  <CommandItem icon={<Terminal />} label={t('items.garden')} onSelect={() => scrollToSection('notes')} />
                  <CommandItem icon={<Mail />} label={t('items.contact')} onSelect={() => scrollToSection('contact')} />
                </Command.Group>

                <Command.Group heading={t('groups.accessibility')}>
                  <CommandItem
                    icon={theme === 'dark' ? <Sun /> : <Moon />}
                    label={theme === 'dark' ? t('items.toggleLight') : t('items.toggleDark')}
                    onSelect={() => {
                      toggleTheme();
                      setOpen(false);
                    }}
                  />
                  <CommandItem
                    icon={<Eye />}
                    label={preferences.highContrast ? t('items.disableHighContrast') : t('items.highContrast')}
                    onSelect={() => {
                      updatePreference('highContrast', !preferences.highContrast);
                      setOpen(false);
                    }}
                  />
                  <CommandItem
                    icon={<ZapOff />}
                    label={preferences.reduceMotion ? t('items.enableMotion') : t('items.reduceMotion')}
                    onSelect={() => {
                      updatePreference('reduceMotion', !preferences.reduceMotion);
                      setOpen(false);
                    }}
                  />
                </Command.Group>

                <Command.Group heading={t('groups.social')}>
                  <CommandItem
                    icon={copiedEmail ? <Check className="text-green-400" /> : <Copy />}
                    label={copiedEmail ? t('items.emailCopied') : `${t('items.copyEmail')} (${contactData.email})`}
                    onSelect={handleCopyEmail}
                  />
                  {github && (
                    <CommandItem
                      icon={<Github />}
                      label="GitHub"
                      onSelect={() => {
                        window.open(github.url, '_blank');
                        setOpen(false);
                      }}
                    />
                  )}
                  {linkedin && (
                    <CommandItem
                      icon={<Linkedin />}
                      label="LinkedIn"
                      onSelect={() => {
                        window.open(linkedin.url, '_blank');
                        setOpen(false);
                      }}
                    />
                  )}
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandItemProps {
  icon: React.ReactNode;
  label: string;
  onSelect: () => void;
}

const CommandItem: React.FC<CommandItemProps> = ({ icon, label, onSelect }) => {
  return (
    <Command.Item
      onSelect={onSelect}
      className="
        group flex cursor-pointer items-center rounded-md px-3 py-2 text-sm
        text-[var(--text-secondary)] transition-colors
        hover:bg-[var(--accent-primary)]/10 hover:text-[var(--text-primary)]
        aria-selected:bg-[var(--accent-primary)]/10 aria-selected:text-[var(--text-primary)]
      "
    >
      <div className="mr-3 flex h-4 w-4 items-center justify-center transition-colors group-hover:text-[var(--accent-primary)] shrink-0">
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 16 })}
      </div>

      <span className="flex-1 font-sans">{label}</span>

      <ArrowRight size={14} className="ml-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-[var(--accent-primary)] shrink-0" />
    </Command.Item>
  );
};
