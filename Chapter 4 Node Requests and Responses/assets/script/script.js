// const names = "Darpan";

console.log(names);

var id = "next level shit";

console.log(id);    


const {people, powers} = require('./data');

console.log(people[0], powers[2]);

const fs = require('fs');

fs.readFile("../../docs/hi.txt", (err, data) => {
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});

fs.writeFile("../../docs/hi.txt", "Hi there!!", () => {
    console.log("File written successfully!");
});

if(!fs.existsSync("../../new")){
    fs.mkdir("../../new", (err) => {
        if(err){
            console.log(err);
        }else{
            fs.writeFile("../../new/hello.txt", "Hello Brother", (err) => {
                if(err){
                    console.log(err);
                }
                console.log("File made and written successfully!");
            });
        }
        console.log("Folder created!");
    });
}else{
    fs.rmdir("../../new", (err) => {
        if(err){
            console.log(err);
        }
        console.log("Folder removed");
    });
}

if(fs.existsSync("../../new/deleteme.txt")){
    fs.unlink("../../new/deleteme.txt", (err) => {
        if(err){
            console.log(err);
        }
        console.log("File deleted successfully");
    });
}