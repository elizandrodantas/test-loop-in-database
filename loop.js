const axios = require('axios');

const color = {
    Reset: "\x1b[0m",
    
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",

    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
}

let total = 0;

async function getInfo(){
    try{
        let { data } = await axios("http://localhost:3000");

        return { status: true, data: JSON.stringify(data.data)};
    }catch(e){
        let { response } = e;

        if(response){
            let { status, data } = response;

            if(status === 500) return { status: false, error: data.error, type: "INTERNAL"}
            if(status === 400) return { status: false, error: data.error, type: "ERROR REQUEST"}
        }

        return { status: false, error: "", type: "UNKNOWN"}
    }
}

async function process(){
    let init = Date.now(), { status, error, type, data } = await getInfo();

    if(!status) return total++, console.log(`${color.BgRed}[x]${color.Reset} ${color.BgRed}${type}${color.Reset} / ${color.FgYellow}${error}${color.Reset} / ${color.FgMagenta}${Math.floor(Date.now() - init) / 1000}${color.FgCyan}ms ${color.Reset} [${total}]`);

    return total++, console.log(`${color.BgGreen}[+]${color.Reset} ${color.FgYellow}${data}${color.Reset} / ${color.FgMagenta}${Math.floor(Date.now() - init) / 1000}${color.FgCyan}ms ${color.Reset} / [${total}]`);
}

(async()=>{
    for(;;){
        await process();
        // await new Promise(resolve => setTimeout(resolve, 3000))
    }
})();