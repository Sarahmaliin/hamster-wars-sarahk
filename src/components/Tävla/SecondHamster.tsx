import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

const SecondHamster = () =>{

    const [saveRandomTwo, setSaveRandomTwo] = useState<HamsterInfo[] | null>(null)
    const name: any = 'name'
    const imgName: any = 'imgName'
    
    console.log(imgName)

    useEffect(() =>{
        sendRequest(setSaveRandomTwo)
    }, [])

    return(
        <ul>
            { saveRandomTwo ? 
            <li>
                <p>Namn: {saveRandomTwo[name]}</p>
                {console.log(saveRandomTwo[imgName])}
                <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />
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