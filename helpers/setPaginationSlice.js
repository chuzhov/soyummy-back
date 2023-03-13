const setPaginationSlice = (page, per_page, arrLength) => {
    if (per_page && arrLength){
      page = parseInt(page);
      per_page = parseInt(per_page);

      if ( !isNaN(page) && page >=0 && !isNaN(per_page) && per_page >0 ){
        const start = ( page - 1 ) * per_page;
        if ( start >= arrLength ) return null;
        
        const end = start + per_page;
        return { start, end }
      }
    }
    return null;
  }

  module.exports = setPaginationSlice;