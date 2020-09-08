use consumerPlatformApp
db.basket.insertMany([{format:"Big",content:"Naranjas 1kg,patatas 2kg,berenjenas 1kg, lechuga 0.5kg",active:false,creation_date:new Date(),stock:20},
{format:"Small",content:"tomates 2kg,fresas 1kg",active:true,creation_date:new Date(),stock:50},
{format: "Others",content:"Queso 1kg, cerveza artesanal 2l",active:false,creation_date:new Date(),stock:10}
])
db.basket.find()