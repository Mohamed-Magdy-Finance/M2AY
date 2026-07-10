create view view_code
as 
SELECT     InternationalCode, id_item
FROM         dbo.Item
WHERE     len(InternationalCode) > 0
UNION
SELECT     code AS InternationalCode, id_item
FROM         dbo.Itemcode
WHERE     len(Code) > 0
UNION
SELECT     ShortName as InternationalCode, id_item
FROM         dbo.Item
WHERE     len(ShortName) > 0