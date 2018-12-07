import App, { Container } from 'next/app';
import css from '@atlaskit/css-reset';
import { injectGlobal } from 'styled-components';
const GlobalStyle = injectGlobal`${css}`;

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <div>Last christmas I gave you my heart</div>
        <Component {...pageProps} />
      </Container>
    );
  }
}
