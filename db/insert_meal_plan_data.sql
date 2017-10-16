INSERT INTO meal_plans_recipes (recipes, fkey) VALUES ($1, $2);
SELECT * from meal_plans_recipes WHERE fkey = $2;

-- UPDATE meal_plans_recipes
-- SET recipes = $1
-- WHERE fkey = $2;