//API translate
var translate = function (time){
  switch (time){
    case  '1y':
      return {
        agg: 6,
        limit: 60,
        time: 'histoday'
      }
      //month needs to be calculated
    case  '1m':
      return {
        agg: 6,
        limit: 60,
        time: 'histoday'
      }
    case  '1w':
      return {
        agg: 2,
        limit: 84,
        time: 'histohour'
      }
    case  '1d':
      return {
        agg: 30,
        limit: 48,
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

