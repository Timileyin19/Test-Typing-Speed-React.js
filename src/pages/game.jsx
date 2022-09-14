import react, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import randomWords from 'random-words';


const Game = () => {
    const { state: { gameProps } } = useLocation();
    const WORD_COUNT = 100;
    const time = Number(gameProps.gameTime) > 0 ? 60 * Number(gameProps.gameTime) : 60 * Number(gameProps.customGameTime);
    const [words, setWords] = useState([]);
    const [timer, setTimer] = useState(time);
    const [status, setStatus] = useState('neutral');
    const [userEntry, setUserEntry] = useState('');
    const textArea = useRef(null);
    const [indexAccumulator, setIndexAccumulator] = useState([]);
    const [points, setPoints] = useState(0)

    useEffect(() => {
        if (gameProps.useSystemText === 'true') {
            setWords(generateRandomWords())
        } else {
            const val = gameProps.customText.trim().split(' ');
            setWords(val);
        }
    }, [])


    useEffect(() => {
        if (status === 'started') {
            textArea.current.focus()
        }
    }, [status])


    const generateRandomWords = () => {
        const newArr = new Array(WORD_COUNT);
        newArr.fill(null);

        const generatedWords = newArr.map(() => randomWords());
        return generatedWords;
    }

    const formatWords = (words) => {
        let str = words[0];
        for (let i = 1; i < words.length; i++) {
            str += ` ${words[i]}`
        }
        return str;
    }

    const onChange = (e) => {
        setUserEntry(e.target.value)
    }

    const handleKeyDown = ({ keyCode, key }) => {
        // accumulate point once space bar is pressed
        if (keyCode === 32) {
            evaluateLastWord()
        }
    }


    useEffect(() => {
        const correctWords = [...new Set(indexAccumulator)]
        setPoints(correctWords.length)
    }, [indexAccumulator])

    useEffect(() => {
        console.log(points)
    }, [points])


    const evaluateLastWord = () => {
        const splitUserWord = userEntry.split(' ');
        if (words[splitUserWord.length - 1] === splitUserWord[splitUserWord.length - 1].trim()) {
            setIndexAccumulator([...indexAccumulator, splitUserWord.length - 1])
        } else {
            // zero point
            // console.log('wrong')
        }
    }


    const startTyping = () => {
        if (status === 'completed') {
            if (gameProps.useSystemText === 'true') {
                setWords(generateRandomWords());
            }
            setUserEntry('');
            setPoints(0);
            setIndexAccumulator([]);
        }

        if (status !== 'started') {
            setStatus('started')
            let countDown = setInterval(() => {
                setTimer((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(countDown)
                        setStatus('completed')
                        return time
                    } else {
                        return prevTime - 1
                    }
                })
            }, 1000)
        }
    }


    return (
        <>
            <h3 className='text-primary text-center'>Countdown: {timer}</h3>
            {(status === 'started' || status === 'completed') && (
                <p className="text-success text-center">Score: <span className="text-bold text-danger">{points}</span> out of <>{words.length}</> points  </p>
            )}
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-2">Text to Type</h3>
                    <div className="card">
                        <div className="card-body">
                            {formatWords(words)}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h3 className="mt-2">Type the Text here</h3>
                    <textarea ref={textArea} onChange={onChange} onKeyDown={handleKeyDown} value={userEntry} className="form-control" row='10' disabled={status !== 'started'}></textarea>
                    <div>
                        <button className="btn btn-primary mt-2" onClick={() => startTyping()}>Start</button>
                    </div>
                </div>
            </div>
            {status === 'completed' && (
                <>
                    <div className="row justify-content-md-center mb-6">
                        <div className="col-md-6">
                            <div className="row text-center">
                                <h2 className='text-primary'>Final Assessment</h2>
                                <div className="col-6">
                                    <p>Speed:</p>
                                    <h4 className='text-primary'>{Math.round((points / (time / 60)))}</h4>
                                    <p className="text-primary">Word per minutes</p>
                                </div>
                                <div className="col-6">
                                    <p>Accuracy:</p>
                                    <h4 className='text-primary'>{Math.round((points / (userEntry.split(' ').length)) * 100)}% </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Game;

