import { useEffect, useState } from 'react'
import { HamsterInfo } from '../models/HamsterInfo'
import FormHamster from './FormHamster'

const Galleri = () =>{


    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    return(
        <>
        
        < FormHamster />

        <section className="grid">
        {hamsterData ? hamsterData.map((hamster, index) =>(   
        <section className="infoCard" key={index}>
            <figure>
                <img className="infoCardImg" src={`../img/${hamster.imgName}`} alt="hamster profile" />
            </figure>
            <section className="container">
                <p >{hamster.name}</p>
                    <section className="buttons">
                        <button>ta bort</button>
                        <button>läs mer</button>
                    </section>
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