Growl = {

  notifications: [],
  toDismissed: [],

  notificationsDeps: new Deps.Dependency,

  get: function() {
    this.notificationsDeps.depend();

    persistentGrowl = Notifications.find().fetch();

    return _.union(persistentGrowl, this.notifications);
  },

  delete: function(id, timeout) {

    if(!timeout) {
      $('#' + id).removeClass('fadeInDown').addClass('fadeOutRight');

      Meteor.setTimeout(function() {

        Growl.notifications.shift();
        Growl.notificationsDeps.changed();

      }, 1100);

    } else {

      Meteor.setTimeout(function() {

        $('#' + id).removeClass('fadeInDown').addClass('fadeOutRight');

        Meteor.setTimeout(function() {

          Growl.notifications.shift();
          Growl.notificationsDeps.changed();

        }, 1100);

      }, timeout);

    }

  },

  /**
   * Create a new Growl notification.
   *
   * @param  {String} title   The title displayed on the notification
   * @param  {String} message The message displayed on the notification
   * @param  {Object} options The options controlling the creation of the notification
   *
   */
  create: function(title, message, options, persistent) {

    parameters = {
      title: title,
      message: message,
      options: options
    };

    if(!persistent) {

      newNotification = createNotification(parameters);

      this.notifications.push(newNotification);

      this.delete(newNotification._id, 5000);

    } else {
      newNotification = createNotification(parameters);

      Meteor.call('growlInsert', newNotification);
    }

    this.notificationsDeps.changed();
  }
};

Deps.autorun(function(computation) {
  Growl.get();
  computation.onInvalidate(function() {
    //console.log(computation);
  });
})

var createNotification = function(parameters) {
  return {
    _id: new Meteor.Collection.ObjectID(),
    header: {
      type: parameters.options.type,
      code: parameters.options.code,
      recipients: [
        {
          userId: parameters.options.userId,
          status: 'displayed'
        }
      ]
    },
    body: {
      title: parameters.title,
      message: parameters.message
    }
  };
};

