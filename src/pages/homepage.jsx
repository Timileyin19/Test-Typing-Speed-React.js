import react from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();
    return (
        <div className="row justify-content-md-center">
            <div className="col-md-6 text-center">
                <h1 className="mt-2">Test your Typing Skill</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                    nemo id temporibus et hic labore unde eum sapiente quisquam modi
                    saepe sint, dolore corrupti aspernatur natus iure, quia tempora
                    qui pariatur! Ratione corporis provident suscipit laudantium
                    perferendis perspiciatis necessitatibus!
                </p>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/game-settings')}>Play Game Now</button>
            </div>
        </div>
    )

}

export default HomePage;