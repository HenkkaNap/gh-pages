// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Coding Guides & Examples',
  tagline: 'A comprehensive guide to coding best practices and examples',
  favicon: 'img/favicon.ico',
  url: 'https://henkkanap.github.io',
  baseUrl: '/gh-pages/',
  organizationName: 'henkkanap',
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
          routeBasePath: '/',
          editUrl: 'https://github.com/henkkanap/gh-pages/tree/main/',
        },
        blog: false,
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
            label: 'Getting Started',
            to: '/getting-started/introduction',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Examples',
            to: '/examples/basic-examples',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Best Practices',
            to: '/best-practices/coding-standards',
          },
          {
            href: 'https://github.com/henkkanap/gh-pages',
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
                to: '/getting-started/introduction',
              },
              {
                label: 'Code Examples',
                to: '/examples/basic-examples',
              },
              {
                label: 'Best Practices',
                to: '/best-practices/coding-standards',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/henkkanap/gh-pages',
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