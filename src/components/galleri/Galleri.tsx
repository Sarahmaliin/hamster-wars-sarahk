import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'
import './Galleri.css'
import Overlay from './Overlay'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)
    const [ show, setShow ] = useState<boolean>(false)
    const [chosenOne, setChosenOne] = useState<HamsterInfo>()


    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    const ReadMore = (id: string) =>{
        if (hamsterData){
            const filt = hamsterData.find(h => h.id === id)
            console.log(filt)
            if(filt){
                
                setShow(true)
                // {show ?  < Overlay x={hamster.id}/> : null}
                setChosenOne(filt)
            } 
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
        <>
        
        <li className="infoCard" key={index}>
            <figure>
                <img className="infoCardImg" src={`../img/${hamster.imgName}`} alt="hamster profile" />
            </figure>
            <section id={`a${hamster.id.toString()}`} className='cardText'>
            <p >{hamster.name}</p>
            <p >Ålder: {hamster.age}</p>
            <p >Älskar: {hamster.loves}</p>
            <p >Favoritmat: {hamster.favFood}</p>
            <p >Spel: {hamster.games}</p>
            <p >Vinster: {hamster.wins}</p>
            <p >Förluster: {hamster.defeats}</p>            
            </section> 
            <section className="buttons">
                    <section onClick={() => DeleteOne(hamster.id)} className='trashcan'></section>
                   <button onClick={() => ReadMore(hamster.id)}> läs mer</button>
                </section>
             
        </li>
        </>
        ))
        :
        'Loading data'
        }
        
    </ul>
    {show ?  < Overlay data={hamsterData} x={chosenOne}/> : null}
     
    </>
    )
}

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters')
    const data = await response.json()
    saveData(data)
}

export default Galleri