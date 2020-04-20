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
      });
      $("tbody tr").on("click", function (evt) {
        console.log($(this))
        symbol = evt.currentTarget.cells[0].innerText;
        $("#company-symbol-3").html(symbol);
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
        evt.stopPropagation();
      });
    })
    .fail((err) => {
      console.log("Error: ", err);
    });
});

// Try random company
$(".try-random").on("click", () => {
  symbol = "";
  for (let i = 0; i < 3; i++) {
    const letter = String.fromCharCode(97.0 + Math.round(Math.random() * 25.0));
    symbol += letter;
  }
  sylurl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;
  $.get(sylurl)
    .done((res) => {
      const companies = res["bestMatches"];
      symbol = companies[0]['1. symbol']
      console.log('s2', symbol)
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
      $.get(url).done((res) => {
        console.log(res)
        appreciate(res);
      }).fail(err=> console.log(err));
    })
    .fail((err) => {
      console.log("error", err);
    });
});

// Calculate appreciation
$(".form-1").on("submit", (evt) => {
  evt.preventDefault();
  console.log("dddf");
  monthTot = $(".input-year").val() * 12.0 + $(".input-month").val() * 1.0;
  $.get(url)
    .done((res) => {
      appreciate(res);
    })
    .fail((err) => {
      console.log("Error: ", err);
    });
});

function appreciate(res) {
  if (res.Note && res.Note.startsWith("Thank you for using Alpha Vantage!")){
    alert('The api can only make 5 requests/min,  500/day. Please try again later')
  }
    const sylbol = res["Meta Data"]["2. Symbol"];
  const stockMonthAndPrice = res["Monthly Time Series"];
  const months = Object.keys(stockMonthAndPrice);
  const lastMonth = months[monthTot] || months[months.length - 1];
  const currentMonth = months[0];
  const lastPrice = stockMonthAndPrice[lastMonth]["4. close"];
  const currentPrice = stockMonthAndPrice[currentMonth]["4. close"];
  const appreciation = (((currentPrice - lastPrice) / lastPrice) * 100).toFixed(2);
  $("#company-symbol-3").html(sylbol);
  $("#stockp").html(
    `The price of ${sylbol} is <h2>$${currentPrice} </h2> as of ${currentMonth}
        <hr>The price of ${sylbol} was <h2> $${lastPrice} </h2> as of ${lastMonth}
        <hr><br><h2>Total appreciation: <span class='appre-color'>${appreciation}%</span></h2>
        `
  );
  if (appreciation > 0) {
    $(".appre-color").css({ color: "green" });
  } else if (appreciation < 0) {
    $(".appre-color").css({ color: "red" });
  }
}
