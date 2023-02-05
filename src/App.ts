import express, { Application, Request, Response } from "express";
import fs from "fs"
import { config } from "dotenv";
import path from "path";
import csvParser from "csv-parser";



config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
 
const path1 = path.join(__dirname, "/public/data.csv");
// console.log("path1",path1)

interface IData{
  
    country :string;
    country_code: string;
    international_dialing:string
  
}

const Countries:IData[]=[]
fs.createReadStream(path1)
  .pipe(csvParser())
  .on("data", (data) => {
    Countries.push(data);
  })
  .on("end", () => {
    // console.log("",result);
  });

 app.get("/",(req:Request,res:Response)=>{
     res.status(200).json({Countries})
 }) 

 app.get("/details",(req:Request,res:Response)=>{
 const {name} =req.query
 console.log("name",name);
  

  res.status(200).json({county_details: Countries.find(it=>{
      return it.country_code===name
  })})
 }) 

  
try {
  app.listen(process.env.PORT, (): void => {
    console.log(`Connected successfully on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
