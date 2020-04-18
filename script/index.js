const apiKey = "QTDS1EF17V0Z9820";
let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${apiKey}`;
let years = 5;

$('.form-1').on('submit', (evt)=>{
    years = $('.input-1').val();
})

console.log('this is years', years)

$('.dropdown-item').on('click',(evt)=>{
    $('.input-1').val(evt.target.text);
})


$("#stockbtn").on("click", () => {
  $.get(url)
    .done((res) => {
      const sylbol = res["Meta Data"]["2. Symbol"];
      const stockMonthAndPrice = res["Monthly Time Series"];
      const months = Object.keys(stockMonthAndPrice);
      const lastMonth = months[years * 12] || months[months.length - 1];
      const currentMonth = months[0];
      const lastPrice = stockMonthAndPrice[lastMonth]["4. close"];
      const currentPrice = stockMonthAndPrice[currentMonth]["4. close"];
      const appreciation = ((currentPrice - lastPrice)/lastPrice*100).toFixed(2);
      $("#stockp").html(
        `The price of ${sylbol} is $${currentPrice} as of ${currentMonth}
        <br>The price of ${sylbol} was $${lastPrice} as of ${lastMonth}
        <br><h2>The total appreciation is ${appreciation}%</h2>
        `
      );
    })
    .fail((err) => {
      console.log("Error: ", err);
    });
});
