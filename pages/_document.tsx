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
        <body className="grid min-h-screen grid-rows-1 bg-gradient-to-b from-gray-100 to-gray-300">
          <Main />
          <NextScript />
          <div className="p-4 text-sm text-right">
            Books provided by{' '}
            <a
              className="text-blue-600 hover:text-blue-800"
              href="https://openlibrary.org/"
            >
              Open Library
            </a>
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
