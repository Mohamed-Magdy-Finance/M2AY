

create proc [dbo].[ItemClacExpire]
@iditem BIGINT
,@id_store BIGINT
AS
BEGIN

------INSERT into  ItemExpire---------------------------------------------------------
DELETE from ItemExpire where id_item=@iditem and id_store=@id_store
INSERT into  ItemExpire (id_item,id_store, comee,outt, date_expire,CountMiddel,CountSmall)
SELECT   id_item,id_store, SUM(comee) AS comee, SUM(outt) AS outt, date_expire, isnull(CountMiddel,1),isnull(CountSmall,1)  FROM View_store
GROUP BY id_item,id_store, date_expire, isnull(CountMiddel,1),isnull(CountSmall,1) HAVING id_item = @iditem and id_store=@id_store ORDER BY date_expire

---order by pdate'====================================================================
DECLARE @id_expire bigint
DECLARE @Come_expire Float
DECLARE @date_expire date
DECLARE CursorExpire CURSOR LOCAL FOR 
SELECT  id,comee, convert(date,date_expire) FROM ItemExpire where id_item = @iditem and id_store=@id_store and comee>0 and date_expire is not null  

OPEN CursorExpire
FETCH NEXT FROM CursorExpire into @id_expire,@Come_expire,@date_expire
WHILE @@FETCH_STATUS = 0
 BEGIN
 DECLARE @pdatee date
 select @pdatee=convert(date,pdate) from View_store where id_item =@iditem and id_store=@id_store and  convert(date, date_expire)=@date_expire order by pdate desc
   update ItemExpire set pdate=@pdatee  where id_item=@iditem and  id_store=@id_store and convert(date, date_expire)=@date_expire

FETCH NEXT FROM CursorExpire into  @id_expire,@Come_expire,@date_expire
END
  CLOSE CursorExpire
  DEALLOCATE CursorExpire
  ------fix ItemExpire---------------------------------------------------------

DECLARE @Count BIGINT
SELECT @Count =COUNT(*)FROM ItemExpire WHERE outt >comee
IF @Count >0
BEGIN
DECLARE @idd bigint
DECLARE @AddOut Float=0
DECLARE @Out Float
DECLARE @Come Float
DECLARE @DateExpire DATE
-------------------------------------------------------------

DECLARE CursorExpire CURSOR LOCAL FOR 
SELECT   isnull(outt,0) as Out, isnull(comee,0) as Come,id,date_expire FROM        ItemExpire  where id_item=@iditem and id_store=@id_store  ORDER BY  pdate
OPEN CursorExpire
FETCH NEXT FROM CursorExpire into @Out,@Come,@idd,@DateExpire
WHILE @@FETCH_STATUS = 0
 BEGIN
 set @AddOut =  isnull(@AddOut,0) + isnull(@Out,0) - isnull(@Come,0)
         IF @AddOut >= 0 
            BEGIN
              DELETE from ItemExpire  where id=@idd 
               update item_store set date_expire=null,backup_expire=@DateExpire,dateEditExpire=getdate()  where id_item=@iditem and id_store=@id_store and date_expire=@DateExpire

            END
         ELSE 
           BEGIN
              UPDATE  ItemExpire set outt=isnull(@Come,0) + isnull(@AddOut,0) where id=@idd  
              SET  @AddOut=0
         END
           
         FETCH NEXT FROM CursorExpire into @Out,@Come,@idd,@DateExpire
    END
  CLOSE CursorExpire
  DEALLOCATE CursorExpire
 
END
DELETE from ItemExpire where round(comee,2)=round(outt,2) and id_item=@iditem and id_store=@id_store


--'============================================================
DECLARE @id     Float=0
DECLARE @QuBig     Float=0

DECLARE @CountMiddel    Float =0
DECLARE @CountSmall     Float =0
DECLARE CursorQU CURSOR LOCAL FOR 
SELECT     id,(comee-outt), CountMiddel,CountSmall from ItemExpire where id_item=@iditem and id_store=@id_store

OPEN CursorQU
FETCH NEXT FROM CursorQU into @id,@QuBig,@CountMiddel,@CountSmall
WHILE @@FETCH_STATUS = 0
 BEGIN 
 DECLARE @NetQuBig     Float=0
DECLARE @NetMidell    Float =0
DECLARE @NetSmall     Float =0
      SET @NetQuBig= convert(int,@QuBig)
            IF isnull(@QuBig,0) > isnull(@NetQuBig,0) 
             BEGIN
                    IF ISNULL(@CountSmall,0) <= 1    SET  @NetMidell = Round(((@QuBig - @NetQuBig) * @CountMiddel),0)
                    IF ISNULL(@CountSmall,0)>1    SET  @NetMidell = ((@QuBig - @NetQuBig) * @CountMiddel)
            End         
        IF ISNULL(@NetMidell,0) > 0
           BEGIN
                  IF ISNULL(@NetMidell,0) = ISNULL(@CountMiddel,0)
                         BEGIN 
                              SET @NetQuBig += 1 
                              SET @NetMidell = 0
                          End     
                  Else
                       BEGIN
                       
                         IF ISNULL(@NetMidell,0) > CONVERT(INT,ISNULL(@NetMidell,0))   SET @NetSmall =ROUND((@NetMidell - CONVERT(INT,@NetMidell)) * (@CountSmall / @CountMiddel),0)
                           IF ISNULL(@NetSmall,0) = (ISNULL(@CountSmall,0) / ISNULL(@CountMiddel,0)) 
                           BEGIN
                               SET @NetMidell += 1
                               SET @NetSmall = 0
                            End
                  End 
          SET @NetMidell = CONVERT(INT,@NetMidell)         
        End 
		update  ItemExpire set NetQuBig=@NetQuBig,NetMidell=@NetMidell,NetSmall=@NetSmall where id=@id
FETCH NEXT FROM CursorQU into  @id,@QuBig,@CountMiddel,@CountSmall
END
  CLOSE CursorQU
  DEALLOCATE CursorQU
  END