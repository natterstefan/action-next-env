/* eslint-disable import/no-commonjs */
module.exports = {
  branches: ['main'],
  preset: 'conventionalcommits',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogTitle: '# action-next-env Changelog'
      }
    ],
    [
      '@semantic-release/github',
      {
        failComment: false,
        failTitle: false,
        releasedLabels: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['dist', 'CHANGELOG.md'],
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore: Release ${nextRelease.version} [skip ci]'
      }
    ]
  ]
}
