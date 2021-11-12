import { useEffect, useState } from "react"
import './Galleri.css'


const FormHamster = (props: any) =>{

  const [ showForm, setShowForm ] = useState<boolean>(false)
    const [hamsterName] = useState('')
    const [age] = useState(0)
    const [hamsterFood] = useState('')
    const [hamsterLove] = useState('')
    const [hamsterImg] = useState('')
    const [allOkey, setAllOkey] = useState<boolean>() 
    const [ errorName, setErrorName ] = useState<string>('')
    const [ errorAge, setErrorAge ] = useState<string>('')
    const [ errorFood, setErrorFood ] = useState<string>('')
    const [ errorLoves, setErrorLoves ] = useState<string>('')
    const [ errorImg, setErrorImg ] = useState<string>('')
    const [ formError, setFormError ] = useState<string>('')
    const [errorMsg, setErrorMsg ] = useState<string>('')


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

    const nameInput  = (document.querySelector('.name') as HTMLInputElement)
    const ageInput = (document.querySelector('.age') as HTMLInputElement)
    const favFoodInput = (document.querySelector('.favFood') as HTMLInputElement)
    const lovesInput = (document.querySelector('.loves') as HTMLInputElement)
    const imgNameInput = (document.querySelector('.imgName') as HTMLInputElement)
    let regExp = /^[a-zA-Z]*$/;

    useEffect(() =>{
        if(allOkey === true){
            saveForm()
            
        }  
         if(allOkey === false){
            setFormError('Något gick fel, var god se felmeddelanden nedan')
        } 
        // eslint-disable-next-line
    }, [allOkey])


    async function saveForm () {
        const res = await fetch('/hamsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(newHamster)
        })
        if (res.status >= 400 && res.status < 600) {
            setErrorMsg('Serverfel. Kunde inte lägga till hamster. Vänligen försök uppdatera sidan.')
        }
        let data = await res.json()
        setNewHamster(data)
        reloadAfterSubmit()
    }

    const ValidateName = ()=>{
        const hamsterValidateName = nameInput.value.trim()
        
        return hamsterValidateName.length >= 2  && !hamsterValidateName.includes('-') && !hamsterValidateName.includes('.') && regExp.test(hamsterValidateName)
    }

    const ValidateAge = () =>{
        const hamsterValidateAge = ageInput.value.trim()
        let nmb = Number(hamsterValidateAge)
        return nmb > 2 && nmb < 100 && !isNaN(nmb) && !hamsterValidateAge.includes(',') && !hamsterValidateAge.includes('.')            
    }

    const ValidateFood = () =>{
        const hamsterValidateFavFood = favFoodInput.value.trim()
        return hamsterValidateFavFood.length >= 2 && regExp.test(hamsterValidateFavFood)
    }

    const ValidateLove = () =>{
        const hamsterValidateLove = lovesInput.value.trim()
        return hamsterValidateLove.length >= 2 && regExp.test(hamsterValidateLove)
    }

    const ValidateImg = () =>{
        const hamsterValidateImg = imgNameInput.value.trim() 
        return hamsterValidateImg.length >= 2 && hamsterValidateImg.includes('-') && hamsterValidateImg.includes('.') 
    }

    const SaveInput = (event: React.FormEvent<HTMLFormElement>) =>{
        
        event.preventDefault()
        if(!ValidateName()) {
            setErrorName('Nedanstående namn-fält är inkorrekt. Se till så att namnet är över 2 bokstäver, inte innehåller specialtecken')
        }

        if(!ValidateAge()) {
            setErrorAge('Nedanstående ålder-fält är inkorrekt. Se till så att åldern är över 2, under 100 och inte inkluderar decimaler')
        }

        if(!ValidateFood()) {
            setErrorFood('Nedanstående favoritmat-fält är inkorrekt, se till så att namnet är över 2 bokstäver, inte innehåller specialtecken')
        }

        if(!ValidateLove()) {
            setErrorLoves('Nedanstående älskar-fält är inkorrekt, se till så att namnet är över 2 bokstäver, inte innehåller specialtecken')
        }

        if(!ValidateImg()) {
            setErrorImg('Nedanstående bild-fält är inkorrekt, se till så att bildurl är över 2 bokstäver, inkluderar bindestreck och punkt')
            
        }

        setAllOkey(ValidateName() && ValidateAge() && ValidateFood() && ValidateLove() && ValidateImg())
    }

    const reloadAfterSubmit = () =>{
        props.formClosed(true)
        setShowForm(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setNewHamster({...newHamster, [event.target.name]: event.target.value.trim()})  //trim removes whitespace
    }  

    return(
        <>
        {showForm ? <form onSubmit={SaveInput} className={'form ' + showForm} >
            <article className="addHamster">
                <h2 className='showHideForm' onClick={() => setShowForm(!showForm)}>-</h2>
                </article>
                <section className='formFields'>
                    <p className='errorMessages serverError'>{errorMsg}</p>
                    <h1 className='headline'>Lägg till en ny hamster</h1>
                    <p className='errorMessages'>{formError}</p>
                    <h3 className='errorMessages'>{errorName}</h3>
                    <input className='name' onChange={handleChange} name='name' value={newHamster.name} type="text" placeholder='Namn' required />
                    <h3 className='errorMessages'>{errorAge}</h3>
                    <input className='age' onChange={handleChange} name='age' placeholder='Ålder' value={Number(newHamster.age)} type="string" required  />
                    <h3 className='errorMessages'>{errorFood}</h3>
                    <input className='favFood' onChange={handleChange} name='favFood' value={newHamster.favFood} type="text" placeholder='Favoritmat' required />
                    <h3 className='errorMessages'>{errorLoves}</h3>
                    <input className='loves' onChange={handleChange} name='loves' value={newHamster.loves} type="text" placeholder='Älskar' required />
                    <h3 className='errorMessages'>{errorImg}</h3>
                    <input className='imgName' onChange={handleChange} name='imgName' value={newHamster.imgName} type="text" placeholder='Bildurl' required />
                    
                <button  type="submit">Lägg till</button>
                </section>
                
            </form>: <article className="addHamster">
            <h2 className='showHideForm' onClick={() => setShowForm(!showForm)}>+</h2>
        </article>}
        </>
    )
}
    
export default FormHamster