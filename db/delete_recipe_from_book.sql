DELETE FROM user_recipes WHERE id = $1;
SELECT DISTINCT ON (recipe_id) * FROM user_recipes WHERE fkey = $2 ORDER BY recipe_id;