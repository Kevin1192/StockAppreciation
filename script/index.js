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


// Quotes
const quotes = [
  [
    "Paul Samuelson",
    "“Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.”",
  ],
  [
    "Sir John Templeton",
    "“The four most dangerous words in investing are: “This time it’s different”.”",
  ],
  [
    "Warren Buffett",
    "“Wide diversification is only required when investors do not understand what they are doing.”",
  ],
  [
    "Warren Buffett",
    "“Rule number one: Don’t lose money. Rule number two: Don’t forget rule number one.”",
  ],
  [
    "Warren Buffett",
    "“The most important quality for an investor is temperament, not intellect.”",
  ],
  [
    "Warren Buffett",
    "“Games are won by players who focus on the playing field – not by those whose eyes are glued to the scoreboard.”",
  ],
  [
    "Mark Twain, Pudd’nhead Wilson",
    "“October: This is one of the peculiarly dangerous months to speculate in stocks. The others are July, January, September, April, November, May, March, June, December, August and February.”",
  ],
  [
    "Peter Lynch",
    "“The trick is not to learn to trust your gut feelings, but rather to discipline yourself to ignore them. Stand by your stocks as long as the fundamental story of the company hasn’t changed.”",
  ],
  [
    "Warren Buffett",
    "“If you aren’t thinking about owning a stock for ten years, don’t even think about owning it for ten minutes.”",
  ],
  [
    "Phillip Fisher",
    "“The stock market is filled with individuals who know the price of everything, but the value of nothing.”",
  ],
  ["Benjamin Franklin", "“An investment in knowledge pays the best interest.”"],
  [
    "George Soros",
    "“If investing is entertaining, if you’re having fun, you’re probably not making any money. Good investing is boring.”",
  ],
  [
    "Warren Buffett",
    "“Derivatives are financial weapons of mass destruction.”",
  ],
  [
    "Jon Stewart",
    "“If I’d only followed CNBC’s advice, I’d have a million dollars today. Provided I’d started with a hundred million dollars.”",
  ],
  [
    "Robert Kiyosaki",
    "“People don’t like the idea of thinking long term. Many are desperately seeking short term answers because they have money problems to be solved today.”",
  ],
  [
    "Warren Buffett",
    "“Much success can be attributed to inactivity. Most investors cannot resist the temptation to constantly buy and sell.”",
  ],
  [
    "Warren Buffett",
    "“Unless you can watch your stock holding decline by 50% without becoming panic stricken, you should not be in the stock market.”",
  ],
  [
    "Peter Lynch",
    "“More money has been lost trying to anticipate and protect from corrections than actually in them.”",
  ],
  [
    "Benjamin Graham",
    "“The investor’s chief problem and even his worst enemy is likely to be himself.”",
  ],
  [
    "Сharlie Munger",
    "“Tell me where I’m going to die so that I won’t go there.”",
  ],
  [
    "Warren Buffett",
    "“I will tell you how to become rich. Close the doors. Be fearful when others are greedy. Be greedy when others are fearful.”",
  ],
  [
    "Benjamin Graham",
    "“The intelligent investor is a realist who sells to optimists and buys from pessimists.”",
  ],
  [
    "Benjamin Graham",
    "“On the other hand, investing is a unique kind of casino — one where you cannot lose in the end, so long as you play only by the rules that put the odds squarely in your favour.”",
  ],
  [
    "Peter Lynch",
    "“Big companies have small moves, small companies have big moves.”",
  ],
  ["Peter Lynch", "“Know what you own, and know why you own it.”"],
  [
    "Jack D. Schwager",
    "“If you don’t stay with your winners, you are not going to be able to pay for the losers.”",
  ],
  [
    "Edwin Lefèvre",
    "“If a man didn’t make mistakes he’d own the world in a month. But if he didn’t profit by his mistakes he wouldn’t own a blessed thing.”",
  ],
  [
    "Warren Buffett",
    "“Calling someone who trades actively in the market an investor is like calling someone who repeatedly engages in one-night stands a romantic.”",
  ],
  [
    "Howard Marks",
    "“”Prices are too high” is far from synonymous with “The next move will be downward.” Things can be overpriced and stay that way for a long time … or become far more so.”",
  ],
  [
    "Howard Marks",
    "“The most dangerous thing is to buy something at the peak of its popularity. At that point, all favourable facts and opinions are already factored into its price and no new buyers are left to emerge.”",
  ],
  [
    "Peter Lynch",
    "“Everyone has the brainpower to make money in stocks. Not everyone has the stomach.”",
  ],
  [
    "Charlie Munger",
    "“Investing is not supposed to be easy. Anyone who finds it easy is stupid.”",
  ],
];



const newQuote = ()=> {
  const randomNum = Math.floor(Math.random() * quotes.length)
  $('.quote').text(quotes[randomNum][1]);
  $('.author').text('-- '+quotes[randomNum][0]);
}

newQuote();

$('.changeQuote').on('click', ()=>{
  newQuote();
})