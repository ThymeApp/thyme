// @flow

let Sentry;
const buffer = [];

function logError(error, errorInfo) {
  Sentry.withScope((scope) => {
    if (errorInfo) {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    }
    Sentry.captureException(error);
  });
}

if (process.env.REACT_APP_SENTRY_DSN) {
  import('@sentry/browser').then((s) => {
    Sentry = s;

    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      debug: process.env.NODE_ENV !== 'production',
      environment: process.env.NODE_ENV,
      release: process.env.REACT_APP_VERSION,
    });

    if (buffer.length > 0) {
      buffer.forEach((item) => logError(item.error, item.errorInfo));
    }
  });
}

export default (error: any, errorInfo: any) => {
  if (!Sentry) {
    buffer.push({ error, errorInfo });
    return;
  }

  logError(error, errorInfo);
};
