import { Html, Head, Main, NextScript } from 'next/document'
import { InlineScript } from '../components/InlineScript'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <body>
        <InlineScript id="theme-setter">
          {() => {
            let theme = 'light-mode' // default

            const themePreference = localStorage.getItem('theme')

            // If the user has explicitly chosen a theme
            if (themePreference) {
              theme = themePreference
            }
            // If the user has not explicitly chosen a theme - check the OS theme preference
            else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              theme = 'dark'
            }

            document.body.setAttribute('data-theme', theme)
          }}
        </InlineScript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
