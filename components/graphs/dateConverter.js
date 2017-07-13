const Converter = (data) => {
  var obj = [];
  data.forEach((a, i) => {
    var day = new Date(a.time *1000);
    //console.log(day);
    var hours = day.getHours();
    var minutes = "0" + day.getMinutes();
    var seconds = "0" + day.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    //console.log(formattedTime);
    obj.push({
      x : i,
      y : a.close
    });
    //var newObject = Object.assign(data, indexNumber);
    //console.log(newObject[i]);
    //console.log(a.time);
    //console.log(a.close);
  });
  //console.log(data[0].time * 1000);
  console.log('----------------------------------------------------------');
  //console.log(obj);
  var obj2 = [];
  obj2.push(obj);
  return obj2;
};

export default Converter;




