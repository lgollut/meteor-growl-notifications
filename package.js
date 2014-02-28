Package.describe({
  summary: "A meteorite package giving you a simple way to display grow styled alert in the browser."
});

Package.on_use(function (api, where) {

  // client
  api.use([
    'templating',
    'handlebars',
    'less'
    ], 'client');

  api.add_files([
    'growl_alert.html',
    'growl_alert.js'
  ], 'client');

  // server
  api.add_files([

  ], 'server');

  // client and server
  api.export('GrowlAlert', ['client', 'server']);

  api.use([

  ], ['client', 'server']);

  api.add_files([

  ], ['client', 'server']);

});

Package.on_test(function (api) {

});