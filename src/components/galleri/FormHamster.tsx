import { useState } from "react"
import './Galleri.css'

const FormHamster = () =>{

  const [ showForm, setShowForm ] = useState<boolean>(false)
    const [hamsterName] = useState('')
    const [age] = useState(0)
    const [hamsterFood] = useState('')
    const [hamsterLove] = useState('')
    const [hamsterImg] = useState('')

    const [newHamster, setNewHamster] = useState({
        name: hamsterName,
        age: age,
        favFood: hamsterFood,
        loves: hamsterLove,
        imgName: hamsterImg,
        wins: 0,
        defeats: 0,
        games: 0
    }
    )
    
    const NameIsValid = IsValidName(hamsterName)
    const ageIsValid = isValidAge(age)
    const FoodIsValid = IsValidFood(hamsterFood)
    const LoveIsValid = IsValidLove(hamsterLove)
    const ImgIsValid = IsValidImg(hamsterImg)

    const formIsValid = NameIsValid && ageIsValid && FoodIsValid && LoveIsValid && ImgIsValid

    function IsValidName(hamsterName: string): boolean{
        return hamsterName.length >= 3
    }

    function isValidAge(age: number): boolean {
        if( isNaN(age) ) return false
        if( age < 0 ) return false
        let ageString = String(age)
        if( ageString.includes(',') || ageString.includes('.') ) return false
        return true
    }

    function IsValidFood(hamsterFood: string): boolean{
        return hamsterFood.length >= 3
    }

    function IsValidLove(hamsterLove: string): boolean{
        return hamsterLove.length >= 3
    }

    function IsValidImg(hamsterImg: string): boolean{
        return hamsterImg.includes('-') || hamsterImg.includes('.') || hamsterImg.length >= 3
        
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
        if(!formIsValid){
            console.log('form is not valid') //lägger ej till ny hamster, men refreshar sidan, hur ändra?
            return
        } 
        else{
            console.log(formIsValid)
            event.preventDefault()
            saveForm()
            window.location.reload()
        }
        
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
                <section className='formFields'>
                    <h1 className='headline'>Lägg till en ny hamster</h1>
                    <input onChange={handleChange} name='name' value={newHamster.name} type="text" placeholder='Namn' required />
                    <input onChange={handleChange} name='age' placeholder='Ålder' value={Number(newHamster.age)} type="string" required  />
                    <input onChange={handleChange} name='favFood' value={newHamster.favFood} type="text" placeholder='Favoritmat' required />
                    <input onChange={handleChange} name='loves' value={newHamster.loves} type="text" placeholder='Älskar' required />
                    <input onChange={handleChange} name='imgName' value={newHamster.imgName} type="text" placeholder='Bildnamn (hamster-3.jpg)' required />
                <button  type="submit">Lägg till</button>
                </section>
                
            </form>: <article className="addHamster">
            <h2 onClick={() => setShowForm(!showForm)}>+</h2>
        </article>}
        </>
    )
}

export default FormHamster