INSERT INTO meal_plans (name, notes, uid, start_date) VALUES ($1, $2, $3, $4);
SELECT * FROM meal_plans WHERE uid = $3;