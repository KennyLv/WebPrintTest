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
		iframe.style.visibility = 'hidden'; //iframe.style.display = 'none'; //IE7��displayֻ�����ڴ�����ʱ������
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
		
		//�������ص�iFrame
		var printFrame = this._setupPrintFrame();
		
		//�ݹ飬�Ƚ�����printable�����Ԫ����� noprint
		this._setIframeClass(printFrame.contentDocument.body);
		//�ݹ飬�ڽ�������printable��Ԫ�ص�Ԫ��ȡ�� noprint
		this._removeIframeClass(printFrame.contentDocument.body);
		
		//��ӡ
		//IE��֧�������ص�״̬�»�ȡfocus, IE��֧������display
		//TODO : 	if(IE){ iframe.style.display = 'display'; } 
		printFrame.style.visibility = 'visible'; 
		var ds = printFrame.contentWindow.focus(); 
		printFrame.contentWindow.print();
			
		//�¼�����
		this._body.removeChild(printFrame);
		return false;
	};
}