use consumerPlatformApp
db.organization.insert({name:"cestas sin fronteras",adress:"Plaza Espa�a 3",
    cif:"B-12345678",email:"csf@cestas.com",phone_number:"676234421",
    user_name:"cestasSinFron",password:"passwordSinFron",
    delivery_points:["Mas 100, 08905","Plaza catalu�a 23, 08908"]
    })
db.organization.find()