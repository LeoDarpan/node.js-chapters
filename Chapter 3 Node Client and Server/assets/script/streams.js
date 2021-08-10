const fs = require("fs");
const utf8 = 'utf8';

const readStream = fs.createReadStream("../../docs/heavydata.txt", {encoding: utf8});
const writeStream = fs.createWriteStream("../../docs/newdata.txt");

// readStream.on('data', (chunk) => {
//     console.log("\n---------New Chunk-------------\n");
//     console.log(chunk);

//     writeStream.write('\n--------New Chunk-------------\n');
//     writeStream.write(chunk);
// });


readStream.pipe(writeStream);
