import { useEffect, useState } from 'react'
import { HamsterInfo } from '../../models/HamsterInfo'
import FormHamster from './FormHamster'
import './Galleri.css'

const Galleri = () =>{

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)
    const [msg, setMsg ] = useState<string>('')
    const [ delMsg, setDelMsg] = useState<string>('')
    const [ serverStatus, setServerStatus ] = useState<boolean>()


    useEffect(() =>{
        if(serverStatus === true){
            setMsg('Serverfel. Kunde inte lägga till hamster. Vänligen försök uppdatera sidan.')
        }
        else{
            setMsg('Loading hamsters')
        } 
    }, [serverStatus])

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
        let res =await fetch(`/hamsters/${id}`, deleteMethod)
        if (res.status >= 400 && res.status < 600) {
            document.documentElement.scrollTop = 0
            setDelMsg('Kunde inte ta bort hamster, vänligen ladda om sidan och testa igen')
        }
        else{
            window.location.reload();
        }
    }

    return(
    <>
    < FormHamster />
    <ul className="grid">
        <p className='errorMessages deleteMsg'>{delMsg}</p>
        {hamsterData ? hamsterData.map((hamster, index) =>(   
        <section key={index}>
            <li className="infoCard" >
                <figure >
                    {!hamster.imgName.includes('.jpg') ? 
                    <img className="card-image infoCardImg" src={hamster.imgName} alt="hamster profile" /> :
                    <img className="card-image infoCardImg" src={`../img/${hamster.imgName}`} alt="hamster profile" />}
                    <p className='card-title'>{hamster.name}</p> 
                </figure>
                <section className='middle'>
                    <section className='text'>
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
        </section>
        ))
        :
        <p className='errorMessages galleriMsg'>{msg}</p>
        }   
    </ul>
    </>
    )

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters')
    if (response.status >= 400 && response.status < 600) {
        setServerStatus(response.status >= 400 && response.status < 600)
    }
    const data = await response.json()
    saveData(data)
}
}

export default Galleri