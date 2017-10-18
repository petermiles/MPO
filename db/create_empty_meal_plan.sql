INSERT INTO meal_plans_recipes (name, fkey, start_date) VALUES ($1, $2, $3);
SELECT * from meal_plans_recipes WHERE fkey = $2;
