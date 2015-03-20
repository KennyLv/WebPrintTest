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
	// �ڴ�����ǰ����ӻ���
	reg = /([\{\}])/g;
	json = json.replace(reg, '\r\n$1\r\n');
	// ������ǰ����ӻ���
	reg = /([\[\]])/g;
	json = json.replace(reg, '\r\n$1\r\n');
	// ���ź�����ӻ���
	reg = /(\,)/g;
	json = json.replace(reg, '$1\r\n');

	// ȥ������Ļ���
	reg = /(\r\n\r\n)/g;
	json = json.replace(reg, '\r\n');
	// ����ǰ��Ļ���ȥ��
	reg = /\r\n\,/g;
	json = json.replace(reg, ',');
	//ð��ǰ������
	reg = /\:/g;
	json = json.replace(reg, ': ');

	//��ÿһ���зֵ�Ԫ���д�������������������ʽ��
	//$.each(json.split('\r\n'), function(index, node) {});
	var jsonLineArr = json.split('\r\n');
	for(var index = 0; index < jsonLineArr.length; index ++){
		var node = GB2312UnicodeConverter.ToGB2312(jsonLineArr[index]);
		
		var i = 0, indent = 0, padding = '';
		//��������{��[ʱ�����ȼ���1������}��]ʱ�����ȼ���1��û����ʱ�����ȼ�����
		if (node.match(/\{$/) || node.match(/\[$/)) {
		    indent = 1;
		} else if (node.match(/\}/) || node.match(/\]/)) {
		    if (pad !== 0) {
			pad -= 1;
		    }
		} else {
		    indent = 0;
		}
		//padding����ʵ�ʵ�����
		for (i = 0; i < pad; i++) {
			padding += PADDING;
		}
		//��Ӵ������
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
			    // Safari 1.x (pre WebKit!) ��ʽkhtml�ں˵�Safari�����
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
		//TODO : IE ��֧�� opacity
		result += "<span style='filter:alpha(opacity=10);opacity:0;color:white;'>"+ padding + "</span>" + node + '<br>';
		pad += indent;
	
	}
	//FOR IE
	
	return result;
	
}