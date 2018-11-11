import React from 'react'

const Addperson = (props) => {
    return (
      <div>
           <form onSubmit={props.addPerson}>
            <div>
              nimi: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
              numero: <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
      </div>
    )
  }
  
export default Addperson