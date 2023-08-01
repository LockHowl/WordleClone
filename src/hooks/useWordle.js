import { useEffect, useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) //{a: "green"}
    
    //format a guess to an array of letter objs
    //key a, color yellow
    const formatGuess = () => {
        let solutionArr = [...solution]
        let formattedGuess = [...currentGuess].map((elem) => {
            return {key: elem, colour: "grey"}
        })

        //find green letters
        formattedGuess.forEach((elem, i) => {
            if (solutionArr[i] === elem.key) {
                formattedGuess[i].colour = "green"
                solutionArr[i] = null
            }
        })

        //find yellow letters
        formattedGuess.forEach((elem, i) => {
            if (solutionArr.includes(elem.key) && elem.colour !== "green") {
                console.log("true")
                formattedGuess[i].colour = "yellow"
                solutionArr[solutionArr.indexOf(elem.key)] = null
            }
        })
        
        return formattedGuess
    }

    //add a new guess to guess state
    //update the isCorrect state if the guess
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
            //winning situation
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn+1
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((letter) => {
                const currentCol = newKeys[letter.key]

                if (letter.colour === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                }
                else if (letter.colour === 'yellow' && currentCol !== 'green') {
                    newKeys[letter.key] = 'yellow'
                    return
                }
                else if (letter.colour === 'grey' && currentCol !== 'green' && currentCol !== 'yellow') {
                    newKeys[letter.key] = 'grey'
                    return
                }
            })
        
            return newKeys
        })
        setCurrentGuess('')
    }

    //handle keyup event & track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({key}) => {
        
        if (key === "Enter") {
            //only add guess if turn <5
            if (turn > 5) {
                console.log("Guess Limit Reached")
                return
            }
            //not a duplicate word
            if (history.includes(currentGuess)) {  
                console.log("Repeated Word")
                return
            }
            //5 letters required
            if (currentGuess.length !== 5) {
                console.log("5 Characters Required")
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)

        }
        else if (key === "Backspace"){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }
        else if (/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev+key
                })
            }
        }
        
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle