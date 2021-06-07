WITH  new_initiative AS (
    SELECT i.id, json_agg(json_build_object(cg.id::text,cg.name)) AS q24_1
    FROM (((initiative i
        JOIN LATERAL jsonb_each_text(i.q24) geo_cov_type(key, value) ON (true)
        JOIN LATERAL jsonb_array_elements(i.q24_1) regions(value) ON (true)
        JOIN LATERAL jsonb_each_text(regions.value) regions_text(key, value) ON (true)
        LEFT JOIN country_group cg ON regions_text.value = cg.name)))
    WHERE (geo_cov_type.key = 'regional'::text)
    GROUP BY i.id, geo_cov_type.value, geo_cov_type.key)
UPDATE initiative
SET q24_1 = ni.q24_1
FROM new_initiative ni
WHERE initiative.id = ni.id;

WITH  new_initiative AS (
    SELECT i.id, json_agg(json_build_object(cg.id::text,cg.name)) AS q24_5
    FROM (((initiative i
        JOIN LATERAL jsonb_each_text(i.q24) geo_cov_type(key, value) ON (true)
        JOIN LATERAL jsonb_array_elements(i.q24_5) regions(value) ON (true)
        JOIN LATERAL jsonb_each_text(regions.value) regions_text(key, value) ON (true)
        LEFT JOIN country_group cg ON regions_text.value = cg.name)))
    WHERE (geo_cov_type.key = 'global with elements in specific areas'::text)
    GROUP BY i.id, geo_cov_type.value, geo_cov_type.key)
UPDATE initiative
SET q24_5 = ni.q24_5
FROM new_initiative ni
WHERE initiative.id = ni.id;
