const { Expo } = require('expo-server-sdk');

const expo = new Expo();

async function sendNotification(expoPushToken, title, body, data = {}) {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.log('Invalid Expo push token');
    return;
  }

  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data,
  };

  try {
    await expo.sendPushNotificationsAsync([message]);
  } catch (error) {
    console.error('Push notification error:', error);
  }
}

module.exports = sendNotification;