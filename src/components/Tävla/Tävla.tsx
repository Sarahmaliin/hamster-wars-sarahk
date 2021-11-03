import FirstHamster from "./FirstHamster"
import SecondHamster from "./SecondHamster"
import './Tävla.css'

//Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.
const Tävla = () =>{


        //lägga till btns här ist, hur få bättre struktur. Sen disable btns efter en klickats på och lägg in overlay
    return(
        <section>
            <h1>Hamster vs Hamster</h1>
            <section className='hamsters'>
                <section className='firstHamster'>
                    < FirstHamster />
                </section>
                <section className='secondHamster'>
                    < SecondHamster />
                </section>
                    
            </section>
            
        </section> 

    )
}



export default Tävla