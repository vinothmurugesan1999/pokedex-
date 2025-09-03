import express from 'express'
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/", async (req,res)=>{
    try{
        const getInput = "pikachu"
        const result = await axios.get( `https://pokeapi.co/api/v2/pokemon/${getInput}`)
        const pokemon = {
            name: result.data.name,
            image: result.data.sprites.front_default,
            abilities: result.data.abilities.map(ability => ability.ability.name),
            stats: result.data.stats.map(stat => ({ name: stat.stat.name, base_stat: stat.base_stat })),
            types: result.data.types.map(type => type.type.name)
        };
        res.render("index.ejs", { pokemon: pokemon });
    }catch(error){
       res.status(404).send("pokemon cannot be found");
    }
   
})

app.post("/submit", async (req,res)=>{
  
    try{
        const getInput = req.body.message.toLowerCase();
        const result = await axios.get( `https://pokeapi.co/api/v2/pokemon/${getInput}`)
        const pokemon = {
            name: result.data.name,
            image: result.data.sprites.front_default,
            abilities: result.data.abilities.map(ability => ability.ability.name),
            stats: result.data.stats.map(stat => ({ name: stat.stat.name, base_stat: stat.base_stat })),
            types: result.data.types.map(type => type.type.name)
        };
        res.render("index.ejs", { pokemon: pokemon });
    }catch(error){
        res.status(404).send("pokemon cannot be found");
    }
})

app.listen(port,(req, res)=>{
    console.log(`your server running on port ${port}`)
})
