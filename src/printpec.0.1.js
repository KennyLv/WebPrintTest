
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
			// IE下 运行不成功 。。。
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
						//防止IE中stylesheet数量超限
					}
				}
				if(_style.styleSheet.disabled){
					//如果当前styleSheet还不能用，则放到异步中则行
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
			// IE下 运行不成功 。。。
			//_header.appendChild(_style);
			
			
		}

		
		function printDiv(printDivId){
			// IE not support ...
			var _header = document.head || document.getElementsByTagName('head')[0];
			var _body = document.body || document.getElementsByTagName('body')[0];
			var oldstr = _body.innerHTML;
			var htmlToBePrionted = document.getElementById(printDivId).innerHTML;
			
			/*
			在header里面写控制样式
			*/
			includeStyleElement();
			//includeLinkStyle("http://localhost:8056/PrintTest/ie-only.css");
			//includeLinkStyle("ie-only.css");
			
			/*
			重置整个页面的内容
			*/
			_body.innerHTML = htmlToBePrionted;
			
			// 开始打印  
			window.print();
			//恢复
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
			//恢复
			//_header.lastChild.remove();
			_body.innerHTML = oldstr;
			
			return false;
		}
		