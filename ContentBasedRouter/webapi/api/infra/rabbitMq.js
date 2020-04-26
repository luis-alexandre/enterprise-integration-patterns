const amqp = require('amqplib/callback_api');

module.exports = (systemId, message) => {
    
    amqp.connect(process.env.RABBITMQ_HOST || "amqp://localhost", function(error, connection){

        if(error){
            throw error;
        }

        connection.createChannel(function(errorChannel, channel){

            if(errorChannel){
                throw errorChannel;
            }

            let queue = process.env.INVENTORY_QUEUE || "inventory";

            channel.assertQueue(queue, {
                durable: false
            });

            console.log('------------------------------');
            console.log(`System:    ${systemId}`);
            console.log(`Message:   ${message}`);
            console.log('------------------------------');

            let options = { headers: { 'systemId': systemId }};
            channel.sendToQueue(queue, Buffer.from(message), options);
        })

        setTimeout(() => {
            connection.close();
        }, 500);
    });
}