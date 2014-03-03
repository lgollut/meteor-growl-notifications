Template.notificationCenterIcon.helpers({
  notificationNumber: function() {
    return Notifications.find().count();
  }
});

Template.notificationCenter.helpers({
  notifications: function() {
    return Notifications.find().fetch();
  },
  idToString: function(id) {
    return id._str;
  }
});

Template.notificationCenter.events({
  'click .notification-delete': function(e) {
    e.preventDefault();
    Meteor.call('growlRemove', {_id: new Meteor.Collection.ObjectID(e.target.id)});
  }
})
