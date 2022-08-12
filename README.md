# action-next-env

> GitHub Action to read .env.[development|test|production][.local] files in
> Next.js projects and add variables as secrets to GITHUB_ENV

## Usage

```yaml
- name: Load .env file
  uses: natterstefan/action-next-env@v1
  with:
    path: custom/path/to/folder/with/env
    environment: development

- name: Some other action
  run: |
    echo "HELLO Variable: ${{ env.HELLO }}"
```

## Development

> First, you'll need to have a reasonably modern version of `node` handy. This
> won't work with versions older than 16, for instance.

Install the dependencies

```bash
npm install
```

Build the typescript and package it for distribution

```bash
npm run package
```

Run the tests

```bash
npm test
```

### LICENSE

[MIT](LICENSE)

### Misc Ressources

- [@next/env - npm](https://www.npmjs.com/package/@next/env)
- [dotenv - npm](https://www.npmjs.com/package/dotenv)
- [dotenv-expand - npm](https://www.npmjs.com/package/dotenv-expand)
- [example versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

### Similar actions

- [xom9ikk/dotenv: GitHub Action to read .env file and add variables to GITHUB_ENV](https://github.com/xom9ikk/dotenv)
- [falti/dotenv-action: Provide common parameters via .env file](https://github.com/falti/dotenv-action)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://natterstefan.me/"><img src="https://avatars.githubusercontent.com/u/1043668?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stefan Natter</b></sub></a><br /><a href="#ideas-natterstefan" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/natterstefan/action-next-env/commits?author=natterstefan" title="Code">💻</a> <a href="https://github.com/natterstefan/action-next-env/commits?author=natterstefan" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
