CREATE view View_SalExcelSheet
AS

SELECT        CASE WHEN Sal_Invoice.CurrencyPrice > 0 THEN 4 ELSE 1 END AS '‰Ê⁄ «·„” ‰œ', 1 AS '‰Ê⁄ «·÷—Ì»…', 0 AS '‰Ê⁄ ”·⁄ «·ÃœÊ·', dbo.Sal_Invoice.id_bill AS '—ﬁ„ «·›« Ê—…'
,cust.Aname as '«”„ «·„Ê—œ'
,cust.TaxesCard as '—ﬁ„ «· ”ÃÌ· «·÷—Ì»Ì ··„Ê—œ'
,cust.Email as '—ﬁ„ «·„·› «·÷—Ì»Ì ··„Ê—œ'
,cust.Address as '«·⁄‰Ê«‰'
,'' as '«·—ﬁ„ «·ﬁÊ„Ì / —ﬁ„ ÃÊ«“ «·”›—'
,cust.Mobile as '—ﬁ„ «·„Ê»Ì·'
, convert(nvarchar(5),day(dbo.Sal_Invoice.pdate))+'.'+convert(nvarchar(5),month(dbo.Sal_Invoice.pdate))+'.'+convert(nvarchar(5),year(dbo.Sal_Invoice.pdate)) AS ' «—ÌŒ «·›« Ê—…'
,item.ARname as '≈”„ «·„‰ Ã'
,case when len(Item.ShortName )>2 then Item.ShortName else item.InternationalCode end as 'ﬂÊœ «·„‰ Ã'
, CASE WHEN Sal_Invoice.CurrencyPrice > 0 THEN 2 ELSE 1 END AS '‰Ê⁄ «·»Ì«‰'
,CASE WHEN Item.TYPE =4 THEN 4 WHEN Item.TYPE =3 THEN 5 WHEN Item.TYPE =7 THEN 7  ELSE 3 END AS '‰Ê⁄ «·”·⁄…'
,'' AS 'ÊÕœ… ﬁÌ«” «·„‰ Ã'
,Sal_Details .PR AS '”⁄— «·ÊÕœ…'
,Sal_Details .tax AS '›∆… «·÷—Ì»…'
,Sal_Details .qu AS 'ﬂ„Ì… «·„‰ Ã'
,Sal_Details .total_item +(Sal_Details .Discount*Sal_Details .total_item) AS '«·„»·€ «·≈Ã„«·Ì'
,Sal_Details .Discount*Sal_Details .total_item AS 'ﬁÌ„… «·Œ’„'
,Sal_Details .total_item AS '«·„»·€ «·’«›Ì'
,case when isnull(Sal_Details.tax,0) =0 then 0 else round(convert(float,Sal_Details.total_item*Sal_Details.tax/100),2) end  AS 'ﬁÌ„… «·÷—Ì»…' 
,case when isnull(Sal_Details.tax,0) =0 then Sal_Details .total_item else Sal_Details .total_item+round(convert(float,Sal_Details.total_item*Sal_Details.tax/100),2) end  AS '«·«Ã„«·Ï' 

,Sal_Invoice.pdate AS pdate
FROM            dbo.Sal_Invoice INNER JOIN
                         dbo.Sal_Details ON dbo.Sal_Invoice.id_Sal = dbo.Sal_Details.id_Sal INNER JOIN
                         dbo.Item ON dbo.Sal_Details.id_item = dbo.Item.id_item INNER JOIN
                         dbo.cust ON dbo.Sal_Invoice.id_cust = dbo.cust.id_cust


