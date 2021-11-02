import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)
    const [ show, setShow ] = useState<boolean>(false)

    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    const ReadMore = (id: string) =>{
        
        if(hamsterData && show){
            const newArray = hamsterData.findIndex((hamster => hamster.id === id)) //läs mer korrigera
            const h = hamsterData[newArray]
            console.log(h.age)
            
            
        }
        console.log('no data')
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
            <section className="container">
                <p >{hamster.name}</p>
                <p >{hamster.age}</p>
                <p >{hamster.favFood}</p>
                <p >{hamster.loves}</p>
                <p >{hamster.games}</p>
                <p >{hamster.wins}</p>
                <p >{hamster.defeats}</p>
                    <section className="buttons">
                        <button onClick={() => DeleteOne(hamster.id)} className='trashcan'></button>
                        <button onClick={() => ReadMore(hamster.id)}>läs mer</button>
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