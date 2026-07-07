CREATE proc [dbo].[SetBeginAccountWithDate]
@PDATE DATE
as


Delete from constraint_invoice WHERE convert(date,Pdate)< @PDATE

delete from dbo.PaperCome WHERE convert(date,Pdate)< @PDATE

delete from dbo.PaperOut  WHERE convert(date,Pdate)< @PDATE
delete from dbo.Tree_Account  WHERE convert(date,Pdate)< @PDATE
