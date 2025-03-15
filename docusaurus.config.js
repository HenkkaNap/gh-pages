// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Coding Guides & Examples',
  tagline: 'A comprehensive guide to coding best practices and examples',
  favicon: 'img/favicon.ico',
  url: 'https://YOUR_GITHUB_USERNAME.github.io',
  baseUrl: '/gh-pages/',
  organizationName: 'YOUR_GITHUB_USERNAME',
  projectName: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/YOUR_GITHUB_USERNAME/gh-pages/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Coding Guides',
        logo: {
          alt: 'Coding Guides Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Examples',
          },
          {
            href: 'https://github.com/YOUR_GITHUB_USERNAME/gh-pages',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Code Examples',
                to: '/docs/examples',
              },
              {
                label: 'Best Practices',
                to: '/docs/best-practices',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/YOUR_GITHUB_USERNAME/gh-pages',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Coding Guides. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config; 