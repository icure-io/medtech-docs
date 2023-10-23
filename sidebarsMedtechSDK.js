/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebarsSDK can be generated from the filesystem, or explicitly defined here.

 Create as many sidebarsSDK as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsSDK = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually

    sdkSidebar: [
        'intro',
        {
            type: 'category',
            label: 'Quick Start',
            link: {
                type: 'doc',
                id: 'quick-start/index',
            },
            items: ['quick-start/react-native-quick-start', 'quick-start/react-js-quick-start', 'quick-start/node-js-quick-start']
        },
        'release-notes',
        {
            type: 'category',
            label: 'Tutorial',
            items: [
                'tutorial/index',
                {
                    type: 'category',
                    label: 'Patient App',
                    link: {
                        type: 'doc',
                        id: 'tutorial/petra/foreword',
                    },
                    items: [
                        {
                            'Chapter 1 - Setup': [
                                'tutorial/petra/chapter-01/prerequisites',
                                'tutorial/petra/chapter-01/installation',
                                'tutorial/petra/chapter-01/icure-informations',
                            ],
                        },
                        {
                            'Chapter 2 - Authentication': [
                                'tutorial/petra/chapter-02/redux-and-storage',
                                'tutorial/petra/chapter-02/register',
                                'tutorial/petra/chapter-02/login',
                            ],
                        },
                        {
                            'Chapter 3 - DataSample': [
                                'tutorial/petra/chapter-03/setup',
                                'tutorial/petra/chapter-03/service-api',
                                'tutorial/petra/chapter-03/calendar',
                                'tutorial/petra/chapter-03/service-modal',
                                'tutorial/petra/chapter-03/history',
                            ],
                        },
                        {
                            'Chapter 4 - Patient': [
                                'tutorial/petra/chapter-04/patient-api',
                                'tutorial/petra/chapter-04/header',
                                'tutorial/petra/chapter-04/modify-user',
                                'tutorial/petra/chapter-04/user-api',
                                'tutorial/petra/chapter-04/hcp-api',
                                'tutorial/petra/chapter-04/sharing',
                                'tutorial/petra/chapter-04/logout',
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'How To',
            link: {
                type: 'generated-index',
                title: 'How To',
                slug: '/how-to/index',
            },
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'how-to',
                },
            ],
        },
        {
            type: 'category',
            label: 'References',
            link: {
                type: 'doc',
                id: 'references/modules',
            },
            items: [
                {
                    type: 'category',
                    label: 'Entry points',
                    link: {
                        type: 'generated-index',
                        title: 'Entry points',
                        slug: '/references/entrypoints',
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'references/entrypoints',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Builders',
                    link: {
                        type: 'generated-index',
                        title: 'Builders',
                        slug: '/references/builders',
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'references/builders',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'APIs',
                    link: {
                        type: 'generated-index',
                        title: 'APIs',
                        slug: '/references/apis',
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'references/apis',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Interfaces',
                    link: {
                        type: 'generated-index',
                        title: 'Interfaces',
                        slug: '/references/interfaces',
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'references/interfaces',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Domain Classes',
                    link: {
                        type: 'generated-index',
                        title: 'Domain Classes',
                        slug: '/references/classes',
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'references/classes',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Filters',
                    link: {
                        type: 'generated-index',
                        title: 'Filters',
                        slug: '/references/filters',
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'references/filters',
                        },
                    ],
                }
            ],
        },
        {
            type: 'category',
            label: 'Explanations',
            link: {
                type: 'doc',
                id: 'explanations',
            },
            // Can't use autogenerated items, but we may be able to do javascript code to retrieve them.
            items: [
                {
                    type: 'category',
                    label: 'What is the iCure Data Model?',
                    link: {
                        type: 'doc',
                        id: 'explanations/data-model'
                    },
                    items: [
                        'explanations/data-model/data-model-coding',
                        'explanations/data-model/data-model-service',
                        'explanations/data-model/data-model-healthcare-element',
                        'explanations/data-model/data-model-hcp',
                        'explanations/data-model/data-model-medical-device',
                        'explanations/data-model/data-model-notification',
                        'explanations/data-model/data-model-patient',
                        'explanations/data-model/data-model-user'
                    ],
                },
                'explanations/encryption/introduction',
                'explanations/crypto-strategies/index'
                /* TODO: when we make more encryption docs we need to replace explanations/encryption/introduction with this
                 *  and update the introduction document to become again "introduction"
                {
                  type: 'category',
                  label: 'End-to-end encryption',
                  link: {
                    type: 'generated-index',
                    title: 'End-to-end encryption',
                    slug: '/explanations/encryption',
                  },
                  items: [
                    'explanations/encryption/introduction'
                  ],
                }
                 */
            ],
        },
        'troubleshooting',
        'glossary'
    ],
}

module.exports = sidebarsSDK;