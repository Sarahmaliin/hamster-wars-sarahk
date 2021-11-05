import { useState } from "react"
import Galleri from "./Galleri"

const Overlay = (data: any) =>{

    const [ close, setClose ] = useState<boolean>(true)

    const hamster = data.x

    const CloseOverlay = () =>{
        setClose(false)
    } 

    return(
        <>
        {close ?  
            <section  className='.overlay'>
                <button onClick={() => CloseOverlay()}>X</button>
            {console.log(hamster.name)}
            <img src={`../img/${hamster.imgName}`} alt="hamster" />
            <p>Namn: {hamster.name}</p>
            <p>Ålder: {hamster.age}</p>
            <p>Älskar: {hamster.loves}</p>
            <p>Favoritmat: {hamster.faveFood}</p>
            <p>Spel: {hamster.games}</p>
            <p>Vinster: {hamster.wins}</p>
            <p>Förluster: {hamster.defeats}</p>
        
        </section> : null }</>
        
            )
}
export default Overlay