/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Code Examples',
      items: [
        'examples/basic-examples',
        'examples/advanced-patterns',
        'examples/real-world-scenarios',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/coding-standards',
        'best-practices/design-patterns',
        'best-practices/performance',
      ],
    },
  ],
};

module.exports = sidebars; 