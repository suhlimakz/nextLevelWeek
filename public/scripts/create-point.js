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
  
  /*limpa o campo cidade a cada mudança de estado*/
  citySelect.innerHTML = "<option value > Selecione a cidade </option> "  
  citySelect.disabled = true
  
  fetch( url )
  .then( res => res.json() )
  .then( cities => {
    
    for(  const city of cities ) {
      citySelect.innerHTML += `<option value = " ${ city.nome } "> ${ city.nome }</option>` //tem q ser crase
    }
    
    citySelect.disabled = false
  
  } )
}

document
  .querySelector( "select[name=uf]" )
  .onchange = getCities
  // .addEventListener( "change", getCities ) //só funciona no Chrome

//itens de coleta

const itemsToColected = document.querySelectorAll( ".items-grid li" )

for( item of itemsToColected ) {
  item.addEventListener( "click", handleSelectedItem )
}

const collectedItems = document.querySelector( "input[name = items ]" )

let selectedItems = []

function handleSelectedItem( event ) {
  const itemLi = event.target
  
  // itemLi.classList.add( "selected" ) //adiciona classe
  // itemLi.classList.remove( "selected" ) // remove classe
  
  itemLi.classList.toggle( "selected" ) // add e remove classe

  const itemId = itemLi.dataset.id
 
  /* verificar se existem itens selecionados, se sim
  pegar os itens selecionados */

  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId
    return itemFound
  } )

  /* se já estiver selecionado, tirar da seleção*/

  if( alreadySelected >= 0 ) {
   //remover selecão

    const filteredItems = selectedItems.filter( item => {
      const itemsIsDifferent = item != itemId
      return itemsIsDifferent
    })
  
    selectedItems = filteredItems
  } else {
    /* se não estiver selecionado, adicionar a selecão */ 
    selectedItems.push( itemId )
  }
  
  /* atualizar o campo escondido com os itens selecionados */
  collectedItems.value = selectedItems
}

  
