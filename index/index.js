const rp = require("request-promise");
const axios = require("axios");

function sendMessageToWhatsapp(to, message, lat, lon) {
  let url = "http://ec2-3-93-217-26.compute-1.amazonaws.com:8000/send";
  let data = {
    to: to,
    message: message,
    lat: lat,
    lon: lon,
  };
  let confi = {
    headers: {
      Authorization: "Bearer zazzzz",
    },
  };

  axios.post(url, data, confi).then((response) => {
    console.log(response);
  });
}

function sendMessageToTelegram(chatId, message, lat, lon) {
  return rp({
    method: "POST",
    uri: `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendLocation`,
    form: {
      chat_id: chatId,
      text: message,
      latitude: lat,
      longitude: -122.5076402,
      parse_mode: lon,
    },
  });
}


console.log('Loading function');


exports.handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var processWhatsapp; 
    for (const { messageId, body } of event.Records) {
        var alerta = JSON.parse(body);
       if( typeof to != "undefined" && typeof id_Telegram != "undefined" ){
        if(typeof id_Telegram != "undefined"){
          sendMessageToWhatsapp(alerta.to, alerta.message, alerta.lat, alerta.lon);
        }
        if(typeof to != "undefined"){
          
          sendMessageToTelegram(alerta.id_Telegram, alerta.message, alerta.lat, alerta.lon);
        }
       }
       processWhatsapp = sendMessageToWhatsapp(alerta.to, alerta.message, alerta.lat, alerta.lon);
    }
    return true;
};



// exports.handler = (event) => {
//  const processTelegram = sendMessageToTelegram(event.id_Telegram, event.message);
//  return processTelegram;

//   const processWhatsapp = sendMessageToTelegram(
//      chat_id.to,
//     event.message,
//     event.lat,
//      event.lon
//    return processWhatsapp;
//  };
