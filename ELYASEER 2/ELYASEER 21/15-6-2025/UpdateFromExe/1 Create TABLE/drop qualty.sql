
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[qualty]') AND type in (N'U'))
BEGIN
DROP TABLE [dbo].[qualty]
END

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[rep1]') AND type in (N'U'))
BEGIN
DROP TABLE [dbo].[rep1]
END

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[rep2]') AND type in (N'U'))
BEGIN
DROP TABLE [dbo].[rep2]
END
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Dataqualty]') AND type in (N'U'))
BEGIN
DROP TABLE [dbo].[Dataqualty]
END