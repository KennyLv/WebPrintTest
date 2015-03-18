
		function includeLinkStyle(url) {
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = url;
			document.getElementsByTagName("head")[0].appendChild(link);
		}
		
		function includeStyleElement() {
			var style = document.createElement("style");
			style.id = "styleId";
			/*if (isIE()) {
			style.type = "text/css";
			style.media = "screen";
			}*/
			(document.getElementsByTagName("head")[0] || document.body).appendChild(style);
			var styles = ".notprint {opacity: 0;}";
			
			if (style.styleSheet) { //for ie
				style.styleSheet.cssText = styles;
			} else {//for w3c
				style.appendChild(document.createTextNode(styles));
			}
			/*
			// IE�� ���в��ɹ� ������
			//_header.insertAdjacentHTML('beforeEnd', '<style>.notprint {opacity: 0;}</style>');
			
			var _style = document.createElement("style");
			var _styleStr = ".notprint {opacity: 0;}";
			_style.type = "text/css"; 
			if(_style.styleSheet){
				 //IE
				var func = function(){
					try{ 
						_style.styleSheet.cssText = cssText;
					}catch(e){
						//��ֹIE��stylesheet��������
					}
				}
				if(_style.styleSheet.disabled){
					//�����ǰstyleSheet�������ã���ŵ��첽������
					setTimeout(func,10);
				}else{
					func();
				}
			} else {
				// IE not support ... 
				//_style.appendChild(document.createTextNode(str))  
				_style.innerHTML = _styleStr;
			}
			*/ 
			/*
			var _style = document.createElement("link");
			_style.href = "ie-only.css";  
			*/
			// IE�� ���в��ɹ� ������
			//_header.appendChild(_style);
			
			
		}

		
		function printDiv(printDivId){
			// IE not support ...
			var _header = document.head || document.getElementsByTagName('head')[0];
			var _body = document.body || document.getElementsByTagName('body')[0];
			var oldstr = _body.innerHTML;
			var htmlToBePrionted = document.getElementById(printDivId).innerHTML;
			
			/*
			��header����д������ʽ
			*/
			includeStyleElement();
			//includeLinkStyle("http://localhost:8056/PrintTest/ie-only.css");
			//includeLinkStyle("ie-only.css");
			
			/*
			��������ҳ�������
			*/
			_body.innerHTML = htmlToBePrionted;
			
			// ��ʼ��ӡ  
			window.print();
			//�ָ�
			_header.lastChild.remove();
			_body.innerHTML = oldstr;
			return false;
		}
		
		function jQueryPrintDiv(printDivId){
			var _header = document.head || document.getElementsByTagName('head')[0];
			var _body = document.body || document.getElementsByTagName('body')[0];
			var oldstr = _body.innerHTML;
			var htmlToBePrionted = document.getElementById(printDivId).innerHTML;
			_body.innerHTML = htmlToBePrionted;
			
			$(".notprint").each(function(i, target){
				$(target).css("opacity", "0");
			});
			
			window.print();
			//�ָ�
			//_header.lastChild.remove();
			_body.innerHTML = oldstr;
			
			return false;
		}
		