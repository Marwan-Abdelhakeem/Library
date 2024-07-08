import mongoose from "mongoose";
import { bookSchema } from "./book.model.js";

const authorSchema = mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    bio:{
      type: String,
    },
    birthDate:{
      type: Date,
    },
    books:{
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] //[bookSchema]
    }
  },{
    versionKey: false
  })

const Author = mongoose.model('Author', authorSchema);
export default Author;