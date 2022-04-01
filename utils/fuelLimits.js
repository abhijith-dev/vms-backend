module.exports= function(type){
   let v_type = parseInt(type)
   
   switch(v_type){
       case 1: return 50
       case 2: return 65
       case 3: return 68
       case 4: return 70
       case 5: return 88
       case 6: return 115
       case 7: return 180
       case 8: return 300
       case 9: return 850
       case 10: return 1500
       case 11: return 3000
       default: return 0
   }
}