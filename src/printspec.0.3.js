function kPrinter_2(divId){
	this._divId = divId;
	this._body;
	
	this._setupPrintFrame = function(){
		var iframe = document.createElement('iframe');
		this._body.appendChild(iframe);
		
		var _printDiv = document.getElementById(this._divId);
		iframe.width = _printDiv.offsetWidth;
		iframe.height = _printDiv.offsetHeight;
		iframe.contentWindow.document.write("<style>.noprint{visibility:hidden;} input{border:0;text-align:left;} textarea{border: none; overflow: hidden;}</style>");
		iframe.contentWindow.document.close();
		iframe.contentDocument.body.innerHTML = _printDiv.innerHTML;
		iframe.style.visibility = 'hidden'; //iframe.style.display = 'none'; //IE7的display只读，在创建的时候设置
		return iframe;
	};

	this._setIframeClass = function(rootElement){
		var currentNode= rootElement.childNodes;
		for(var i = 0; i < currentNode.length; i++){
			if(currentNode[i].nodeType == 1){
				if(currentNode[i].className != 'printable'){
					currentNode[i].className = 'noprint';
				}
			}
			this._setIframeClass(currentNode[i]);
		}
	};

	this._removeIframeClass = function(rootElement){
		var currentNode= rootElement.childNodes;
		for(var i = 0; i < currentNode.length; i++){
			if(currentNode[i].nodeType == 1){
				if(currentNode[i].className == 'printable'){
					this._addPrintClass(currentNode[i]);
				}
			}
			this._removeIframeClass(currentNode[i]);
		}
	};

	this._addPrintClass = function(element){
		if(element.parentNode != null&&element.parentNode.nodeName != 'body') {
			element.parentNode.className = 'printable';
			this._addPrintClass(element.parentNode);
		}
	};
	
	this.printDiv = function( ){
		this._body = document.body || document.getElementsByTagName('body')[0];
		
		//创建隐藏的iFrame
		var printFrame = this._setupPrintFrame();
		
		//递归，先将所有printable以外的元素添加 noprint
		this._setIframeClass(printFrame.contentDocument.body);
		//递归，在将所有有printable子元素的元素取消 noprint
		this._removeIframeClass(printFrame.contentDocument.body);
		
		//打印
		//IE不支持在隐藏的状态下获取focus, IE不支持设置display
		//TODO : 	if(IE){ iframe.style.display = 'display'; } 
		printFrame.style.visibility = 'visible'; 
		var ds = printFrame.contentWindow.focus(); 
		printFrame.contentWindow.print();
			
		//事件结束
		this._body.removeChild(printFrame);
		return false;
	};
}