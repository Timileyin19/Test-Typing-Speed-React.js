import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameSettings = () => {
    let navigate = useNavigate();
    const [gameProps, setGameProps] = useState({
        useSystemText: 'true',
        customText: '',
        gameTime: 0,
        customGameTime: 0
    })

    const onChange = (e) => {
        if (e.target.name == 'gameTime') {
            setGameProps({
                ...gameProps, [e.target.name]: Number(e.target.value) > 0 ? Number(e.target.value) : 'custom'
            })
        } else {
            setGameProps({
                ...gameProps, [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (gameProps.gameTime < 1 && gameProps.customGameTime < 1) {
            alert('Game Time is required and must be set. ')
        } else if (gameProps.useSystemText == 'false' && gameProps.customText == '') {
            alert('Enter your custom text or enable the usage of system text')
        } else {
            navigate('/game', { state: { gameProps } })
        }
    }



    return (
        <div className="row justify-content-md-center">
            <div className="col-md-6">
                <h3 className="text-center text-primary my-3">Set-Up Game</h3>
                <p className="text-center text-danger">All fields are required</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="use-system-generated-text" className="form-label">Use System Generated Text?</label>
                        <select id="use-system-generated-text" className="form-select" name="useSystemText" onChange={onChange}>
                            <option disabled>-- Select Option --</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>

                    <> {gameProps?.useSystemText == 'true' ? '' :
                        <div className="mb-3">
                            <label htmlFor="custom-text" className="form-label">Enter Custom Text</label>
                            <textarea className="form-control" id="custom-text" rows="3" name="customText" onChange={onChange}></textarea>
                        </div>

                    } </>

                    <div className="mb-3">
                        <label htmlFor="game-time" className="form-label">Set Time (in minutes)</label>
                        <select id="game-time" className="form-select" name="gameTime" onChange={onChange}>
                            <option defaultValue>-- Select Time --</option>
                            <option value='1'>1 Minute</option>
                            <option value='2'>2 Minutes</option>
                            <option value='5'>5 Minutes</option>
                            <option value='custom'>Enter Custom Time</option>
                        </select>
                    </div>


                    <>
                        {gameProps.gameTime == 'custom' ? <div className="mb-3">
                            <label htmlFor="custom-time" className="form-label">Enter Custom Time (in minutes)</label>
                            <input className="form-control" id="custom-time" type="number" name="customGameTime" onChange={onChange} required />
                        </div> : ''}
                    </>

                    <div className="text-center">
                        <button className="btn btn-lg btn-primary">Start Game</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default GameSettings;