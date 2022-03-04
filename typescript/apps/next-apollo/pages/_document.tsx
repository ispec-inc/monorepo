import NextDocument, { Html, Main, Head, NextScript } from 'next/document'

type Props = unknown

export default class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang="ja">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
