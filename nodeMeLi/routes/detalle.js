var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");


/* GET home page. */
 router.get('/api/items/:id', function(req, res, next) {
//   res.render('index', { title: 'Express' });

    //  res.json({"id":req.params.id});

     fetch("https://api.mercadolibre.com/items/"+req.params.id, { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'})
     .then(function (response) {
       return response.json();
     })
     .then( async function (resp) {
      var detalles =   await filtrarDetalles(resp);
      // console.log(detalles);
        res.json({'author':{'name': 'Juan Ignacio', 'lastname':'Narvaja'},"item":detalles});
     })
     .catch((e) => {
       console.log(e);
     })

    
});

async function obtenerDescripcion(id){
  var descripcion = await fetch("https://api.mercadolibre.com/items/"+id + "/description", { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'})
  .then(function (response) {
    return response.json();
  })
  .then( function (resp) {
   return resp.plain_text;
  })
  .catch((e) => {
    console.log(e);
  })
   return descripcion;
}
 async function filtrarDetalles(element){

        var description = await obtenerDescripcion(element.id);
        var aux = {
            "id": element.id,
            "title": element.title,
            "price": {
            "currency": element.currency_id,
            "amount": element.price,
            },
            "picture": element.pictures[0].url,
            "condition": element.condition,
            "free_shipping": element.shipping.free_shipping,
            "sold_quantity":element.sold_quantity,
            "description":description
          }
    return  aux;
}

module.exports = router;