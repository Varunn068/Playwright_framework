const fs = require('fs')
const moment = require('moment')
const report = require('multiple-cucumber-html-reporter')
const os = require('os')
require('dotenv').config({path:process.env.ENV_FILE})
const environment = process.env.env
const currentDate = moment().format('YYYY-MM-DD')
const currentTime = moment().format('HH.mm.ss')
const platforms = {'darwin':'osx','win32':'windows','linux':'Linux'}
const devices = {'darwin': 'Mac Local','win32':'Windows Local','linux':'Azure Linux'}
let executionDetails;
let executionDateAndTime;
let buildId = (process.env.buildId != null) ? process.env.buildId : 'local';

try {
    executionDetails = fs.readFileSync('./executionDateAndTime.properties','utf-8')
    executionDateAndTime = executionDetails.split('\n').filter(key => key.includes('executionDateAndTime'))
} catch (e) {
    executionDateAndTime = "Couldn't able to fetch data"
}

console.log('Platform '+process.platform);
console.log('Execution details '+executionDateAndTime)

report.generate({
    displayReportTime: false,
    displayduration: true,
    durationInMs: false,
    openReportInBrowser: false,
    saveCollectedJSON: false,
    staticFilePath: true,
    disableLog: true,
    customData: {
        title: 'Run info',
        data: [
            {label: 'Environment',value: environment},
            {label: 'Executed on',value: executionDateAndTime}
        ]
    },
    metadata: {
        device: devices[process.platform],
        platform: {
            name: platforms[process.platform],
            version: os.release()
        }
    },
    jsonDir: `reports/multi-json-html`,
    reportPath: `reports/multi-json-html`,
    pageTitle: 'Automation Report',
    reportName: 'Test report for  Automation'
});

console.log('Report generated successfully at '+process.cwd()+'\\reports\\multi-json-html\\index.html')
