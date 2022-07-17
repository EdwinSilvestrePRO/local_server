import fs from 'fs';
import {basename} from 'path';
export async function webserver(request, response) {
    try {
        
        const pathURL = basename(request.url),
        HOME = {
            name: "",
            stream: fs.createReadStream("./home.html")
        }
        const DIR = await fs.promises.readdir("./sources/sections");
        let names = function(){
            let n = [];
            for(let dir of DIR) n.push(
                dir
                .split("")
                .filter(
                    (el, index, thisArg)=> index < thisArg.indexOf(".")
                    )
                    .join("")
                );
    
            return n;
        }();
        const RES = [HOME];
        names.forEach(el=> RES.push(
            {
                name: el,
                stream: fs.createReadStream(`./sources/sections/${el}.html`)
            }
        ));
    
    
        if(pathURL == HOME.name){
            response.statusCode = 200;
            response.setHeader("content-type", "text/html");
            HOME.stream.pipe(response);
        }
        else if(names.indexOf(pathURL) === -1) notFound(response, request.url);
        else {
            for(let {name, stream} of RES) {
                if(name == pathURL) {
                    response.statusCode = 200;
                    response.setHeader("content-type", "text/html");
                    stream.pipe(response);  
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}


// http://127.80.70.5:2000/


function notFound(res, url) {
    res.statusCode = 404;
    res.setHeader("content-type", "text/html");
    res.end(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Not Found</title>
            <style>
            body {
                background-color:black;
                color:white;
                text-align:center;
            }
            </style>
        </head>
        <body>
            <h1>page ${url} Not Found</h1>
            <a href="/">Home</a>
        </body>
        </html>
        `
    )
}