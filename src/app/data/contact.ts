export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'email';
}

export const contactData = {
  email: 'gabriellapiocorrea@gmail.com',
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/Gabriella-Pio',
      handle: 'github.com/Gabriella-Pio',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/gabriella-pio-correa',
      handle: 'linkedin.com/in/gabriella-pio-correa',
      icon: 'linkedin',
    },
  ] as SocialLink[],
};