CREATE view View_PurExcelSheet
AS

SELECT        CASE WHEN Pur_Invoice.CurrencyPrice > 0 THEN 4 ELSE 1 END AS type1 ,
1 AS typeTax,
0 AS typeTable,
dbo.Pur_Invoice.id_bill AS '—ﬁ„ «·›« Ê—…'
,cust.Aname as '«”„ «·„Ê—œ'
,cust.TaxesCard as '—ﬁ„ «· ”ÃÌ· «·÷—Ì»Ì ··„Ê—œ'
,cust.Email as '—ﬁ„ «·„·› «·÷—Ì»Ì ··„Ê—œ'
,cust.Address as '«·⁄‰Ê«‰'
,'' as '«·—ﬁ„ «·ﬁÊ„Ì / —ﬁ„ ÃÊ«“ «·”›—'
,cust.Mobile as '—ﬁ„ «·„Ê»Ì·'
, convert(nvarchar(5),day(dbo.Pur_Invoice.pdate))+'.'+convert(nvarchar(5),month(dbo.Pur_Invoice.pdate))+'.'+convert(nvarchar(5),year(dbo.Pur_Invoice.pdate)) AS ' «—ÌŒ «·›« Ê—…'
,item.ARname as '≈”„ «·„‰ Ã'
,case when len(Item.ShortName )>2 then Item.ShortName else item.InternationalCode end as 'ﬂÊœ «·„‰ Ã'
, CASE WHEN Pur_Invoice.CurrencyPrice > 0 THEN 2 ELSE 1 END AS '‰Ê⁄ «·»Ì«‰'
,CASE WHEN Item.TYPE =4 THEN 4 WHEN Item.TYPE =3 THEN 5 WHEN Item.TYPE =7 THEN 7  ELSE 3 END AS '‰Ê⁄ «·”·⁄…'
,'' AS 'ÊÕœ… ﬁÌ«” «·„‰ Ã'
,Pur_Details .PR AS '”⁄— «·ÊÕœ…'
,Pur_Details .tax AS '›∆… «·÷—Ì»…'
,Pur_Details .qu AS 'ﬂ„Ì… «·„‰ Ã'
,Pur_Details .total_item +(Pur_Details .Discount*Pur_Details .total_item) AS '«·„»·€ «·≈Ã„«·Ì'
,Pur_Details .Discount*Pur_Details .total_item AS 'ﬁÌ„… «·Œ’„'
,Pur_Details .total_item AS '«·„»·€ «·’«›Ì'
,case when isnull(pur_Details.tax,0) =0 then 0 else round(convert(float,pur_Details.total_item*pur_Details.tax/100),2) end  AS 'ﬁÌ„… «·÷—Ì»…' 
,case when isnull(pur_Details.tax,0) =0 then Pur_Details .total_item else Pur_Details .total_item+round(convert(float,pur_Details.total_item*pur_Details.tax/100),2) end  AS '«·«Ã„«·Ï' 

,Pur_Invoice.pdate AS pdate
FROM            dbo.Pur_Invoice INNER JOIN
                         dbo.Pur_Details ON dbo.Pur_Invoice.id_pur = dbo.Pur_Details.id_pur INNER JOIN
                         dbo.Item ON dbo.Pur_Details.id_item = dbo.Item.id_item INNER JOIN
                         dbo.cust ON dbo.Pur_Invoice.id_cust = dbo.cust.id_cust


