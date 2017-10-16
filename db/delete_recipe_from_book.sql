DELETE FROM user_recipes WHERE id = $1;
SELECT * FROM user_recipes WHERE fkey = $2;