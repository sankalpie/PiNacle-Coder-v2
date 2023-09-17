import React, { useEffect, useState } from 'react';
import '../CSS_Files/For_cards.css';
import CardRow from './CardRow';
import { Route, Routes } from 'react-router-dom';
import Description from './QuestionsPageComponents/Description';
import Features from './Features';

function Cards(props) {
    const {selectedDifficulty}=props;
    
    const [dataset, setDataset] = useState([]);

    const [actualProbs, setActualProbs] = useState([]);

    // Define lowerLimit and upperLimit based on selectedDifficulty
    //initially --- 0 to 100 (easy --- 0 to 6) (medium --- 5 to 11) (hard --- 10 to 100) 
    const [lowerLimit, setLowerLimit] = useState(0);
    const [upperLimit, setUpperLimit] = useState(100);

    //the hugging face api is not working. Instead using npoint
    //code_contests1
    //https://api.npoint.io/0dcadbf81d0bde31b6e9
    //code_contests2
    //https://api.npoint.io/e4a4084faeb3ba4b4abf
    //code_contests3
    //https://api.npoint.io/974ecbf212f4c0b330a7

    async function query() {
        try {
            const response = await fetch(
                `https://api.npoint.io/974ecbf212f4c0b330a7`,
                {
                    method: "GET"
                }
            );
            const result = await response.json();
            setDataset(result);
        }
        catch (e) {
            console.log(e);
        }
    }

    function filterDataset() {
        if (dataset && dataset.length > 0) {
          const filteredProbs = dataset.filter(
            (currElem) =>
              currElem.difficulty > lowerLimit && currElem.difficulty < upperLimit
          );
          setActualProbs(filteredProbs);
          setLoading(false);
        }
    }

    useEffect(() => {
        query();
    }, [selectedDifficulty]);

    useEffect(() => {
        filterDataset();
        //eslint-disable-next-line
    }, [dataset, selectedDifficulty, lowerLimit, upperLimit]);


    useEffect(() => {
        switch (selectedDifficulty) {
          case 'Easy':
            setLowerLimit(0);
            setUpperLimit(6);
            break;
          case 'Medium':
            setLowerLimit(5);
            setUpperLimit(11);
            break;
          case 'Hard':
            setLowerLimit(10);
            setUpperLimit(100);
            break;
          case 'All':
            setLowerLimit(0);
            setUpperLimit(100);
            break;
          default:
            setLowerLimit(0);
            setUpperLimit(100);
            break;
        }
    }, [selectedDifficulty]);

    //now trying CHAT GPT CODE
    /* 

    useEffect(() => {
        async function fetchData() {
            await query();
        }
        fetchData();
    }, []);

    
    //initially --- 0 to 100 easy --- 0 to 6 medium --- 5 to 11 hard --- 10 to 100 
    const [lowerLimit,setLowerLimit]=useState(1);
    const [upperLimit,setUpperLimit]=useState(101);

    

    //we need to extract the difficulty of questions that the user has chosen
    useEffect(()=>{
        
        switch(selectedDifficulty){
            case "Easy":
                setLowerLimit(0);
                setUpperLimit(6);

                
                break;
            case "Medium":
                setLowerLimit(5);
                setUpperLimit(11);        

                break;
            case "Hard":
                setLowerLimit(10);
                setUpperLimit(100);

                break;
            case "All":
                setLowerLimit(0);
                setUpperLimit(100);

                break;
            default:
                setLowerLimit(0);
                setUpperLimit(100);
                break;
        }

    },[selectedDifficulty,lowerLimit,upperLimit])


    //now extracted the difficulty of questions that the user has chosen

    useEffect(() => {
        console.log(dataset); // This will log the updated state when it changes

        try {
            if (dataset &&  dataset.length > 0 ) {
                //there will be a warning if we use the .map() without any return statement. so I have disable the warning through this comment
                // eslint-disable-next-line
                //uncomment this line if error// dataset.map((currElem) => { setActualProbs((prevActualProbs)=>{ prevActualProbs.concat(currElem) })});

                setActualProbs(dataset);

                var filteredProbs=actualProbs.filter((currElem)=>currElem.difficulty >lowerLimit && currElem.difficulty <upperLimit) 
                
                console.log(lowerLimit+"  "+upperLimit);
                console.log(filteredProbs);

                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
        //eslint-disable-next-line
    }, [dataset,lowerLimit,upperLimit]);
    
    */
   //NOW ENDED TRYING CHAT GPT CODE

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