import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"
import './startsida.css'

const Startsida = () =>{

    const [ leader, setLeader ] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setLeader)
    }, [])

    return(
        <section className='landingSection'>
            <article className='textSection'>
            <h1>Välkommen till Hamster Wars</h1>
            
                <p>Det här är ett spel för unga som gamla, djurälskare men framförallt hamsterälskare. </p> 
                <br/>
                <p>Hur spelet går till?</p>
                <p>Just nu befinner du dig på startsidan. I övre högra hörnet har du din meny. 
                I nästa flik som vi kallar "Tävla" kommer två hamstrar att slumpas fram. Det är då upp till dig att rösta vilken hamster som är sötast. När du har rösat sparas status i vårt system och den/de hamster/hamstrar med högst betyg presenteras här på startsidan. </p>
                <br/>
                <p>Du har även möjlighet att ta bort och lägga till dina egna hamstrar i tävlingen. </p>
            </article>
            <aside>
                <p>1:a platsen just nu: </p>
            
                <ul>
                    {leader ? leader.map((lead, index) =>(
                        <li key={index}>{lead.name} med {lead.wins} vinster</li>
                    )): null}
                </ul>
            </aside>
        </section>
        
    )
}

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters/cutest')
    const data = await response.json()
    saveData(data)
}

export default Startsida