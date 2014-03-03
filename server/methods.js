Meteor.methods({
  growlInsert: function(notification) {
    Notifications.insert(notification, function(error, result) {
      if(error) {
        console.log(error);
      }
    });
  },

  growlUpdate: function(selector, modifier) {
    Notifications.update(selector, modifier, function(error, result) {
      if(error) {
        console.log(error);
      }
    });
  },

  growlRemove: function(selector) {
    Notifications.remove(selector, function(error, result) {
      if(error) {
        console.log(error);
      }
    });
  }
});
