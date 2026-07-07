create proc [dbo].[ReportBillCostCenter]

@CostCenter nvarchar(200),
@trans int,
@date1 date,
@date2 date
as 
DECLARE @VisbleThreeUnit BIT=1 
SELECT @VisbleThreeUnit= VisbleThreeUnit FROM ZZproperties

if @trans =0
BEGIN
IF @VisbleThreeUnit =0
		BEGIN
			  SELECT   max(pdate) as pdate,id_item, ARname, InternationalCode, ROUND(SUM(comee - outt), 3) AS total_qu, ROUND(SUM(Convert(float,total_item)), 3) AS total_cost,ROUND(SUM(bones), 3) AS bones, Round(Convert(float,AVG(pr)),2) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, CONVERT(DECIMAL(18, 1), SUM(total_item)) AS total, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, ROUND(net_balance, 3) AS balance, Minimum FROM         dbo.View_store WHERE convert(date,pdate) BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102)   AND   (id_pur > 0)  AND (CostCenter = @CostCenter ) GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, net_balance, Minimum ORDER BY ARname
			END
		ELSE
   BEGIN
          SELECT     TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, ROUND(SUM(Convert(float,total_item)), 3) AS total_cost, LTRIM(RTRIM(STR(SUM(CONVERT(int, comee - outt))))) + ' ' + LTRIM(RTRIM(STR(SUM(CONVERT(int, (comee - outt - CONVERT(int, comee - outt)) * CountMiddel))))) + ' ' + LTRIM(RTRIM(STR(SUM(ROUND(((comee - outt) - (CONVERT(int, comee - outt) + CONVERT(int, (comee - outt - CONVERT(int, comee - outt)) * CountMiddel) / CountMiddel)) * CountSmall, 0))))) AS total_qu,ROUND(SUM(bones), 3) AS bones, Round(Convert(float,AVG(pr)),2) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))) AS balance, Minimum FROM         dbo.View_store WHERE convert(date,pdate) BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102)    AND (id_pur > 0)   AND (CostCenter = @CostCenter )GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))), Minimum ORDER BY ARname
   END
   END
   -------------------------------------------

 if @trans =1
 IF @VisbleThreeUnit =0
 BEGIN
    SELECT     TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, ROUND(SUM(outt - comee), 3) AS total_qu, CONVERT(DECIMAL(18, 1), Round(Convert(float,AVG(pr)),2)) AS avg_pr, CONVERT(DECIMAL(18, 1), Round(Convert(float,AVG(discount)),2)) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, ROUND(net_balance, 3) AS balance, Minimum FROM         dbo.View_store WHERE convert(date,pdate) BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102) AND (id_rpur > 0) AND (CostCenter = @CostCenter ) GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, net_balance, Minimum ORDER BY ARname
    END
ELSE
    BEGIN
             SELECT     TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, LTRIM(RTRIM(STR(SUM(CONVERT(int, outt - comee))))) + ' ' + LTRIM(RTRIM(STR(SUM(CONVERT(int, (outt - comee - CONVERT(int, outt - comee)) * CountMiddel))))) + ' ' + LTRIM(RTRIM(STR(SUM(ROUND(((outt - comee) - (CONVERT(int, outt - comee) + CONVERT(int, (outt - comee - CONVERT(int, outt - comee)) * CountMiddel) / CountMiddel)) * CountSmall, 0))))) AS total_qu, CONVERT(DECIMAL(18, 1), Round(Convert(float,AVG(pr)),2)) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))) AS balance, Minimum FROM         dbo.View_store WHERE convert(date,pdate) BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102) AND (id_rpur > 0) AND (CostCenter = @CostCenter )GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))), Minimum
    END
 
 -------------------------------------------
  if @trans =2
BEGIN
 IF @VisbleThreeUnit =0
BEGIN
  SELECT  TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, round(Convert(float,SUM(outt - comee)),3) AS total_qu,round(Convert(float,SUM(total_item-Profit)),3) AS total_cost, CASE WHEN SUM(outt - comee) <>0 THEN SUM((total_item - Profit)) / SUM(outt - comee)  ELSE 0 END as cost ,ROUND(SUM(bones), 3) AS bones, Round(Convert(float,AVG(pr)),2) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, round(Convert(float,SUM(Profit)),0) AS Profit, TypeItem1, TypeItem2, TypeItem3 ,TypeItem4, TypeItem5, TypeItem6 ,TypeItem7,aname ,round(net_balance,3) AS balance, Minimum FROM     dbo.View_store WHERE convert(date,pdate) BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102) AND (id_sal > 0)AND (CostCenter = @CostCenter )GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode,net_balance, Minimum ORDER BY ARname

     END
ELSE
BEGIN
  SELECT     TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, LTRIM(RTRIM(STR(SUM(CONVERT(int, outt - comee))))) + ' ' + LTRIM(RTRIM(STR(SUM(CONVERT(int, (outt - comee - CONVERT(int, outt - comee)) * CountMiddel))))) + ' ' + LTRIM(RTRIM(STR(SUM(ROUND(((outt - comee) - (CONVERT(int, outt - comee) + CONVERT(int, (outt - comee - CONVERT(int, outt - comee)) * CountMiddel) / CountMiddel)) * CountSmall, 0))))) AS total_qu,round(Convert(float,SUM(total_item-Profit)),3) AS total_cost,ROUND(SUM(bones), 3) AS bones, CASE WHEN SUM(outt - comee) <>0 THEN SUM((total_item - Profit)) / SUM(outt - comee)  ELSE 0 END as cost , Round(Convert(float,AVG(pr)),2) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, round(Convert(float,SUM(Profit)),0) AS Profit,TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))) AS balance, Minimum FROM         dbo.View_store WHERE convert(date,pdate) BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102) AND (id_sal > 0) AND (CostCenter = @CostCenter ) GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))), Minimum ORDER BY ARname

 END
 END
   if @trans =3
BEGIN
 IF @VisbleThreeUnit =0
BEGIN
       SELECT     TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, ROUND(SUM(comee - outt), 3) AS total_qu,round(Convert(float,SUM(total_item+Profit)),3) AS total_cost, CASE WHEN SUM(comee -outt ) <>0 THEN SUM((total_item )) / SUM(  comee - outt)  ELSE 0 END as cost, CASE WHEN SUM(comee -outt ) <>0 THEN SUM((total_item + Profit)) / SUM(  comee - outt)  ELSE 0 END as cost, Round(Convert(float,AVG(pr)),2) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, round(Convert(float,SUM(Profit)),3) AS Profit, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, ROUND(net_balance, 3) AS balance, Minimum FROM         dbo.View_store WHERE     (pdate BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102)) AND (id_rsal > 0)AND (CostCenter = @CostCenter ) GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, net_balance, Minimum ORDER BY ARname

END
ELSE
BEGIN
      SELECT     TOP (100) PERCENT max(pdate) as pdate,id_item, ARname, InternationalCode, LTRIM(RTRIM(STR(SUM(CONVERT(int, comee - outt))))) + ' ' + LTRIM(RTRIM(STR(SUM(CONVERT(int, (comee - outt - CONVERT(int, comee - outt)) * CountMiddel))))) + ' ' + LTRIM(RTRIM(STR(SUM(ROUND(((comee - outt) - (CONVERT(int, comee - outt) + CONVERT(int, (comee - outt - CONVERT(int, comee - outt)) * CountMiddel) / CountMiddel)) * CountSmall, 0))))) AS total_qu,round(Convert(float,SUM(total_item+Profit)),3) AS total_cost, CASE WHEN SUM(comee -outt ) <>0 THEN SUM((total_item + Profit)) / SUM(  comee - outt)  ELSE 0 END as cost, Round(Convert(float,AVG(pr)),2) AS avg_pr, Round(Convert(float,AVG(discount)),2) AS avg_discount, round(Convert(float,SUM(total_item)),3) AS total, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))) AS balance, Minimum FROM         dbo.View_store WHERE     (pdate BETWEEN CONVERT(DATE, @date1, 102) AND CONVERT(DATE, @date2, 102)) AND (id_rsal > 0)AND (CostCenter = @CostCenter ) GROUP BY ARname, TypeItem1, TypeItem2, TypeItem3,TypeItem4,TypeItem5,TypeItem6,TypeItem7,aname, id_item, InternationalCode, LTRIM(RTRIM(STR(CurrentBalance0))) + ' ' + LTRIM(RTRIM(STR(CurrentBalance1)))  + ' ' + LTRIM(RTRIM(STR(CurrentBalance2))), Minimum ORDER BY ARname

 END
 END
 