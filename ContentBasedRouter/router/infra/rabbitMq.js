const amqp = require('amqplib/callback_api');
const EventEmitter = require('events');

module.exports = () => {

    let eventEmitter = new EventEmitter();

    amqp.connect(process.env.RABBITMQ_HOST || "amqp://localhost", function(error, connection){
        
        if(error){
            throw error;
        }

        connection.createChannel(function(errorConnection, channel){

            if(errorConnection){
                throw errorConnection;
            }

            let queue = process.env.INVENTORY_QUEUE || "inventory";

            channel.assertQueue(queue, {
                durable: false
            });

            channel.consume(queue, function(message){
                eventEmitter.emit('message', message.content, message.properties.headers);
            }, {
                noAck: true
            });

        });
    });
}