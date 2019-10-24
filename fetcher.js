const argv = process.argv.slice(2);
const fs = require('fs');
const request = require('request');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


if (argv[1] !== './index.html') {
  console.log('file path doesnot exist.');
  rl.close();
} else {

request(argv[0], (error, response, body) => {
  if (body === undefined) {
    console.log("file not created.");
    rl.close();
    return;
  }
  if (fs.existsSync(argv[1])) {
    rl.question('The file exists. Do you want to overwirite', (answer) => {
      if (answer === "yes") {
        fs.writeFile(argv[1], body, () => {
          console.log(`Downloaded and saved ${body.length} bytes to ${argv[1]}`)
          rl.close();
      })
      } else {
      console.log('no file created');
      rl.close();
      }
    })
  

  } else {
    fs.writeFile(argv[1], body, () => {
      rl.close();
    })
  }
    
});

}






