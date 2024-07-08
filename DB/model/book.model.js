import mongoose from "mongoose";

export const bookSchema = mongoose.Schema({
    title:{
      type: String,
      required: true
    },
    content:{
      type: String,
      required: true
    },
    author:{
      type: String,
      required: true
    },
    publishedDate:{
      type: Date,
      default: Date.now
    }
  },{
    versionKey: false
  })
  
const Book = mongoose.model('Book', bookSchema);
export default Book;