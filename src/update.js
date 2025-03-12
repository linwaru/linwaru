const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');

(async () => {
    // Get ReadMe path
    const ReadMe = path.join(__dirname, '..', 'README.md');
    const date = new Date();

    // Verificar se a data já foi atualizada hoje
    const readmeContent = fs.readFileSync(ReadMe, 'utf-8');
    const regex = /Last updated on (\d{1,2})(st|nd|rd|th)? (\w+) (\d{4})/;
    const match = readmeContent.match(regex);
    if (match && match[1] == date.getDate() && match[3] == ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]) {
        console.log('README.md is already up to date!');
        return;  // Não atualiza se a data já foi alterada hoje
    }

    // Fetching Info From Github API
    let UserData = await fetch('https://api.github.com/users/linwaru').then(res => res.json());

    // Creating the text what we gonna save on ReadMe file
    const text = `<!-- You found this secret 👏 -->
    <!--
        My secret things lol
        
        - I code more hours 
        - I am a gamer too 
        - I play Minecraft, Grand Fantasia, Strinova, Transformice and much more
        - This readme.md is created using GitHub Codespaces 👀
    -->
        
    <h1 align="center">Who Am I?</h1>
        
    ## Hi, I'm Lin <img src="https://raw.githubusercontent.com/linwaru/linwaru/main/images/WaveIcon.gif" width="30px">
    
    \`\`\`js
    const Linwaru = {
        description: "I am a developer of web projects and programming applications using Js, Ts, Rust and Axulogic, Inc. Founder",
        favouriteLanguage: "Javascript/Typescript/Rust",
        favouriteThings: ["Anime", "Games", "Music", "Programming"],
    }; //I'm a simple person who likes to program and play games
    \`\`\`
    <h2 align="left">Language and Tools:</h2>
    <p align="left"> <a href="https://www.gnu.org/software/bash/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" alt="bash" width="40" height="40"/> </a> <a href="https://getbootstrap.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> ... </p>

    ## Stats
    <div align="center"><img src="https://github-profile-trophy.vercel.app/?username=linwaru&theme=dracula"></div>

    ## Even More Stats
    ![Profile Views](https://komarev.com/ghpvc/?username=linwaru&color=blueviolet)&nbsp;&nbsp;![Profile Followers](https://img.shields.io/badge/Followers-${UserData.followers}-blueviolet)&nbsp;&nbsp;![Profile Following](https://img.shields.io/badge/Following-${UserData.following}-blueviolet)
        
    <details>
        <summary><b>GitHub</b> Activity</summary>
        <img align="left" src="https://github-readme-stats.vercel.app/api?username=linwaru&theme=tokyonight"><img align="right" src="https://github-readme-stats.vercel.app/api/top-langs/?username=linwaru&theme=tokyonight&hide=batchfile">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=linwaru&theme=tokyonight">
    </details>
    <!-- Last updated on ${date.toString()} -->
    <i>Last updated on ${date.getDate()}${date.getDate()===1?"st":date.getDate()===2?"nd":date.getDate()===3?"rd":"th"} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]} ${date.getFullYear()} using magic</i> ✨`;

    // Saving on readme.md
    fs.writeFileSync(ReadMe, text);
})();