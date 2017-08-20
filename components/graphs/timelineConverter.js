//API translate
var translate = function (time){
  switch (time){
    case  '1y':
      return {
        agg: 2,
        limit: 182,
        time: 'histoday'
      }
      //month needs to be calculated
    case  '1m':
      return {
        agg: 4,
        limit: 180,
        time: 'histohour'
      }
    case  '1w':
      return {
        agg: 1,
        limit: 168,
        time: 'histohour'
      }
    case  '1d':
      return {
        agg: 8,
        limit: 180,
        time: 'histominute'
      }
    case  '1h':
      return {
        agg: 1,
        limit: 60,
        time: 'histominute'
      }
    default:
      return {
        agg: 1,
        limit:60,
        time:'histominute'
      }
    }
};

module.exports = translate;

