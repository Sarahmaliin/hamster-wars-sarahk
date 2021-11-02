import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"
import FirstHamster from "./FirstHamster"
import SecondHamster from "./SecondHamster"

//Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.
const Tävla = () =>{
    
    return(
        <section>
            <h1>Hamster vs Hamster</h1>
        
            <section>
                < FirstHamster />
            </section>
            <section>
                < SecondHamster />
            </section>
        </section> 

    )
}



export default Tävla