-- ALTER TABLE series_totals ADD COLUMN rank INTEGER;

-- CREATE TABLE new_series_totals (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     char_name TEXT,
--     line_count INTEGER,
--     ep_count INTEGER,
--     rank INTEGER
-- );


-- INSERT INTO new_series_totals (char_name, line_count, ep_count, rank)
-- SELECT char_name, line_count, ep_count, rank
-- FROM series_totals;

-- ALTER TABLE series_totals RENAME TO old_series_totals;
-- ALTER TABLE new_series_totals RENAME TO series_totals;


SELECT *
FROM series_totals
ORDER BY rank ASC;
