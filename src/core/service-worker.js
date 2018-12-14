// @flow

let registration: ServiceWorkerRegistration;

export function registerRegistration(reg: ServiceWorkerRegistration) {
  registration = reg;
}

export function forceReloadRegistration() {
  if (!registration) {
    alert('No service worker registration found.');
    return;
  }

  registration.update()
    .then(registration.unregister)
    .then(() => {
      alert('Service Worker is updated. Refresh page to apply changes.');
    });
}

export function hasServiceWorker(): boolean {
  return !!registration;
}
