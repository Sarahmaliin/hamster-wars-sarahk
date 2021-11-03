import { useState } from "react"
import './Galleri.css'

const FormHamster = () =>{

  const [ showForm, setShowForm ] = useState<boolean>(false)
    const [hamsterName, setHamsterName] = useState('')
    const [age, setAge] = useState(0)

    const [newHamster, setNewHamster] = useState({
        name: hamsterName,
        age: age,
        favFood: '',
        loves: '',
        imgName: 'hamster-20.jpg',
        wins: 0,
        defeats: 0,
        games: 0
    }
    )
    
    const NameIsValid = IsValidName(hamsterName)
    const nameClass = NameIsValid ? 'valid': 'invalid'
    const ageIsValid = isValidAge(age)
    const formIsValid = NameIsValid && ageIsValid
    function IsValidName(hamsterName: string): boolean{
        return hamsterName.length <= 3
    }

    function isValidAge(age: number): boolean {
        if( isNaN(age) ) return false
        if( age < 0 ) return false
        let ageString = String(age)
        if( ageString.includes(',') || ageString.includes('.') ) return false
        return true
    }

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
                <input className={nameClass} onChange={handleChange} name='name' value={newHamster.name} type="text" placeholder='name' />
                <input onChange={handleChange} name='age' placeholder='age' value={Number(newHamster.age)} type="string"   />
                <input onChange={handleChange} name='favFood' value={newHamster.favFood} type="text" placeholder='favFood'  />
                <input onChange={handleChange} name='loves' value={newHamster.loves} type="text" placeholder='loves'  />
                <input onChange={handleChange} name='imgName' value={newHamster.imgName} type="text" placeholder='imgName'  />
                <button onClick={() => window.location.reload()} disabled={!formIsValid} type="submit">Lägg till</button>
            </form>: <article className="addHamster">
            <h2 onClick={() => setShowForm(!showForm)}>+</h2>
        </article>}
        </>
    )
}

export default FormHamster