import React from 'react';
import '../CSS_Files/For_filters.css';

function Filters(props) {

    const {onDifficultyChange}=props;

    function handleDifficultyToggle(difficultyToggle)
    {
        onDifficultyChange(difficultyToggle);
    }

    return (
        <div>
            <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle mx-4 my-3" data-bs-toggle="dropdown" aria-expanded="false">
                    Difficulty
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type='button' onClick={()=>handleDifficultyToggle("All")}>All</button></li>
                    <li><button className="dropdown-item" type='button' onClick={()=>handleDifficultyToggle("Easy")}>Easy</button></li>
                    <li><button className="dropdown-item" type='button' onClick={()=>handleDifficultyToggle("Medium")}>Medium</button></li>
                    <li><button className="dropdown-item" type='button' onClick={()=>handleDifficultyToggle("Hard")}>Hard</button></li>
                </ul>

                

            </div>
        </div>
    )
}

export default Filters