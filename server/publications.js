Meteor.publish('notifications', function() {
  return Notifications.find({'header.recipients': {$elemMatch: {userId: this.userId}}});
})
