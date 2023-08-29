# PiNacle-Coder
**A Coding Website similar to CodeForces**

# Main Features
1. Contains a collection of questions from various programming sites (CodeChef, CodeForces, Kattis, etc).
2. The website has an infinite scrolling interface ♾️ More questions pop up as you scroll.
3. The questions can be sorted by their difficulty 📈 📉
4. Every question has its own description page 
5. The description page contains:
    - The explanation of the problem 🤓
    - The Time Limit, Memory Limit, Tags 
    - A code editor to write code with support for C++, Java, JavaScript and Python 👩‍💻
    - A results section which provides the judgement based on the solution coded by the user (button turns 🟠 when sample test cases pass and 🟢 when ALL test cases pass)

# Tech-Stacks Used
### Front-end
The entire font-end is designed with React, styled with CSS and Bootstrap
> * [ReactJS](https://react.dev/)
> * [Bootstrap](https://getbootstrap.com/)
### Dataset
The dataset is fetched from HuggingFace Deepmind Code-Contests dataset
> * [Deepmind/code_contests](https://huggingface.co/datasets/deepmind/code_contests)
### API's used
> * [code_contests training dataset](https://datasets-server.huggingface.co/rows?dataset=deepmind%2Fcode_contests&config=default&split=train&offset=0&limit=20)
> * [RapidAPI code compiler](https://rapidapi.com/Glavier/api/online-code-compiler/pricing)
### External Libraries/Plugins
> * [Monaco-editor-react](https://microsoft.github.io/monaco-editor/)

***
`For the entire Timeline of the project refer to "track_record" `