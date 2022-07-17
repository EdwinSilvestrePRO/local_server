import {createReadStream} from 'fs';
export function webserver(request, response) {
    const home = createReadStream("./home.html")
    console.log(request.url);
    response.statusCode = 200;
    response.setHeader("content-type", "text/html");
    home.pipe(response);
}


// http://127.80.70.5:2000/