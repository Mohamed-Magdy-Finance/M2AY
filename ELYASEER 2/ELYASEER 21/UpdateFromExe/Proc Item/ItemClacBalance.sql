


-----old
alter proc [dbo].[ItemClacBalance]
@iditem bigint
as
Begin
DECLARE @Type int = 0;
DECLARE @ARname nvarchar(500) ;
SELECT @Type= Type,@ARname=ARname FROM item where id_item =@iditem
IF @Type=4 update Item_store set come_Middel =0,come_Small =0,come_big =0,out_big =0,out_Middel =0,out_Small =0 where id_item =@iditem 


-------------------------------------------------
DECLARE @NetQuBig     Float=0
DECLARE @NetMidell    Float =0
DECLARE @NetSmall     Float =0
DECLARE @CountMiddel  Float = 1;
DECLARE @CountSmall   Float = 1;
DECLARE @VisbleThreeUnit BIT=1
DECLARE @ShowMaking BIT=0
DECLARE @AllowTicket BIT=0
DECLARE @net_balance float = 0;
DECLARE @pur_balance float = 0;

SELECT @net_balance= round(convert(float,SUM(comee-outt)),5),@CountMiddel = isnull(CountMiddel,1),@CountSmall = isnull(CountSmall,1)  FROM View_store where id_item =@iditem GROUP BY CountMiddel,CountSmall

 
SELECT @VisbleThreeUnit= VisbleThreeUnit,@AllowTicket=AllowTicket,@ShowMaking=ShowMaking FROM ZZproperties



IF @VisbleThreeUnit=1 and isnull(@CountMiddel,0)+isnull(@CountSmall,0)>2 
BEGIN

      IF @CountMiddel<=0 SET @CountMiddel=1 
      IF @CountSmall<=0  SET @CountSmall=1       
        DECLARE @mines TINYINT = 0
        DECLARE @QuBig FLOAT = Abs(@net_balance)
        
        IF isnull(@net_balance,0) < 0 set @mines = 1
          
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
  IF @mines=1 
        BEGIN
             SET  @NetQuBig *=-1 
             SET  @NetMidell *=-1 
             SET  @NetSmall *=-1
        END
   END
ELSE
  BEGIN

   SET @NetQuBig =@net_balance 
   SET @NetMidell  =0
   SET @NetSmall  =0
   
END
 
---CALC COST---------------------------------------
declare @tot_qu  real =0
declare @tot  real =0
declare @comee  float =0
declare @outt  float =0
declare @idRpur  float =0
declare @tot_item  float =0
declare @counter  int =0
declare @id_Begin  Bigint =0
declare @id_inside  Bigint =0
declare @id_pur  Bigint =0
declare @pdate  datetime
declare @Dis  decimal(18, 2) =0
declare @Discount  float =0
declare @come_Dis  float =0

---------------------------------------------------------------
DECLARE MyCursor CURSOR LOCAL FOR 
SELECT  ISNULL(comee, 0) as comee, total_item,id_Rpur,ISNULL(outt, 0) as outt,id_Begin,id_inside,id_pur,CONVERT(datetime,pdate),Discount FROM View_store WHERE id_item =@iditem AND isnull(total_item,0) > 0 AND isnull(comee,0)+isnull(id_Rpur,0) > 0 AND ISNULL(id_pur, 0)+isnull(id_Rpur,0)+isnull(id_Begin,0)+isnull(id_inside,0)+ (isnull(id_making+comee,0))  > 0  ORDER BY pdate DESC,id_Rpur DESC, id DESC
OPEN MyCursor
FETCH NEXT FROM MyCursor into @comee,@tot_item,@idRpur,@outt,@id_Begin,@id_inside,@id_pur,@pdate,@Discount
 WHILE @@FETCH_STATUS = 0
   BEGIN
     if isnull(@counter,0)  =0 SELECT   @pur_balance= sum(ISNULL(comee-outt, 0))  FROM View_store WHERE id_item =@iditem  and CONVERT(datetime,pdate)<=@pdate
     if isnull(@idRpur,0)  >0  set @tot_qu = @tot_qu -@outt
     if isnull(@idRpur,0)  =0  set @tot_qu = @tot_qu + @comee     
        
      IF @pur_balance <= @tot_qu and @pur_balance>0 and @counter>0 and @comee >0
      BEGIN				                  
				   IF isnull(@Discount,0)>0 set @Dis = @Dis+  ((isnull(@Discount,0)  * ((isnull(@comee,0)+isnull(@pur_balance,0)-isnull(@tot_qu,0)))))      
                   IF isnull(@Discount,0)>0  set @come_Dis= isnull(@come_Dis,0) + (@comee-(@tot_qu -@pur_balance) )

					set @tot = @tot + (((@tot_item/@comee)*(@comee-(@tot_qu -@pur_balance) )))  
   
                   set @tot_qu = @pur_balance
				
                 BREAK
       END  
               
         IF isnull(@idRpur,0)  >0  SET @tot -=   @tot_item 
         IF isnull(@idRpur,0)  =0  
		      BEGIN
                    SET @tot +=   @tot_item 
                    IF isnull(@Discount,0)>0 set @Dis +=  (isnull(@Discount,0)  * isnull(@comee,0))              
                    IF isnull(@Discount,0)>0  set @come_Dis += isnull(@comee,0)
              END 
		 
        
            IF @pur_balance <= @tot_qu  BREAK
            SET @counter =1
        FETCH NEXT FROM MyCursor into @comee,@tot_item,@idRpur,@outt,@id_Begin,@id_inside,@id_pur,@pdate,@Discount
     END
CLOSE MyCursor
DEALLOCATE MyCursor

DECLARE @cost real=0

     IF ISNULL(@tot_qu,0) > 0 And ISNULL(@tot,0) > 0 set  @cost = @tot / @tot_qu 
     IF ISNULL(@come_Dis,0)>0 AND @DIS>0    set  @dis = Round(@dis / @come_Dis, 2)
IF @VisbleThreeUnit=1 declare @keep  float  = 0 SELECT @keep=  SUM(ItemTicket.qu)  FROM         ItemTicket  where id_item =@iditem AND ISNULL(ISOpen,'0') =0 
------------------------------------------------------------------
IF @ShowMaking=1
BEGIN
DECLARE @costMaking real=0 
SELECT @costMaking=  sum(  TotalCost)/max(QU_Product) FROM View_Requ WHERE ARname_Requ = @ARname
if isnull(@costMaking,0)>0 set @cost=@costMaking
END
------------------------------------------------------------------


IF isnull(@cost,0)=0 UPDATE Item SET  keep=@keep,cost=isnull(PurchasePrice,0)*(100-isnull(Dioscount_main,0) )/100,net_balance=convert(decimal(18,6) ,isnull(@net_balance,0)),CurrentBalance0=@NetQuBig ,CurrentBalance1=convert(int,@NetMidell) ,CurrentBalance2=@NetSmall,Dioscount_main =@dis   where id_item =@iditem
IF isnull(@cost,0)>0 UPDATE Item SET  keep=@keep,cost=@cost,net_balance=convert(decimal(18,6) ,isnull(@net_balance,0)),CurrentBalance0=@NetQuBig ,CurrentBalance1=convert(int,@NetMidell) ,CurrentBalance2=@NetSmall,Dioscount_main =@dis where id_item =@iditem

END