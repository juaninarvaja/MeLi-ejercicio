import React,{useState, useEffect} from 'react';
import {  Grid ,  Row ,  Col  } from 'react-flexbox-grid' ; 

function ItemBusqueda({item}) {

    let [query, setQuery] = useState("");




    const buscar=( )=>{
        if(query !== ""){
            console.log("buscando " + query );
             window.location.href = '/items?search=' + query;
        
        }
        
      }

      

  return (
      <Grid className= "div-items" onClick={event =>  window.location.href='/items/' + item.id}>
        
        <Row  center="xs">
       
          <Col xs={3} >
            <div >
              <img className= "imagen-item" src={item.picture}></img>
            </div>
          </Col>
          <Col className="div-item-informacion" xs={8}>
              <Row>
                  
                  <Col xs={2} >
                  {item.price.currency === "ARS" &&  <h2 className="item-precio">$ {item.price.amount}</h2>} 
                  {item.price.currency === "USD" &&  <h2 className="item-precio">U$S{item.price.amount}</h2>} 
                    </Col>
                  <Col xs={1}> <div className= "div-imagen-envio" ><img className= "imagen-envio" src="/assets/envio.png"></img></div></Col>
                  <Col xs={6}></Col>
                  <Col xs={3}><h5 className= "estado-ventedor-item">{item.state}</h5></Col>
              </Row>
          <h4 className="item-titulo">{item.title}</h4>
          

          </Col>
          
         </Row>
         <hr className="hr-items"></hr>
      </Grid>
  );
}

export default ItemBusqueda;