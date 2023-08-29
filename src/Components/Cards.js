import React, { useEffect, useState } from 'react';
import '../CSS_Files/For_cards.css';
import CardRow from './CardRow';
import { Route, Routes } from 'react-router-dom';
import Description from './QuestionsPageComponents/Description';
import Features from './Features';

function Cards(props) {
    const {selectedDifficulty}=props;
    

    const [dataset, setDataset] = useState([]);

    var probs = [];

    const [actualProbs, setActualProbs] = useState([]);


    async function query(API_TOKEN, offset) {
        try {
            const response = await fetch(
                `https://datasets-server.huggingface.co/rows?dataset=deepmind%2Fcode_contests&config=default&split=train&offset=${offset}&limit=20`,
                {
                    method: "GET"
                }
            );
            const result = await response.json();
            setDataset(result);
            // return result;
        }
        catch (e) {
            console.log(e);
        }
    }

    // const API_TOKEN = "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";
    //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
    
    const API_TOKEN="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";

    var len_of_resp = 20;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        async function fetchData() {
            await query(API_TOKEN, offset);
        }
        fetchData();
    }, [offset]);


    
    //new useEffect *************************************************************
    //******************************************************** */
    
    //initially --- 0 to 100 easy --- 0 to 6 medium --- 5 to 11 hard --- 10 to 100 
    const [lowerLimit,setLowerLimit]=useState(1);
    const [upperLimit,setUpperLimit]=useState(101);

    

    //we need to extract the difficulty of questions that the user has chosen
    useEffect(()=>{
        
        switch(selectedDifficulty){
            case "Easy":
                setLowerLimit(0);
                setUpperLimit(6);
                
                probs=[];
                // setProbs([]);
                setActualProbs([]);
                setOffset(0);
                setDataset([]);
                
                // console.log("Easy  ",lowerLimit," ",upperLimit);
                // window.location.reload();
                break;
            case "Medium":
                setLowerLimit(5);
                setUpperLimit(11);
                
                probs=[];
                // setProbs([]);
                setActualProbs([]);
                setOffset(0);
                setDataset([]);
                
                // console.log("Medium  ",lowerLimit," ",upperLimit);
                // window.location.reload();
                break;
            case "Hard":
                setLowerLimit(10);
                setUpperLimit(100);
                
                probs=[];
                // setProbs([]);
                setActualProbs([]);
                setOffset(0);
                setDataset([]);
                
                // console.log("Hard  ",lowerLimit," ",upperLimit);
                // window.location.reload();
                break;
            case "All":
                setLowerLimit(0);
                setUpperLimit(100);
                
                probs=[];
                setActualProbs([]);
                setOffset(0);
                setDataset([]);

                // console.log("All  ",lowerLimit," ",upperLimit);
                break;
            default:
                setLowerLimit(0);
                setUpperLimit(100);
                // console.log("Default  ",lowerLimit," ",upperLimit);
                break;
        }

        // window.location.reload();
    },[selectedDifficulty,lowerLimit,upperLimit])


    //now extracted the difficulty of questions that the user has chosen

    useEffect(() => {
        console.log(dataset); // This will log the updated state when it changes

        try {
            if (dataset && dataset.rows && dataset.rows.length > 0 ) {
                const rowIndices = Object.keys(dataset.rows);

                //there will be a warning if we use the .map() without any return statement. so I have disable the warning through this comment

                // eslint-disable-next-line
                rowIndices.map((currElem) => { dataset.rows[currElem].row["row_idx"] = dataset.rows[currElem].row_idx;  probs.push(dataset.rows[currElem].row);  });

                ///////////////////////////////////////////////////////
                var filteredProbs=probs.filter((currElem)=>currElem.difficulty >lowerLimit && currElem.difficulty <upperLimit);
                setActualProbs((probs2)=>probs2.concat(filteredProbs));
                setOffset((prevOffset)=>prevOffset+len_of_resp);
                
                
                if(actualProbs.length>1000)
                {
                    setActualProbs((prevActualProbs) => {
                        const newActualProbs = prevActualProbs.concat(filteredProbs);
                        return newActualProbs.slice(0, 1000); // Ensure it contains at most 1000 items
                    });
                    // setVodka(!vodka);
                    
                }

                

                setLoading(false);
                
            }
        } catch (e) {
            console.log(e);
        }
        //eslint-disable-next-line
    }, [dataset,lowerLimit,upperLimit]);


    /*
    useEffect(() => {
        console.log(dataset); // This will log the updated state when it changes

        try {
            if (dataset && dataset.rows && dataset.rows.length > 0) {
                const rowIndices = Object.keys(dataset.rows);

                //there will be a warning if we use the .map() without any return statement. so I have disable the warning through this comment

                // eslint-disable-next-line
                rowIndices.map((currElem) => { dataset.rows[currElem].row["row_idx"] = dataset.rows[currElem].row_idx;  probs.push(dataset.rows[currElem].row);  });

                ///////////////////////////////////////////////////////
                var filteredProbs=probs.filter((currElem)=>currElem.difficulty >10 && currElem.difficulty <100);
                setActualProbs((probs2)=>probs2.concat(filteredProbs));

                setLoading(false); //ye wala tha

                if(actualProbs.length<20)
                {
                    setOffset((prevOffset)=>prevOffset+len_of_resp);
                }
                if(actualProbs.length>20)
                {
                    // setActualProbs(actualProbs.slice(0,20));
                    setActualProbs((prevActualProbs) => {
                        const newActualProbs = prevActualProbs.concat(filteredProbs);
                        return newActualProbs.slice(0, 20); // Ensure it contains at most 20 items
                    });
                }

                // setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }, [dataset]);
    */


    // useEffect(()=>{
    //     if(probs.length>0)
    //     {
    //         var filteredProbs=probs.filter((currElem)=>currElem.difficulty >1 && currElem.difficulty <5);
    //         setActualProbs(filteredProbs.slice(0, 20)); // Take the first 20 filtered questions
    //         setLoading(false);
    //     }
    // },[probs]);




    const [loading, setLoading] = useState(true);
    if (loading) {

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-green`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>

                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-orange`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>

                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-red`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>

                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-green`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>


                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-orange`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>

                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-red`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>

                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-green`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>

                    <div className="col-10 col-md-3 mt-5 ">
                    
                        <div className={`card-body card p-2 card-orange`}>
                            <h4 className="problem-name placeholder-glow"><span className="placeholder col-12"></span></h4>
                            <hr />
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>
                            <p className="problem-footer placeholder-glow"><span className="placeholder col-12"></span></p>

                        </div>
                
                    </div>


                </div>
            </div>
        )
    }

    return (
        
        <Routes>
            <Route path='/' element=
                {
                    <div className="container-fluid">
                        <div className="row">
                            {
                                // actualProbs is the array that has all the data of the 20 questions
                                actualProbs.map((currElem) => {
                                    return (
                                        <CardRow key={currElem["row_idx"]} prob={currElem} id={currElem["row_idx"]} />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            />


            <Route path='/details/:id' element={<Description list_of_all_probs={actualProbs} />} />

            <Route path='/Features' element={<Features/>}/>
        </Routes>
     
    )
}

export default Cards