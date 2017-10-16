UPDATE grocery_list_items 
SET items = $2
WHERE fkey = $1;