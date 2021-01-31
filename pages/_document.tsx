import Document, {Head, Html, Main, NextScript} from 'next/document'
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="bg-gradient-to-b from-gray-100 to-gray-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
