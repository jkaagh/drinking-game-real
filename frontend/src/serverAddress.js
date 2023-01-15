
import dev from "./dev.json"



let add = ""

//put dev.json with {"dev":true} in src/ folder, gitignored.
if(dev.dev){
    add = "http://localhost:3001"
}else{
    add = "https://drinkoo.onrender.com"
}    

export const address = add








