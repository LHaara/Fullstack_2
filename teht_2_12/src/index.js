import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Country = (props) => {

    // console.log(props.country.length)

    if(props.country.length === 1){

        return (

            props.country.map(maa => 
            <div key={maa.name}>   
            <h2>{maa.name}</h2>
            <p>capital: {maa.capital}</p>
            <p>population: {maa.population}</p>
            <img src={maa.flag} alt={maa.name} width="20%" ></img>            
            </div>
            )
     
        )

    }
    
    else if (props.country.length <= 10 ){
        return (
             props.country.map(maa =>
                 <div key={maa.name} onClick={() => props.handleclick(maa)}> {maa.name} </div>
                 )      
        )   

    }

    else {         
        return (
            <div>Too many matches, try more spesific filter</div>
        )   

    }    
    
}

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filter: ''
      }
    }
  
    componentDidMount() {
  
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
  
          this.setState({ countries: response.data })
        })
    }  

    handleFilter = (event) => {
      //console.log(event.target.value)
      this.setState({ filter: event.target.value })
    }

    handleclick = (maa) => {
        //document.getElementById("rajaus").value = maa.name
        console.log(maa.name)
        this.setState({ filter: maa.name })
    }
  
    render() {
   
      const rajaus = this.state.filter
      /* filteröidään maista ne joiden nimi sisältää merkkijonon "rajaus". 
      Nimi sekä rajaus muutetaan pieniksi kirjaimiksi, joten kirjainkoolla ei ole merkitystä  */
      const filtered = this.state.countries.filter(function (str) { return str.name.toLowerCase().includes(rajaus.toLowerCase()); });
        
      return (
        <div>
          <h2>Country information</h2>
          <div>
              find countries: <input id="rajaus" value={this.state.filter} onChange={this.handleFilter}/>
          </div>
          <br></br>
          <Country country={filtered} handleclick = {this.handleclick}/>
        </div>
      )
    }
 }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
