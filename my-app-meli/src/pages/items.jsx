import React,{useState, useEffect} from 'react';
import { Row ,  Col  } from 'react-flexbox-grid' ;

import Busqueda from '../components/busqueda';
import ItemBusqueda from '../components/itemBusqueda';

function Items() {


    let [items, setItems] = useState([]);
    let [categorias, setCategorias] = useState([]);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const busqueda = params.get('search');

    useEffect(() => {
        fetch("http://localhost:3000/api/items?q="+busqueda, { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'})
     .then(function (response) {
       return response.json();
     })
     .then(function (resp) {
       //hacer breadcrumb
       setCategorias(resp?.categories)
        setItems(resp?.items);
     
     })
     .catch((e) => {
       console.log(e);
     })
    },[])

  return (<>
        <Busqueda historial = {busqueda}/>
        <Row center="xs">
        <Col xs={10}>
        <div className="div-breadcrumb">
        {categorias.map((item,key) => (
          
          (key !== categorias.length-1) ? (<label className="breadcrumb" key ={key} >{item} {'>'} </label>) :  (<label className="breadcrumb" key ={key} >{item} </label>)
 
                            ))}
                            </div>
        </Col>
        </Row>
        {items.map((item,key) => (
          <ItemBusqueda  key ={key} item={item}/>
 
                            ))}
        </>)
  
  
}

export default Items;