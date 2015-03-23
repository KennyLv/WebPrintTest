function kPrinter_1(divId){
	this.divId = divId;
	this._setupPrintStyles = function(head){
		var style = document.createElement("style");
		head.appendChild(style);
		style.id = "no_print_style";
		//var styles = ".notprint {opacity: 0;}";
		//var styles = isVisiable ? ".notprint {visibility:visible;}" : ".notprint {visibility:hidden;}";
		var styles = ".notprint {visibility:hidden;} input{border:0;text-align:left;} textarea{border: none;overflow: hidden; }";
		
		if (style.styleSheet) { //for ie
			style.styleSheet.cssText = styles;
		} else {//for w3c
			style.appendChild(document.createTextNode(styles));
		}
		return style;
	};
	this._restorePrintPage = function(printStyle){
		if( typeof printStyle.remove != "function"){
			//FOR IE
			printStyle.removeNode(true);
		}else{
			printStyle.remove();
		}
	};
	
	this.printDiv = function( ){
		var _head = document.head || document.getElementsByTagName("head")[0];
		var _body = document.body || document.getElementsByTagName('body')[0];
		var oldstr = _body.innerHTML;
		
		/*
		��header����д������ʽ
		*/
		var _printStyleNode = this._setupPrintStyles(_head);
		/*
		��������ҳ�������
		*/
		_body.innerHTML = document.getElementById(this.divId ).innerHTML;
		// ��ʼ��ӡ  
		window.print();
		
		//�ָ�
		_body.innerHTML = oldstr;
		
		this._restorePrintPage(_printStyleNode);
		
		//�¼�����
		return false;
	};
}