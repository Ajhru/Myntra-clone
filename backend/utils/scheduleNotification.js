const sendNotification = require('./sendNotification');

function scheduleCartReminder(expoPushToken) {
  // 6 hours delay
  setTimeout(() => {
    sendNotification(
      expoPushToken,
      'Cart Reminder 🛒',
      'You left items in your cart. Complete your order now!',
      { screen: '/bag' }
    );
  }, 1000 * 60 * 60 * 6);
}

module.exports = scheduleCartReminder;