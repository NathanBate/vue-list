import { createApp } from 'vue'
import App from './App.vue'


if (typeof listConfig === 'undefined') {
    var listConfig = {
        showList: true,
        itemsPerPage: 5,
        rowPadding: 1,
        cellPadding: .25,
        cellGap: .25,
        columns: [
            {
                label: "Name",
                link: true,
                key: "name",
                search: true,
                width: 20
            },
            {
                label: "Type",
                key: "type",
                width:15,
                search: true,
            },
            {
                label: "Random Number",
                link: true,
                key: "randomNumber",
                search: true
            }
        ]
    }
}

if (typeof listData === 'undefined') {
    var listData = [
        {
            name: "Google",
            link: "https://google.com",
            type: "Search Engine",
            randomNumber: Math.random(),
        },
        {
            name: "Bing",
            link: "https://bing.com",
            type: "Search Engine",
            randomNumber: Math.random(),
        },
        {
            name: "Laravel",
            link: "https://laravel.com",
            type: "PHP Framework",
            randomNumber: Math.random(),
        },
        {
            name: "PHP",
            link: "https://php.net",
            type: "Programming Language",
            randomNumber: Math.random(),
        },
        {
            name: "Stack Overflow",
            link: "https://stackoverflow.com",
            type: "Support Website",
            randomNumber: Math.random(),
        },
        {
            name: "Microsoft",
            link: "https://microsoft.com",
            type: "Software Company",
            randomNumber: Math.random(),
        },
        {
            name: "Apple",
            link: "https://apple.com",
            type: "Software / Hardware Company",
            randomNumber: Math.random(),
        },
        {
            name: "Dell",
            link: "https://dell.com",
            type: "Hardware Company",
            randomNumber: Math.random(),
        },
        {
            name: "CodePen",
            link: "https://codepen.io",
            type: "Code Editor",
            randomNumber: Math.random(),
        },
        {
            name: "phpStorm",
            link: "https://www.jetbrains.com/phpstorm/",
            type: "Code Editor",
            randomNumber: Math.random(),
        },
        {
            name: "webStorm",
            link: "https://www.jetbrains.com/webstorm/",
            type: "Code Editor",
            randomNumber: Math.random(),
        },
        {
            name: "Visual Studio Code",
            link: "https://code.visualstudio.com/",
            type: "Code Editor",
            randomNumber: Math.random(),
        },
        {
            name: "Atom",
            link: "https://atom.io",
            type: "Code Editor",
            randomNumber: Math.random(),
        },
        {
            name: "GoodNotes",
            link: "https://goodnotes.com",
            type: "Note Taking",
            randomNumber: Math.random(),
        },
        {
            name: "Evernote",
            link: "https://evernote.com",
            type: "Note Taking",
            randomNumber: Math.random(),
        },
        {
            name: "webStorm",
            link: "https://tableplus.com/",
            type: "Database Management",
            randomNumber: Math.random(),
        },
        {
            name: "Transmit",
            link: "https://panic.com/transmit/",
            type: "File Manager",
            randomNumber: Math.random(),
        },
        {
            name: "pyCharm",
            link: "https://www.jetbrains.com/pycharm/",
            type: "Code Editor",
            randomNumber: Math.random(),
        },
        {
            name: "VueJS",
            link: "https://vuejs.org",
            type: "Programming Language",
            randomNumber: Math.random(),
        },
        {
            name: "ReactJS",
            link: "https://reactjs.org",
            type: "Javascript Framework",
            randomNumber: Math.random(),
        },
        {
            name: "React Native",
            link: "https://reactnative.dv",
            type: "Programming Language",
            randomNumber: Math.random(),
        },
        {
            name: "Google Drive",
            link: "https://drive.google.com",
            type: "Software as a Service",
            randomNumber: Math.random(),
        },
        {
            name: "Facebook",
            link: "https://facebook.com",
            type: "Social Media",
            randomNumber: Math.random(),
        },
        {
            name: "LinkedIn",
            link: "https://linkedin.com",
            type: "Social Media",
            randomNumber: Math.random(),
        },
        {
            name: "Gmail",
            link: "https://gmail.com",
            type: "Software as a Service",
            randomNumber: Math.random(),
        },
        {
            name: "Amazon Smile",
            link: "https://smile.amazon.com",
            type: "E-Commerce",
            randomNumber: Math.random(),
        },
        {
            name: "Google Maps",
            link: "https://maps.google.com",
            type: "Software as a Service",
            randomNumber: Math.random(),
        },
        {
            name: "Spark Email",
            link: "https://sparkmailapp.com",
            type: "Software as a Service",
            randomNumber: Math.random(),
        },
        {
            name: "Great Commission Training Ministries",
            link: "https://discipleshiptraining.org",
            type: "Christian Ministry",
            randomNumber: Math.random(),
        },
        {
            name: "Traction Adventure App",
            link: "https://traction.discipleshiptraining.org",
            type: "Christian Ministry",
            randomNumber: Math.random(),
        },
        {
            name: "Faith Baptist Church of Taylors",
            link: "https://fbctaylors.org",
            type: "Church",
            randomNumber: Math.random(),
        },
        {
            name: "Clemson University",
            link: "https://clemson.edu",
            type: "University",
            randomNumber: Math.random(),
        },
        {
            name: "USC Upstate",
            link: "https://uscupstate.edu",
            type: "University",
            randomNumber: Math.random(),
        },
        {
            name: "Harvard University",
            link: "https://harvard.edu",
            type: "University",
            randomNumber: Math.random(),
        },
        {
            name: "Yale University",
            link: "https://yale.edu",
            type: "University",
            randomNumber: Math.random(),
        }
    ]
}

let rootProps = {
    config: listConfig,
    data: listData
}
createApp(App, rootProps).mount('#app')
