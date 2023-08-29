import React from 'react'

function Features() {
    return (
        <div>
            <div className="accordion mx-4" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <b>About PiNacle Coder</b>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            The website loads questions in a infinite scrolling pattern (Just like TikTok 😛). Choose your desired difficulty and start solving the question. You can "Run" your code to see the judgement on sample test-cases or "Submit" it for final judgement.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            <b>API's and Tech-Stack Used</b>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Completely front-end.</strong> <br/> Made using ReactJS, it uses two API's -- <ul><li>Huggingface Deep-mind Code_contests Train Dataset</li> <li>RapidAPI online code compiler (P.S. Do not try to exhaust my monthly POST limit 🙏)</li></ul> <br/> The site uses a few external packages <ul><li>FontAwesome</li> <li>Monaco-Editor/React</li> <li>Bootstrap/React</li> </ul> <br /> The final ingredient in the list is often the least mentioned - <code>LOTS OF LOVE ♥️</code> <br /> At last, a huge thanks to Ethan Caballero (https://github.com/ethancaballero) for Web-scraping all the dataset.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            <b>About Me</b>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Hi! It's-a-me-Sankalpie. Follow me on Insta @sankalpie . 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features