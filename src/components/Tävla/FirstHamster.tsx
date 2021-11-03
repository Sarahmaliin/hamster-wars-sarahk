import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

const FirstHamster = () =>{

    const [saveRandomOne, setSaveRandomOne] = useState<HamsterInfo[] | null>(null)
    const [value, setValue] = useState(0)
    const name: any = 'name'
    const imgName: any = 'imgName'
    const id: any = 'id'
   
    const Test = () =>{
        console.log('test')
    }

    useEffect(() =>{
        sendRequest(setSaveRandomOne)
    }, []) 

    async function Vote(){
        if(saveRandomOne){
            
            await setValue(Number(value) + 1)
            const voting = {wins: value}

            await fetch(`/hamsters/${saveRandomOne[id]}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(voting),
          })
         
        }  
    }

    return(
        <ul >
            { saveRandomOne ? 
            
            <li >
                <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
                <p>Namn: {saveRandomOne[name]}</p>
                <button onClick={Vote}>Rösta på mig</button>
            </li>
             : null}
            
        </ul>
    )
}

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters/random')
    const data = await response.json()
    saveData(data)
}

export default FirstHamster