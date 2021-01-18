import React,{useState} from 'react';
import {  Grid ,  Row ,  Col  } from 'react-flexbox-grid' ; 

function Busqueda() {

    let [query, setQuery] = useState("");


    const buscar=( )=>{
        console.log("buscando " + query );
      }

  return (
    <div className="barra-superior">
      <Grid>
        <Row className="rowCabecera">
        
          <Col xs={2}  onClick={event =>  window.location.href='/'} >
            <div >
              <img className= "imagen-meli" src="/assets/meli.png"></img>
            </div>
 
          </Col>
          <Col xs={9}>
          <Row>
          <Col> 
          <input type="text" className= "input-search" placeholder="Nunca dejes de buscar"  onChange = {(e) => {setQuery(e.target.value)}}
           onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              buscar();
            }
          }}></input>
          
         </Col> 
          <Col> <div className= "div-lupa" onClick={event => buscar()}><img className= "imagen-lupa" src="/assets/lupa.png"></img></div> </Col>
          </Row>
          </Col>
          
        </Row>
      </Grid>
      </div>
  );
}

export default Busqueda;