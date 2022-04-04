module.exports =  function(from,to,p_count,g_count,v_cost){
    let p_amount = parseFloat(parseFloat(p_count*12)*0.0000040)
    let g_amount = parseFloat(parseFloat(g_count*3)*0.0000040)
    return parseFloat(p_amount+g_amount+v_cost+(100*0.0000040))
}