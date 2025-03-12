const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs').promises;

const getDateSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

(async () => {
    const ReadMe = path.join(__dirname, '..', 'README.md');
    const date = new Date();

    let UserData;
    try {
        const response = await fetch('https://api.github.com/users/linwaru');
        if (!response.ok) throw new Error('Failed to fetch user data');
        UserData = await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        UserData = { followers: 'N/A', following: 'N/A' };
    }

    const tools = [
        { name: "bash", link: "https://www.gnu.org/software/bash/", icon: "https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" },
        { name: "bootstrap", link: "https://getbootstrap.com", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" },
    ];

    const toolIcons = tools.map(tool => `<a href="${tool.link}" target="_blank"><img src="${tool.icon}" alt="${tool.name}" width="40" height="40"/></a>`).join(' ');

    const dateSuffix = getDateSuffix(date.getDate());
    const text = `<!-- You found this secret 👏 -->
    
<h1 align="center">Who Am I?</h1>

## Hi, I'm Lin <img src="https://raw.githubusercontent.com/linwaru/linwaru/main/images/WaveIcon.gif" width="30px">

\`\`\`js
const Linwaru = {
    description: "I am a developer of web projects and programming applications using Js, Ts, Rust and Axulogic, Inc. Founder",
    favouriteLanguage: "Javascript/Typescript/Rust",
    favouriteThings: ["Anime", "Games", "Music", "Programming"],
};
\`\`\`

<h2 align="left">Language and Tools:</h2>
<p align="left">${toolIcons}</p>

## Stats
<div align="center"><img src="https://github-profile-trophy.vercel.app/?username=linwaru&theme=dracula"></div>

## Even More Stats
![Profile Views](https://komarev.com/ghpvc/?username=linwaru&color=blueviolet)&nbsp;&nbsp;![Profile Followers](https://img.shields.io/badge/Followers-${UserData.followers}-blueviolet)&nbsp;&nbsp;![Profile Following](https://img.shields.io/badge/Following-${UserData.following}-blueviolet)
    
<details>
    <summary><b>GitHub</b> Activity</summary>
    <img align="left" src="https://github-readme-stats.vercel.app/api?username=linwaru&theme=tokyonight">
    <img align="right" src="https://github-readme-stats.vercel.app/api/top-langs/?username=linwaru&theme=tokyonight&hide=batchfile">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=linwaru&theme=tokyonight">
</details>

<i>Last updated on ${date.getDate()}${dateSuffix} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]} ${date.getFullYear()} using magic</i> ✨`;

    await fs.writeFile(ReadMe, text);
})();