import React,{useState, useEffect} from 'react';
import {  Grid ,  Row ,  Col  } from 'react-flexbox-grid' ; 

function Busqueda({historial}) {

    let [query, setQuery] = useState("");

    useEffect(() => {
        if(historial !== "" && historial !== undefined){
            setQuery(historial);
        }
    
    },[])


    const buscar=( )=>{
        if(query !== ""){
            console.log("buscando " + query );
             window.location.href = '/items?search=' + query;
        
        }
        
      }

  return (
    <div className="barra-superior">
      <Grid>
        <Row className="rowCabecera">
        
          <Col xs={1} className= "div-imagen-meli" onClick={event =>  window.location.href='/'} >
           
              <img className= "imagen-meli" src="/assets/meli.png" alt="Logo mercado Libre"></img>
           
 
          </Col>
          <Col xs={11}>
          <Row>
          <Col> 
          <input type="text" className= "input-search" placeholder="Nunca dejes de buscar"  value={query} onChange = {(e) => {setQuery(e.target.value)}}
           onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              buscar();
            }
          }}></input>
          
         </Col> 
          <Col> <div className= "div-lupa" onClick={event => buscar()}><img className= "imagen-lupa" alt="Lupa de busqueda" src="/assets/lupa.png"></img></div> </Col>
          </Row>
          </Col>
          
        </Row>
      </Grid>
      </div>
  );
}

export default Busqueda;