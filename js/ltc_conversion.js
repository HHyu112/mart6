var xmlhttp = new XMLHttpRequest();
var url = "https://api.cryptonator.com/api/ticker/ltc-usd";
var url_ltc_convert=(new URL(document.location));
let url_params_convert_ltc=url_ltc_convert.searchParams;
var amount_convert_ltc=url_params_convert_ltc.get('amount');           
            
xmlhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status ==200) {
			var json = JSON.parse(this.responseText);
		parseJson_ltc(json,amount_convert_ltc);
	}
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
            
function parseJson_ltc(json,amount_convert_ltc){
		var usdValue = json["ticker"]["price"];
		var usdPrice = amount_convert_ltc/parseFloat(usdValue.replace(",",""));
		var usdPrice_round = usdPrice.toFixed(5);
		var productPrice = parseFloat(usdValue.replace(",",""))*usdPrice_round;
	document.getElementById("orderprice_ltc").innerHTML = usdPrice_round + "  LTC" ;
	document.getElementById("orderprice_ltc1").innerHTML = " &#8776 " + productPrice.toFixed(2) + "  USD";
}
