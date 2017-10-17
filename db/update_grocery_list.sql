UPDATE grocery_list_items 
SET items = $2
WHERE fkey = $1;
SELECT * FROM grocery_list_items WHERE fkey = $1;