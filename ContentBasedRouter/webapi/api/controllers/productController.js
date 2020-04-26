const rabbitmq = require('../infra/rabbitMq');

function sendMessage(systemId, message){

    let response = {status: true};

    try {
     
        let msg = JSON.stringify(message);
        rabbitmq(systemId, msg);
        
    } catch (error) {
        console.log(error);
        response.status = false;
    }

    return response;
};

module.exports = sendMessage;