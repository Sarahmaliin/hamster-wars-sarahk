import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

const SecondHamster = () =>{

    const [saveRandomTwo, setSaveRandomTwo] = useState<HamsterInfo[] | null>(null)
    const name: any = 'name'
    const imgName: any = 'imgName'

    useEffect(() =>{
        sendRequest(setSaveRandomTwo)
    }, [])

    return(
        <ul >
            { saveRandomTwo ? 
            <li >
                <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />
                <p>Namn: {saveRandomTwo[name]}</p>
                <button>Rösta på mig</button>
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

export default SecondHamster