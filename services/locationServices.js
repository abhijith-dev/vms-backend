const { default: axios } = require("axios")

const request =async(location)=>{
    axios({
        url:"",
        method:"GET"
    })
    .then(res=>{
        return res
    })
}

module.exports =async function (from,to){
    let from_coords = await  request(from)
    let to_coords = await  request(to)
    let response ={
        from
    }
}

