--
-- creates a table to track line totals after each episode
--

-- CREATE TABLE prog_line_totals (
--     id SERIAL PRIMARY KEY,
--     ep_id INTEGER,
--     char_name TEXT,
--     prog_line_total INTEGER,
--     FOREIGN KEY (ep_id) REFERENCES ep_info(id),
--     UNIQUE(ep_id, char_name)
-- );

--
-- generates a result set with cumulative totals for each character up to each episode
--
WITH cum_totals AS (
    SELECT
        lc.ep_id,
        lc.char_name,
        SUM(lc.line_count) OVER (PARTITION BY lc.char_name ORDER BY lc.ep_id) AS prog_line_total 
    FROM
        line_counts lc
)

--
-- inserts cumulative total when a character appears or the last known total if a character misses an episode
--
INSERT INTO prog_line_totals (ep_id, char_name, prog_line_total)
SELECT 
    e.id AS ep_id,
    c.char_name,
    COALESCE(
        ct.prog_line_total,
        LAST_VALUE(ct.prog_line_total) OVER (
            PARTITION BY c.char_name
            ORDER BY e.id
            ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
        )
    AS prog_line_total
    )
    -- carries forward the last known total to fill in gaps for episodes where a character does not appear
FROM
    (SELECT DISTINCT char_name FROM line_counts) c
    -- creates a list of all distinct characters who have lines in any episode
JOIN 
    ep_info e ON 1=1
    -- generates a cartesian product ensuring every character is paired with every episode
LEFT JOIN
    cum_totals ct ON ct.ep_id = e.id AND ct.char_name = c.char_name
    -- joins the character and episode combinations with the cum_totals to try and find their progressive line totals
ORDER BY
    c.char_name, e.id;
    -- ensures the insertion into prog_line_totals is ordered by character and then by episode