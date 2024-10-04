--------------------------
-- William Hotch
-- update_ranks.sql
-- Line Counts
-- 8/24/24
--------------------------


-- EPISODE
--------------------------------------
---- add rank column to episode counts
--------------------------------------
-- ALTER TABLE line_counts ADD COLUMN rank INTEGER;

--------------------------
---- populate episode ranks
---------------------------
-- UPDATE line_counts
-- SET rank = (
--     SELECT rank FROM (
--         SELECT
--             id,
--             RANK() OVER (PARTITION BY ep_id ORDER BY line_count DESC) AS rank
--         FROM
--             line_counts
--     ) AS ranked
--     WHERE line_counts.id = ranked.id
-- );


-- SEASON
-------------------------------------
---- add rank column to season counts
-------------------------------------
-- ALTER TABLE season_totals ADD COLUMN rank INTEGER;

--------------------------
---- populate season ranks
--------------------------
-- UPDATE season_totals
-- SET rank = (
--     SELECT rank FROM (
--         SELECT
--             id,
--             RANK() OVER (
--                 PARTITION BY season_num
--                 ORDER BY line_count DESC, ep_count DESC
--             ) AS rank
--         FROM season_totals
--     ) AS ranked
--     WHERE season_totals.id = ranked.id
-- )

-- SERIES
-------------------------------------
---- add rank column to series counts
-------------------------------------
-- ALTER TABLE series_totals ADD COLUMN rank INTEGER;

--------------------------
---- populate series ranks
--------------------------
-- UPDATE series_totals
-- SET rank = (
--     SELECT rank FROM (
--         SELECT
--             id,
--             RANK() OVER (
--                 ORDER BY line_count DESC, ep_count DESC
--             ) AS rank
--         FROM series_totals
--     ) AS ranked
--     WHERE series_totals.id = ranked.id
-- )
