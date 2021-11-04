import './Tävla.css'
import { MouseEventHandler, useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

    const name: any = 'name'
    const imgName: any = 'imgName'
    const id: any = 'id'
    const wins: any = 'wins'
    const defeats: any = 'defeats'



//Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.
const Tävla = () =>{
    const [saveRandomOne, setSaveRandomOne] = useState<HamsterInfo[] | null>(null)
    const [saveRandomTwo, setSaveRandomTwo] = useState<HamsterInfo[] | null>(null)
    const [valueOne, setValueOne] = useState(0)
    const [valueTwo, setValueTwo] = useState(0)
    const [visible, setVisible] = useState<boolean>(false)
    

    useEffect(() =>{
        sendRequestOne(setSaveRandomOne)
    }, []) 

    useEffect(() =>{
        sendRequestTwo(setSaveRandomTwo)
    }, []) 

    // useEffect(() => {
    //     setValue(JSON.parse(window.localStorage.getItem('value')|| '{}')); //sparar value vilket innehåller hamstrarnas vinster, uppdaterar varje
    //   }, []);
    
    //   useEffect(() => {
    //     window.localStorage.setItem('value', value.toString());
    //   }, [value]);

    //få in så uppdaterar vald hamster
    //få in värde i overlay
    //gör loser funktionen

    
    async function Vote(HamsterId: HamsterInfo){
        console.log(HamsterId)
            if(saveRandomOne && HamsterId === saveRandomOne[id]){
            console.log(saveRandomOne[id])
            console.log('winner is hamster one')
             await setValueOne(Number(valueOne) + 1)
             const voting = {wins: valueOne}

             await fetch(`/hamsters/${saveRandomOne[id]}`, {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(voting),
           })
          setVisible(!visible)
          console.log(voting)
        }
        else if(saveRandomTwo && HamsterId === saveRandomTwo[id]){
            console.log('winner is number two')
            await setValueTwo(Number(valueTwo) + 1)
             const voting = {wins: valueTwo}

             await fetch(`/hamsters/${saveRandomTwo[id]}`, {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(voting),
           })
          setVisible(!visible)
          console.log(voting)
        }
        }  
        

    const RefreshPage = () =>{
        window.location.reload();
    }

async function sendRequestOne(saveData: any){
    const response = await fetch ('/hamsters/random')
    const data = await response.json()
    saveData(data)
    console.log(data)
}

async function sendRequestTwo(saveD: any){
    const response = await fetch ('/hamsters/random')
    const data = await response.json()
    saveD(data)
    console.log(data)
}
    return(
        <section className='compete'>
        <section className='hamsterCompete'>
           <ul >
            { saveRandomOne && saveRandomTwo ? 
            <>
            <li >
                <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
                <p>Namn: {saveRandomOne[name]}</p>
                <button onClick={() => Vote(saveRandomOne[id])}>Rösta på mig</button> {/* om knapp ej klickad på så räkna ut förlust */}
            </li>
            <li >
            <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />
            <p>Namn: {saveRandomTwo[name]}</p>
            <button onClick={() => Vote(saveRandomTwo[id])}>Rösta på mig</button>
        </li>
        </>
             : null}
            </ul>        
        </section>
        <section className={'overlay ' + visible}>
            
            { saveRandomOne && saveRandomTwo ?
            <ul>
            <li>
                <h1>Vinnare: </h1>
                <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
                <p>Namn: {saveRandomOne[name]}</p> 
                <p>Vinster: {saveRandomOne[wins]}</p>
                <p>Förluster: {saveRandomOne[defeats]}</p>

            </li>
            <li>
            <h1>Förlorare</h1>
            <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
            <p>Namn: {saveRandomTwo[name]}</p> 
            <p>Vinster: {saveRandomTwo[wins]}</p>
            <p>Förluster: {saveRandomTwo[defeats]}</p>

        </li>
            <button onClick={() => RefreshPage()}>Starta nytt spel</button>
            </ul>
            : null}
            
        </section> 
        </section>

    )
}



export default Tävla