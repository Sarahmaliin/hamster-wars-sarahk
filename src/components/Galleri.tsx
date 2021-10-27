import { useEffect, useState } from 'react'
import { HamsterInfo } from '../models/HamsterInfo'

const Galleri = () =>{


    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    return(
        <>
        <h1>Galleri sida</h1>
        <section className="grid">
         {hamsterData ? hamsterData.map((hamster, index) =>(
             <section className="infoCard" key={index}>
                 <img src='' alt="hamster profile" />
                <h2 >{hamster.name}</h2>
                <section className="buttons">
                    <button>ta bort</button>
                    <button>läs mer</button>
                </section>
             </section>
        ))
        :
        'Loading data'
        } 
    </section>
    </>
    )
}

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters')
    const data = await response.json()
    saveData(data)
    console.log(data)
}

export default Galleri