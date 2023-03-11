import express from "express";
import { config } from "dotenv";
import { buildSchema } from "graphql";
import { bookData } from "./bookDataSet";
import {graphqlHTTP} from "express-graphql"
config();

const app:express. Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bookSchema = buildSchema(`
    type Query {
        book(id: Int!): Book
        books(topic: String): [Book]
    },
    type Book {
        id: Int
        title: String
        author: String
        category:String  
    }
`);


const getBookDetails = (args:any)=> { 
  const id = args.id;
  return bookData.filter(it => {
      return it.id == id;
  })[0];
}
const getBookList= (args:any)=> {
  if (args.title) {
      const title = args.title;
      return bookData.filter(it => it.title === title);
  } else {
      return bookData;
  }
}

const root = {
  book: getBookDetails,
  books: getBookList
};

app.use('/',
graphqlHTTP({
  schema: bookSchema,
  rootValue: root,
  graphiql: true
})
);

try {
  app.listen(process.env.PORT, (): void => {
    console.log(`Connected successfully on port ${process.env.PORT}`);
  });

} catch (error) {
  console.error(`Error occured: ${error}`);
}
