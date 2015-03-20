var GB2312UnicodeConverter = {
	ToUnicode: function (str) {
		return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
	},
	ToGB2312: function (str) {
		return unescape(str.replace(/\\u/gi, '%u'));
	}
};


function beautifyJSON(data){
	if (typeof data !== 'string') {
		json = JSON.stringify(data);
	} else {
		json = JSON.parse(data);
		json = JSON.stringify(json);
	}
	
	var reg = null, pad = 0, PADDING = '....', result ='';
	// 在大括号前后添加换行
	reg = /([\{\}])/g;
	json = json.replace(reg, '\r\n$1\r\n');
	// 中括号前后添加换行
	reg = /([\[\]])/g;
	json = json.replace(reg, '\r\n$1\r\n');
	// 逗号后面添加换行
	reg = /(\,)/g;
	json = json.replace(reg, '$1\r\n');

	// 去除多余的换行
	reg = /(\r\n\r\n)/g;
	json = json.replace(reg, '\r\n');
	// 逗号前面的换行去掉
	reg = /\r\n\,/g;
	json = json.replace(reg, ',');
	//冒号前面缩进
	reg = /\:/g;
	json = json.replace(reg, ': ');

	//对每一个切分单元进行处理，包括缩进和美化格式。
	//$.each(json.split('\r\n'), function(index, node) {});
	var jsonLineArr = json.split('\r\n');
	for(var index = 0; index < jsonLineArr.length; index ++){
		//FOR IE
		var node = GB2312UnicodeConverter.ToGB2312(jsonLineArr[index]);
		
		var i = 0, indent = 0, padding = '';
		//这里遇到{、[时缩进等级加1，遇到}、]时缩进等级减1，没遇到时缩进等级不变
		if (node.match(/\{$/) || node.match(/\[$/)) {
		    indent = 1;
		} else if (node.match(/\}/) || node.match(/\]/)) {
		    if (pad !== 0) {
			pad -= 1;
		    }
		} else {
		    indent = 0;
		}
		//padding保存实际的缩进
		for (i = 0; i < pad; i++) {
			padding += PADDING;
		}
		//添加代码高亮
		/*
		<style> 
			.ObjectBrace{color:#00AA00;font-weight:bold;}
			.ArrayBrace{color:#0033FF;font-weight:bold;}
			.PropertyName{color:#CC0000;font-weight:bold;}
			.String{color:#007777;}
			.Number{color:#AA00AA;}
			.Comma{color:#000000;font-weight:bold;}
			
			.transparent_class {
			    //Required for IE 5, 6, 7...or something to trigger hasLayout, like zoom: 1;
			    // older safari/Chrome browsers
			    -webkit-opacity: 0.5;  
			    //Netscape and Older than Firefox 0.9
			    -moz-opacity: 0.5;  
			    // Safari 1.x (pre WebKit!) 老式khtml内核的Safari浏览器
			    -khtml-opacity: 0.5;  
			    // IE9 + etc...modern browsers
			    opacity: .5;  
			    //IE 4-9 
			    filter:alpha(opacity=50);  
			    //This works in IE 8 & 9 too  
			    -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";  
			    //IE4-IE9  
			    filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=50);  
			}
    
		</style>
		*/
		node = node.replace(/([\{\}])/g,"<span class='ObjectBrace'>$1</span>");
		node = node.replace(/([\[\]])/g,"<span class='ArrayBrace'>$1</span>");
		node = node.replace(/(\".*\")(\:)(.*)(\,)?/g,"<span class='PropertyName'>$1</span>$2$3$4");
		node = node.replace(/\"([^"]*)\"(\,)?$/g,"<span class='String'>\"$1\"</span><span class='Comma'>$2</span>");
		node = node.replace(/(-?\d+)(\,)?$/g,"<span class='Number'>$1</span><span class='Comma'>$2</span>");
		//TODO : IE 不支持 opacity
		result += "<span style='filter:alpha(opacity=10);opacity:0;color:white;'>"+ padding + "</span>" + node + '<br>';
		pad += indent;
	
	}
	
	return result;
	
}
