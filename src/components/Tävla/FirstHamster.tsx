import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

const FirstHamster = () =>{

    const [saveRandomOne, setSaveRandomOne] = useState<HamsterInfo[] | null>(null)
    const name: any = 'name'
    const imgName: any = 'imgName'

    useEffect(() =>{
        sendRequest(setSaveRandomOne)
    }, [])

    console.log(saveRandomOne)

    return(
        <ul>
            { saveRandomOne ? 
            <li>
                <p>Namn: {saveRandomOne[name]}</p>
                {console.log(saveRandomOne[imgName])}
                <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
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
    console.log(data)
}

export default FirstHamster