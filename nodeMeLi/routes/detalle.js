var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");


 /**
  * Esta api devuelve los detalles del item del cual erecibe su id por parametro
  * 
  */
 router.get('/api/items/:id', function(req, res, next) {


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


/**
 * Esta funcion consulta la descripcion a otra url mientras corre el programa 
 * @param {*} id el id del item para poder consultar su descripcion
 * @returns retorna la descripcion del item coincidente con el  id brindado
 */
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

/**
 * Esta funcion recibe un elemento item y filtra los parametros que son necesarios para la resolucion del ejercicio
 * @param {*} element Un elemento item   tal como lo devuelve la api
 * @returns retorna un JSON con la informacion del detalle del item
 */
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