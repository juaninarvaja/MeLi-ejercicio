var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");


/**
 * Esta api recibe por query una consulta,
 *  la busca en MeLi y retorna los 4 primeros resultados (solo con los datos pedidos)
 */

router.get('/api/items', function(req, res, next) {

     fetch("https://api.mercadolibre.com/sites/MLA/search?q="+req.query.q, { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'})
     .then(function (response) {
       return response.json();
     })
     .then(function (resp) {
        //generar info para breadcrumb
        var categorias= obtenerCategorias(resp.filters);
      //filtrar 4
       //buscar solo lo que me piden
        var items = filtrarItems(resp.results) 
     
        res.json({'author':{'name': 'Juan Ignacio', 'lastname':'Narvaja'},'categories':categorias,'items':items});
     })
     .catch((e) => {
       console.log(e);
     })
     .finally(() => {
       // console.log(listaPedidos);
      });
    
});
/**
 * ESta funcion recibe los filtros y los ordena en un arreglo de mas general a mas especifico
 * @param {*} filtros  el filtro con mas resultados de la busqueda realizada
 * @returns retorna un arreglo de String, q representan los filtros
 */
function obtenerCategorias(filtros){
    // console.log(filtros);
    var categorias = [];
    if(filtros[0] !== undefined){
        // console.log(filtros[0].values);
        filtros[0].values[0].path_from_root.forEach(categoria => {
            
            categorias.push(categoria.name);
        });

    }
    return categorias;
}

/**
 * Esta funcion recibe un array de items, recorta los primeros 4  yfiltra los parametros que son necesarios
 * @param {*} results Los resultados de la respuesta de la api 
 * @returns retorna un arreglo de JSONs con la informacion de cada item
 */
function filtrarItems(results){

    var arrayItems = [];
    results.slice(0,4).forEach(element => {
        var aux = {
            "id": element.id,
            "title": element.title,
            "price": {
            "currency": element.currency_id,
            "amount": element.price,
            },
            "picture": element.thumbnail,
            "condition": element.condition,
            "free_shipping": element.shipping.free_shipping,
            "state": element.address.state_name
        }
        arrayItems.push(aux);
    });
    return arrayItems;
}

module.exports = router;