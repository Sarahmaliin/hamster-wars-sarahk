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

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters/random')
    const data = await response.json()
    saveData(data)
    console.log(data)
}

export default Tävla