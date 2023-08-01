import React from 'react'

export default function Row({guess, currentGuess}) {
  
    //writes out non-current guess row
    if (guess) {
        return (
            <div className='row past'>
                {guess.map((letter, i) => (
                    <div key={i} className={letter.colour}>{letter.key}</div>
                ) )}
            </div>
        )
    }
  
    //writes out the current guess row
    if (currentGuess) {
        let letters = currentGuess.split('')
        
        return (
            <div className='row current'>
                {letters.map((letter, i) => (
                    <div key={i} className='filled'>{letter}</div>
                ))}
                {[...Array(5-letters.length)].map((_,i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }

    return (
    <div className='row'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
