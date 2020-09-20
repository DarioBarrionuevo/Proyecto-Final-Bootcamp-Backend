const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
var fs = require('file-system');



// MAIN
module.exports = {
    sendEmail:  async function (req, res) {
            // All data from de body
            const allInfo = req.body;
            console.log('allInfo',allInfo);
            // Email to
            // const emailInfo = req.body.organization_email;
            
           // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'BasketsConsumerPlatform@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
            });

            // Creating the mail with the body
            var mailOptions = {
            from: 'BasketsConsumerPlatform@gmail.com',
            to: `${allInfo.organization_email}`,
            subject: 'Solicitud de pedido desde Consumer Platform App!',
            // plaintext body
            // text: 'Hello to myself!',

            // HTML body
            html: `<h1>Hola ${allInfo.organization_name}</h1>
                <p>Esto es una la solicitud de pedido de la cesta ${allInfo.basket._id}</p>
                <p>Tipo de cesta: ${allInfo.basket.format}</p>
                <p>Contenido de la cesta: <br> ${allInfo.basket.content}</p>
                <p>Precio de la cesta: ${allInfo.basket.price} €</p>
                <p>Esta solicitud ha sido realizada por el usuario ${allInfo.name} ${allInfo.surname1} ${allInfo.surname2}</p>
                <p>Telefono: ${allInfo.phone_number}</p>
                <p>Email: ${allInfo.email}</p>
                <p>Para recoger en ${allInfo.deliveryPoint}</p>
                <hr>
                <h2>Foto de transferencia bancaria</h2>

                
                <img src="${allInfo.picture}" alt="Esto que e lo que eeee">

                <hr>
                <h2>Recuerda confirmar al usuario el pedido y el dia de recogida <br>
                    !Muchas gracias por contar con nosotros¡</h2>`,
            attachments: [{   // stream as an attachment
            filename: 'image.jpg',
            contents: new Buffer(allInfo.picture, 'base64')
        }]
            };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.send(info)
  }
});






        // transporter.verify(function(error, success) {
        //     if (error) {
        //     console.log(error);
        //     } else {
        //     console.log('Server is ready to take our messages');
        //     }
        // });


            



    }
}