const Converter = (data) => {
  var obj = [];
  data.forEach((a, i) => {
    /*
    var day = new Date(a.time *1000);
    var hours = day.getHours();
    var minutes = "0" + day.getMinutes();
    var seconds = "0" + day.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    */
    
    obj.push({
      x : i,
      y : a.close
    });

  });

  console.log('----------------------------------------------------------');

  var obj2 = [];
  obj2.push(obj);
  return obj2;
};

export default Converter;




