Growl = {
  /**
   * Create a new Growl notification.
   *
   * @param  {String} title   The title displayed on the notification
   * @param  {String} message The message displayed on the notification
   * @param  {Object} options The options controlling the creation of the notification
   *
   */
  new: function(title, message, options, persistent) {

    parameters = {
      title: title,
      message: message,
      options: options
    };

    if(!persistent) {

      newNotification = createNotification(parameters);

      notifications = Session.get('growl');

      if(notifications === undefined) {
        notifications = [newNotification];
      } else {
        notifications.push(newNotification);
      }

      Session.set('growl', notifications);

      Meteor.setTimeout(function() {
        notifications = Session.get('growl');
        notifications.shift();
        Session.set('growl', notifications);
      }, 5000)

    } else {
      newNotification = createNotification(parameters);

      Meteor.call('growlInsert', newNotification);
    }
  }
};

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
