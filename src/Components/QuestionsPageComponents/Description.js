import React, { useEffect, useState } from 'react';
import Information from './Information';
import { useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import 'monaco-editor/dev/vs/basic-languages/cpp/cpp';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp';
import 'monaco-editor/min/vs/basic-languages/cpp/cpp';
import 'monaco-editor/dev/vs/basic-languages/java/java';
import 'monaco-editor/esm/vs/basic-languages/java/java';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/python/python';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import '../../CSS_Files/For_description.css';


function Description(props) {

    const { id } = useParams();
    const id_num = parseInt(id);

    const { list_of_all_probs } = props;

    console.log(list_of_all_probs);
    const prob = list_of_all_probs.find((single_element_of_list_of_all_probs) => single_element_of_list_of_all_probs.row_idx === id_num);

    var time_limit = (prob["time_limit"] != null) ? prob["time_limit"].seconds : 2;
    var memory_limit = ((prob["memory_limit_bytes"]) != null && prob["memory_limit_bytes"] !== 0) ? (prob["memory_limit_bytes"]) : 16000000;

    var name = prob["name"].split('.');
    if (name.length === 2) {
        name = name[1].trim()
    }

    const [description, setDescription] = useState("Description N/A");
    function descriptionSetter(descText) {
        const exampleIndex = descText.lastIndexOf("Example");
        var newDescText;
        newDescText = descText.substring(0, exampleIndex);
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
            descriptionSetter(prob["description"]);
        }
    }, [prob])

    var sample_input = prob["public_tests"].input;
    var sample_input_copy = sample_input;
    if (sample_input.length === 0) {
        sample_input = null;
    } else {
        var str = "";
        for (var i = 0; i < sample_input.length; i++) {
            str = str + sample_input[i];
        }
        str = str.replace(/\n/g, " ");
        sample_input = str;
        sample_input = sample_input.trim();
    }

    var sample_output = prob["public_tests"].output;
    var sample_output_copy = sample_output;
    if (sample_output.length === 0) {
        sample_output = "";
    } else {
        str = "";
        for (i = 0; i < sample_output.length; i++) {
            str = str + " " + sample_output[i];
        }
        str = str.replace(/\n/g, " ");
        str = str.split(/\s+/).join(" ");
        sample_output = str;
        sample_output = sample_output.trim();
    }

    var internal_input = prob["private_tests"].input;
    if (internal_input.length === 0) {
        internal_input = null;
    } else {
        str = "";
        for (i = 0; i < internal_input.length; i++) {
            str = str + internal_input[i];
        }
        str = str.replace(/\n/g, " ");
        internal_input = str;
        internal_input = internal_input.trim();
    }

    var internal_output = prob["private_tests"].output;
    if (internal_output.length === 0) {
        internal_output = "";
    } else {
        str = "";
        for (i = 0; i < internal_output.length; i++) {
            str = str + " " + internal_output[i];
        }
        str = str.replace(/\n/g, " ");
        internal_output = str;
        internal_output = internal_output.trim();
    }

    /**********************************************************/
    // Editor SET_UP
    var JSBOILER = "//write your JavaScript code here";
    var PYTHONBOILER = "#write your Python code here";
    var CPPBOILER = `#include<bits/stdc++.h>

using namespace std;
                           
int main()
{
  //write your C++ code here
  return 0;
}`;
    var JAVABOILER = `/* package whatever; // don't place package name! */

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

    const [saveJS, setSaveJS] = useState("//write your JavaScript code here");
    const [savePython, setSavePython] = useState("#write your Python code here");
    const [saveCPP, setSaveCPP] = useState(`#include<bits/stdc++.h>

using namespace std;
                          
int main()
{
  //write your C++ code here
  return 0;
}`);
    const [saveJAVA, setSaveJAVA] = useState(`/* package whatever; // don't place package name! */

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

    const [codeLang, setCodeLang] = useState("javascript");
    const [editorValue, setEditorValue] = useState('');

    useEffect(() => {
        switch (codeLang) {
            case "javascript":
                setEditorValue(saveJS === JSBOILER ? `//write your JavaScript code here` : saveJS);
                break;
            case "cpp":
                setEditorValue(saveCPP === CPPBOILER ? `#include<bits/stdc++.h>

using namespace std;
                        
int main()
{
  //write your C++ code here
  return 0;
}` : saveCPP);
                break;
            case "java":
                setEditorValue(saveJAVA === JAVABOILER ? `/* package whatever; // don't place package name! */

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
}` : saveJAVA);
                break;
            case "python":
                setEditorValue(savePython === PYTHONBOILER ? `#write your Python code here` : savePython);
                break;
            default:
                break;
        }
    }, [codeLang, PYTHONBOILER, JSBOILER, CPPBOILER, JAVABOILER, saveJS, savePython, saveCPP, saveJAVA]);

    const handleEditorChange = (newValue, e) => {
        setEditorValue(newValue);
    };

    function dataSaver() {
        if (codeLang === "python") setSavePython(editorValue);
        else if (codeLang === "javascript") setSaveJS(editorValue);
        else if (codeLang === "cpp") setSaveCPP(editorValue);
        else if (codeLang === "java") setSaveJAVA(editorValue);
    }

    /**********************************************************/
    const [result, setResult] = useState(null);
    const [query2Executed, setQuery2Executed] = useState(false);
    const [runOrSubmit, setRunOrSubmit] = useState("N/A");
    const [didCodePass, setDidCodePass] = useState(0);

    // ✅ Judge0 CE via RapidAPI
    async function query2(runThisCode, languageId, inp) {
        const RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY_HERE"; // 🔑 Replace with your key

        const response = await fetch(
            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": RAPIDAPI_KEY,
                    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
                },
                body: JSON.stringify({
                    language_id: languageId,
                    source_code: runThisCode,
                    stdin: inp ?? ""
                })
            }
        );

        const data = await response.json();

        // stdout is the normal output; fall back to stderr or compile_output on error
        const output = data.stdout ?? data.stderr ?? data.compile_output ?? "No output";

        setResult({
            output: output,
            cpuTime: data.time ?? null,       // ✅ Judge0 returns time in seconds e.g. "0.016"
            memory: data.memory ?? null        // ✅ Judge0 returns memory in KB e.g. 7392
        });
        setQuery2Executed(true);
    }

    // ✅ Language ID map based on the Judge0 CE language list you provided
    async function codeRunner(inp) {
        var languageId;

        if (codeLang === "javascript") {
            languageId = 93;   // JavaScript (Node.js 18.15.0)
        } else if (codeLang === "cpp") {
            languageId = 54;   // C++ (GCC 9.2.0)
        } else if (codeLang === "java") {
            languageId = 91;   // Java (JDK 17.0.6)
        } else if (codeLang === "python") {
            languageId = 92;   // Python (3.11.2)
        }

        if (inp === sample_input) {
            setRunOrSubmit("run");
        } else if (inp === internal_input) {
            setRunOrSubmit("submit");
        }

        await query2(editorValue, languageId, inp);
    }

    useEffect(() => {
        if (query2Executed && result) {
            const { cpuTime, memory, output } = result;
            setCpuTime(cpuTime);
            setMemory(memory);
            setShowOutput(output);
            setEvalOutput((output.replace(/\n/g, " ")).trim());
            setQuery2Executed(false);
        }
    }, [query2Executed, result]);

    const [cpuTime, setCpuTime] = useState(null);
    const [memory, setMemory] = useState(null);
    const [showOutput, setShowOutput] = useState("N/A");
    const [evalOutput, setEvalOutput] = useState("N/A");

    useEffect(() => {
        if (evalOutput !== "N/A" && runOrSubmit !== "N/A") {
            if ((runOrSubmit === "run") && (evalOutput === sample_output) && (parseFloat(cpuTime) <= time_limit) && (memory <= memory_limit / 1024)) {
                setDidCodePass(2);
            } else if ((runOrSubmit === "submit") && (evalOutput === internal_output) && (parseFloat(cpuTime) <= time_limit) && (memory <= memory_limit / 1024)) {
                setDidCodePass(3);
            } else if (
                (runOrSubmit === "run" && evalOutput !== sample_output) ||
                (runOrSubmit === "submit" && evalOutput !== internal_output)
            ) {
                setDidCodePass(1);
            }
        } else if (evalOutput === "N/A") {
            setDidCodePass(0);
        }
    }, [evalOutput, runOrSubmit, internal_output, sample_output, cpuTime, memory, time_limit, memory_limit]);

    /**********************************************************/
    const [didCodePassColor, setDidCodePassColor] = useState("pink");
    const [didCodePassText, setDidCodePassText] = useState("Run code to find out Judgement");

    useEffect(() => {
        if (didCodePass === 0) {
            setDidCodePassColor("pink");
            setDidCodePassText("Run code to find out Judgement");
        } else if (didCodePass === 1) {
            setDidCodePassColor("red");
            setDidCodePassText("Failed");
        } else if (didCodePass === 2) {
            setDidCodePassColor("orange");
            setDidCodePassText("Sample Test Cases Passed");
        } else if (didCodePass === 3) {
            setDidCodePassColor("green");
            setDidCodePassText("All Test Cases Passed");
        }
    }, [didCodePass]);
    /**********************************************************/

    function copytext() {
        var formattedInput = sample_input_copy;
        formattedInput = formattedInput.join(" ");
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
                        <div style={{ flexDirection: 'row' }}>
                            <button type="button" style={{ maxHeight: '50px', maxWidth: '150px' }} className="btn btn-primary dropdown-toggle mx-2 my-3" data-bs-toggle="dropdown" aria-expanded="false">
                                {codeLang.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase())}
                            </button>
                            <button type="button" style={{ maxHeight: '50px', maxWidth: '150px' }} className="btn btn-primary my-3 mx-2" onClick={() => { codeRunner(sample_input) }}>Run</button>
                            <button type="button" style={{ maxHeight: '50px', maxWidth: '150px' }} className="btn btn-primary my-3 mx-2" onClick={() => { codeRunner(internal_input) }}>Submit</button>
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
                        <h3 style={{ textAlign: 'center' }}>Output/Judgement</h3>
                        <div className='container' style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '50%' }}>
                                <ul style={{ listStyleType: 'none' }}>
                                    {/* ✅ Judge0 returns real cpu time and memory */}
                                    <li><b>CPU TIME:</b> {cpuTime === null ? <p>N/A</p> : <p>{cpuTime}s</p>}</li>
                                    <li><b>MEMORY:</b> {memory === null ? <p>N/A</p> : <p>{memory} KB</p>}</li>
                                    <li><b>OUTPUT:</b> <pre style={{ whiteSpace: 'pre-wrap' }}>{showOutput}</pre></li>
                                </ul>
                            </div>
                            <div type="button" className='btn' style={{ textAlign: 'center', width: '50%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: `${didCodePassColor}`, color: 'white', maxWidth: '400px' }}>
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

export default Description;
