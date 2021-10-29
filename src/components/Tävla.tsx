import { useEffect, useState } from "react"
import { HamsterInfo } from "../models/HamsterInfo"

//Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.
const Tävla = () =>{

    const [saveRandom, setSaveRandom] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setSaveRandom)
    }, [])

    console.log(saveRandom)
    return(
        <section>
            <h1>Hamster vs Hamster</h1>
        
            <section>
                random hamsters
            </section>
        </section> 

    )
}

async function sendRequest(saveRandom: any){
    const response = await fetch ('/hamsters/random')
    const data = await response.json()
    saveRandom(data)
}

export default Tävla