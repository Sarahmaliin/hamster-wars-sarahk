import { useState } from "react"

const FormHamster = () =>{

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

    async function saveForm () {
        const res = await fetch('/hamsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(newHamster)
        })
        let data = await res.json()
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
                <input onChange={handleChange} name='age' placeholder='age' value={newHamster.age} type="number"   />
                <input onChange={handleChange} name='favFood' value={newHamster.favFood} type="text" placeholder='favFood'  />
                <input onChange={handleChange} name='loves' value={newHamster.loves} type="text" placeholder='loves'  />
                <input onChange={handleChange} name='imgName' value={newHamster.imgName} type="text" placeholder='imgName'  />
                <button type="submit">Lägg till</button>
            </form>: <article className="addHamster">
            <h2 onClick={() => setShowForm(!showForm)}>+</h2>
        </article>}
        </>
    )
}

export default FormHamster