import React from 'react'

const Kurssi = (props) => {
    return(
        <div>
            <Otsikko kurssi={props.kurssi.nimi} />
            <Sisalto osat={props.kurssi.osat} />
            <Yhteensa osat={props.kurssi.osat} />
        </div>
    )
}


const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi}</h1>
      </div>
  )
}

const Sisalto = (props) => {

  return (
    <div> 
      {props.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

 const Yhteensa = (props) => {
/*     const yht = props.osat.reduce(function (sum, osa){
        return sum + osa.tehtavia
    },0)  */

    const yht = props.osat.reduce((sum, osa) => sum + osa.tehtavia,0)

    return (
      <div>
        <p>Yhteensä {yht} tehtävää</p>
      </div>
      
  )
} 

const Osa = (props) => {
  //console.log(props)
  return (
    <div>  
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
  )
}

export default Kurssi