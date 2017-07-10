const Converter = (data) => {
  data.forEach((a, i) => {
    var day = new Date(a.time *1000);
    console.log(day);
    var hours = day.getHours();
    var minutes = "0" + day.getMinutes();
    var seconds = "0" + day.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
    data.newProperty = { id: i};
    console.log(data);
  });
  console.log(data[0].time * 1000);
  console.log('----------------------------------------------------------');
};

export default Converter;




