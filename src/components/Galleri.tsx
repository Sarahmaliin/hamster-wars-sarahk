import { useEffect, useState } from 'react'
import { HamsterInfo } from '../models/HamsterInfo'

const Galleri = () =>{


    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)
    const [ showForm, setShowForm ] = useState<boolean>(false)
    const [newHamster, setNewHamster] = useState({
        name: '',
        age: 0,
        favFood: '',
        loves: '',
        imgName: 'hamster-20.jpg',
        wins: 0,
        defeats: 0,
        games: 0
    }
    )


    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

     async function saveForm () {
         const res = await fetch('/hamsters', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json;charset=utf-8',
             },
             body: JSON.stringify(newHamster)
         })
         let data = await res.json()
         alert(data.message)
         setNewHamster(data)
         console.log(newHamster)
     }

     const SaveInput = (event: any) =>{
         event.preventDefault()
         saveForm()
     }

    const handleChange = (event: any) =>{
        setNewHamster({...newHamster, [event.target.name]: event.target.value})  
    }
    return(
        <>
        
        {showForm ? <form onSubmit={SaveInput} className={'form ' + showForm} >
            <article className="addHamster">
                <h2 onClick={() => setShowForm(!showForm)}>-</h2>
                </article>
                <input onChange={handleChange} name='name' value={newHamster.name} type="text" placeholder='name'  className='name' />
                <input onChange={handleChange} name='age' value={newHamster.age} type="number" placeholder='age'  />
                <input onChange={handleChange} name='favFood' value={newHamster.favFood} type="text" placeholder='favFood'  />
                <input onChange={handleChange} name='loves' value={newHamster.loves} type="text" placeholder='loves'  />
                <input onChange={handleChange} name='imgName' value={newHamster.imgName} type="text" placeholder='imgName'  />
                <input onChange={handleChange} name='wins' value={newHamster.wins} type="number" placeholder='wins'  />
                <input onChange={handleChange} name='defeats' value={newHamster.defeats} type="number" placeholder='defeats' />
                <input onChange={handleChange} name='games' value={newHamster.games} type="number" placeholder='games' />
                <button type="submit">Lägg till</button>
            </form>: <article className="addHamster">
            <h2 onClick={() => setShowForm(!showForm)}>+</h2>
        </article>}

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