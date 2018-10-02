import firebase, { RNFirebase } from "react-native-firebase";
import {
  Notification,
  NotificationOpen
} from "react-native-firebase/notifications";

enum Channels {
  default
}
interface ChannelData {
  id: string;
  title: string;
  desc: string;
  prio: RNFirebase.notifications.Android.Importance;
}
class NotificationService {
  constructor() {
    const channelData = this.getChannelData(Channels.default);
    const channel = new firebase.notifications.Android.Channel(
      channelData.id,
      channelData.title,
      channelData.prio
    ).setDescription(channelData.desc);

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  getChannelData(channelId: Channels): ChannelData {
    switch (channelId) {
      case Channels.default:
        return {
          id: "default",
          title: "Default",
          desc: "Default Channel for Time Manager",
          prio: firebase.notifications.Android.Importance.Max
        };
    }
  }

  async hasPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      return enabled;
    } else {
      try {
        const gave = await firebase.messaging().requestPermission();
        return gave;
      } catch (error) {
        return false;
      }
    }
  }

  async fireNotification(
    id: string,
    title: string,
    body: string,
    channelID: Channels = Channels.default
  ) {
    if (await this.hasPermission()) {
      const notification = this.buildNotifcation(id, title, body, channelID);
      firebase.notifications().displayNotification(notification);
    }
  }

  async scheduleCategoryDoneNotification(
    id: string,
    category: string,
    date: Date
  ) {
    this.scheduleNotification(
      id,
      "Zeit erreicht",
      `Glückwunsch. Du hast die erforderliche Zeit für die Kategorie ${category} erreicht.`,
      date
    );
  }

  async cancelNotificationIfExists(id: string) {
    const notifications = await firebase
      .notifications()
      .getScheduledNotifications();
    const notification = notifications.find(n => n.notificationId === id);
    if (notification) {
      firebase.notifications().cancelNotification(id);
      console.log("Cancelled", id);
    }
  }

  async scheduleNotification(
    id: string,
    title: string,
    body: string,
    date: Date,
    channelID: Channels = Channels.default
  ) {
    if (await this.hasPermission()) {
      const notification = this.buildNotifcation(id, title, body, channelID);
      firebase.notifications().scheduleNotification(notification, {
        fireDate: date.getTime()
      });
      console.log("Scheduled", `${title} with ${id} for ${date.toISOString()}`);
    }
  }

  buildNotifcation(
    id: string,
    title: string,
    body: string,
    channelID: Channels = Channels.default
  ) {
    const channelData = this.getChannelData(channelID);
    const notification = new firebase.notifications.Notification()
      .setNotificationId(id)
      .setTitle(title)
      .setBody(body)
      .android.setChannelId(channelData.id);
    return notification;
  }

  /**
   * Check if app was started by an notification
   */
  async handleInitialNotification() {
    const notificationOpen: NotificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      console.log("Initial Notification", notification.title);
      firebase
        .notifications()
        .removeDeliveredNotification(notification.notificationId);
    }
  }

  /**
   * Received an notification which was not displayed --> Display it
   * E.g. Scheduled notification when app is active
   */
  getNotificationListener() {
    return firebase
      .notifications()
      .onNotification((notification: Notification) => {
        // Process your notification as required
        console.log("onNotification", notification.title);
        notification.android.setChannelId("default");
        firebase.notifications().displayNotification(notification);
      });
  }

  /**
   * App was Opened by an notification --> Remove it (from the notification bar)
   */
  getNotificationOpenedListener() {
    return firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log("onNotificationOpened", notification.title);
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
  }

  /**
   * Notification was displayed
   */
  getNotificationDisplayedListener() {
    return firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        console.log("onNotificationDisplayed", notification.title);
      });
  }
}

let _service: NotificationService;

function getInstance() {
  if (!_service) {
    _service = new NotificationService();
  }
  return _service;
}

export default getInstance();
