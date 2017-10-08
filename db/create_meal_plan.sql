INSERT INTO meal_plans (name, notes, uid) VALUES ($1, $2, $3);
SELECT * FROM meal_plans WHERE uid = $3;