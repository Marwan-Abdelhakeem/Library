import Book from "../../../DB/model/book.model.js";

export const createANewBook = async (req,res)=>{
    const {title, content, Book} = req.body;
    const result = await Book.create({title, content, Book})
    res.status(201).json({message:'Created successfully',result})
};

export const getAllBooks = async (req,res)=>{
    const { page = 1, limit = 10, search } = req.query;
      try {
        const query = search ? { $or: [{ title: new RegExp(search, 'i') }, { author: new RegExp(search, 'i') }] } : {};
        const Books = await Book.find(query)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
          if(!Books.length) 
                {return res.json({message: "no books found"})}
        const count = await Book.countDocuments(query);
        res.json({
          Books,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

export const getBookById = async (req,res)=>{
    const result = await Book.findById(req.params.id)
    result 
    ? res.status(200).json({message:'success',result})
    : res.json({message: "no book found",status: false})
};

export const updateBookByID = async (req,res)=>{
    const result = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    result 
    ? res.status(200).json({message:'Updated successfully',result})
    : res.json({message: "no book found",status: false})
};

export const deleteBookByID = async (req,res)=>{
    const result = await Book.findByIdAndDelete(req.params.id);
    result 
    ? res.status(200).json({message:'Deleted successfully',result})
    : res.json({message: "no book found",status: false})
};
