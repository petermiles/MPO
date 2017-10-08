INSERT INTO recipe_books (name, uid) VALUES ($1, $2);
SELECT * FROM recipe_books WHERE uid = $2;
