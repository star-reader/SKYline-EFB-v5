
export const getAirportName = function (m,t){
    return m ? m : t
}

export const getNavidName = function (ident,present,lat,lng){
   if (lat && lng){
     return ident
   }
     return ''
}
