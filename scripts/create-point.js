function populateUFs() {
  const ufSelect = document.querySelector( " select[ name = uf ] " )

  fetch( " https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome " )
    .then( res => res.json() )
    .then( states => {
     
      for( state of states ) {
        ufSelect.innerHTML += `<option value = " ${ state.id } "> ${ state.nome }</option>` //tem q ser crase
      }

    } )
}

populateUFs()


function getCities( event ) {
  const citySelect = document.querySelector( " select[ name = city ] " )
  const stateInput = document.querySelector( " input[ name = state ] " )

  const ufValue = event.target.value
  
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome"`
  
  fetch( url )
  .then( res => res.json() )
  .then( cities => {
    
    for(  const city of cities ) {
      citySelect.innerHTML += `<option value = " ${ city.id } "> ${ city.nome }</option>` //tem q ser crase
    }
    
    citySelect.disabled = false
  } )
}

document
  .querySelector( "select[name=uf]" )
  .onchange = getCities
  // .addEventListener( "change", getCities ) //só funciona no Chrome