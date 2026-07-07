create view View_RpurProf
as 
SELECT     TOP (100) PERCENT ROUND(SUM(Total), 2) AS Total, CASE month(pdate) 
                      WHEN 1 THEN 'u-january' WHEN 2 THEN 'u-February' WHEN 3 THEN 'u-March' WHEN 4 THEN 'u-April' WHEN 5 THEN 'u-May' WHEN 6 THEN 'u-June' WHEN 7 THEN 'u-July' WHEN 8 THEN 'u-August'
                       WHEN 9 THEN 'u-September' WHEN 10 THEN 'u-October' WHEN 11 THEN 'u-November' WHEN 12 THEN 'u-December' ELSE 'Other' END AS monthh, MONTH(pdate) AS month_num, YEAR(pdate) 
                      AS year_num
FROM         dbo.RPur_Invoice
GROUP BY CASE month(pdate) 
                      WHEN 1 THEN 'u-january' WHEN 2 THEN 'u-February' WHEN 3 THEN 'u-March' WHEN 4 THEN 'u-April' WHEN 5 THEN 'u-May' WHEN 6 THEN 'u-June' WHEN 7 THEN 'u-July' WHEN 8 THEN 'u-August'
                       WHEN 9 THEN 'u-September' WHEN 10 THEN 'u-October' WHEN 11 THEN 'u-November' WHEN 12 THEN 'u-December' ELSE 'Other' END, MONTH(pdate), YEAR(pdate)
ORDER BY year_num, month_num