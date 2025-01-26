const db = require('../config/mysql.js');

const getAll = async () => {
    try {
        const [results] = await db.promise().query('SELECT b.*, SUM(v.vote) AS votes FROM books b, votes v WHERE v.BookId = b.id GROUP BY b.id')
        
        let books = []
        for (i in results) {
            books.push({
                id:         results[i].id,
                title:      results[i].title,
                genre:      results[i].genre,
                year:       results[i].year,
                votes:      results[i].votes,
                createdAt:  results[i].createdAt,
                updatedAt:  results[i].updatedAt
            })
        }
        
        return books
    } catch (error) {
        return ({ message:"Internal server error", error: error.message });   
    }
}

const create = async (title, author, genre, year) => {
    try {
        await  db.query('INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)', [title, author, genre, year]);

        return
    } catch (error) {
        return ({ message:"Internal server error", error: error.message });
        
    }
}

const updatedBook = async(object) => {
  try {
    await db.promise().query('UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?', [ object.title, object.author, object.genre, object.year, object.id ]);

    return
  } catch (error) {
    return ({ message:"Internal server error", error: error.message });
  }

}


const deleteBook = async (bookId) => {
    try {
      await db.promise().query('DELETE FROM votes WHERE bookId = ?', [bookId])
      await db.promise().query('DELETE FROM books WHERE id = ?', [bookId]);

      return
        
    } catch (error) {
        return ({ message:"Internal server error", error: error.message });
    }

}





module.exports = {
    getAll,
    create,
    updatedBook,
    deleteBook  
};