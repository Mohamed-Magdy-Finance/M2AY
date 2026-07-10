
 BEGIN  TRY
  BEGIN TRANSACTION
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'qu' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ALTER COLUMN qu descimal(18,4)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pr' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ALTER COLUMN pr descimal(18,4)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'bones' AND Object_ID = Object_ID(N'Sal_Invoice'))ALTER TABLE Sal_Invoice ALTER COLUMN bones descimal(18,4)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowCome' AND Object_ID = Object_ID(N'emp'))ALTER TABLE emp ALTER COLUMN AllowCome NVARCHAR(50)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'AllowOut' AND Object_ID = Object_ID(N'emp'))ALTER TABLE emp ALTER COLUMN AllowOut NVARCHAR(50)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'PurchasePrice' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ALTER COLUMN PurchasePrice decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BigPr0' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ALTER COLUMN BigPr0 decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BigPr1' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ALTER COLUMN BigPr1 decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'BigPr2' AND Object_ID = Object_ID(N'item'))ALTER TABLE item ALTER COLUMN BigPr2 decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pr' AND Object_ID = Object_ID(N'Sal_Details'))ALTER TABLE Sal_Details ALTER COLUMN pr decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'total_item' AND Object_ID = Object_ID(N'Sal_Details'))ALTER TABLE Sal_Details ALTER COLUMN total_item decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pr' AND Object_ID = Object_ID(N'RSal_Details'))ALTER TABLE RSal_Details ALTER COLUMN pr decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'total_item' AND Object_ID = Object_ID(N'RSal_Details'))ALTER TABLE RSal_Details ALTER COLUMN total_item decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'aname' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ALTER COLUMN aname nvarchar(120)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'pr' AND Object_ID = Object_ID(N'PUR_Details'))ALTER TABLE PUR_Details ALTER COLUMN pr decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'total_item' AND Object_ID = Object_ID(N'PUR_Details'))ALTER TABLE PUR_Details ALTER COLUMN total_item decimal(18, 3)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'constraint_invoice'))ALTER TABLE constraint_invoice ALTER COLUMN des nvarchar(500)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'des' AND Object_ID = Object_ID(N'Tree_Account'))ALTER TABLE Tree_Account ALTER COLUMN des nvarchar(500)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'nots' AND Object_ID = Object_ID(N'constraint_details'))ALTER TABLE constraint_details ALTER COLUMN nots nvarchar(500)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'debt_name' AND Object_ID = Object_ID(N'constraint_details'))ALTER TABLE constraint_details ALTER COLUMN debt_name nvarchar(120)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'credit_name' AND Object_ID = Object_ID(N'constraint_details'))ALTER TABLE constraint_details ALTER COLUMN credit_name nvarchar(120)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'SalInMonth' AND Object_ID = Object_ID(N'item_Request'))ALTER TABLE item_Request ALTER COLUMN SalInMonth nvarchar(50)
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'notes' AND Object_ID = Object_ID(N'MyBuilder'))ALTER TABLE MyBuilder ALTER COLUMN notes nvarchar(500)
 COMMIT TRANSACTION
 END TRY
    BEGIN CATCH
                 ROLLBACK TRANSACTION
                 SELECT ERROR_MESSAGE() 
    END CATCH

