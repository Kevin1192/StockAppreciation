const apiKey = "QTDS1EF17V0Z9820";
let symbol = "IBM";
let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
let monthTot, sylurl;

// Choose year and month
$(".dropdown-year").on("click", (evt) => {
  $(".input-year").val(evt.target.text);
});

$(".dropdown-month").on("click", (evt) => {
  $(".input-month").val(evt.target.text);
});

// Choose company
$("#basic-addon2").on("click", () => {
  let table = `<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Symbol</th>
      <th scope="col">Company</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
  </table>`;
  $(".company-display").html(table);
  symbol = $(".company-name").val();
  sylurl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;
  $.get(sylurl)
    .done((res) => {
      const companies = res["bestMatches"];
      companies.forEach((company) => {
        company["1. symbol"];
        $("tbody").append(`<tr class='stock-sym'>
      <th scope="row">${company["1. symbol"]}</th>
      <td>${company["2. name"]}</td>
    </tr>
    `);
      })
      $("tbody tr").on("click", function (evt) {
        symbol = evt.currentTarget.cells[0].innerText
        $('#company-symbol-3').html(symbol);
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
        evt.stopPropagation();
      });
    })
    .fail((err) => {
      console.log("Error: ", err);
    });
});


// Calculate appreciation
$(".form-1").on("submit", () => {
  monthTot = $(".input-year").val() * 12.0 + $(".input-month").val() * 1.0;

  $.get(url)
    .done((res) => {
      const sylbol = res["Meta Data"]["2. Symbol"];
      const stockMonthAndPrice = res["Monthly Time Series"];
      const months = Object.keys(stockMonthAndPrice);
      const lastMonth = months[monthTot] || months[months.length - 1];
      const currentMonth = months[0];
      const lastPrice = stockMonthAndPrice[lastMonth]["4. close"];
      const currentPrice = stockMonthAndPrice[currentMonth]["4. close"];
      const appreciation = (
        ((currentPrice - lastPrice) / lastPrice) *
        100
      ).toFixed(2);
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
