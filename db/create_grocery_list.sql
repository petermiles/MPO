INSERT INTO grocery_lists (name, uid) VALUES ($1, $2);
SELECT * FROM grocery_lists WHERE uid = $2;