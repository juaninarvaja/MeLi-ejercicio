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
                        <h3>{detalles.title}</h3>
                        </Col>
                    </Row>

    
               
                </div>

                </Col>
                <Col xs={1}>
                </Col>
            </Row>
        </Grid>
      
        </>)
  
  
}

export default Detalles;