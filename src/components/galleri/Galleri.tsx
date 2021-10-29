import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'

const Galleri = () =>{


    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    const readMore = (index: number) =>{
        console.log('click',)
    }

    return(
        <>
        
        < FormHamster />

        <ul className="grid">
        {hamsterData ? hamsterData.map((hamster, index) =>(   
        <li className="infoCard" key={index}>
            <figure>
                <img className="infoCardImg" src={`../img/${hamster.imgName}`} alt="hamster profile" />
            </figure>
            <section className="container">
                <p >{hamster.name}</p>
                    <section className="buttons">
                        <button className='trashcan'></button>
                        <button onClick={() => readMore(index)}>läs mer</button>
                    </section>
            </section>      
        </li>
        ))
        :
        'Loading data'
        } 
    </ul>
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