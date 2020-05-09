import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.info('service worker registered'))
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  }
});
