module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'yarn run start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/ja/greatpretender-case1-3',
        'http://localhost:3000/ja/signup',
        'http://localhost:3000/ja/login',
      ],
      settings: { chromeFlags: 'headless' },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'offscreen-images': 'off',
        'uses-webp-images': 'off',
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
