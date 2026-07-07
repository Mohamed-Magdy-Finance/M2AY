IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'TaxValue' AND Object_ID = Object_ID(N'PUR_invoice'))ALTER TABLE PUR_invoice DROP COLUMN TaxValue
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_Datatqualty' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_Datatqualty 
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_qualty1' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_qualty1
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_qualty2' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_qualty2 
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_qualty3' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_qualty3 
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_qualty4' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_qualty4 
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_qualty5' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_qualty5 
IF  EXISTS(SELECT * FROM sys.columns WHERE Name  = N'Permition_qualty6' AND Object_ID = Object_ID(N'UserPermition'))ALTER TABLE UserPermition DROP COLUMN Permition_qualty6 

