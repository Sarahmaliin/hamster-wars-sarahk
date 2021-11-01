import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    const readMore = (id: string) =>{
        console.log('click', id)
    }

    const deleteMethod = {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json;charset=UTF-8',
            },
    }

    async function DeleteOne (id: string) {
        await fetch(`/hamsters/${id}`, deleteMethod)
        window.location.reload();
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
                        <button onClick={() => DeleteOne(hamster.id)} className='trashcan'></button>
                        <button onClick={() => readMore(hamster.id)}>läs mer</button>
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
}

export default Galleri