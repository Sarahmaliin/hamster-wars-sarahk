import { useEffect, useState } from 'react'
const Galleri = () =>{


    interface HamsterInfo{
        Hamster: object[];
    }

    interface Hamster{
        name: string,
        age: number,
        defeats: number,
        favFood: string,
        games: number,
        id: any,
        imgName: string,
        loves: string,
        wins: number
    }

    const [ hamsterData, setHamsterData ] = useState<HamsterInfo[] | null>(null)

    useEffect(() =>{
        sendRequest(setHamsterData)
    }, [])

    return(
        <section>
        <h1>Galleri sida</h1>
         {hamsterData ? hamsterData.map((hamster: any, index) =>(
            <li key={index}>{hamster.name}</li>
        ))
        :
        'Loading data'
        } 
    </section>
    )
}

async function sendRequest(saveData: any){
    const response = await fetch ('/hamsters')
    const data = await response.json()
    saveData(data)
    console.log(data)
}

export default Galleri