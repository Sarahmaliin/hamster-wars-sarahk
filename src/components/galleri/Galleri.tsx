import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'
import Overlay from './Overlay'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)
    const [ show, setShow ] = useState<boolean>(true)


    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    const ReadMore = (index: string) =>{
        if (hamsterData){
            let hamster = hamsterData.filter(hamster => hamster.id.includes(index))
            setShow(!show)
        }
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
                <img src="../" alt="" />
            </figure>
            {show ?  
            <section className="container">
            <p >Namn: {hamster.name}</p>
            <section className="buttons">
                    <button onClick={() => DeleteOne(hamster.id)} className='trashcan'></button>
                   <button onClick={() => ReadMore(hamster.id)}>läs mer</button>
                </section>
        </section> 
            : <section className="container">
                <p >Namn: {hamster.name}</p>
                <p >Ålder: {hamster.age}</p>
                <p >Favoritmat: {hamster.favFood}</p>
                <p >Älskar: {hamster.loves}</p>
                <p >Spel: {hamster.games}</p>
                <p >Vinster: {hamster.wins}</p>
                <p >Förluster: {hamster.defeats}</p>
                <section className="buttons">
                        <button onClick={() => DeleteOne(hamster.id)} className='trashcan'></button>
                       <button onClick={() => ReadMore(hamster.id)}>läs mindre</button>
                    </section>
            </section> 
            }        
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