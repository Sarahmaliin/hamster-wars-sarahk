import './Tävla.css'
import { useEffect, useState } from "react"
import { HamsterInfo } from "../../models/HamsterInfo"

    const name: any = 'name'
    const imgName: any = 'imgName'
    const id: any = 'id'
    const wins: any = 'wins'
    const defeats: any = 'defeats'
    const games: any = 'games'

const Tävla = () =>{
    const [saveRandomOne, setSaveRandomOne] = useState<HamsterInfo[] | null>(null)
    const [saveRandomTwo, setSaveRandomTwo] = useState<HamsterInfo[] | null>(null)
    const [hamsterOne, setHamsterOne] = useState<Number>(0)
    const [hamsterOneDefeats, setHamsterOneDefeats] = useState<Number>(0)
    const [hamsterTwoWins, setHamsterTwoWins] = useState<Number>(0)
    const [competerOne, setCompeterOne] = useState<HamsterInfo[]>()
    const [hamsterTwoDefeats, setHamsterTwoDefeats] = useState<Number>(0)
    const [gameHamsterOne, setGameHamsterOne] = useState<Number>(0)
    const [hamsterTwoGames, setHamsterTwoGames] = useState<Number>(0)
    const [visible, setVisible] = useState<boolean>(false)
    const [competerTwo, setCompeterTwo]  = useState<HamsterInfo[]>()
    const [errorMsg, setErrorMsg ] = useState<string>('')
    const [winner, setWinner] = useState<HamsterInfo[]>()
    const [loser, setLoser] = useState<HamsterInfo[]>()
    

    useEffect(() =>{
        sendRequestOne(setSaveRandomOne)
    }, []) 

    useEffect(() =>{
        sendRequestTwo(setSaveRandomTwo)
    }, []) 

    useEffect(() =>{
        const voting1 = {wins: hamsterOne, defeats: hamsterOneDefeats, games: gameHamsterOne}
        if(saveRandomOne){
            fetch(`/hamsters/${saveRandomOne[id]}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(voting1),
            })
          setVisible(!visible)
        setCompeterOne(saveRandomOne)
        }
          
        // eslint-disable-next-line
    }, [hamsterOne, hamsterOneDefeats, gameHamsterOne])

    

    useEffect(() =>{
        const voting2 = {defeats: hamsterTwoDefeats, wins: hamsterTwoWins, games: hamsterTwoGames}
        if(saveRandomTwo){
            fetch(`/hamsters/${saveRandomTwo[id]}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(voting2),
        })
        setVisible(!visible)
        setCompeterTwo(saveRandomTwo)
        }
        // eslint-disable-next-line
    }, [hamsterTwoDefeats, hamsterTwoWins, hamsterTwoGames])


    async function Vote(HamsterId: HamsterInfo){
        if(saveRandomOne && saveRandomTwo){
            if(HamsterId === saveRandomOne[id]){
                const updateWins1 = Number(saveRandomOne[wins]) + 1
                setHamsterOne(updateWins1)
                const updateWinDefeats = Number(saveRandomOne[defeats])
                setHamsterOneDefeats(updateWinDefeats)
                const updateGame1 = Number(saveRandomOne[games]) + 1
                setGameHamsterOne(updateGame1)
                setWinner(saveRandomOne)

                const updatecompeterTwo2 = Number(saveRandomTwo[defeats]) + 1
                setHamsterTwoDefeats(updatecompeterTwo2)
                const updatehamsterTwoWins = Number(saveRandomTwo[wins])
                setHamsterTwoWins(updatehamsterTwoWins)
                const updateGame2 = Number(saveRandomTwo[games]) + 1
                setHamsterTwoGames(updateGame2)
                setLoser(saveRandomTwo)             
            }
            if(HamsterId === saveRandomTwo[id]){

                //winner
                const updateWins2 = Number(saveRandomTwo[wins]) + 1
                setHamsterTwoWins(updateWins2)
                const updateDefeats2 = Number(saveRandomTwo[defeats])
                setHamsterTwoDefeats(updateDefeats2)
                const updateGame2 = Number(saveRandomTwo[games]) + 1
                setHamsterTwoGames(updateGame2)
                setWinner(saveRandomTwo)
                
                //competerTwo
                const updateDefeatsOne = Number(saveRandomOne[defeats]) + 1
                setHamsterOneDefeats(updateDefeatsOne)
                const updateWins1 = Number(saveRandomOne[wins])
                setHamsterOne(updateWins1)
                const updateGame1 = Number(saveRandomOne[games]) + 1
                setGameHamsterOne(updateGame1)
                setLoser(saveRandomOne)
                
            }
        }
    }

    

    async function sendRequestOne(saveData: any){
        const response = await fetch ('/hamsters/random')
        if (response.status >= 400 && response.status < 600) {
            setErrorMsg('Kunde inte hämta slumpad hamster, vänligen försök uppdatera sidan.')
        }
        const data = await response.json()
        saveData(data)
    }

    async function sendRequestTwo(saveD: any){
        const response = await fetch ('/hamsters/random')
        if (response.status >= 400 && response.status < 600) {
            setErrorMsg('Kunde inte hämta slumpad hamster, vänligen försök uppdatera sidan.')
        }
        const data = await response.json()
        saveD(data)
    }

    const reloadNewGame = () =>{
        sendRequestOne(setSaveRandomOne)
        sendRequestTwo(setSaveRandomTwo)
        setVisible(false)
    }

    return(
        <section className='compete'>
        <section className='hamsterCompete'>
            <h1>Rösta på sötaste hamstern</h1>
            <ul>
                <p className='errorMessages serverErrorRandom'>{errorMsg}</p>
                { saveRandomOne && saveRandomTwo ? 
                <>
                <li className="competingHamsters">
                    <figure>
                    {!saveRandomOne[imgName].toString().includes('.jpg') ? 
                        <img className="card-image infoCardImg" src={saveRandomOne[imgName].toString()} alt="hamster profile" /> :
                        <img className="card-image infoCardImg" src={`../img/${saveRandomOne[imgName].toString()}`} alt="hamster profile" />}
                    </figure>
                    <p>{saveRandomOne[name]}</p>
                    <button className='voteBtn' onClick={() => Vote(saveRandomOne[id])}>Rösta på mig</button> 
                </li>
                <li className="competingHamsters" >
                    <figure>
                    {!saveRandomTwo[imgName].toString().includes('.jpg') ? 
                            <img className="card-image infoCardImg" src={saveRandomTwo[imgName].toString()} alt="hamster profile" /> :
                            <img className="card-image infoCardImg" src={`../img/${saveRandomTwo[imgName].toString()}`} alt="hamster profile" />}  
                    </figure>
                    <p>{saveRandomTwo[name]}</p>
                    <button className='voteBtn' onClick={() => Vote(saveRandomTwo[id])}>Rösta på mig</button>
                </li>
                </>
                : null}
            </ul>        
        </section>
        <section className={'overlay ' + visible}>
            <p className='errorMessages'>{errorMsg}</p>
            { saveRandomOne && saveRandomTwo && competerOne && competerTwo ?
            <>
            <ul className='results'>
                <li className='results-hamster'>
                    <h1>Vinnare: </h1>
                    {winner && loser && winner[id] === saveRandomOne[id] ? 
                    
                    <section>
                    <figure className='results-image'>
                        {!saveRandomOne[imgName].toString().includes('.jpg') ? 
                        <img src={`${saveRandomOne[imgName]}`} alt="hamster" />
                        : <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />}
                    </figure>
                        <article className='winLoseText'>
                            <p className='overlay-text'>Namn: {saveRandomOne[name]}</p> 
                            <p className='overlay-text'>Vinster: {hamsterOne}</p>
                            <p className='overlay-text'>Förluster: {hamsterOneDefeats}</p>
                            <p className='overlay-text'>Matcher: {gameHamsterOne}</p>
                    </article> </section>
                    :
                    
                    <section>
                        <figure className='results-image'>
                            {!saveRandomTwo[imgName].toString().includes('.jpg') ? 
                            <img src={`${saveRandomTwo[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />}
                        </figure>
                        <article className='winLoseText'>
                        <p className='overlay-text'>Namn: {competerTwo[name]}</p> 
                        <p className='overlay-text'>Vinster: {hamsterTwoWins}</p>
                        <p className='overlay-text'>Förluster: {hamsterTwoDefeats}</p>
                        <p className='overlay-text'>Matcher: {hamsterTwoGames}</p>
                    </article></section>
                    }
                </li>
                <li className='results-hamster'>
                    
                    <h1>Förlorare</h1>
                    {loser && winner && winner[id] === saveRandomOne[id] ?
                        <>
                        <figure className='results-image'>
                            {!saveRandomTwo[imgName].toString().includes('.jpg') ? 
                            <img src={`${saveRandomTwo[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${saveRandomTwo[imgName]}`} alt="hamster" />}
                        </figure>
                        <article className='winLoseText'>
                        <p className='overlay-text'>Namn: {saveRandomTwo[name]}</p> 
                        <p className='overlay-text'>Vinster: {hamsterTwoWins}</p>
                        <p className='overlay-text'>Förluster: {hamsterTwoDefeats}</p>
                        <p className='overlay-text'>Matcher: {hamsterTwoGames}</p>
                    </article>
                    </>
                    : 
                    <>
                    <figure className='results-image'>
                            {!saveRandomOne[imgName].toString().includes('.jpg') ? 
                            <img src={`${saveRandomOne[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${saveRandomOne[imgName]}`} alt="hamster" />}
                        </figure>
                    <article className='winLoseText'>
                        <p className='overlay-text'>Namn: {saveRandomOne[name]}</p> 
                        <p className='overlay-text'>Vinster: {hamsterOne}</p>
                        <p className='overlay-text'>Förluster: {hamsterOneDefeats}</p>
                        <p className='overlay-text'>Matcher: {gameHamsterOne}</p>
                    </article>
                    </>}

                </li>
                <section className='restartBtn'>
                    <button onClick={() => reloadNewGame()}>Starta nytt spel</button>
                </section>
            </ul></>
            : null}
            
        </section>
    </section>

    )
}



export default Tävla