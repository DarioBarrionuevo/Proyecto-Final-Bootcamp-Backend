use consumerPlatformApp
db.order.insert({user_name:"usuarioPepe",order_date:new Date(),
    paid:true,basket_id:"5f5757de20a67da5f8e2bde3",
    organization_id:"5f57507d8bc3ce1d627cc404"
})
db.order.find()