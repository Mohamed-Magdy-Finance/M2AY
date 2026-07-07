

create view View_RepInstallmentMaster
as
SELECT        TOP (100) PERCENT dbo.Tree.id, dbo.cust.Aname, dbo.cust.nots, dbo.Tree.Begin_balance, dbo.cust.id_cust, dbo.cust.Code, dbo.cust.Mobile, dbo.cust.delegateSal, dbo.cust.CostCenter, SUM(ISNULL(dbo.Tree_Account.debt, 0) 
                         - ISNULL(dbo.Tree_Account.credit, 0)) AS balance, ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) AS Profit001, ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) 
                         + ROUND(dbo.Installment.InstallmentValue, 2) AS TotalProfitAndProduct, (ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) + ROUND(dbo.Installment.InstallmentValue, 2)) 
                         / ROUND(dbo.Installment.CountInstalment, 2) AS installmentAfterProfit, ROUND(dbo.Installment.InstallmentValue / dbo.Installment.CountInstalment, 2) AS installmentAfterCapital, 
                         (ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) + ROUND(dbo.Installment.InstallmentValue, 2)) / ROUND(dbo.Installment.CountInstalment, 2) 
                         - ROUND(dbo.Installment.InstallmentValue / dbo.Installment.CountInstalment, 2) AS diff_profit, ((ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) + ROUND(dbo.Installment.InstallmentValue, 2)) 
                         / ROUND(dbo.Installment.CountInstalment, 2) - ROUND(dbo.Installment.InstallmentValue / dbo.Installment.CountInstalment, 2)) * dbo.Installment.ProfitCapital / 100 AS ProfitCapitalPercent, 
                         ((ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) + ROUND(dbo.Installment.InstallmentValue, 2)) / ROUND(dbo.Installment.CountInstalment, 2) 
                         - ROUND(dbo.Installment.InstallmentValue / dbo.Installment.CountInstalment, 2)) * dbo.Installment.ProfitMangment / 100 AS ProfitMangmentPercent, dbo.Installment.Product, dbo.Installment.ProfitMangment, 
                         dbo.Installment.ProfitCapital, dbo.Installment.InstallmentValue, dbo.Installment.CountInstalment, dbo.Installment.ProductValue, dbo.Installment.PurDate, dbo.cust.Address, dbo.Installment.SeqMonth, dbo.Installment.Profit, 
                         ROUND(dbo.Installment.ProductValue * dbo.Installment.Profit / 100, 2) AS TotalProfit
FROM            dbo.cust INNER JOIN
                         dbo.Installment ON dbo.cust.id_cust = dbo.Installment.id_cust LEFT OUTER JOIN
                         dbo.Tree ON dbo.cust.id_account = dbo.Tree.id LEFT OUTER JOIN
                         dbo.Tree_Account ON dbo.Tree.id = dbo.Tree_Account.id_Account
GROUP BY dbo.Installment.Product, dbo.Installment.InstallmentValue, dbo.Installment.ProfitCapital, dbo.Installment.ProfitMangment, dbo.Installment.CountInstalment, dbo.Tree.id, dbo.cust.Aname, dbo.cust.nots, dbo.cust.Mobile, 
                         dbo.cust.delegateSal, dbo.Tree.Begin_balance, dbo.cust.id_cust, dbo.cust.Code, dbo.cust.CostCenter, dbo.Installment.ProductValue, dbo.Installment.PurDate, dbo.cust.Address, dbo.Installment.SeqMonth, dbo.Installment.Profit, 
                         ((ROUND(dbo.Installment.InstallmentValue * dbo.Installment.Profit / 100, 2) + ROUND(dbo.Installment.InstallmentValue, 2)) / ROUND(dbo.Installment.CountInstalment, 2) 
                         - ROUND(dbo.Installment.InstallmentValue / dbo.Installment.CountInstalment, 2)) * dbo.Installment.ProfitMangment / 100, ROUND(dbo.Installment.ProductValue * dbo.Installment.Profit / 100, 2)


