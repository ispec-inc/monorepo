import React from 'react'
import Head from 'next/head'

type Props = {
  description: string
  title: string
  url: string
}

const Meta = ({ title, description, url }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content={description} />
      <meta name="keywords" content="" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://サイトURL/images/ogp.png" />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="ja_JP" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="" />

      <link rel="canonical" href={url} />

      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        type="image/png"
        href="/images/icon.png"
        sizes="180x180"
      />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
  )
}

export default Meta
