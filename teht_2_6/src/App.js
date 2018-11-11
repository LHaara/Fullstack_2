import React from 'react';
import Person from './components/Person'
import Addperson from './components/Addperson'
import Notification from './components/Notification'
import personService from './services/persons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [/* 
        { name: 'The Dude', number: '1507-715517' },
        { name: 'Dr. Strangelove', number: '1507-715517' },
        { name: 'Dr. Jones', number: '1507-715517' },
        { name: 'Dr. Strange', number: '1507-715517' }
       */],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService
    .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()

/*     personService
    .getAll()
      .then(response => {
        this.setState({ persons: response })
      }) */

    const uPerson = this.state.persons.find(n => n.name === this.state.newName)

    if (uPerson === undefined)
    {
      const personObject = {
        name : this.state.newName,
        number: this.state.newNumber
      }
  
      personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          message: `lisättiin  '${this.state.newName}'`
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 2000)
      })

    }
    else if (window.confirm("Henkilö " + this.state.newName +" on jo luettelossa, päivitetäänkö numero?"))
    {
      const changedPerson = {
        name : this.state.newName,
        number: this.state.newNumber
      }

      personService
      .update(uPerson.id, changedPerson)
      .then(changedPerson => {
        const persons = this.state.persons.filter(n => n.id !==uPerson.id)
        this.setState({
          persons: persons.concat(changedPerson),
          message: `muutettiin henkilön  '${this.state.newName}' puhelinnumero`

        })
        setTimeout(() => {
          this.setState({message: null})
        }, 2000)
      })
      .catch(error => {
        personService
        .create(changedPerson)
        .then(newPerson => {
          const persons = this.state.persons.filter(n => n.id !==uPerson.id)
          this.setState({
            persons: persons.concat(newPerson),
            newName: '',
            newNumber: '',
            message: `lisättiin  '${this.state.newName}'`
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 2000)
        })

      })

    }
  
  }

  deletePerson = (id) => {
    return () => {
      const person = this.state.persons.find(n => n.id === id)
      if(window.confirm("poistetaanko "+person.name)){

          //luodaan kopio henkilöistä ilman poistettavaa
          const persons = this.state.persons.filter(str => str.id !== id)
          personService
          .del(id)
    /*        .then(response => {
    
          })  */
          this.setState({
            persons,
            message: `poistettiin  '${person.name}'`
          }) 
          setTimeout(() => {
            this.setState({message: null})
          }, 2000)
      }

    }

  }

  handleNameChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  handleFilter = (event) => {
    //console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
 
    const rajaus = this.state.filter
    /* filteröidään henkilöistä ne joiden nimi sisältää merkkijonon "rajaus". 
    Nimi sekä rajaus muutetaan pieniksi kirjaimiksi, joten kirjainkoolla ei ole merkitystä  */
    const filtered = this.state.persons.filter(function (str) { return str.name.toLowerCase().includes(rajaus.toLowerCase()); })


    return (
      <div>
        <h2>Puhelinluettelo</h2>
          <Notification message={this.state.message}/>

          <Addperson addPerson = {this.addPerson} newName = {this.state.newName} handleNameChange = {this.handleNameChange}
          newNumber = {this.state.newNumber} handleNumberChange = {this.handleNumberChange}/>

        <h2>Numerot</h2>

            rajaa: <input value={this.state.filter} onChange={this.handleFilter}/>

        <br></br>

        <table>
        <tbody>
          {filtered.map(person =>
             <Person
                key={person.name}
                person={person}
                delete={this.deletePerson(person.id)}
              />
          )}
        </tbody>
        </table>

      </div>
      
    )
  }
}

export default App