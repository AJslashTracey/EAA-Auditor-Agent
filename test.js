import pa11y from "pa11y";
import express from "express"


const app = express();



const url = "https://github.com";
const port = 3000;


app.listen(port, () => {
    console.log(`Server running on ${port}`)
});

(async () => {
    try{
        const result = await pa11y(url);
        console.log(result);
    }catch (error){
        return error
    }
})();

/*

app.get("/getTest", async (req, res) => {

    try{

        const result = await pa11y(url, {
        });

        console.log(result);
        res.json(result)
    }catch (error) {
        res.status(500).json(error)
    }

});


*/