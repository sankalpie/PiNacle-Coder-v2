import React from 'react';
import '../CSS_Files/For_cards.css';
import { Link } from 'react-router-dom';

function CardRow(props) {

    const { prob,id } = props;

    //setting the names of variables we want to extract
    var difficulty = (prob["difficulty"] === 0) ? 5 : prob["difficulty"];
    var time_limit = (prob["time_limit"] != null) ? prob["time_limit"].seconds : 2;
    var memory_limit = ((prob["memory_limit_bytes"] / 1000000) != null && prob["memory_limit_bytes"] !== 0) ? (prob["memory_limit_bytes"] / 1000000) : 16;


    var name = prob["name"].split('.');
    if (name.length === 2) {
        name = name[1].trim()
    }

    var diff_color = "green";
    if (prob["difficulty"] >= 6 && prob["difficulty"] <= 10) {
        diff_color = "orange";
    }
    else if (prob["difficulty"] > 10) {
        diff_color = "red";
    }

    //setted names of variables we wanted to extract

    return (

        <div className="col-10 col-md-3 mt-5 ">
            
                <div className={`card-body card p-2 card-${diff_color}`}>

                    <Link to={`/details/${id}`}>
                    <h4 className="problem-name">{name}</h4>
                    </Link>

                    <hr />
                    <p className="problem-footer">Difficulty: <b> {difficulty} </b></p>
                    <p className="problem-footer">Time-Limit: <b> {time_limit} sec </b></p>
                    <p className="problem-footer">Memory-Limit: <b>{memory_limit} MB </b></p>

                </div>
            
        </div>
    )
}

export default CardRow