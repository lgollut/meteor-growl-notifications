notificationSchema = new SimpleSchema({
  'header.type': {
    type: String,
  },
  'header.code': {
    type: Number,
    optional: true
  },
  'header.persistent': {
    type: Boolean,
    defaultValue: true
  },
  'header.recipients': {
    type: [Object],
    minCount: 1
  },
  'header.recipients.$.userId': {
    type: String,
  },
  'header.recipients.$.status': {
    type: String,
    defaultValue: 'displayed'
  },
  'body.title': {
    type: String,
  },
  'body.message': {
    type: String,
  },
  'parameters': {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Notifications = new Meteor.Collection('notifications', {
  schema: notificationSchema
});

