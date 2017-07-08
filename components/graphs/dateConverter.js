const Converter = (data) => {
  data.forEach((a) => {
    var day = new Date(a.time *1000);
    console.log(day);
    var hours = day.getHours();
    var minutes = "0" + day.getMinutes();
    var seconds = "0" + day.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
  });
  console.log(data[0].time * 1000);
  console.log('----------------------------------------------------------');
};

export default Converter;




