// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Coding Guides & Examples',
  tagline: 'A comprehensive guide to coding best practices and examples',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: `https://${process.env.GITHUB_REPOSITORY_OWNER || 'GITHUB_USERNAME'}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: process.env.BASE_URL || '/gh-pages/',

  // GitHub pages deployment config
  organizationName: process.env.GITHUB_REPOSITORY_OWNER || 'GITHUB_USERNAME',
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
          editUrl: `https://github.com/${process.env.GITHUB_REPOSITORY || 'GITHUB_USERNAME/gh-pages'}/tree/main/`,
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
            href: `https://github.com/${process.env.GITHUB_REPOSITORY || 'GITHUB_USERNAME/gh-pages'}`,
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
                href: `https://github.com/${process.env.GITHUB_REPOSITORY || 'GITHUB_USERNAME/gh-pages'}`,
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