// codeforces api works but does not provide the full descri

/*
const crypto = require('crypto');

function sha512Hex(data) {
  const hash = crypto.createHash('sha512');
  hash.update(data);
  return hash.digest('hex');
}

// Example usage
const input = "123456/user.friends?apiKey=eb7361efc034a72d6b1025d6d37e1d697b67a5e0&onlyOnline=false&time=1687603307#02f86a378105492b4acf1b1adfc2c798ceedd770";
const hash = sha512Hex(input);

console.log(hash); 

*/

/*
https://codeforces.com/api/user.friends?onlyOnline=false&apiKey=eb7361efc034a72d6b1025d6d37e1d697b67a5e0&time=1687603307&apiSig=123456/502b2e7d0453378e2050d405dc9649f828f7f6eae79f04888e3404581c75fcb88e07ed54afa1f4c9c70b3b8917577abca6064aaa687b5493ac9600f2980a4147
sha512Hex(123456/user.friends?apiKey=eb7361efc034a72d6b1025d6d37e1d697b67a5e0&onlyOnline=false&time=1687603307#02f86a378105492b4acf1b1adfc2c798ceedd770)
*/








/*

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
    

// URL of the Kattis website
const url = 'https://open.kattis.com/';

// Function to scrape the website
async function scrapeKattis() {
  try {
    // Fetch the HTML content of the website
    const response = await axios.get(url);

    const htmlContent = response.data;

    //confirming we got the data or not
    console.log(response.data);
    fs.writeFileSync('kattis.html', htmlContent, 'utf-8');
    console.log('HTML content saved to kattis.html');


    // Load the HTML into Cheerio
    const $ = cheerio.load(htmlContent);

    // Example: Extract problem titles from the homepage
    $('.panel.problem').each((index, element) => {
      const problemTitle = $(element).find('.name').text().trim();
      console.log(problemTitle);
    });

  } catch (error) {
    console.error('Error occurred during scraping:', error);
  }
}

// Call the scraping function
scrapeKattis();

*/








/** scrape kattis problems */


/**
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the Kattis problems page
const url = 'https://open.kattis.com/problems';

// Function to scrape the website and display problem names
async function scrapeKattis() {
  try {
    // Fetch the HTML content of the problems page
    const response = await axios.get(url);
    const htmlContent = response.data;

    //confirming we got the data or not
    console.log(response.data);
    fs.writeFileSync('kattis.html', htmlContent, 'utf-8');
    console.log('HTML content saved to kattis.html');

    // Load the HTML into Cheerio
    const $ = cheerio.load(htmlContent);

    // Extract and display the problem names
    $('.name_column > a').each((index, element) => {
      const problemName = $(element).text().trim();
      console.log(problemName);
    });

  } catch (error) {
    console.error('Error occurred during scraping:', error);
  }
}

// Call the scraping function
scrapeKattis();

 */













//using puppeteer to get problem description

/*

const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeProblemDescription(problemName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000); 

  // Navigate to the Kattis problems page
  await page.goto('https://open.kattis.com/problems');

  // Type the problem name in the search input
  await page.type('#search_input', problemName);

  // Submit the search form
  await page.click('#search_submit');

  // Wait for the problem page to load
  await page.waitForNavigation();

  // Extract the problem description
  const problemDescription = await page.evaluate(() => {
    const descriptionElement = document.querySelector('.problem-description');
    return descriptionElement ? descriptionElement.innerText : null;
  });

  // Display the problem description
  console.log(problemDescription);
  //confirming we got the data or not
  console.log(problemDescription);
  fs.writeFileSync('kattis2.html', htmlContent, 'utf-8');
  console.log('HTML content saved to kattis.html');

  // Close the browser
  await browser.close();
}

// Usage example: Scrape the description for the problem "10 Kinds of People"
scrapeProblemDescription('10 Kinds of People');


*/




// import fetch from "node-fetch";

// async function query(data) {
//   const API_TOKEN="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";
//     const response = await fetch(
//       "https://datasets-server.huggingface.co/rows?dataset=deepmind%2Fcode_contests&config=deepmind--code_contests&split=train&offset=0&length=1",
//         {
//             headers: { Authorization: `Bearer ${API_TOKEN}` },
//             method: "GET"
//         }
//     );
//     const result = await response.json();
//     return result;
// }
// query().then((response) => {
//     console.log(JSON.stringify(response));
// });



/**
 curl -X GET "https://datasets-server.huggingface.co/rows?dataset=deepmind%2Fcode_contests&config=default&split=train&offset=0&limit=100"
 */



 import fetch from "node-fetch";

// const fetch = require("node-fetch");

async function query(data) {
    const response = await fetch(
        "https://datasets-server.huggingface.co/valid",
        {
            method: "GET"
        }
    );
    const result = await response.json();
    return result;
}
query().then((response) => {
    console.log(JSON.stringify(response));
});