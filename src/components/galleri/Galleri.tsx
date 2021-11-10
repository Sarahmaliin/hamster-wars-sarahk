import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'
import './Galleri.css'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)


    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

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
        
        <li className="card infoCard" key={index}>
           
            <figure>
                <img className="card-image infoCardImg" src={`../img/${hamster.imgName}`} alt="hamster profile" />
                <p className='card-title'>{hamster.name}</p> 
            </figure>
            <section className='card-overlay'>
                <section className='card-description'>
                    <p >Ålder: {hamster.age}</p>
                    <p >Älskar att: {hamster.loves}</p> 
                    <p >Favoritmat: {hamster.favFood}</p>
                    <p >Spelade spel: {hamster.games}</p>
                    <p >Vinster: {hamster.wins}</p>
                    <p >Förluster: {hamster.defeats}</p>       
                </section>  
            </section>
            <section className="buttons">
                <section onClick={() => DeleteOne(hamster.id)} className='trashcan'></section>
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