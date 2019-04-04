const mqtt = require('mqtt');
const tallinn_poll = require('./tallinn_poll.js');
const mqtt_publisher = require('./mqtt_publisher.js');

class RTDataSync {
  constructor(port) {
    this.port = port;
    this.clientUrl = 'mqtt://localhost:' + this.port;
    let opts = {
      username: 'publisher',
      password: 'Th1s1sThePassw0rd!'
    };
    this.mqttClient = mqtt.connect(this.clientUrl, opts);
  }

  syncTallinn() {
    console.log('Syncing Tallinn RT data to mqtt client ' + this.clientUrl);
    new tallinn_poll.TallinnPollClient(this.handle_event, {mqttClient: this.mqttClient}).connect();
  };

  handle_event(path, msg, args) {
    let topic = mqtt_publisher.to_mqtt_topic(msg);
    let message = mqtt_publisher.to_mqtt_payload(msg);
    args.mqttClient.publish(topic, JSON.stringify(message), function (err) {
      if (err) {
        console.log('Error happened when publishing: ' + err);
      }
    });
  };
}

module.exports.RTDataSync = RTDataSync;


