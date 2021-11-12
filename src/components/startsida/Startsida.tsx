import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HamsterInfo } from "../../models/HamsterInfo"
import './startsida.css'

const Startsida = () =>{

    const [ leader, setLeader ] = useState<HamsterInfo[] | null>(null)
    const [errorMsg, setErrorMsg ] = useState<string>('')

    useEffect(() =>{
        sendRequest(setLeader)
    }, [])

    return(
        <section className='frontPage'>
            <section className='landingSection'>
                <article className='textSection'>
                <h1>Välkommen till Hamster Wars</h1>
                    <p>Det här är ett spel för unga som gamla, djurälskare men framförallt hamsterälskare. </p> 
                    <p>Hur spelet går till?</p>
                    <p>Just nu befinner du dig på startsidan. I övre högra hörnet har du din meny. 
                    I nästa flik som vi kallar "Tävla" kommer två hamstrar att slumpas fram. Det är då upp till dig att rösta vilken hamster som är sötast. När du har rösat sparas status i vårt system och den hamster/de hamstrar med högst betyg presenteras här på startsidan. </p>
                    <p>Du har även möjlighet att ta bort och lägga till dina egna hamstrar i tävlingen via plusset i <Link to='/Galleri'>galleriet</Link>. </p>
                    <section className='loadGame'>
                        <button className='loadGameBtn'> <Link to='/Tävla'> Börja spela</Link> </button>
                    </section>
                </article>
                <aside>
                    <p>1:a platsen: </p>
                    <ul>
                        {leader ? leader.map((lead, index) =>(
                            <li key={index}>{lead.name} med {lead.wins} {lead.wins > 1 ? 'vinster': 'vinst'}</li>
                        ))
                        : 
                        <p className='errorMessages'>{errorMsg}</p> }
                    </ul>
                </aside>
            </section>
        </section>
    )


async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters/cutest')
    if (response.status >= 400 && response.status < 600) {
        setErrorMsg('Kunde inte hämta ledaren, vänligen försök uppdatera sidan.')
    }
    const data = await response.json()
    saveData(data)
}
}
export default Startsida