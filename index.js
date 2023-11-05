import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port = 3000;
const op=dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", async(req, res) => {
    res.render(op+"/views/index.ejs",{name:"Data will be Loaded soon....", price:"Data will be Loaded soon....",volume:"Data will be Loaded soon....",last:"Data will be Loaded soon....",
    bc:"Data will be Loaded soon....",id:"Data will be Loaded soon....",bcs:"Data will be Loaded soon....",
    cc:"Data will be Loaded soon....",mos:"Data will be Loaded soon...."});
 });

app.post("/start",async(req,res)=>{
    try {
        const tokenName=req.body.price;
        //console.log(tokenName);
        const result=await axios.get("https://api.blockchain.com/v3/exchange/tickers/"+tokenName);
        res.render(op+"/views/index.ejs",{name:result.data.symbol, price:result.data.price_24h, volume:result.data.volume_24h, last:result.data.last_trade_price,bc:"Data will be Loaded soon....",id:"Data will be Loaded soon....",bcs:"Data will be Loaded soon....",
        cc:"Data will be Loaded soon....",mos:"Data will be Loaded soon...."});
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
});

app.post("/act",async(req,res)=>{
    try {
        const tokenName=req.body.symbols;
        //console.log(tokenName);
        const result=await axios.get("https://api.blockchain.com/v3/exchange/symbols/"+tokenName);
        res.render(op+"/views/index.ejs",{bc:result.data.base_currency,id:result.data.id,bcs:result.data.base_currency_scale,
        cc:result.data.counter_currency,mos:result.data.min_order_size,name:"Data will be Loaded soon....", price:"Data will be Loaded soon....",volume:"Data will be Loaded soon....",last:"Data will be Loaded soon...."});
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
});
 
 

app.listen(port,()=>{console.log("server is hosted on: ",port)});

/*
example of cryptocurrencies:-

BTC-USD
TFUEL-USDC
XLM-EUR
ALGO-BTC
EFI-USDT
XTZ-USDT
XLM-BTC
*/