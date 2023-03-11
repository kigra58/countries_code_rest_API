import csvParser from "csv-parser";
import path from "path";
import csvtojson from "csvtojson"
import fs from "fs";

export interface IBooks{
    Id:number
    Title:string;
    Author:string;
    Genre:string;
    Height:string;
    Publisher:string;
  }

const filePath:string = path.join(__dirname, "/public/books.csv");

export const CSVTOJSON=async():Promise<IBooks[]>=> await csvtojson().fromFile(filePath);









