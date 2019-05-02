// conf.js
// exports.config = {
//     framework: 'jasmine',
//     seleniumAddress: 'http://localhost:4444/wd/hub',
//     specs: ['spec.js'],
//     // SELENIUM_PROMISE_MANAGER: false,    //since I'm using async/await. (you cannot use a mix of async/await and the control flow)
//     jasmineNodeOpts: {
//         showColors: true, // Use colors in the command line report.
//       }
//   }

/**
 * Configuration for the protractor js testing. 
 * You can define the browser to run tests on, format of report, when to take the screenshot, etc. here.
 * Documentation: https://www.dropbox.com/s/hank324yibhp4td/Set-up%20Protractor%20JS.docx?dl=0
 * 
 * requires following additional node packages:
 * sudo npm install protractor-html-reporter-2
 * sudo npm install jasmine2-protractor-utils
 * 
 * @author Gaurav Agarwal
 */

// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    multiCapabilities: [{
        browserName: 'chrome'
    }],
    onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './',
            filePrefix: 'xmlresults'
        }));
    },
    //HTMLReport called once tests are finished
    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var HTMLReport = require('protractor-html-reporter-2');

            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: './',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from('xmlresults.xml', testConfig);
        });
    },
    // takes screenshot of pages with errors / failed specs.
    plugins: [{
        package: 'jasmine2-protractor-utils',
        disableHTMLReport: true,
        disableScreenshot: false,
        screenshotPath: './screenshots',
        screenshotOnExpectFailure: false,
        screenshotOnSpecFailure: true,
        clearFoldersBeforeTest: true
        // htmlReportDir: './reports/htmlReports',
        // failTestOnErrorLog: {
        //             failTestOnErrorLogLevel: 900,
        //             excludeKeywords: ['keyword1', 'keyword2']
        //         }
    }]
}