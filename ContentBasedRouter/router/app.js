const rabbitMq = require('./infra/rabbitMq');
const EventEmitter = require('events');

let eventEmitter = new EventEmitter();

eventEmitter.on('message', (content, headers) =>{
    console.log(content);
    console.log(headers);
});

rabbitMq();