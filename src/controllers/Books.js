const bookService = require('../services/Books');

const getAll = async (req, res) => {
    try {
        const books = await bookService.getAll();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error:error.message });

    }
}

const updatedBook =  (req,res) => {
    const { title, author, genre, year } = req.body;
    const {id} = req.params;

    const body = ['title', 'author', 'genre', 'year']
    const validate = ['title', 'author', 'genre', 'year']
    const validated = validate.every(item => body.includes(item));

    if (!validated) {
        return res.status(500).json({ message: "Error: Not all items from 'validate' are present in 'body'" })
    }

    const object = {
        title,
        author,
        genre,
        year,
        id
    }

    try {
         bookService.updatedBook(object);

         return res.status(200).json({ message: "Book updated" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error:error.message });
        
    }

}

const create =  (req, res) => {
    const { title, author, genre, year } = req.body;
    const validate = ['title', 'author', 'genre', 'year']
    const validated = validate.every(item => body.includes(item));

    if (validated) {
        return res.status(500).json({ message: "Error: Not all items from 'validate' are present in 'body'" })
    }

    try {
       bookService.create(title, author, genre, year);
      
      return res.status(200).json({ message: "Book created" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error:error.message });
    }
}

const deleteBook = async (req, res) => {
    const {id} = req.params;
    try {
       await bookService.deleteBook(id);

        return res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error:error.message });
  
    }
}


module.exports = {
    getAll,
    create,
    updatedBook,
    deleteBook
};