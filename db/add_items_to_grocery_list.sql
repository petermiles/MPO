INSERT INTO grocery_list_items (items, fkey) VALUES ($2, $1);
SELECT * FROM grocery_list_items WHERE fkey = $1;
-- UPDATE grocery_list_items 
-- SET items = $2
-- WHERE fkey = $1;