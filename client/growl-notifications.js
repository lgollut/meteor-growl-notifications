Meteor.subscribe('notifications');

var notifications;

Template.growlNotifications.helpers({
  getNotifications: function() {

    notifications = Notifications.find();

    Growl.notifications = notifications.fetch();

    if(Session.get('growl') !== undefined) {
      _.each(Session.get('growl'), function(notification) {
        Growl.notifications.push(notification);
      });
    }

    return Growl.notifications;
  },

  alertType: function(id) {

    current = _.find(Growl.notifications, function(notification) {
      return EJSON.equals(notification._id, id);
    });

    type = current.header.type;
    return ' alert-' + type;
  },

  isDisplayed: function(id) {
    current = _.find(Growl.notifications, function(notification) {
      return EJSON.equals(notification._id, id);
    });

    user = _.find(current.header.recipients, function(recipient) {
      return recipient.userId === Meteor.userId();
    });

    return user.status === 'displayed';
  },

  isPersistent: function(id) {
    current = _.find(Growl.notifications, function(notification) {
      return EJSON.equals(notification._id, id);
    });

    return current.header.persistent && true;
  },

  idToString: function(id) {
    return id._str;
  }
});

Template.growlNotifications.events({
  'click .close': function(e) {
    current = _.find(Growl.notifications, function(notification) {
      return EJSON.equals(notification._id, new Meteor.Collection.ObjectID(e.target.id));
    });

    Meteor.call('growlUpdate',
      {_id: current._id, 'header.recipients': {$elemMatch: {userId: Meteor.userId()}}},
      {$set: {'header.recipients.$.status': 'dismissed'}}
    );
  }
})
