/* verify js */
$(document).ready(function() {
	
	// get url param：code
	var actcode = GetQueryString("code");
	if(actcode) {
		$("#veycode").val(actcode);
	}
	
	// ready ..... verify the code
	//Verify();
	
});

// 1. 
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// 2.
// show result
function shwResult(obj) {
	var data;
	// page elements
	var $veycode;
	var $result;
	var $valid;
	var $prdName;
	var $pFirst;
	var $firstTime;
	var $count;
	var $txtcode;
	var $error;
	var $codes;
	var $threeTip;
	
	// get data
	data = obj.Data;
	
	console.log(data);
	
	// get page elements
	$veycode = $("#veycode");
	$result = $("#result");
	$valid = $("#valid");
	$prdName = $("#prdName");
	$pFirst = $("#pFirst");
	$firstTime = $("#firstTime");
	$count = $("#count");
	$txtcode = $("#txtcode");
	$error = $("#error");
	$codes = $("#codes");
	$threeTip = $("#ThreeTip");

	// clear html content
	$prdName.html("");
	$firstTime.html("");
	$count.html("");
	$txtcode.html("");
	
	// debug data
	
	//obj.Tag = 1;
	//data = {};
	//data.State = 1;
	//data.ProductName = "123debug";
	//data.FwCode = "123debug";
	//data.Times = "123debug";
	//data.FirstTime = "123debug";
	
	
	
	if (obj.Tag == 0) {
		//console.log("error......");
		
		$error.show();
		$codes.html( $veycode.val() );
		
		$valid.hide();
		
	} else {
		//console.log("valid......");
		
		$valid.show();
		$error.hide();
		
		$prdName.html(data.ProductName);
		$txtcode.html(data.FwCode);
		$count.html(data.Times);
		
		if (data.State == 1) {
			// repeat
			$pFirst.show();
			$firstTime.html(data.FirstTime);
			// More than 3 times
			if (data.Times >= 3) {
				$threeTip.html("Attention to beware of counterfeit.");
			} else {
				$threeTip.html("");
			}
		} else if (data.State == 0) {
			// first
			$pFirst.hide();
			//setObjVal('#pFirst', 'display', 'none');
			
			$count.html("First query");
		}
	}
	
	$result.show();
}

// 3. 
function selector(s) {
	return document.querySelector(s)
}

// 4.
function setObjVal(s, t, val) {
    var obj = selector(s);
    switch (t) {
        case 'value':
            obj.value = val
            break;
        case 'html':
            obj.innerHTML = val
            break;
        case 'display':
            obj.style.display = val
            break;
    }
}

// 5.
function shwScr() {
    setObjVal('.scratch-box', 'display', 'block')
}

// 6.
function hideScr() {
    setObjVal('.scratch-box', 'display', 'none')
}

// 7.
var k = ''
var start = function() {
	var QResult = selector('#loadMsg');
	
	QResult.style.display = 'display';
	k += '.';
	QResult.innerText = 'In data query';
	QResult.appendChild(document.createTextNode(k));
	
	if (k.length > 2) {
		k = '';
	}
}

// 8.
function disbtnVad(b) {
    var obj = selector('#btnValidation');
    if (b) {
        obj.style.color = '#999';
        obj.style.backgroundColor = '#ccc';
        obj.disabled = true;
    } else {
        obj.style.color = '#fff';
        obj.style.backgroundColor = '#1D0974';
        obj.disabled = false;

        setObjVal('#loadMsg', 'html', '')
        setObjVal('#loadMsg', 'display', 'none')
    }
}

// 9.
function Verify() {
	let $veycode;
	let $verify_btn;
	var fwcode;
	var waitHtml;
	var xhr;
	
	// get page elements
	$veycode = $("#veycode");
	$verify_btn = $("#verify_btn");
	
	// read form elem
	fwcode = $veycode.val();
	
	
	// disable countdown
	$verify_btn.attr("disabled", "disabled");
	
	setTimeout(function() {
		$verify_btn.removeAttr("disabled");
	}, 1000);
	
	// check security code
	if (fwcode) {
		
		//disable
		//disbtnVad(true);
		
		//waitHtml = setInterval(start, 1000);
		
		//Creating asynchronous objects
		xhr = new XMLHttpRequest();
		xhr.open('post', 'https://www.zhuoyue315.com/5001/Act/CodeQuery/', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		//Send the request
		xhr.send("fwcode=" + fwcode + "&prdno=PD20339948&lang=en-gb");
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4 && xhr.status == 200) {
		        console.log(xhr.responseText);
		        
		        //clearInterval(waitHtml);
		        
		        //enable
		        //disbtnVad(false);
		        
		        shwResult(JSON.parse(xhr.responseText));
		    }
		};
	    
	} else {
		alert('Security code Cannot be empty')
	}
}

// 10.
function confirm_close() {
	let $result;
	
	// get page elements
	$result = $("#result");
	
	$result.hide();
}