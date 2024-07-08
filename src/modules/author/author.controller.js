import Author from "../../../DB/model/author.model.js";

export const addNewAuthor = async (req,res)=>{
    const { name, bio, birthDate, books } = req.body
    const result = await Author.create({name, bio, birthDate, books})
    res.status(201).json({message:'Created successfully',result})
};

export const getAllAuthors = async (req,res)=>{
    const { page = 1, limit = 10, search } = req.query;
      try {
        const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { bio: new RegExp(search, 'i') }] } : {};
        const authors = await Author.find(query)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate('books')
          .exec();
          if(!authors.length) 
                {return res.json({message: "no authors found"})}
        const count = await Author.countDocuments(query);
        res.json({
          authors,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

export const getAuthorById = async (req,res)=>{
    const result = await Author.findById(req.params.id); result 
    ? res.status(200).json({message:'success',result})
    : res.json({message: "no author found",status: false})
};

export const updateAuthorByID = async (req,res)=>{
    const result = await Author.findByIdAndUpdate(req.params.id, req.body,{new:true})
    result 
    ? res.status(200).json({message:'Updated successfully',result})
    : res.json({message: "no author found",status: false})
};

export const deleteAuthorByID = async (req,res)=>{
    const result = await Author.findByIdAndDelete(req.params.id)
    result 
    ? res.status(200).json({message:'Deleted successfully',result})
    : res.json({message: "no author found",status: false})
};
