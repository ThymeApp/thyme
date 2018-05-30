// @flow

window.dataLayer = window.dataLayer || [];

function gtag(...args) {
  window.dataLayer.push(args);
}

if (process.env.NODE_ENV !== 'development') {
  const script = document.createElement('script');
  script.setAttribute('async', 'async');
  script.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=UA-120052266-1');

  if (document.body) {
    document.body.appendChild(script);

    gtag('js', new Date());
    gtag('config', 'UA-120052266-1');
  }
}
