import './Tävla.css'
import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

    const name: any = 'name'
    const imgName: any = 'imgName'
    const id: any = 'id'
    const wins: any = 'wins'
    const defeats: any = 'defeats'
    const games: any = 'games'



//Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.
const Tävla = () =>{
    const [saveRandomOne, setSaveRandomOne] = useState<HamsterInfo[] | null>(null)
    const [saveRandomTwo, setSaveRandomTwo] = useState<HamsterInfo[] | null>(null)
    const [winnerOne, setWinnerOne] = useState<Number>(0)
    const [winnerTwo, setWinnerTwo] = useState<Number>(0)
    const [loserOne, setLoserOne] = useState<Number>(0)
    const [loserTwo, setLoserTwo] = useState<Number>(0)
    const [gameOne, setGameOne] = useState<Number>(0)
    const [gameTwo, setGameTwo] = useState<Number>(0)
    const [visible, setVisible] = useState<boolean>(false)
    

    useEffect(() =>{
        sendRequestOne(setSaveRandomOne)
    }, []) 

    useEffect(() =>{
        sendRequestTwo(setSaveRandomTwo)
    }, []) 

    //om flyttar ut och sätter i egen funktion så får jag gul-error med som ber mig sätta in den i useEffect

    useEffect(() =>{
            const voting = {wins: winnerOne}
            if(saveRandomOne){
                fetch(`/hamsters/${saveRandomOne[id]}`, {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(voting),
           })
          setVisible(!visible)
          console.log(voting)
            }
             // eslint-disable-next-line
    }, [winnerOne])

    useEffect(() =>{
        const voting2 = {wins: winnerTwo}
        if(saveRandomTwo){
            fetch(`/hamsters/${saveRandomTwo[id]}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(voting2),
       })
      setVisible(!visible)
      console.log(voting2)
        }
         // eslint-disable-next-line
}, [winnerTwo])

useEffect(() =>{
    const votingLose1 = {defeats: loserOne}
    if(saveRandomOne){
        fetch(`/hamsters/${saveRandomOne[id]}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(votingLose1),
   })
  setVisible(!visible)
  console.log(votingLose1)
    }
     // eslint-disable-next-line
}, [loserOne])

useEffect(() =>{
    const votingLose2 = {defeats: loserTwo}
    if(saveRandomTwo){
        fetch(`/hamsters/${saveRandomTwo[id]}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(votingLose2),
   })
  setVisible(!visible)
  console.log(votingLose2)
    }
     // eslint-disable-next-line
}, [loserTwo])

useEffect(() =>{
    const game1 = {games: gameOne}
    if(saveRandomOne){
        fetch(`/hamsters/${saveRandomOne[id]}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(game1),
   })
  setVisible(!visible)
  console.log(game1)
    }
     // eslint-disable-next-line
}, [gameOne])

useEffect(() =>{
    const game2 = {games: gameTwo}
    if(saveRandomTwo){
        fetch(`/hamsters/${saveRandomTwo[id]}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(game2),
   })
  setVisible(!visible)
  console.log(game2)
    }
     // eslint-disable-next-line
}, [gameTwo])

    async function Vote(HamsterId: HamsterInfo){
        console.log(HamsterId)
        if(saveRandomOne && saveRandomTwo){
            if(HamsterId === saveRandomOne[id]){
                console.log('winner is hamster one')
                const updateNumber = Number(saveRandomOne[wins]) + 1
                setWinnerOne(updateNumber)
                const updateLoser2 = Number(saveRandomTwo[defeats]) + 1
                setLoserTwo(updateLoser2)
                const updateGame1 = Number(saveRandomOne[games]) + 1
                setGameOne(updateGame1)
                const updateGame2 = Number(saveRandomTwo[games]) + 1
                setGameTwo(updateGame2)
                }
            if(HamsterId === saveRandomTwo[id]){
                console.log('winner two')
                const updateNumber2 = Number(saveRandomTwo[wins]) + 1
                setWinnerTwo(updateNumber2)
                console.log('loser 1')
                const updateLoser1 = Number(saveRandomOne[defeats]) + 1
                setLoserOne(updateLoser1)
                const updateGame1 = Number(saveRandomOne[games]) + 1
                setGameOne(updateGame1)
                const updateGame2 = Number(saveRandomTwo[games]) + 1
                setGameTwo(updateGame2)
            }
        }
            
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
            <li className="competingHamsters">
                <figure>
                    <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
                </figure>
                <p>{saveRandomOne[name]}</p>
                <button onClick={() => Vote(saveRandomOne[id])}>Rösta på mig</button> {/* om knapp ej klickad på så räkna ut förlust */}
            </li>
            <li className="competingHamsters" >
            <figure>
                 <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />   
            </figure>
            <p>{saveRandomTwo[name]}</p>
            <button onClick={() => Vote(saveRandomTwo[id])}>Rösta på mig</button>
        </li>
        </>
             : null}
            </ul>        
        </section>
        <section className={'overlay ' + visible}>
            
            { saveRandomOne && saveRandomTwo ?
            <ul className='results'>
            <li className='results-hamster'>
                <h1>Vinnare: </h1>
                <figure className='results-image'>
                    <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />
                </figure>
                <p className='overlay-text'>Namn: {saveRandomOne[name]}</p> 
                <p className='overlay-text'>Vinster: {winnerOne}</p>
                <p className='overlay-text'>Förluster: {loserOne}</p>
                <p className='overlay-text'>Matcher: {gameOne}</p>

            </li>
            <li className='results-hamster'>
            <h1>Förlorare</h1>
            <figure className='results-image'>
                <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />
            </figure>
            <p className='overlay-text'>Namn: {saveRandomTwo[name]}</p> 
            <p className='overlay-text'>Vinster: {winnerTwo}</p>
            <p className='overlay-text'>Förluster: {loserTwo}</p>
            <p className='overlay-text'>Matcher: {gameTwo}</p>

        </li>
            <section className='restartBtn'>
                <button onClick={() => window.location.reload()}>Starta nytt spel</button>
            </section>
            
            </ul>
            : null}
            
        </section> 
        </section>

    )
}



export default Tävla