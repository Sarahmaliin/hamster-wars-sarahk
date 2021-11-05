import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'
import './Galleri.css'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)
    const [ show, setShow ] = useState<boolean>(true)


    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    const ReadMore = (index: string) =>{
        if (hamsterData){
            hamsterData.map((hamster) =>(
                console.log(hamster.id)
              
            ))
            
            
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
            </figure>
            {show ?  
            <section className="container">
            <p >{hamster.name}</p>
            <section className="buttons">
                    <section onClick={() => DeleteOne(hamster.id)} className='trashcan'></section>
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
                <section onClick={() => DeleteOne(hamster.id)} className='trashcan'></section>
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