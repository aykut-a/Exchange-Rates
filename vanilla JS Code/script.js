// NOTES 

/* Kur çevirmelerinde küçük hata payları gözükmesinin sebebi anasayfada bulunan kur alış ve satış kısımlarının küsüratları tamamen göstermiyor olması. Örneğin USD kuru ana sayfada 8.4885 gibi gözüksede aslında 8.48859348 olabilir. Yüksek miktarları çevirirken ufak farklar olmasının sebebi aslında bu. Bunun gidermek için tabiki kısaltılmış değerleride kullanabilirdim ratio olarak ama bu halinde bıraktım. */

/* Kurların yerini değiştirme butonu şu şekilde çalışıyor normalde USD'den TL'ye çevirirken bu tuşa bastığımız zaman yerler ve değerler değişiyor, select tag kendini TRY olarak ayarlıyor ve artık TRY'den USD'ye çeviriyoruz. Ancak bu durumda iken TRY dışında bir currency seçtiğimiz zaman output kısmı tekrardan TL'ye dönüşüyor. */

/* Currency inputlarını girerken maksimum değer olarak 1000000 kullandım ancak sadece swap button ile currency ve tl yer değiştiğinde input kısmında 1000000 üzerinde bir değer görebiliyoruz. Örneğim 1000000 USD 8600000 iken swap yaptığımızda yukarıdaki kısımda 8600000 değeri olabiliyor. */

/* Input kısmı focus kalktığı anda kendini kullanılan local string'e çeviriyor. '153260' , '153.260' olacak şekilde, anladığım kadarıyla tasarımda istenen bu şekildeydi. Decimallar ise ',' ile ayrılıyor. Output kısmı zaten sürekli bu formatta. */

/* Zeplin'de gördüğüm tasarımlara göre 1440 ve 375 widthlerinde tamamen tasarıma uydum, arada kalan kısımlar için Bootstrap kırılma noktalarını baz aldım. Arada kalan çözünürlüklerde element'lerin nasıl şekilleneceğine insiyatife göre karar verdim. */

/* Görevde fetch etme tarihinden bahsediliyor ama html'de nerede olduğu yazmıyordu o yüzden onu html kısmında koymadım. */

/* Github'a yüklemeden önce verdiğiniz key'i buradan kaldırdım onu tekrar kopyalamanız gerekiyor sadece aşşağıda belirtilen kısımda. */

/* Verilen instructionlara göre ilerlemeye çalıştım. Eğer tasarım veya functionality'de bir yer beklenen gibi değilse bunu benim bekleneni yanlış anlamış olabilmeme bağlıyorum. */





let lastUpdateDate // The date when the currency data is fetched.

// Global Ratios //
let currentlyUsedRatio // Changes when a new currency is selected or when the swap button is used

let eurRatio
let usdRatio
let gbpRatio
let dkkRatio
let nokRatio
let jpyRatio

// Fetching the Data //

const API_KEY = ''
const baseCurrency = 'TRY'
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&base=${baseCurrency}`

getEm() // Fetch Data Function

async function getEm() {
  const res = await fetch(BASE_URL)
  const data = await res.json()
  lastUpdateDate = data.date
  setTheCurrencies(data.rates)
}

// Currencies References // 

const usdBuy = document.querySelector('[usd-buy-rate]')
const usdSell = document.querySelector('[usd-sell-rate]')
// JPY 
const jpyBuy = document.querySelector('[jpy-buy-rate]')
const jpySell = document.querySelector('[jpy-sell-rate]')
// EUR
const eurBuy = document.querySelector('[eur-buy-rate]')
const eurSell = document.querySelector('[eur-sell-rate]')
// GBP
const gbpBuy = document.querySelector('[gbp-buy-rate]')
const gbpSell = document.querySelector('[gbp-sell-rate]')
// DKK
const dkkBuy = document.querySelector('[dkk-buy-rate]')
const dkkSell = document.querySelector('[dkk-sell-rate]')
// NOK
const nokBuy = document.querySelector('[nok-buy-rate]')
const nokSell = document.querySelector('[nok-sell-rate]')

// Converter References //

const outputInTRY = document.querySelector('[output-amount]')
const currencyAmount = document.querySelector('[currency-amount]')
const currencySelector = document.querySelector('[currency-selector]')

// Setting the Currency Table // 

function setTheCurrencies(rates) {
  // usd 
  usdRatio = (1 / rates.USD)
  usdBuy.innerText = usdRatio.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  usdSell.innerText = usdBuy.innerText
  // eur 
  eurRatio = (1 / rates.EUR)
  eurBuy.innerText = eurRatio.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  eurSell.innerText = eurBuy.innerText
  // jpy
  jpyRatio = (1 / rates.JPY)
  jpyBuy.innerText = jpyRatio.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  jpySell.innerText = jpyBuy.innerText
  // gbp 
  gbpRatio = (1 / rates.GBP)
  gbpBuy.innerText = gbpRatio.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  gbpSell.innerText = gbpBuy.innerText
  // dkk  
  dkkRatio = (1 / rates.DKK)
  dkkBuy.innerText = dkkRatio.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  dkkSell.innerText = dkkBuy.innerText
  // nok 
  nokRatio = (1 / rates.NOK)
  nokBuy.innerText = nokRatio.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  nokSell.innerText = nokBuy.innerText
  currentlyUsedRatio = usdRatio // default is USD, since USD is selected when page opens.
}

// Currency Selector Handling //

currencySelector.addEventListener('change', () => {
  switch (currencySelector.value) {
    case 'USD':
      currentlyUsedRatio = usdRatio
      break
    case 'EUR':
      currentlyUsedRatio = eurRatio
      break
    case 'DKK':
      currentlyUsedRatio = dkkRatio
      break
    case 'JPY':
      currentlyUsedRatio = jpyRatio
      break
    case 'NOK':
      currentlyUsedRatio = nokRatio
      break
    case 'GBP':
      currentlyUsedRatio = gbpRatio
      break
    case 'TRY':
      currentlyUsedRatio = 1 // Its the base currency
      break
    default:
      currentlyUsedRatio = usdRatio
  }
  outputType.innerText = 'TL'
  convertEm()
})

// Make the Conversion //

currencyAmount.addEventListener('input', convertEm)

function convertEm() {
  let inLocalCurrency = currencyAmount.value.replaceAll('.', '').replace(',', '') * Number(currentlyUsedRatio)
  if (isNaN(inLocalCurrency)) { return } // if NaN, dont try!
  outputInTRY.innerText = inLocalCurrency.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Currency Input Formatter //

let input = document.querySelector('[currency-amount]');

input.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/, '')
  if (Number(this.value) > 1000000) { // Maximum Value is 1.000.000 while user is entering
    alert('Please enter a number smaller than 1.000.000')
    this.value = this.value.substring(0, this.value.length - 1);
    outputInTRY.innerText = (this.value * currentlyUsedRatio).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
});

input.addEventListener('focusin', function () { // Format String
  this.value = this.value.replaceAll('.', '').replaceAll(',', '')
})

input.addEventListener('focusout', function () { // Format String
  this.value = Number(this.value).toLocaleString('de-DE', { maximumFractionDigits: 2 })
})

// Swap Button Functionality //

const swapCurrencies = document.querySelector('[swap-currencies]')
swapCurrencies.addEventListener('click', swapTheCurrencies)

const outputType = document.querySelector('[output-type]')

function swapTheCurrencies() {
  if (currencySelector.selectedIndex === 6 && outputType.innerText === 'TL') { return } // It would'nt make sense I mean 
  if (currencySelector.selectedIndex !== 6) { // Swap it to 'TRY to Currency'
    outputType.innerText = currencySelector.value
    currencySelector.selectedIndex = '6'
    input.value = outputInTRY.innerText.split(',')[0]
    currentlyUsedRatio = 1 / currentlyUsedRatio
    outputInTRY.innerText = (Number(input.value.replaceAll('.', '')) * currentlyUsedRatio).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else { // SWap it to 'Currency to TRY'
    input.value = Math.round(Number(outputInTRY.innerText.replaceAll('.', '').replace(',', '.')))
    switch (outputType.innerText) {
      case 'USD':
        currencySelector.selectedIndex = 0
        currentlyUsedRatio = usdRatio
        break
      case 'EUR':
        currencySelector.selectedIndex = 1
        currentlyUsedRatio = eurRatio
        break
      case 'JPY':
        currencySelector.selectedIndex = 2
        currentlyUsedRatio = jpyRatio
        break
      case 'GBP':
        currencySelector.selectedIndex = 3
        currentlyUsedRatio = gbpRatio
        break
      case 'NOK':
        currencySelector.selectedIndex = 4
        currentlyUsedRatio = nokRatio
        break
      case 'DKK':
        currencySelector.selectedIndex = 5
        currentlyUsedRatio = dkkRatio
        break
      default: // Just in case... 
        currencySelector.selectedIndex = 0
    }
    outputType.innerText = 'TL'
    outputInTRY.innerText = Number(input.value * currentlyUsedRatio).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
}