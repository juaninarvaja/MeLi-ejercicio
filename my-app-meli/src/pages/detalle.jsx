import React,{useState, useEffect} from 'react';
import {  Grid ,  Row ,  Col  } from 'react-flexbox-grid' ;
import { useParams  } from 'react-router-dom'; 
import Busqueda from '../components/busqueda';
import ItemBusqueda from '../components/itemBusqueda';

function Detalles() {
    let { id } = useParams(); 

    let [detalles, setDetalles] = useState([]);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const busqueda = params.get('search');

    useEffect(() => {
        fetch("http://localhost:3000/api/items/"+id, { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'})
     .then(function (response) {
       return response.json();
     })
     .then(function (resp) {
       //hacer breadcrumb
        setDetalles(resp.item);
     
     })
     .catch((e) => {
       console.log(e);
     })
    },[])

  return (<>
        <Busqueda/>
        <Grid>
            <Row>
                <Col xs={1}>
                </Col>
                <Col xs={10}>
                <div className="div-detalles">
                    <Row>
                        <Col xs={9}>
                        <div >
                        <img className= "imagen-detalle" src={detalles.picture}></img>
                         </div>
                        </Col>
                        <Col xs={3}>
                            {detalles.condition === "new" && <h6 className="detalle-estado-vendidos">Nuevo - {detalles.sold_quantity} vendidos</h6>}
                            {detalles.condition === "used" && <h6 className="detalle-estado-vendidos">Usado - {detalles.sold_quantity} vendidos</h6>}
                            <h3 className="detalle-titulo">{detalles.title}</h3>
                            {detalles?.price?.currency === "ARS" &&  <h2 className="detalle-precio">$ {detalles?.price?.amount}</h2>} 
                            {detalles?.price?.currency === "USD" &&  <h2 className="detalle-precio">U$S{detalles?.price?.amount}</h2>}
                            <button className="boton-comprar ">Comprar</button> 
                        </Col>
                    </Row>
                    <div className="div-detalle-descripcion">
                    {detalles?.description?.split('\n').map((item,key) => (
                            (key === 0) ? (<h2 className="detalle-descripcion-titulo" key={key}>{item}</h2>) :  (<h5 key={key} className="detalle-descripcion-cuerpo">{item}</h5>)
 
                            ))}
                            </div>
    
               
                </div>

                </Col>
                <Col xs={1}>
                </Col>
            </Row>
        </Grid>
      
        </>)
  
  
}

export default Detalles;