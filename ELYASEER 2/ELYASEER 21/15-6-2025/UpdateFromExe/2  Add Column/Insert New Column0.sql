IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'delegateName' AND Object_ID = Object_ID(N'pur_Invoice'))ALTER TABLE pur_Invoice ADD  delegateName nvarchar(150)
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'NetTotalItem' AND Object_ID = Object_ID(N'pur_details'))ALTER TABLE pur_details ADD  NetTotalItem float
IF not EXISTS(SELECT * FROM sys.columns WHERE Name  = N'commission' AND Object_ID = Object_ID(N'Pur_Invoice'))ALTER TABLE Pur_Invoice ADD  commission float
