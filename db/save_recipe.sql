INSERT INTO user_recipes (name, recipe_id, profile_pic, fkey, profile_pic_thumbnail, cost_per_serving, recipe_nutrition) VALUES ($1,$2,$3,$4, $5, $6, $7);
SELECT * FROM recipe_information WHERE recipe_id = $2;

