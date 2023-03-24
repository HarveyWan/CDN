/* crystal_bar js */
$(document).ready(function() {
	
	// get url param：code
	var code = GetQueryString("code");
	setTimeou(function() {
		top.location.href = "https://zhuoyue315.com/Query/CRYSTAL_BAR/?code="+code;
	}, 1000);
});
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
