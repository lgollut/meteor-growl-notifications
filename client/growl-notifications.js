Meteor.subscribe('notifications');

var notifications;

Template.growlNotifications.helpers({
  getNotifications: function() {
    return Growl.get();
  },

  alertType: function(id) {

    current = _.find(Growl.get(), function(notification) {
      return EJSON.equals(notification._id, id);
    });

    type = current.header.type;
    return ' alert-' + type;
  },

  isDisplayed: function(id) {
    current = _.find(Growl.get(), function(notification) {
      return EJSON.equals(notification._id, id);
    });

    user = _.find(current.header.recipients, function(recipient) {
      return recipient.userId === Meteor.userId();
    });

    return user.status === 'displayed';
  },

  isPersistent: function(id) {
    current = _.find(Growl.get(), function(notification) {
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

    currentId = $(e.target).parent().attr('id');

    $('#'+currentId).removeClass('fadeInDown').addClass('fadeOutRight');
    Growl.toDismissed.push(currentId);

    Meteor.setTimeout(function() {

      currentId = Growl.toDismissed.shift();

      Meteor.call('growlUpdate',
        {_id: new Meteor.Collection.ObjectID(currentId), 'header.recipients': {$elemMatch: {userId: Meteor.userId()}}},
        {$set: {'header.recipients.$.status': 'dismissed'}}
      );

      Growl.notificationsDeps.changed();

    }, 1100);

  }
});

Template.growlNotifications.preserve({
  '.alert.growl[id]': function (node) { return node.id; }
});
