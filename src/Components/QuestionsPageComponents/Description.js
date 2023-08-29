import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import Information from './Information';
// import Submissions from './Submissions';
import { useParams } from 'react-router-dom';

//trying monaco-editor
import { Editor } from '@monaco-editor/react';
//trying cpp
import 'monaco-editor/dev/vs/basic-languages/cpp/cpp';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp';
import 'monaco-editor/min/vs/basic-languages/cpp/cpp';


//trying java
import 'monaco-editor/dev/vs/basic-languages/java/java';
import 'monaco-editor/esm/vs/basic-languages/java/java';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';


//trying python
import 'monaco-editor/esm/vs/basic-languages/python/python';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';

import '../../CSS_Files/For_description.css';


function Description(props) {

    //useParams se id mikaal lo and convert it to integer because useParams only provides strings
    const { id } = useParams();
    const id_num = parseInt(id);

    // jo props hain usme se list of all problems nikaal lo
    const { list_of_all_probs } = props;

    console.log(list_of_all_probs);
    const prob = list_of_all_probs.find((single_element_of_list_of_all_probs) => single_element_of_list_of_all_probs.row_idx === id_num);




    //caught props now set all the variables

    var time_limit = (prob["time_limit"] != null) ? prob["time_limit"].seconds : 2;
    var memory_limit = ((prob["memory_limit_bytes"]) != null && prob["memory_limit_bytes"] !== 0) ? (prob["memory_limit_bytes"] ) : 16000000;

    //we only need name,description, public_tests ka input and public_tests ka output 
    var name = prob["name"].split('.');
    if (name.length === 2) {
        name = name[1].trim()
    }

    const [description, setDescription] = useState("Description N/A");
    function descriptionSetter(descText) {

        const exampleIndex = descText.lastIndexOf("Example");
        // const noteIndex = descText.lastIndexOf("Note");
        var newDescText;

        newDescText = descText.substring(0, exampleIndex);

        // console.log(newDescText);

        //eslint-disable-next-line
        var youtubeRegex = /\((https:\/\/www\.youtube\.com\/watch\?v=[^\)]+)\)/g;
        var formattedText = newDescText.replace(youtubeRegex, '<a href="$1" target="_blank">$1</a>');
        var inputRegex = /Input/;
        formattedText = formattedText.replace(inputRegex, '<b><hr/>Input</b>')
        var outputRegex = /Output/;
        formattedText = formattedText.replace(outputRegex, '<b>Output</b>')

        setDescription(formattedText);
    }

    useEffect(() => {
        if (prob["description"]) {
            // setDescription(prob["description"]);
            descriptionSetter(prob["description"]);
        }
    }, [prob])

    //all these 4 could be array with length 0 i.e. []
    var sample_input = prob["public_tests"].input;
    var sample_input_copy=sample_input;
    if(sample_input.length===0)
    {
        sample_input=null; //the code compiler api wants input as null incase we do not want to provide any input to it
    }
    else
    {
        var str="";
        for(var i=0;i<sample_input.length;i++)
        {
            str=str+sample_input[i];
        }
        str=str.replace(/\n/g," ");
        // console.log(str);
        sample_input=str;
        sample_input=sample_input.trim();
        // console.log(sample_input);
    }
    var sample_output = prob["public_tests"].output;
    var sample_output_copy=sample_output;
    if(sample_output.length===0)
    {
        sample_output=""; //the code compiler returns output as "" if there is no output produced by our code
    }
    else
    {
        str="";
        for(i=0;i<sample_output.length;i++)
        {
            str=str+" "+sample_output[i];
        }
        str=str.replace(/\n/g," ");
        str=str.split(/\s+/).join(" ");  //actually there were certain questions which had a lot of un-necessary spaces between the characters in the sample output for example if the sample output should be "1 2 3" it was actually "1   2 3". so to create only single space between characters we have used this line
        sample_output=str;
        sample_output=sample_output.trim();
        // console.log("the sample_output is "+sample_output);
    }
    var internal_input = prob["private_tests"].input;
    if(internal_input.length===0)
    {
        internal_input=null; //the code compiler api wants input as null incase we do not want to provide any input to it
    }
    else
    {
        str="";
        for(i=0;i<internal_input.length;i++)
        {
            str=str+internal_input[i];
        }
        str=str.replace(/\n/g," ");
        // console.log(str);
        internal_input=str;
        internal_input=internal_input.trim();
        // console.log(internal_input);
    }
    var internal_output = prob["private_tests"].output;
    if(internal_output.length===0)
    {
        internal_output=""; //the code compiler returns output as "" if there is no output produced by our code
    }
    else
    {
        str="";
        for(i=0;i<internal_output.length;i++)
        {
            str=str+" "+internal_output[i];
        }
        str=str.replace(/\n/g," ");
        internal_output=str;
        internal_output=internal_output.trim();
        // console.log(internal_output);
    }

    //setted all the variables


    /**********************************************************/
    //Editor SET_UP
     //JS code entry
 var JSBOILER="//write your JavaScript code here";
 var PYTHONBOILER="#write your Python code here";
 var CPPBOILER=`#include<bits/stdc++.h>

using namespace std;
                           
int main()
{
  //write your C++ code here
  return 0;
}`;
var JAVABOILER=`/* package whatever; // don't place package name! */

import java.util.*;
import java.lang.*;
import java.io.*;
            
/* Name of the class has to be "Main" only if the class is public. */
public class Ideone
{
  public static void main (String[] args) throws java.lang.Exception
  {
    // your code goes here
  }
}`;

  const [saveJS,setSaveJS]=useState("//write your JavaScript code here");
  const [savePython,setSavePython]=useState("#write your Python code here");
  const [saveCPP,setSaveCPP]=useState(`#include<bits/stdc++.h>

using namespace std;
                          
int main()
{
  //write your C++ code here
  return 0;
}`);

  const [saveJAVA,setSaveJAVA]=useState(`/* package whatever; // don't place package name! */

import java.util.*;
import java.lang.*;
import java.io.*;
            
/* Name of the class has to be "Main" only if the class is public. */
public class Ideone
{
  public static void main (String[] args) throws java.lang.Exception
  {
    // your code goes here
  }
}`);




  // now trying to get the language button
  const[codeLang,setCodeLang]= useState("javascript");

  // getting the written data in the editor
  const [editorValue, setEditorValue] = useState('');

  //when user clicks the Submit button, we need to get the final value of the code
  // const [finalSubmit,setFinalSubmit]=useState(editorValue); //this variable called finalSubmit has all the code that needs to be submitted to the code compiler

  useEffect(()=>{
    switch (codeLang) 
    {
      case "javascript":
          if(saveJS===JSBOILER)
          {
            setEditorValue(`//write your JavaScript code here`);
          }
          else
          {
            setEditorValue(saveJS);
          }
        break;

      case "cpp":
        if(saveCPP===CPPBOILER)
        {
        setEditorValue(`#include<bits/stdc++.h>

using namespace std;
                        
int main()
{
  //write your C++ code here
  return 0;
}`);
        }
        else
        {
          setEditorValue(saveCPP);
        }
        break;

        case "java":
          if(saveJAVA===JAVABOILER)
          {
          setEditorValue(`/* package whatever; // don't place package name! */

import java.util.*;
import java.lang.*;
import java.io.*;
          
/* Name of the class has to be "Main" only if the class is public. */
public class Ideone
{
  public static void main (String[] args) throws java.lang.Exception
  {
    // your code goes here
  }
}`);
          }
          else
          {
            setEditorValue(saveJAVA);
          }
          break;

          case "python":
              if(savePython===PYTHONBOILER)
              {
                setEditorValue(`#write your Python code here`);
              }
              else
              {
                setEditorValue(savePython);
              }
            break;
    
      default:
        break;
    }
  },[codeLang,PYTHONBOILER,JSBOILER,CPPBOILER,JAVABOILER,saveJS,savePython,saveCPP,saveJAVA]);


  // Function to handle changes in the editor
  const handleEditorChange = (newValue, e) => {
    setEditorValue(newValue);
  };


  function dataSaver()
  {
    // console.log(editorValue);
    if(codeLang==="python")
    {
      setSavePython(editorValue);
    }
    else if(codeLang==="javascript")
    {
      setSaveJS(editorValue);
    }
    else if(codeLang==="cpp")
    {
      setSaveCPP(editorValue);
    }
    else if(codeLang==="java")
    {
      setSaveJAVA(editorValue);
    }
  }


  //function to run after pressing the submit or run button
  /**********************************************************/
  const [result,setResult]=useState([]);
  const [query2Executed,setQuery2Executed]=useState(false); //track if query2 is executed or not
  const [runOrSubmit,setRunOrSubmit]=useState("N/A");
  const [didCodePass,setDidCodePass]=useState(0);  //didCodePass status code 0-code unrun, 1-fail, 2-pass in public_tests 3-pass in private_tests

  async function query2(runThisCode,runLang,inp)
  {
      const response=await fetch(
          'https://online-code-compiler.p.rapidapi.com/v1/',
          {
              headers: {
                  'content-type': 'application/json',
                  'X-RapidAPI-Key': '3f2995a296msh75a6b6ce75bb5f2p1e99f7jsn110cdb842e5f',
                  'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
              },
              method:'POST',
              body: JSON.stringify({
                  language: `${runLang}`,//python3 //cpp17 //java //nodejs
                  version: 'latest', // latest
                  code: `${runThisCode}`,
                  input: `${inp}`
              })
          }
      );
    

      const result=await response.json();
      setResult(result);
      setQuery2Executed(true);
  }


  async function codeRunner(inp)
  {
    // setFinalSubmit(editorValue);
    var runLang="cpp17";
    // console.log(codeLang);

    if(codeLang==="javascript")
    {
      runLang="nodejs";
    }
    else if(codeLang==="cpp")
    {
      runLang="cpp17";
    }
    else if(codeLang==="java")
    {
      runLang="java";
    }
    else if(codeLang==="python")
    {
      runLang="python3";
    }
    // console.log(runLang);
    // console.log("final submit hai "+finalSubmit);
    // console.log("editor value hai "+editorValue);
    if(inp===sample_input)
    {
        setRunOrSubmit("run");
        // console.log("yaar inp===sample_input toh ho gaya confirm");
        // console.log(runOrSubmit);
    }
    else if(inp===internal_input)
    {
        setRunOrSubmit("submit");
        // console.log("inp===internal_input");
        // console.log(runOrSubmit);
    }
    await query2(editorValue,runLang,inp);
  }

  useEffect(()=>{
    if(query2Executed)
    {
      // console.log((result["output"].replace(/\n/g, " ")).trim());

      var {cpuTime,memory,output}=result;
      setCpuTime(cpuTime);
      setMemory(memory);
      setShowOutput(output);
      setEvalOutput((output.replace(/\n/g, " ")).trim());
      setQuery2Executed(false);
    }
  },[query2Executed,result]);

  const[cpuTime,setCpuTime]=useState(null);
  const[memory,setMemory]=useState(null);
  const[showOutput,setShowOutput]=useState("N/A"); //this variable is only used to show the output in the card component
  const[evalOutput,setEvalOutput]=useState("N/A"); //this variable is used to evaluate the output

  // ab hamein dekhna hai ki actually kya jo evalOutput hai wo equal hai sample_output ya fir internal_output ke ya nahi hai
  useEffect(()=>{
    // console.log("ye wala hai kya "+runOrSubmit+ "   "+evalOutput);
    if(evalOutput!=="N/A" && runOrSubmit !== "N/A") // if evalOutput is not N/A it means that it has been set to something means code was compiled
    {
      // console.log("eval and samp_out ko compare karo &"+evalOutput+ "&"+sample_output);
        if((runOrSubmit==="run") && (evalOutput===sample_output) && (cpuTime<=time_limit) && (memory<=memory_limit))
        {
            setDidCodePass(2);
            // console.log("evalOutput===sample_output");
            // console.log("after running didCodePass ki value hai "+didCodePass);
        }
        else if ((runOrSubmit==="submit") && (evalOutput===internal_output) && (cpuTime<=time_limit) && (memory<=memory_limit))
        {
            setDidCodePass(3);
            // console.log("after running didCodePass ki value hai "+didCodePass);
        }
        else if ((runOrSubmit==="run" && evalOutput!==sample_output)||(runOrSubmit==="submit" && evalOutput!==internal_output))
        {
          setDidCodePass(1);
          // console.log("after running didCodePass ki value hai "+didCodePass);
        }

    }
    else if(evalOutput==="N/A")
    {
        setDidCodePass(0);
        // console.log("after running didCodePass ki value hai "+didCodePass);
    }
  },[evalOutput,runOrSubmit,internal_output,sample_output,didCodePass,memory,memory_limit,time_limit,cpuTime]);
  /**********************************************************/
  //final step of setting up the colors associated to different didCodePass values
  const [didCodePassColor,setDidCodePassColor]=useState("pink");
  const [didCodePassText,setDidCodePassText]=useState("Run code to find out Judgement");
  useEffect(()=>{
    if(didCodePass===0)
    {
      setDidCodePassColor("pink");
      setDidCodePassText("Run code to find out Judgement");
    }
    else if(didCodePass===1)
    {
      setDidCodePassColor("red");
      setDidCodePassText("Failed");
    }
    else if(didCodePass===2)
    {
      setDidCodePassColor("orange");
      setDidCodePassText("Sample Test Cases Passed");
    }
    else if(didCodePass===3)
    {
      setDidCodePassColor("green");
      setDidCodePassText("All Test Cases Passed");
    }
  },[didCodePass]);


  /**********************************************************/

    



    function copytext() {
        // console.log("hii");
        var formattedInput = sample_input_copy;
        formattedInput=formattedInput.join(" ");
        navigator.clipboard.writeText(formattedInput);
        let CopyButton = document.getElementById("CopyButton")
        CopyButton.innerText = "Copied! ✅";
        setInterval(() => { CopyButton.innerText = "Copy Inputs" }, 3000)

    }

    

    return (
        <div>
            <div className='big0'>

                

                <div className="big1">
                    <div className="card card1" >
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <h3>{name}</h3>
                            <br />
                            <h4 style={{ color: 'blue', }}>Desciption</h4>
                            <br />
                            <p style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '0px', whiteSpace: 'pre-wrap', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} ></p>
                            <br />

                        </div>

                        <table style={{ width: '100%', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th><b>Sample Input</b></th>
                                    <th><b>Sample Output</b></th>
                                </tr>
                                <tr style={{ textAlign: 'center', }}>
                                    <td><pre style={{ whiteSpace: 'pre-wrap' }}> {sample_input_copy} </pre></td>
                                    <td><pre style={{ whiteSpace: 'pre-wrap' }}> {sample_output_copy} </pre></td>
                                </tr>
                                <tr style={{ textAlign: 'center', }}>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm" id="CopyButton" onClick={copytext}>Copy Inputs</button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <br />
                    </div>

                    <div className='big3' >
                        <div className='infoBoxWhenSmall' style={{ border: 'dashed', backgroundColor: '#fff', borderWidth: '2px', }}>
                          <Information data={prob} />
                        </div>
                    </div>

                    <div className='card card1' >
                        <div style={{flexDirection:'row'}}>
                            
                            <button type="button" style={{maxHeight:'50px',maxWidth:'150px'}} className="btn btn-primary dropdown-toggle mx-2 my-3" data-bs-toggle="dropdown" aria-expanded="false">
                                {codeLang.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase())}
                            </button>
                            <button type="button" style={{maxHeight:'50px',maxWidth:'150px'}} className="btn btn-primary my-3 mx-2" onClick={() => { codeRunner(sample_input) }}>Run</button>
                            <button type="button" style={{maxHeight:'50px',maxWidth:'150px'}} className="btn btn-primary my-3 mx-2" onClick={() => { codeRunner(internal_input) }}>Submit</button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => { dataSaver(); setCodeLang("cpp"); }}>Cpp</button></li>
                                <li><button className="dropdown-item" onClick={() => { dataSaver(); setCodeLang("java"); }}>Java</button></li>
                                <li><button className="dropdown-item" onClick={() => { dataSaver(); setCodeLang("python"); }}>Python</button></li>
                                <li><button className="dropdown-item" onClick={() => { dataSaver(); setCodeLang("javascript"); }}>Javascript</button></li>
                            </ul>

                            
                            <Editor height="50vh" width="100%" language={codeLang} value={editorValue} onChange={handleEditorChange} />
                            
                            
                        </div>
                    </div>

                    <div className='card card1' >
                        <h3 style={{textAlign:'center'}}>Output/Judgement</h3>
                        <div className='container' style={{display:'flex',flexDirection:'row'}}>
                            <div style={{width:'50%'}}>
                                <ul style={{listStyleType:'none'}}>
                                    <li><b>CPU TIME:</b> {cpuTime===null?(<p>N/A</p>):(<p>{cpuTime}s</p>)}</li>
                                    <li><b>MEMORY:</b> {memory===null?(<p>N/A</p>):(<p>{memory}KB</p>)}</li>
                                    <li><b>OUTPUT:</b> <pre style={{whiteSpace:'pre-wrap'}}>{showOutput} </pre></li>
                                </ul>   
                            </div>

                            <div type="button" className='btn' style={{textAlign:'center',width:'50%',justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:`${didCodePassColor}`,color:'white' ,maxWidth:'400px'}} >
                                <b>{didCodePassText}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='big2' >
                    <div style={{ border: 'dashed', backgroundColor: '#fff', borderWidth: '2px', }}>
                        <Information data={prob} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Description