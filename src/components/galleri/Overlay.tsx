import { useState } from "react"
import Galleri from "./Galleri"

const Overlay = (data: any) =>{

    const [ close, setClose ] = useState<boolean>(true)

    const hamster = data.x

    const CloseOverlay = () =>{
        setClose(false)
        window.location.reload()
    } 

    return(
        <>
        {close ?  
            <section  className='overlay'>
                <p onClick={() => CloseOverlay()}>X</p>
            {console.log(hamster.name)}
            <section className='overlay-info'>
            <figure className='overlay-figure'>
                <img src={`../img/${hamster.imgName}`} alt="hamster" />
            </figure>
            <article className='overlay-text'>
            <p>Namn: {hamster.name}</p>
            <p>Ålder: {hamster.age}</p>
            <p>Älskar: {hamster.loves}</p>
            <p>Favoritmat: {hamster.faveFood}</p>
            <p>Spel: {hamster.games}</p>
            <p>Vinster: {hamster.wins}</p>
            <p>Förluster: {hamster.defeats}</p>
            </article>
            </section>
        </section> : null }</>
        
            )
}
export default Overlay