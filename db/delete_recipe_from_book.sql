DELETE FROM user_books WHERE id = $1;
SELECT * FROM user_books WHERE fkey = $2;