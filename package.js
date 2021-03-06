Package.describe({
  summary: "A meteorite package giving you a simple way to display grow styled notifications in the browser."
});

Package.on_use(function (api, where) {

  api.use([
    'collection2',
    'simple-schema',
    'iron-router',
    'deps'
  ], ['client', 'server']);

  api.use([
    'templating',
    'handlebars',
    'less',
    'underscore'
    ], 'client');

  api.add_files('lib/router.js', 'client');
  api.add_files('collections/notifications-collection.js', ['client', 'server']);
  api.add_files('server/publications.js', 'server');
  api.add_files('server/methods.js');

  api.add_files('growl.js', 'client');

  api.add_files('client/less/growl-notifications.less', 'client');
  api.add_files('client/growl-notifications.html', 'client');
  api.add_files('client/growl-notifications.js', 'client');
  api.add_files('client/notifications-center.html', 'client');
  api.add_files('client/notifications-center.js', 'client');

  api.export('Growl', ['client', 'server']);

});

Package.on_test(function (api) {

});
