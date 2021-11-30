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
    // const [winnerTwo, setWinnerTwo] = useState<Number>(0)
    const [competerOne, setCompeterOne] = useState<HamsterInfo[]>()
    const [hamsterTwoDefeats, setHamsterTwoDefeats] = useState<Number>(0)
    const [gameHamsterOne, setGameHamsterOne] = useState<Number>(0)
    const [hamsterTwoGames, setHamsterTwoGames] = useState<Number>(0)
    const [visible, setVisible] = useState<boolean>(false)
    const [competerTwo, setCompeterTwo]  = useState<HamsterInfo[]>()
    const [errorMsg, setErrorMsg ] = useState<string>('')
    const [newHamsterOne, setNewHamsterone] = useState<HamsterInfo[]>()
    
    console.log(gameHamsterOne)
    console.log(hamsterTwoGames)

    useEffect(() =>{
        sendRequestOne(setSaveRandomOne)
    }, []) 

    useEffect(() =>{
        sendRequestTwo(setSaveRandomTwo)
    }, []) 

    useEffect(() =>{
        console.log(hamsterOne, hamsterOneDefeats, gameHamsterOne)
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
        //   console.log(saveRandomOne)
        }
          
        // eslint-disable-next-line
    }, [hamsterOne, hamsterOneDefeats, gameHamsterOne])

    useEffect(() =>{
        if(competerOne){
            HamsterOne(competerOne)
            console.log(competerOne)
        }
        
    }, [competerOne])


    async function HamsterOne(hamster: any){
        if(hamster){
        console.log(hamster.id)
        const response = await fetch (`/hamsters/${hamster.id}`)
        if (response.status >= 400 && response.status < 600) {
            setErrorMsg('Kunde inte hämta slumpad hamster, vänligen försök uppdatera sidan.')
        }
        const data = await response.json()
        console.log(data)
        setNewHamsterone(data)
    }
        }

    // useEffect(() =>{
    //     const voting2 = {wins: winnerTwo}
    //     if(saveRandomTwo){
    //         fetch(`/hamsters/${saveRandomTwo[id]}`, {
    //         method: 'PUT',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(voting2),
    //     })
    //     setVisible(!visible)
    //     setCompeterTwo(saveRandomTwo)
    //     }
    //     // eslint-disable-next-line
    // }, [winnerTwo])

    // useEffect(() =>{
    //     const votingLose1 = {defeats: competerOne}
    //     if(saveRandomOne){
    //         fetch(`/hamsters/${saveRandomOne[id]}`, {
    //         method: 'PUT',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(votingLose1),
    //         })
    //     setVisible(!visible)
    //     setCompeterTwo(saveRandomOne)
    //     }
    //     // eslint-disable-next-line
    // }, [competerOne])
    
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

    // useEffect(() =>{
    //     const game1 = {games: gameHamsterOne}
    //     if(saveRandomOne){
    //         fetch(`/hamsters/${saveRandomOne[id]}`, {
    //         method: 'PUT',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(game1),
    //     })
    //     setVisible(!visible)
    //     }
    //     // eslint-disable-next-line
    // }, [gameHamsterOne])

    // useEffect(() =>{
    //     const game2 = {games: hamsterTwoGames}
    //     if(saveRandomTwo){
    //         fetch(`/hamsters/${saveRandomTwo[id]}`, {
    //         method: 'PUT',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(game2),
    //     })
    //     setVisible(!visible)
    //     }
    //     // eslint-disable-next-line
    // }, [hamsterTwoGames])

    async function Vote(HamsterId: HamsterInfo){
        if(saveRandomOne && saveRandomTwo){
            if(HamsterId === saveRandomOne[id]){
                const updateWins1 = Number(saveRandomOne[wins]) + 1
                setHamsterOne(updateWins1)
                const updateWinDefeats = Number(saveRandomOne[defeats])
                setHamsterOneDefeats(updateWinDefeats)
                const updateGame1 = Number(saveRandomOne[games]) + 1
                setGameHamsterOne(updateGame1)

                const updatecompeterTwo2 = Number(saveRandomTwo[defeats]) + 1
                setHamsterTwoDefeats(updatecompeterTwo2)
                const updatehamsterTwoWins = Number(saveRandomTwo[wins])
                setHamsterTwoWins(updatehamsterTwoWins)
                const updateGame2 = Number(saveRandomTwo[games]) + 1
                setHamsterTwoGames(updateGame2)             
            }
            if(HamsterId === saveRandomTwo[id]){

                //winner
                const updateWins2 = Number(saveRandomTwo[wins]) + 1
                setHamsterTwoWins(updateWins2)
                const updateDefeats2 = Number(saveRandomTwo[defeats])
                setHamsterTwoDefeats(updateDefeats2)
                const updateGame2 = Number(saveRandomTwo[games]) + 1
                setHamsterTwoGames(updateGame2)
                
                //competerTwo
                const updateDefeatsOne = Number(saveRandomOne[defeats]) + 1
                setHamsterOneDefeats(updateDefeatsOne)
                const updateWins1 = Number(saveRandomOne[wins])
                setHamsterOne(updateWins1)
                const updateGame1 = Number(saveRandomOne[games]) + 1
                setGameHamsterOne(updateGame1)
                
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

    console.log(saveRandomOne)
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
            
            <ul className='results'>
                {console.log(competerOne)}
            {console.log(saveRandomOne)}
                <li className='results-hamster'>
                    <h1>Vinnare: </h1>
                    <article className='winLoseText'>
                        {competerOne && competerTwo && competerOne[id] === saveRandomOne[id] ? 
                        
                        <section>
                        <figure className='results-image'>
                            {!competerOne[imgName].toString().includes('.jpg') ? 
                            <img src={`${competerOne[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${competerOne[imgName]}`} alt="hamster" />}
                        </figure>
                        <p className='overlay-text'>Namn: {competerOne[name]}</p> 
                        <p className='overlay-text'>Vinster: {competerOne[wins]}</p>
                        <p className='overlay-text'>Förluster: {competerOne[defeats]}</p>
                        <p className='overlay-text'>Matcher: {competerOne[games]}</p>
                    </section> :
                    
                    <section>
                        <figure className='results-image'>
                            {!competerTwo[imgName].toString().includes('.jpg') ? 
                            <img src={`${competerTwo[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${competerTwo[imgName]}`} alt="hamster" />}
                        </figure>
                        <p className='overlay-text'>Namn: {competerTwo[name]}</p> 
                        <p className='overlay-text'>Vinster: {competerTwo[wins]}</p>
                        <p className='overlay-text'>Förluster: {competerTwo[defeats]}</p>
                        <p className='overlay-text'>Matcher: {competerTwo[games]}</p>
                    </section>
                    }</article>  
                </li>
                <li className='results-hamster'>
                <h1>Förlorare</h1>
                
                { competerTwo && competerTwo && competerOne[id] === saveRandomOne[id] ? 
                    <article className='winLoseText'>
                        <figure className='results-image'>
                            {!competerTwo[imgName].toString().includes('.jpg') ? 
                            <img src={`${competerTwo[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${competerTwo[imgName]}`} alt="hamster" />}
                        </figure>
                    <p className='overlay-text'>Namn: {competerTwo[name]}</p> 
                        <p className='overlay-text'>Vinster: {competerTwo[wins]}</p>
                        <p className='overlay-text'>Förluster: {competerTwo[defeats]}</p>
                        <p className='overlay-text'>Matcher: {competerTwo[games]}</p>
                    </article>
                    :
                    <article className='winLoseText'>
                        <figure className='results-image'>
                            {!competerOne[imgName].toString().includes('.jpg') ? 
                            <img src={`${competerOne[imgName]}`} alt="hamster" />
                            : <img src={`../../img/${competerOne[imgName]}`} alt="hamster" />}
                        </figure>
                        <p className='overlay-text'>Namn: {competerOne[name]}</p> 
                        <p className='overlay-text'>Vinster: {competerOne[wins]}</p>
                        <p className='overlay-text'>Förluster: {competerOne[defeats]}</p>
                        <p className='overlay-text'>Matcher: {competerOne[games]}</p>
                    </article>
                }
                </li>
                <section className='restartBtn'>
                    <button onClick={() => reloadNewGame()}>Starta nytt spel</button>
                </section>
            </ul>
            : null}
            
        </section>
    </section>

    )
}



export default Tävla