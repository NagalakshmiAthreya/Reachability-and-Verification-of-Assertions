const mqtt = require('mqtt');

function publishUnknownPersonStatus() {
    const client = mqtt.connect('mqtt://localhost:1883');
    const statuses = ['yes', 'no'];
    
    client.on('connect', () => {
        console.log('Connected to MQTT broker for unknown person detector');
        
        setInterval(() => {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            client.publish('unknown_person_status', status);
            console.log('Published unknown person status:', status);
        }, 10000); // Publish status every 10 seconds
    });
}

publishUnknownPersonStatus();
