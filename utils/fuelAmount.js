const FUEL_AMOUNTS ={
   PERTOL:100.05,
   DIESEL:95.25
}
module.exports = function(fuel,type){
  if(type === 'petrol'){
      return parseFloat((parseFloat(fuel)*parseFloat(FUEL_AMOUNTS.PERTOL))*0.0000040)
  }
  if(type === 'diesel'){
    return parseFloat((parseFloat(fuel)*parseFloat(FUEL_AMOUNTS.DIESEL))*0.0000040)
 }
 return 0
}