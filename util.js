/*
 * jQuery util plug-in 1.7
 *
 *
 * 
 *
 * $Id: util.js,v 1.20 2014/01/24 03:34:58 devgqk Exp $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

/*******************************************************************************
 * 逻辑函数库
 ******************************************************************************/

/**
 * 改写change方法
 */
/*
 * jQuery.fn.extend({ change:function(func){ $(this).blur(function() { $(func);
 * }); } });
 */

jQuery.extend( {
	isEmpty : function(val) {
		if (undefined == val || val == "" || val == null) {
			return true;
		}
		return false;
	},
	isNotEmpty : function(val) {
		return !($.isEmpty(val));
	},

	/**
	 * 是否是数字（正整数）
	 */
	isDigits : function(value) {
		var reg = /^\d+$/;
		return reg.test(value);
	},

	/**
	 * 判断是否是数字(整数)
	 */
	isInteger : function(value) {
		var reg = /^[-+]?[1-9][0-9]*$/;
		return reg.test(value);
	},

	/**
	 * 是否是字符串
	 */
	isString : function(value) {
		reg = /^[a-z0-9A-z_]+$/;
		return reg.test(value);
	},
	/**
	 * 模糊对比，用value2的数据与value1对比，value1是被对比
	 */
	like : function(value1,value2) {
		/*
		var s1,s2;
		var flag = true;
		var array = new Array();
		for(var i=0;i<value2.length;i++)
		{
			s2 = value2.substring(i,i+1);
			if($.isInteger(s2))
			    array[i] = s2;
			else
			    break;
		}
		for(var j=0;j<array.length;j++)
		{
			s1 = value1.substring(j,j+1);
			if(s1!=array[j])
			{
				flag = false;
				break;
			}    
		}
		*/
		var flag=false;
		if(value1!=undefined && value2!=undefined && value1.indexOf(value2)!=-1){
			flag=true;
			
			}
		return flag;
	},
	/**
	 * /**
	 * 
	 */
	isPhoneCityCode : function(value) {
		var reg = /^\d{3,4}$/;
		return reg.test(value);
	},
	/*
	 * 
	 */
	isPhoneCode : function(value) {
		var reg = /^\d{7,8}$/;
		return reg.test(value);
	},
	isPhoneExtCode : function(value) {
		var reg = /^\d{3,5}$/;
		return reg.test(value);
	},
	isMobile : function(value) {
		var length = value.length;
		var reg = /^(1[235][0-9]{1})+\d{8}$/;
		return ((length == 11) && reg.test(value));
	},
	isPostCode : function(value) {
		var reg = /^[0-9]{6}$/;
		return reg.test(value);
	},
	dmyToymd : function(value){
		value = $.removeFormatInfo(value);
		var re = /^(\d{2})(\d{2})(\d{4})$/;
		return value.length==8?value.replace(re, "$3$2$1"):"";
	},
	ymdTodmy : function(value){
		value = $.removeFormatInfo(value);
		var re = /^(\d{4})(\d{2})(\d{2})$/;
		return value.length==8?value.replace(re, "$3/$2/$1"):"";
	},
	/**
	 * 四舍五入算法，srcStr为数字；nAfterDot为小数点位数
	 */
	formatNumber : function(srcStr,nAfterDot){
		rate=Math.round(srcStr*Math.pow(10,nAfterDot))/Math.pow(10,nAfterDot);
        var xsd = rate.toString().split(".");
        if (xsd.length > 1) {
        	var n1 = xsd[1].toString();
        	if(nAfterDot>n1.length){
        		for(var i=n1.length; i<nAfterDot; i++){
        			n1 += "0";
        		}
        	}
        	rate = xsd[0].toString()+"."+n1;
        } 
	     return rate;
	},	
	jsonToString : function(obj){   
        var THIS = this;    
        switch(typeof(obj)){   
            case 'string':   
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';   
            case 'array':   
                return '[' + obj.map(THIS.jsonToString).join(',') + ']';   
            case 'object':   
                 if(obj instanceof Array){   
                    var strArr = [];   
                    var len = obj.length;   
                    for(var i=0; i<len; i++){   
                        strArr.push(THIS.jsonToString(obj[i]));   
                    }   
                    return '[' + strArr.join(',') + ']';   
                }else if(obj==null){   
                    return 'null';   
  
                }else{   
                    var string = [];   
                    for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));   
                    return '{' + string.join(',') + '}';   
                }   
            case 'number':   
                return obj;   
            case false:   
                return obj;   
            case 'boolean':
            	return obj;
        }   
    },
    toLocaleLowerCase : function(str){// 转小写
    	return str.toLocaleLowerCase();
    },
    toLocaleUpperCase : function(str){// 转大写
    	return str.toLocaleUpperCase();
    },
    setCurrencyAmt : function(currency,amt){//货币与高低货币设置绑定
    	var curr = $.toLocaleUpperCase($.value(currency));
    	//if(curr!=""){
    		if(curr=="JPY" || curr=="VND")
    			$.setLowCurrency(amt); 
    		else
    			$.setHighCurrency(amt); 
    	//}
    },
        setTextArea : function(name,cols,isWrap){//name表示控件的名称；cols表示一行显示的数量；isWrap表示是否添加换行符"true"表示添加，其他情况为不添加
    	 if($.isNotEmpty(name) && $.isNotEmpty(cols) && $.isNotEmpty(isWrap)){
    		 var areaVal = $("#"+name).val();
    		 var newVal = "";
			 var areaVals = areaVal.split("\n");
    		 for(var i=0;i<areaVals.length;i++){
    			 var row = areaVals[i];
    			 if(row.length>cols){
    				 newVal += $.setValRow(cols,row,isWrap);
    			 }else if(row.length==cols){
    				 newVal += row;
    			 }else{
    				 newVal += row;
    				 if(isWrap=="false"){
    				  newVal += $.setValRight(cols-row.length," ");
    				}
    				  
    			 }
    			 
    			 if(isWrap=="true" && i!=areaVals.length-1){
    			 	newVal = $.trim(newVal);
    				 newVal += "\r";
    			 }
    		 }
    		 $("#"+name).text(newVal);
    	 }
    },
    setValRight : function (count,val){
    	var newVal = "";
    	for(var i=0;i<count;i++){
    		newVal += val;
    	}
    	return newVal;
    },setValRow : function (cols,val,isWrap){
    	var newRows = "";
    	for(var i=0;i<=val.length;){	
    		var a = "";
    		if(val.length>i+cols){
    			a = val.substring(i,i+cols);
    			
   			 if(isWrap=="true"){
   			 	a = $.trim(a);
				 a += "\r";
			 }    			
    		}else{
    			a = val.substring(i,val.length);
    			if(isWrap=="true")
    			a = $.trim(a);
    			if(isWrap=="false"){
    			 a += $.setValRight(i+cols-val.length-1," ");
    			}
    		}
    		i += cols;
    		newRows += a;
    	}
    	return newRows;
    }
    
    
});

/*******************************************************************************
 * *****************************************************************************12/03/2012
 * 20120312 控件查找函数
 ******************************************************************************/
jQuery.extend( {
	/**
	 * 
	 */
	getText : function(name) {
		return $(":text[name='" + name + "']");
	},
	getTextarea : function(name) {
		return $("textarea[name='" + name + "']");
	},
	/**
	 * 
	 */
	getButton : function(name) {
		return $(":button[name='" + name + "']");
	},
	/**
	 * 
	 */
	getSelect : function(name) {
		return $("select[name='" + name + "']");
	},
	/**
	 * 
	 */
	getPassword : function(name) {
		return $(":password[name='" + name + "']");
	},
	/**
	 * 
	 */
	getRadio : function(name) {
		return $(":radio[name='" + name + "']");
	},
	/*
	 * 
	 */
	getCheckbox : function(name) {
		return $(":checkbox[name='" + name + "']");
	},
	/*
	 * 
	 */
	getWidget : function(name) {
		return $("#" + name);
	},
	getTab:function(name){
		return $("#\\#"+name);
	},
	value : function(name) {
		$.checkInput("value",name);
		var wgt = $("#" + name);
		var srcVal = $(wgt).val();
		var fmtContent = $(wgt).metadata( {
			type : "attr",
			name : "ext"
		});
		var isHighCurrency = false;
		var isLowCurrency = false;
		var isDateStyle = false;
		var isTimeStyle = false;
		$.each(fmtContent, function(i, n) {
			if (i == "timeStyle")
				isTimeStyle = true;
			if (i == "dateStyle")
				isDateStyle = true;
		});
		var extAttr = $.String2Json($("#" + name).attr("ext"));
		if(extAttr.highCurrency != undefined && extAttr.highCurrency == true){
			isHighCurrency = true;
		}		
		if(extAttr.lowCurrency != undefined && extAttr.lowCurrency == true){
			isLowCurrency = true;
		}			
		if (isHighCurrency)
			$.unhighCurrency(name, "highCurrency");
		else if (isLowCurrency)
			$.unlowCurrency(name, "lowCurrency");
		else if (isDateStyle)
			$.undateStyle(name, "dateStyle");
		else if (isTimeStyle)
			$.untimeStyle(name, "timeStyle");
		var tmpVal = $("#" + name).val();
		if(isLowCurrency){
	        var xsd = tmpVal.toString().split(".");
	        if (xsd.length > 1) {
	        	tmpVal = xsd[0].toString();
	        } 			
		}
		$("#" + name).val(srcVal);
		if($(wgt).attr('class') == 'combobox')
			tmpVal = $.trim($(wgt).val().split('-')[0]);
		return tmpVal;		
	},
	checkInput : function(fun,name) {
		if($("#" + name).val() == undefined){
			alert("$."+fun+"(\""+name+"\") not find!");
		}
	}	
});

/*******************************************************************************
 * 控件操作函数
 ******************************************************************************/
jQuery
		.extend( {
			/**
			 * 赋值
			 */
			assign : function(keyValues) {
				$.each(keyValues, function(i, n) {
					/*$("#" + i).val($.replaceTemplate(n,"<br/>","\r\n"));*/
					$("#" + i).val(n);
					$.format(i);
					if($("#" + i).val()!=undefined && n!=""){
						var extAttr = $.String2Json($("#" + i).attr("ext"));
						if(extAttr.highCurrency != undefined && extAttr.highCurrency == true){
							//alert("H:"+extAttr.highCurrency);
							$.highCurrency(i);
						}else if(extAttr.lowCurrency != undefined && extAttr.lowCurrency == true){
							//alert("L:"+extAttr.lowCurrency);
							$.lowCurrency(i);
						}		
					}					
					if($("#" + i).attr('class') == 'combobox')
						changeComboBoxValue($("#" + i),true);
				});
			},

			/**
			 * 显示或者隐藏控件
			 */
			setDisplay : function(keyValues) {
				$.each(keyValues, function(i, n) {
					if (n) {
						$("#" + i).show();
						$.format(i);
					} else {
						$("#" + i).hide();
						$.removeInfo(i);
					}
				});
			},

			/**
			 * 隐藏控件
			 */
			hide : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$("#" + n).hide();
					$.removeInfo(n);
					if($("#" + n).attr("class")=='combobox'){
						$("#" + n).next("span").hide();
					}
				});
			},
			/**
			 * 显示控件
			 */
			show : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$("#" + n).show();
					$.format(n);
					if($("#"+n).attr("class").toString()=='column full'){
						$.extendGroupbox(n);
					}
					if($("#" + n).attr("class")=='combobox'){
						$("#" + n).next("span").show();
					}	
				});
			},
			/**
			 * 设置是否可编辑 setUpdateable : function(keyValues) { $.each(keyValues,
			 * function(i, n) { var wgt = $("#" + i); if (n) { if
			 * (wgt.is(":button") || wgt.is(":submit") || wgt.is(":reset")) {
			 * $("#" + i).removeAttr("disabled"); } else if (wgt.is(":input") &&
			 * ($(wgt).css("display") != "none")) { $("#" +
			 * i).removeAttr("readonly"); $.format(i); } if (wgt.is("select")) {
			 * $(wgt).unbind("click"); $(wgt).css("background-color", "white"); } }
			 * else { if (wgt.is(":button") || wgt.is(":submit") ||
			 * wgt.is(":reset")) { $("#" + i).attr("disabled", "disabled"); }
			 * else if (wgt.is(":input")) { $("#" + i).attr("readonly",
			 * "readonly"); $.removeInfo(i); } if ($(wgt).is("select")) { //
			 * $(wgt).css("background-color", "#e4e4e4"); //
			 * $(wgt).css("background-color", "#f2f2f2"); //
			 * $(wgt).css("border", "1px solid #d3d3d3");
			 * $(wgt).css("background-color", "#dcdcdc"); $(wgt).css("border",
			 * "1px solid #a5a5a5"); $(wgt).css("height", "20px");
			 * $(wgt).css("line-height", "20px"); $(wgt).bind("click",
			 * function() { $(this).blur(); var val = $("#" + n).val();
			 * $(this).val(val); }); } } }); },
			 */			
			readonlyByClass:function(type){
				var widgets = $("."+type);
				var widgetsLength = widgets.length;
				if(widgetsLength>=1){
					var idArr = new Array();
					for(var i=0;i<widgetsLength;i++){
						idArr.push(widgets[i].id);
					}
					$.readonly(idArr);
				}
				
			},
			/**
			 * 设置控件只读
			 */
			readonly : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					var wgt = $("#" + n);
					$.checkInput("readonly",n);
					if(wgt.is("div")){// readony容器内所有控件
						var wgtChld = wgt.find("input");
						if(wgtChld.length>0){
							var wgtIds = [];
							for(i=0;i<wgtChld.length;i++){
								wgtIds[i] = wgtChld.get(i).id;
							}
							$.readonly(wgtIds);
						}
					}
					if (wgt.is(":button") || wgt.is(":submit")
							|| wgt.is(":reset")) {
						$("#" + n).attr("disabled", "disabled");
						$("#" + n).attr("class", "button disabled");				  
					} else if (wgt.is(":input")) {
						$("#" + n).attr("readonly", "readonly");					
						$("#" + n).css("background-color", "#dcdcdc");	
						$("#" + n).css("border", "1px solid #a5a5a5");
					// $("#" + n).css("height", "20px");
					// $("#" + n).css("line-height", "20px");
						if($("#" + n).attr("class")=="combobox"){
							$("#" + n).css({"border-right":"0px"});
							$("#" + n).next("span").find("div.comboimg").css("background-image","url(comm/images/combo_arrow_hover.gif)");
							$("#" + n).next("span").find("div.comboimg").css("display","none");
						} 
						$.removeInfo(n);
					}
					if ($(wgt).is("select")) {   
						$(wgt).css("background-color", "#dcdcdc");
					    $(wgt).css("border", "1px solid #a5a5a5");
					    $(wgt).css("height", "20px");
					    $(wgt).css("line-height", "20px");
					  
						// 以下由devluh于2011-03-28添加,用于将select控件只读
						var top = $(wgt).offset().top;
						var left = $(wgt).offset().left;
						var height = $(wgt).height()+3;
						var width = $(wgt).width()+3;
						var id = $(wgt).attr('id')+"_mask";
						var filter;
						if($.browser.msie)// alpha setting in ie,else in
											// firefox
							filter = "filter:alpha(opacity=1)";
						else
							filter = "opacity:0.01";
						var newDiv = "<div id="+id+" style='position:absolute;background-color:gray;"+filter+";left:"+left+";top:"+top+";width:"+width+";height:"+height+"'></div>";
						$(newDiv).appendTo($("form"));
					}
				});
			},
			/**
			 * 设置控件段只读 start:为开始的控件名 end：为结束的控件名 只针对input、textarea、select控件
			 */
			readonlys : function(start,end) {
				var widgets = $("input,textarea,select");
				var run = "N";
				for(var i=0;i<widgets.length;i++)
				{
					if($(widgets[i]).attr("id")!=undefined){
						if($(widgets[i]).attr("id")==start)
							run = "Y";
						if(run == "Y")
							$.readonly($(widgets[i]).attr("id"));
						if($(widgets[i]).attr("id")==end)
							break;
					}
				}				
			},
			/**
			 * 设置控件可修改
			 */
			updateable : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					var wgt = $("#" + n);
					$.checkInput("updateable",n);
					if(wgt.is("div")){// updateable容器内所有控件
						var wgtChld = wgt.find("input");
						if(wgtChld.length>0){
							var wgtIds = [];
							for(i=0;i<wgtChld.length;i++){
								wgtIds[i] = wgtChld.get(i).id;
							}
							$.updateable(wgtIds);
						}
					}
					if (wgt.is(":button") || wgt.is(":submit")
							|| wgt.is(":reset")) {
						$("#" + n).removeAttr("disabled");
						$("#" + n).attr("class", "button themed");
					} else if (wgt.is(":input") && ($(wgt).css("display") != "none")) {
						$("#" + n).removeAttr("readonly");
						var extAttr = $.String2Json($("#" + n).attr("ext"));
						if(extAttr.required == true){
							$("#" + n).css("background-color", "#fff1d1");
						}else{
							$("#" + n).css("background-color", "white");
						}
						$("#" + n).css("border", "1px solid #98c0d2");	
						if($("#" + n).attr("class")=="combobox"){
							$("#" + n).css({"border-right":"0px"});
							$("#" + n).next("span").find("div.comboimg").css("background-image","url(comm/images/combo_arrow_leave.gif)");
							$("#" + n).next("span").find("div.comboimg").css("display","block");
						}
						$.format(n);
					}
					if (wgt.is("select")) {
						// $(wgt).unbind("click");
						var maskId = $(wgt).attr("id")+"_mask";
						$("#"+maskId).remove();
						$(wgt).css("background-color", "white");
					}
				});
			},
			/**
			 * 设置控件必输
			 */
			setRequired : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$.checkInput("required",n);
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.extend(ext, {
						required : true
					});
					$("#" + n).attr("ext", $.jsonToString(ext));
					var readonlyAttr = $("#" + n).attr("readonly");
					if($.isEmpty(readonlyAttr))
						$("#" + n).css("background-color", "#fff1d1");
					$.format(n);
					//$("#" + n).focus();
				});
			},
			/**
			 * 设置控件必输
			 */
			setRequireds : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$.checkInput("required",n);
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.extend(ext, {
						required : true
					});
					$("#" + n).attr("ext", $.jsonToString(ext));
					var readonlyAttr = $("#" + n).attr("readonly");
					if($.isEmpty(readonlyAttr))
						$("#" + n).css("background-color", "#fff1d1");
					//$.format(n);
				});
			},
			/**
			 * 取消控件必输
			 */
			setUnRequired : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$.checkInput("setUnRequired",n);
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$("#" + n).css("background-color", "white");
					$.extend(ext, {
						required : false
					});
					$("#" + n).attr("ext", $.jsonToString(ext));
					$.format(n);
					// 输入场不必输时，对“必输提示”信息需要清空（控件可见的情况下），其余的提示信息不清空
					var wgt = $("#" + n);
					var $errorTip = wgt.parent().find(
							".errorTip:first");
					if (!$.isEmptyObject($errorTip)) {
						if (!$.isEmpty($errorTip.html())
								&& ($errorTip.html() == jQuery.validator.messages.required)
								&& ($(wgt).css("display") != "none")) {
							$.removeInfo(n);
						}
					}
				});
			},
			
			/**
			 * 设置高货币
			 */
			setHighCurrency : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.extend(ext, {
						allowComma : true, 
						highCurrency : true,
						lowCurrency : false 
					});
					
					$("#" + n).attr("ext", $.jsonToString(ext));
					$.format(n);
					$.highCurrency(n);
				});
			},		
			
			/**
			 * 取消设置高货币
			 */
			setUnHighCurrency : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.extend(ext, {
						allowComma : false, 
						highCurrency : false
					});
					$("#" + n).attr("ext", $.jsonToString(ext));
					$.format(n);
				});
			},		
			
			/**
			 * 设置低货币
			 */
			setLowCurrency : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$.format(n);
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.extend(ext, {
						allowComma : true, 
						highCurrency : false,
						lowCurrency : true 
					});
					
					$("#" + n).attr("ext", $.jsonToString(ext));
					$.format(n);
					$.lowCurrency(n);
				});
			},		
			
			/**
			 * 取消设置低货币
			 */
			setUnLowCurrency : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$.format(n);
					var ext = $("#" + n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.extend(ext, {
						allowComma : false, 
						lowCurrency : false
					});
					$("#" + n).attr("ext", $.jsonToString(ext));
					$.format(n);
				});
			},					
			/**
			 * 设置控件可选
			 */
			optional : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$
						.each(
								temp,
								function(i, n) {
									var ext = $("#" + n).metadata( {
										type : "attr",
										name : "ext"
									});
									$.extend(ext, {
										required : false
									});
									$("#" + n).attr("ext", $.jsonToString(ext));
									$("#" + n).css("background-color", "white");
									// 输入场不必输时，对“必输提示”信息需要清空（控件可见的情况下），其余的提示信息不清空
									var wgt = $("#" + n);

									var $errorTip = wgt.parent().find(
											".errorTip:first");
									if (!$.isEmptyObject($errorTip)) {
										if (!$.isEmpty($errorTip.html())
												&& ($errorTip.html() == jQuery.validator.messages.required)
												&& ($(wgt).css("display") != "none")) {
											$.removeInfo(n);
										}
									}
								});
			},
			/**
			 * 清空输入场
			 */
			clear : function(widget) {
				var temp = widget;
				if (widget.constructor != Array) {
					var temp = $.makeArray(arguments);
				}
				$.each(temp, function(i, n) {
					$.checkInput("clear",n);
					if ($("#" + n).is("select")) {
						$("#" + n).get(0).selectedIndex = 0;
					} else
						$("#" + n).val("");
				});
			},
			replaceTemplate : function(template, oldStr,newStr) {
				/*
				 * $.each(data, function(i, n) { template = template.replace(new
				 * RegExp("{" + i + "}", "g"), n); });
				 */
				template = template.replace(new RegExp(oldStr, "g"),newStr);
				var reg = /{\w*}/g;
				template = template.replace(reg, "");
				return template;
			},
			
			
			/**
			 * 取多个输入场的值，串成一个大字段，数字前补0，字符串后补空格到数据字典的长度
			 */
			extendVal : function(widget) {
				var temp = widget;
				if(widget.constructor != Array){
					var temp = $.makeArray(arguments);
				}
				var extendVal="";
				$.each(temp,function(i,n){					
					var ext = $("#" + n).metadata({
						type : 'attr',
						name : 'ext'
					});
					var maxLength = ext.maxLength;
					var value = $.value(n);
					if(ext.isNumber||ext.is9Number){
						value = $.appendChar('0',maxLength-value.length) + value;
					}else if(ext.isEnStr){
						value += $.appendChar(' ',maxLength-value.length);
					}else {   // 用于处理有中文的情况，暂未做
						value += $.appendChar(' ',maxLength-value.length);   
					}	
					extendVal = extendVal + value;
				});	
				return extendVal;
			},
			appendChar: function(ch,len){
				var result = "";
				for(var i = 0 ; i < len ; i++)
				{
					result += ch;
				}
				return result;
			},
			contractGroupbox:function(id){// 收起groupbox
				if($("#"+id)){
					if($("#"+id).find(".gbox-content")){
						$("#"+id).find(".gbox-content").css("display","none");
					}else{
						throw new Error("控件[id="+id+"]不合法");
					}
				}else{
					throw new Error("控件[id="+id+"]不存在");
				}
			},
			extendGroupbox:function(id){// 展开groupbox
				if($("#"+id)){
					if($("#"+id).find(".gbox-content")){
						$("#"+id).find(".gbox-content").css("display","block");
					}else{
						throw new Error("控件[id="+id+"]不合法");
					}
				}else{
					throw new Error("控件[id="+id+"]不存在");
				}
			},
			diffhighlightex : function(widgetName_N, widgetName_O, count) {// 新旧数据对比，widgetName_N为新数据第一个控件名称，widgetName_O为旧数据第一个控件名称，count为对比控件个数
				var text = s.sendFiled;
				var str1 = new Array();
				var str2 = new Array();
				var count1 = count;
				var count2 = count
				var add1 = "false";
				var add2 = "false";
				if(text!="" && widgetName_N != "" && widgetName_O != ""){
					for(var i=0;i<text.length;i++){
						if(count1<1)
							add1 = "false";
						if($("#"+text[i]).attr("name")==widgetName_N)
							add1 = "true";
						if(add1 == "true"){
							str1.push($("#"+text[i]).attr("name"));	
							count1--;	
						}	
						if(count2<1)
							add2 = "false";
						if($("#"+text[i]).attr("name")==widgetName_O)
							add2 = "true";
						if(add2 == "true"){
							str2.push($("#"+text[i]).attr("name"));	
							count2--;	
						}				
					}
					$.each(str1, function(i, n) {
					if($.value(n) != $.value(str2[i])){
						$("#"+n).css("border","solid");
						$("#"+n).css("border-color","#FF0000");
					}
					});	
				}
			},
			stsparse:function(convertType,fileName){
				/**
				 * @description: 状态解析
				 * @author: devgqk
				 * @date: 20120813
				 * @update:
				 * @parm Input Args String convertType: 类型（需要在convert.dat中定义）
				 *       String fieldName: 数据来源
				 * @return: Others:
				 */
				 $.nest({
				      url : "xds?targetUri=service.ibscore.ibscoreService",
				     data : {
					 		method      : "convert",
					 		convertType : convertType,
					 		fielName    : fileName
				 		},
					    callback     : function(param){
					    }
				   });	
			}
		});

/*******************************************************************************
 * 页面操作函数
 ******************************************************************************/
var AUTH_CONTENT11 = "";
var LEVEL_M11 = "";
var LEVEL_N11 = "";
var LEVEL_M_S11 = "";
var LEVEL_N_S11 = "";
var oldData = {}
var methodArray = new Array();

// /嵌套授权回调方法
function nestAuthorization(param){
	if(param.local == null){
	var data1= {
			AUTH_INFO   : AUTH_CONTENT11,
			REQ_TYPE    : "A",
			AUTH_IND    : "Y",
			AUTH_LVL_OLD : LEVEL_M_S11+LEVEL_N_S11,
			AUTH_LVL_NEW : LEVEL_M_S11+LEVEL_N_S11,
			SUP1_DEV : "0",
			SUP2_DEV : "0",
			flag   : "transient"
			}
		$.extend(true,data1,param);
	$.extend(true,data1,oldData);
		 $.nest({
		      url : oldData.url,
		     data : data1,
			    callback     : function(param){
			    }
		   });	
		}else{
		generatePageTempData();
		var data1= {
						pageTempData : pageTempData,
						LEVEL_M   : LEVEL_M11,
		 				LEVEL_N   : LEVEL_N11,
						uri : s.uri
					}
		$.extend(true,data1,param);
		 $.nest({
		      url : "xds?targetUri=service.ibscore.authorizationService&method=remote",
		     data : data1,
			    callback     : function(param){
			    }
		   });	
		}
}
jQuery.extend( {
	/**
	 * 回退
	 */
	back : function(options) {
		$.inner_toPage($.extend(true, {
			flag : "back",
			data : {}
		}, options));
	},

	/**
	 * 下一页
	 */
	nextPage : function(options) {
		if ($.isEmpty(options.form)) {
			$.inner_toPage($.extend(true, {
				flag : "next",
				data : {}
			}, options));
		} else {
			var $form = $("#" + options.form);
			if ($.isNotEmpty($form)) {
				$form.attr("action", $.inner_url(options.url, options.data));
				$form.submit();
			}
		}
	},
	
	/**
	 * 嵌套 uri:请求的url地址 data：请求时发送的参数 callback:请求完成，服务器数据返回时的回调方法
	 * 发生嵌套时，用模态方式禁止其他操作
	 */
	nest : function(options) {
		var count = 0;
		var data = {
			flag : "transient",
			type : "ajax"
		};

		if (!$.isEmptyObject(s)) {
			// $.extend(true, data, s);
			$.extend(true, data, {bid:s.bid,resFlag:s.resFlag,lastFlag:s.lastFlag,name:s.name,uri:s.uri,saveTempDataUrl:s.saveTempDataUrl,repeatDataUrl:s.repeatDataUrl,ucSessNo:s.ucSessNo,bcSessNo:s.bcSessNo,tid:s.tid});
		}
		if(options.flag){
			data.flag = options.flag;
		}
		$.extend(true, options, {
			data : data
		});
		
		if ($.isEmpty(options.form)) {
			if((options.url.indexOf("http:")>=0 ||options.url.indexOf("https:")>=0 )&& options.url.indexOf("localhost:")<0){
			    if(options.showLoading != false){
					 count = count + 1;
					 if(options.type == "login"){
						 Ext.MessageBox.show({
					           msg: jQuery.validator.messages.ajaxLoginInfo,
					           width:250,
					           wait:true,
					           waitConfig: {interval:200}
					     });						
					 }else{
						 Ext.MessageBox.show({
					           msg: jQuery.validator.messages.ajaxRequestInfo,
					           width:250,
					           wait:true,
					           waitConfig: {interval:200}
					     });
					}
			    }
				$.ajax( {
					type : "POST",
					url : options.url,
					async : options.async != "false" ? true : false,
					data : options.data,
					dataType : "jsonp",
					jsonp : "callback",
					timeout : 30000,
					cache : false,
				success : function(json) {
					json = json || {};
					if(options.showLoading != false){				
						count = count - 1;
					    if (0 == count) {
					    	Ext.MessageBox.hide();
						}
					}
					if(json.msg_type !=null && json.msg_type=='A'){
						oldData = options.data;
						$.extend(true,oldData,{url:options.url});
						var r_code = json.data.AUTH_INFO_ALL;
						r_code = r_code.replace(/<br\/>/g,"\n");
						AUTH_CONTENT11 = json.data.AUTH_CONTENT;
						LEVEL_M11 = json.data.LEVEL_M;
						LEVEL_N11 = json.data.LEVEL_N;
						LEVEL_M_S11 = LEVEL_M11;
						LEVEL_N_S11 = LEVEL_N11;
						if(options.callback){
							methodArray['authCallback'] = options.callback;
						}
						$.openWindow( {
							 width     : "530",
							 height    : "320",
							 modal     : true,
							 url       : 'xds?targetUri=jsp.comm.authorization',
							 data      : {
							 CODE      : r_code,
							 LEVEL_M   : LEVEL_M11,
							 LEVEL_N   : LEVEL_N11,
							 ORG       : json.ORG,
							 AUTH_INFO : AUTH_CONTENT11				
							 },					
							 callback  : "nestAuthorization"
						});	
					}else{
						if(methodArray['authCallback']&&methodArray['authCallback']!=null){
							var callbackJson = {callback:methodArray['authCallback']};
							$.inner_callback(json, callbackJson);
							methodArray = new Array();
							$.closeWindow();
						}else{
							$.inner_callback(json, options);
						}
						if(json.msg_type !=null && json.msg_type=='E'){
							return;
							// alert(json.desc);
						}
					}					
				}
				});
				var msgjson = {"desc":jQuery.validator.messages.ajaxtimeOutInfo,"msg_type":"E","state":"-1","code":"Link"};			
				setTimeout(function(){if(options.showLoading != false){count = count - 1;if(0 == count){Ext.MessageBox.hide();$.inner_callback(msgjson, options);}}},30000);		
			}else{
				$.ajax( {
					type : "POST",
					url : options.url,
					async : options.async != "false" ? true : false,
					data : options.data,
					dataType : "json",
					cache : false,
					timeout : 60000,
					beforeSend : function() {
					   if(options.showLoading != false){
							count = count + 1;
							if(options.type == "login"){
								Ext.MessageBox.show({
							           msg: jQuery.validator.messages.ajaxLoginInfo,
							           width:250,
							           wait:true,
							           waitConfig: {interval:200}
							    });						
							}else{
								Ext.MessageBox.show({
							           msg: jQuery.validator.messages.ajaxRequestInfo,
							           width:250,
							           wait:true,
							           waitConfig: {interval:200}
							    });
							}
					   }
				},
				complete : function(res, state) {
					if(options.showLoading != false){				
						count = count - 1;
					    if (0 == count) {
					    	Ext.MessageBox.hide();
						}
					}
					var json = eval("(" + res.responseText + ")");
					if(json.msg_type !=null && json.msg_type=='A'){
						oldData = options.data;
						$.extend(true,oldData,{url:options.url});
						var r_code = json.data.AUTH_INFO_ALL;
						r_code = r_code.replace(/<br\/>/g,"\n");
						AUTH_CONTENT11 = json.data.AUTH_CONTENT;
						LEVEL_M11 = json.data.LEVEL_M;
						LEVEL_N11 = json.data.LEVEL_N;
						LEVEL_M_S11 = LEVEL_M11;
						LEVEL_N_S11 = LEVEL_N11;
						if(options.callback){
							methodArray['authCallback'] = options.callback;
						}
						$.openWindow( {
							 width     : "530",
							 height    : "320",
							 modal     : true,
							 url       : 'xds?targetUri=jsp.comm.authorization',
							 data      : {
							 CODE      : r_code,
							 LEVEL_M   : LEVEL_M11,
							 LEVEL_N   : LEVEL_N11,
							 ORG       : json.ORG,
							 //AUTH_INFO : AUTH_CONTENT11		
							AUTH_INFO : ""
							 },					
							 callback  : "nestAuthorization"
						});	
					}else{
						if(methodArray['authCallback']&&methodArray['authCallback']!=null){
							var callbackJson = {callback:methodArray['authCallback']};
							$.inner_callback(json, callbackJson);
							methodArray = new Array();
							$.closeWindow();
						}else{
							$.inner_callback(json, options);
						}
						if(json.msg_type !=null && json.msg_type=='E'){
							return;
							// alert(json.desc);
						}
					}
				  }
				});
			}
		} else {
			var $form = $("#" + options.form);
			if ($.isNotEmpty($form)) {
				var url = options.url;
				if ($.isEmpty(url)) {
					url = $form.attr("action");
				}
				$form.attr("action", $.inner_url(url, options.data));

				// var wgts = $(":text"); // 页面提交前格式化
				var texts = $(":text");
				var selects = $("select");
				var wgts = texts; // 组成格式化控件数组
				$.each(selects, function(i, n) {
					wgts.push(n);
				});
/*
 * var $Result = true; // 页面提交时校验 $.each(wgts, function(i, n) { var wgt = $(n);
 * var $errorTip = wgt.parent().find(".errorTip:first"); if
 * (!$.isEmptyObject($errorTip)) { if (!$.isEmpty($errorTip.html())) $Result =
 * false; } });
 */				
				var $Result = true; // 页面提交时校验
				$.each(wgts, function(i, n) {
					var wgt = $(n);
					var $errorTip = wgt.parent().find(".errorTip:first");
					if (!$.isEmptyObject($errorTip)) {
						if (!$.isEmpty($errorTip.html()))
						{
							$Result = false;
							if($errorTip.html().length==1)// 必输项没有输则提示错误,并将含有tab的页面切换到最后一个出错的tab
							{
								var tabId = wgt.parents(".tabPage").attr("id");
								if(tabId != undefined)
								{
									$("#\\#"+tabId).trigger('mouseup');
									reFocusWhenClick('');
								}
								$.destroyErrorTip(n);
								$.setErrorTip(n, jQuery.validator.messages.requiredMsg);
								$.showErrorTip(n);
							}
						}
					}
				});
				if($Result)
				{
					$.each($(".combobox"), function(i, n) {
							changeComboBoxValue(n,false);
					});
				}
				if ($Result) // 去格式化
				{
					$.each(wgts, function(i, n) {
						var widgetName = $(n).attr("id");
						$.unformat(widgetName);
					});
					$form.ajaxSubmit( {
						dataType : "json",
						type : "post",
						beforeSend : function() {
							Ext.MessageBox.show({
						           msg: jQuery.validator.messages.ajaxRequestInfo,
						           width:250,
						           wait:true,
						           closable:true,
						           waitConfig: {interval:200}
						    });
						},
						success : function(json) {
							Ext.MessageBox.hide();
							$.formatWidgets(wgts);
							$.inner_callback(json, options);
						}
					});

				}
			}
		}
	},

	
	/**
	 * 嵌套 uri:请求的url地址 data：请求时发送的参数 callback:请求完成，服务器数据返回时的回调方法
	 */
	nest_old : function(options) {
		// $.ajaxSetup({ cache: false });
	var data = {
		flag : "transient",
		type : "ajax"
	};

	if (!$.isEmptyObject(s)) {
		$.extend(true, data, {bid:s.bid,resFlag:s.resFlag,lastFlag:s.lastFlag,name:s.name,uri:s.uri,saveTempDataUrl:s.saveTempDataUrl,repeatDataUrl:s.repeatDataUrl,ucSessNo:s.ucSessNo,bcSessNo:s.bcSessNo,tid:s.tid});
		// $.extend(true, data, s);
	}
	$.extend(true, options, {
		data : data
	});
	if ($.isEmpty(options.form)) {
		$.getJSON(options.url, options.data, function(json) {
			$.inner_callback(json, options);
		});
	} else {
		var $form = $("#" + options.form);
		if ($.isNotEmpty($form)) {
			var url = options.url;
			if ($.isEmpty(url)) {
				url = $form.attr("action");
			}
			$form.attr("action", $.inner_url(url, options.data));

			// var wgts = $(":text"); // 页面提交前格式化
	var texts = $(":text");
	var selects = $("select");
	var wgts = texts; // 组成格式化控件数组
	$.each(selects, function(i, n) {
		wgts.push(n);
	});

	var $Result = true; // 页面提交时校验
	$.each(wgts, function(i, n) {
		var wgt = $(n);
		var $errorTip = wgt.parent().find(".errorTip:first");
		if (!$.isEmptyObject($errorTip)) {
			if (!$.isEmpty($errorTip.html()))
				$Result = false;
		}
	});
	if ($Result) // 去格式化
	{
		$.each(wgts, function(i, n) {
			var widgetName = $(n).attr("id");
			$.unformat(widgetName);
		});
		$form.ajaxSubmit( {
			dataType : "json",
			type : "post",
			success : function(json) {
				$.formatWidgets(wgts);
				$.inner_callback(json, options);
			}
		});

	}
}
}
},
loadPage : function(options) {
var data = {
flag : "transient"
};

if (!$.isEmptyObject(s)) {
	$.extend(true, data, {bid:s.bid,resFlag:s.resFlag,lastFlag:s.lastFlag,name:s.name,uri:s.uri,saveTempDataUrl:s.saveTempDataUrl,repeatDataUrl:s.repeatDataUrl,ucSessNo:s.ucSessNo,bcSessNo:s.bcSessNo,tid:s.tid});
	// $.extend(true, data, s);
}
$.extend(true, options, {
data : data
});
$("#" + options.container).load(options.url, options.data, options.callback);

}
});

/*******************************************************************************
 * 对话框窗口函数
 ******************************************************************************/
var xwin;
jQuery.extend( {
	/**
	 * 
	 */
	openWindow_o : function(options) {
		$.extend(true, options, {
			data : {
				flag : "transient",
				nextFlag : "transient",
				bid : s.bid,
				ucSessNo : s.ucSessNo,
				sessOpen : "true",
				show_url : "false"
			}
		});
		return $("body").window(options);
	},
	openWindow : function(options) {
		$.extend(true, options, {
			data : {
				flag : "transient",
				nextFlag : "transient",
				bid : s.bid,
				ucSessNo : s.ucSessNo,
				tid      : s.tid,
				sessOpen : "true",
				show_url:"false"
			}
		});
		return $(document.body).window(options);
	},
	
	callback4windowclose:function(){
		var method = $("#xBwindow", window.document).attr("callback");
		eval(method+'()');
	},
	
	closeParentWindow:function(){
		if(window.parent.xwin){
			window.parent.xwin.close();
		}
	},
	
	closeWindow : function() {
		if(xwin){
			xwin.close();
		}
		/**
		 * $('#xwindow').remove(); $('#window-modal-bg').remove(); $.nest( { url :
		 * '/branch/xds?targetUri=service.sys.nav', data : { "method" :
		 * "showNav", "show_url" : "true", "bid" : s.bid }, callback :
		 * function(params) { } });
		 */

	},

	callback : function(json) {
		var method = $("#xBwindow", window.parent.document).attr("callback");
		window.parent[method](json);
	},
	showDialog : function(options) {
		return $("body").xwindow(options);
	},
	showMessage : function(options) {
		return $("body").xwindow(options);
	},
	showMyDialog : function(param) {
		return confirm(param);
	},
	alert : function(param) {
		alert(param);
	}
});

Ext.Window.prototype.closeWindow = function(){
	$("#xifr").html("");
	if(this.iscallback){
		$.callback4windowclose();
	}else if(this.closeMethod){
		var str = this.closeMethod + "";
		if(str.indexOf("function") < 0 || str.indexOf("{") < 0)
			eval(this.closeMethod+"()");
		else{
			var str1 = str.substring(str.indexOf("{")+1, str.indexOf("}"));
			eval(str1);
		}
	}
	this.close();
	
}
Ext.Window.prototype.afterMaximize = function(){
	
}

/*******************************************************************************
 * 验证 函数
 ******************************************************************************/
jQuery.extend( {

	getDefaultValidateOptions : function(options) {

		var defaults = {
			event : "keyup",
			errorPlacement : function(error, element) {
				element.parent().find(".errorTip").empty().append(error);
			},
			highlight : function(element, errorClass) {
			},
			unhighlight : function(element, errorClass) {
			},
			invalidHandler : function(form, validator) {
				var errNum = validator.numberOfInvalids();
				if (errNum) {
					var error = "共有 " + errNum + " 处错误!";
					$("#___errDesc").html(error);
					$("#global-errorTip").show();
				} else {
					$("#global-errorTip").hide();
				}
			}
		};
		return $.extend(true, defaults, options);
	}

});

/*******************************************************************************
 * inner 函数
 ******************************************************************************/
jQuery.extend( {
	/**
	 * 
	 */
	inner_toPage : function(options) {
		if ($.isEmptyObject(options) == true) {
			return;
		}

		if ($.isNotEmpty(s) && !$.isEmptyObject(s) && options.flag!="back") {
			$.extend(true, options.data, {bid:s.bid,resFlag:s.resFlag,lastFlag:s.lastFlag,name:s.name,uri:s.uri,saveTempDataUrl:s.saveTempDataUrl,repeatDataUrl:s.repeatDataUrl,ucSessNo:s.ucSessNo,bcSessNo:s.bcSessNo,tid:s.tid});
			// $.extend(true, options.data, s);
		}
		Ext.MessageBox.show( {
			msg : jQuery.validator.messages.submitInfo,
			width : 250,
			wait : true,
			waitConfig : {
				interval : 200
			}
		});
		location.href = $.inner_url(options.url, options.data);

	},
	inner_url : function(url, data) {
		var target = $.isEmptyObject(data) ? url : (url
				+ (url.indexOf("?") > 0 ? "&" : "?") + $.param(data));
		return target;
	},
	inner_callback : function(json, options) {
		if($("#nestMsgDiv").length>0){
			$("#nestMsgDiv").empty();
		}
		$("#nestMsgDiv").hide();
		// document.getElementById("nestMsgDiv").innerHTML = "";
		if (json.state == '-1') {		
			if ($.isEmpty(options.error)) {	
				$("#nestMsgDiv").append('<img src="comm/images/msg_error.png" align="middle" style="width:17px;height:17px;padding-right:2px;padding-left:2px;padding-bottom:1px;">');
				$("#nestMsgDiv").append('<img id="nest_error_close" src="comm/images/msg_close.gif" title="' + jQuery.validator.messages.titleCose + '" style="position:absolute;right:0px;top:0px;width:16px;height:16px;cursor:pointer;"/>');
				if(json.code!=null && json.desc!=null){
					$("#nestMsgDiv").append(
								'<span style="font-weight:bold;width:1000px">'
										+ json.code + '&nbsp;:&nbsp;[' + json.desc
										+ ']</span>&nbsp;&nbsp;');
					$("#nestMsgDiv").append("<br/>");
				}else{
					var o=json.___errors[0];	
					for(var i in o){
						$("#nestMsgDiv").append(
						'<span style="font-weight:bold;width:1000px">'
								+ i + '&nbsp;:&nbsp;[' + o[i]
								+ ']</span>&nbsp;&nbsp;');
						$("#nestMsgDiv").append("<br/>");
					}				
				}
				$("#nestMsgDiv").removeClass().addClass('msgdiv_error');
				$("#nestMsgDiv").slideDown("fast");
			    $("#nest_error_close").bind("click",function(){
			    	$("#nestMsgDiv").slideUp("fast");
			    });	
			} else {
				options.error(json);
			}
		} else {
			if (json.state == '1' && json.code!=null && json.desc!=null) {
				$("#nestMsgDiv").append('<img src="comm/images/msg_info.png" align="middle" style="width:17px;height:17px;padding-right:2px;padding-left:2px;padding-bottom:1px;">');
				$("#nestMsgDiv").append('<img id="nest_msg_close" src="comm/images/msg_close.gif" title="' + jQuery.validator.messages.titleCose + '" style="position:absolute;right:0px;top:0px;width:16px;height:16px;cursor:pointer;"/>');
				$("#nestMsgDiv").append(
							'<span style="font-weight:bold;width:1000px">'
									+ json.code + '&nbsp;:&nbsp;[' + json.desc
									+ ']</span>&nbsp;&nbsp;');
			    $("#nestMsgDiv").append("<br/>");
				$("#nestMsgDiv").removeClass().addClass('msgdiv_info');
				$("#nestMsgDiv").slideDown("fast");
				setTimeout(function(){$("#nestMsgDiv").slideUp("fast");},6000);
			    $("#nest_msg_close").bind("click",function(){
			    	$("#nestMsgDiv").slideUp("fast");
			    });
			} else {
				if(!$.isEmpty(options.data) && $.isEmpty(options.data.loginName)){
					if(!$.isEmpty(json.___sys_msg_list) && json.___sys_msg_list.length>0){
						$("#nestMsgDiv").append('<img id="nest_msg_close" src="comm/images/msg_close.gif" title="' + jQuery.validator.messages.titleCose + '" style="position:absolute;right:0px;top:0px;width:16px;height:16px;cursor:pointer;"/>');
						for(var x=0;x<json.___sys_msg_list.length;x++){
							$("#nestMsgDiv").append('<img src="comm/images/msg_info.png" align="middle" style="width:17px;height:17px;padding-right:2px;padding-left:2px;padding-bottom:1px;">');
							var o=json.___sys_msg_list[x];
							for(var i in o){
								$("#nestMsgDiv").append(
								'<span style="font-weight:bold;width:1000px">'
										+ i + '&nbsp;:&nbsp;[' + o[i]
										+ ']</span>&nbsp;&nbsp;');
								$("#nestMsgDiv").append("<br/>");
							}
						}
						$("#nestMsgDiv").removeClass().addClass('msgdiv_info');
						$("#nestMsgDiv").slideDown("fast");
						setTimeout(function(){$("#nestMsgDiv").slideUp("fast");},6000);
					    $("#nest_msg_close").bind("click",function(){
					    	$("#nestMsgDiv").slideUp("fast");
					    });
					}
				}
			}
			if (!$.isEmpty(options.callback)) {
				options.callback(json.data);
			} else {
				if (!$.isEmptyObject(json)) {
					$.each(json.data, function(i, n) {
						if(i=="bid"){
							s.bid = n;
							var actionUri = $("#form1").attr("action");
							var tmpActionUri = actionUri.replace("begin","next");
							$("#form1").attr("action",tmpActionUri);
						}
						$("#" + i).val(n);
					});
				}
			}
		}
	}
});
function showSuccess(msg){
	if($("#successMsgdiv").length>0){
		$("#successMsgdiv").empty();
	}
	$("#successMsgdiv").hide();
	$("#successMsgdiv").append('<img src="comm/images/msg_success.png" align="middle" style="width:17px;height:17px;padding-right:2px;padding-left:2px;padding-bottom:1px;">');
	$("#successMsgdiv").append('<img id="success_msg_close" src="comm/images/msg_close.gif" title="' + jQuery.validator.messages.titleCose + '" style="position:absolute;right:0px;top:0px;width:16px;height:16px;cursor:pointer;"/>');
	$("#successMsgdiv").append(
				'<span style="font-weight:bold;width:1000px">[' + msg + ']</span>&nbsp;&nbsp;');
    $("#successMsgdiv").append("<br/>");
	$("#successMsgdiv").removeClass().addClass('msgdiv_success');
	$("#successMsgdiv").slideDown("fast");
	setTimeout(function(){$("#successMsgdiv").slideUp("fast");},3000);
    $("#success_msg_close").bind("click",function(){
    	$("#successMsgdiv").slideUp("fast");
    });	
}
function showWarning(msg){
	if($("#warnMsgdiv").length>0){
		$("#warnMsgdiv").empty();
	}
	$("#warnMsgdiv").hide();
	$("#warnMsgdiv").append('<img src="comm/images/msg_warning.png" align="middle" style="width:17px;height:17px;padding-right:2px;padding-left:2px;padding-bottom:1px;">');
	$("#warnMsgdiv").append('<img id="warn_msg_close" src="comm/images/msg_close.gif" title="' + jQuery.validator.messages.titleCose + '" style="position:absolute;right:0px;top:0px;width:16px;height:16px;cursor:pointer;"/>');
	$("#warnMsgdiv").append(
				'<span style="font-weight:bold;width:1000px">[' + msg + ']</span>&nbsp;&nbsp;');
    $("#warnMsgdiv").append("<br/>");
	$("#warnMsgdiv").removeClass().addClass('msgdiv_warning');
	$("#warnMsgdiv").slideDown("fast");
	setTimeout(function(){$("#warnMsgdiv").slideUp("fast");},3000);
    $("#warn_msg_close").bind("click",function(){
    	$("#warnMsgdiv").slideUp("fast");
    });	
}
/*******************************************************************************
 * 创建map数据结构
 ******************************************************************************/
function Map() {
	this.keys = new Array();
	this.data = new Object();
	// 定义put方法
	this.put = function(key, value) {
		if (this.data[key] == null)
			this.keys.push(key);
		this.data[key] = value;
	}
	// 定义get方法
	this.get = function(key) {
		return this.data[key];
	}
	// 定义remove方法
	this.remove = function(key) {
		this.keys.remove(key);
		this.data[key] == null;
	}
	// 获取键值数组（类似java中的entrySet）
	this.entrys = function() {
		var len = this.keys.length;
		var entrys = new Array(len);
		for ( var i = 0; i < len; i++) {
			entrys[i] = {
				key : this.keys[i],
				value : this.data[i]
			};
		}
		return entrys;
	};
	// 判断map是否为空
	this.isEmpty = function() {
		return this.keys.length == 0;
	}
	// 获取键值对数量
	this.size = function() {
		return this.keys.length;
	}
	// 重写toString方法
	this.toString = function() {
		var str = "{";
		for ( var i = 0; i < this.keys.length; i++, str += ',') {
			var k = this.keys[i];
			str += k + "=" + this.data[k];
		}
		str += "}";
		return str;
	}
}
// 扩展Array的方法，添加remove
Array.prototype.remove = function(s) {
	for ( var i = 0; i < this.length; i++) {
		if (s == this[i])
			this.splice(i, 1);
	}
}

// 扩展String的startWith方法
String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
}

// 扩展String的endWith方法
String.prototype.endWith = function(oString) {
	var reg = new RegExp(oString + "$");
	return reg.test(this);
}

/*
 * 测试方法 function testMap() { var m = new Map(); m.put('key1', 'Comtop');
 * m.put('key2', '南方电网'); m.put('key3', '景新花园'); m.remove('key2');
 * alert(m.entrys().length); alert(m.entrys()[1].key); }
 */

/*******************************************************************************
 * 初始化方法
 ******************************************************************************/
$(document).ready(
		function() {
			$(".title-bar").click(function() {
				$(this).next().toggle();
			});
			if ($.isNotEmpty(s.msg)) {
				var $msg = eval("(" + s.msg + ")");
				if ($.isNotEmpty($msg.code)) {
					var msg = "<a href='#'>" + $msg.code + ":</a>  "
							+ $msg.desc;
					$("#___desc").html(msg);
					$("#global-msgTip").show();
					if ($.isNotEmpty($msg.msgList)) {
						$.each($msg.msgList, function(i, n) {
							var $field = $("#" + n.field);
							if ($.isNotEmpty($field)) {
								var $errorTip = $field.parent().find(
										".errorTip:first");
								if (!$.isEmptyObject($errorTip)) {
									$errorTip.html(n.description).show();
								}
							}
						});
					}
				}
			}
			$.metadata.setType("attr", "ext");
			var inputs = $(":input");
			$.each(inputs, function(i, n) {
				var dynamicValue = $(n).attr("dynamicValue");
				if (!$.isEmpty(dynamicValue)) {
					if (s.lastFlag == "back") {
						$(n).val(dynamicValue);
					}
				}
			});

			var texts = $(":text"); // 页面初始化时格式化所有的text控件
			var passwords = $(":password");
			var selects = $("select"); // 页面初始化时格式化所有的select控件
			var wgts = texts; // 组成格式化控件数组

			$.each(selects, function(i, n) {
				wgts.push(n);
			});
			
			$.each(passwords, function(i, n) {
				wgts.push(n);
			});
			$(".file").change(function(){
				var file_text = $(this).attr("id")+"_FILE_TEXT";
				$("#"+file_text).css({"background":"#dcdcdc","color":"#333","font-style":"normal"});
				$("#"+file_text).val($(this).val());
			});
			$("li").mouseup(function(){
				$(this).trigger('click');
				$("select[ext]").each(function(){
					$.hideErrorTip($(this));
				});
				$("input[ext]").each(function(){
					$.hideErrorTip($(this));
				});
				var liId = $(this).attr("id");
				$(liId+" input[ext]").each(function(){
					$.showErrorTip($(this));
				});
				$(liId+" select[ext]").each(function(){
					$.showErrorTip($(this));
				});
			});
			
			$("form").submit(function() {
				var data = {};
				if (!$.isEmptyObject(s)) {
					$.extend(true, data, {bid:s.bid,resFlag:s.resFlag,lastFlag:s.lastFlag,name:s.name,uri:s.uri,saveTempDataUrl:s.saveTempDataUrl,repeatDataUrl:s.repeatDataUrl,ucSessNo:s.ucSessNo,bcSessNo:s.bcSessNo,tid:s.tid});
					// $.extend(true, data, s);
				}
				var $form = $(this);
				var url = $.inner_url($form.attr("action"), data);
				$form.attr("action", url);
				$("#___desc").html("");
				$("#global-msgTip").hide();

				var $Result = true; // 页面提交时校验
					$.each(wgts, function(i, n) {
						var wgt = $(n);
						var $errorTip = wgt.parent().find(".errorTip:first");
						if (!$.isEmptyObject($errorTip)) {
							var display = wgt.css("display");
							if (!$.isEmpty($errorTip.html()) && !$.isEmpty(display) && display != "none")
							{
								$Result = false;
								if($errorTip.html().length==1)// 必输项没有输则提示错误,并将含有tab的页面切换到最后一个出错的tab
								{
									var tabId = wgt.parents(".tabPage").attr("id");
									if(tabId != undefined)
									{
										$("#\\#"+tabId).trigger('mouseup');
										reFocusWhenClick('');
									}
									$.destroyErrorTip(n);
									$.setErrorTip(n, jQuery.validator.messages.requiredMsg);
									$.showErrorTip(n);
								}
							}
						}
					});
					if($Result)
					{
						$.each($(".combobox"), function(i, n) {
							changeComboBoxValue(n,false);
						});
					}
					if ($Result) // 去格式化
					{
						Ext.MessageBox
						.show( {
							msg : jQuery.validator.messages.submitInfo,
							width : 250,
							wait : true,
							waitConfig : {
								interval : 200
							}
						});
						$.each(wgts, function(i, n) {
							var widgetName = $(n).attr("id");
							$.unformat(widgetName);
						});
					}
					return $Result;
				});

		});


/**
 * combobox控件的数据的切换,当赋值时,combobox按照key - value的格式显示数据 当表单提交时,将combobox的值还原成key
 * author:devluh
 */
function changeComboBoxValue(n,showValue)
{
	if(showValue)// 页面初始化和assign时需显示key - value
	{
		var value = $(n).val();
		if($.trim(value) != '')
		{
			var comboBoxId = $(n).attr('id');
			var divId = comboBoxId + "_combobox";
			$("#"+divId).find('div').each(function(){
				var tdVal = $(this).html();
				var key = $.trim(tdVal.split(' -')[0]);
				if(key == value)
				{
					$("#"+comboBoxId).val($.replaceTemplate($.trim(tdVal),"&amp;","&"));
						return false;
				}
			});
		}
	}
	else// 如果提交表单则只显示key
	{
		var value = $(n).val();
		if($.trim(value) != '')
			$(n).val($.trim(value.split(' -')[0]));
	}
}
/**
 * 日期控件的掩码设置,并为该控件添加日历控件 author:devluh
 */
function dateMask(obj,formatVal)
{
	switch(formatVal){
			default:
				$("#" + obj).attr('alt','39/19/9999');
				break;	
			case 1:
				$("#" + obj).attr('alt','9999-19-39');
				break;
			case 2:
				$("#" + obj).attr('alt','9999/19/39');
				break;
			case 3:
				$("#" + obj).attr('alt','39-19-9999');
				break;
			case 4:
				$("#" + obj).attr('alt','39/19/9999');
				break;
			case 5:
				$("#" + obj).attr('alt','19-39-9999');
				break;
			case 6:
				$("#" + obj).attr('alt','19/39/9999');
				break;
			case "1":
				$("#" + obj).attr('alt','9999-19-39');
				break;
			case "2":
				$("#" + obj).attr('alt','9999/19/39');
				break;
			case "3":
				$("#" + obj).attr('alt','39-19-9999');
				break;
			case "4":
				$("#" + obj).attr('alt','39/19/9999');
				break;
			case "5":
				$("#" + obj).attr('alt','19-39-9999');
				break;
			case "6":
				$("#" + obj).attr('alt','19/39/9999');
				break;				
	}
	$("#"+obj).css("background-image","url(common/images/cal.gif)");
	$("#"+obj).css("background-repeat","no-repeat");
	$("#"+obj).css("background-position","right");
	$("#"+obj).attr("autocomplete","off");
	$.initDateField(obj,formatVal);
}
/**
 * 9型,S型控件的数字掩码设置 author:devluh
 */
function numberMask(obj,dec)
{
	var alt = $("#" + obj).attr('alt');
	if($.isEmpty(alt))
	{
		var id = $("#" + obj).attr('id');
		var maxLen = $("#" + obj).attr('maxlength');
		if($.isEmpty(maxLen))
			maxLen = 15;
		var maxInt = maxLen - dec;
		var maxIntCh = "";
		var maxDecCH = "";
		for(var i = 0 ; i < maxInt ; i++)
			maxIntCh += "9";
		for(var i = 0 ; i < dec ; i++)
			maxDecCH += "9";
		var maskRule = maxDecCH + "." + maxIntCh;
		var mask = "{"+id+":{mask:'"+maskRule+"',type:'reverse',defaultValue : '+'}}";
		$.mask.masks = $.extend($.mask.masks,eval('('+mask+')'));
		$("#" + obj).attr('alt',id);
	}
}
/**
 * 为表单绑定热键 author:devluh
 */
function bindHotKey()
{
	var tabId = $(".tabs").attr('id');
	if(tabId != undefined)
	{
		jQuery.hotkeys.add('Ctrl+right',function (){
			var $tabHeader = $(".tabs").find("ul[class*='tabHeader']");
			var $tabSelected = $tabHeader.find("li[class*='tabSelected']");
			var index = $("li").index($tabSelected);
			var tabs = $("li");
			if(index == tabs.length - 1)
				return;
			var nextTab = $(tabs[index + 1]).attr('id');
			$("#\\#"+nextTab.substring(1)).trigger('mouseup');
			reFocusWhenClick('');
		});
		jQuery.hotkeys.add('Ctrl+left',function (){
			var $tabHeader = $(".tabs").find("ul[class*='tabHeader']");
			var $tabSelected = $tabHeader.find("li[class*='tabSelected']");
			var index = $("li").index($tabSelected);
			var tabs = $("li");
			if(index == 0)
				return;
			var nextTab = $(tabs[index - 1]).attr('id');
			$("#\\#"+nextTab.substring(1)).trigger('mouseup');
			reFocusWhenClick('');
		});
	}
	/*
	jQuery.hotkeys.add('f12',function (){
			$("form").trigger('submit');
	});
	*/
}

function bindKeyDown(n)
{
	$(n).bind('keydown',function(e){
		var extAttr = $.String2Json($(n).attr("ext"));	
		var maxLen = extAttr.maxLength;
		var code = e.keyCode;
		if(maxLen){
			var currentVal = $(n).val();
			if(extAttr.isNumber!=undefined && extAttr.isNumber){
				currentVal = currentVal.replace(/,/g,'');
				currentVal = currentVal.replace('.','');
				currentVal = currentVal.replace('-','');
			}
			switch(code){
				case 9 : return ;
				case 8 : return ;
				case 16: return ;
				case 20: return ;
				case 27: return ;
				case 37: return ;
				case 39: return ;
				case 13: reFocusWhenClick($(n).attr('id'));
				 		return false;
				default: break;
			}
			if(maxLen<=currentVal.length){
				//return false;
//			reFocusWhenClick($(n).attr('id'));
			}
//				if(currentVal.length == parseInt(maxLen))
//				reFocusWhenClick($(n).attr('id'));//modified by devxwl at 20130917
		}
	});
}


/**
 * 给每个输入场绑定keyup事件,用于光标自动跳转 author:devluh
 */
function bindKeyUp(n)
{
	$(n).bind('keyup',function(e){
		var extAttr = $.String2Json($(n).attr("ext"));	
		var maxLen = extAttr.maxLength;
			if($.isEmpty(maxLen))
				return;
			else
			{
				var code = e.keyCode;
				switch(code){
					case 9 : return;
					case 8 : return;
					case 16: return;
					case 20: return;
					case 27: return;
					case 37: return;
					case 39: return;
					case 13: return;
					default: break;
				}
				var val = $(n).val();
				if(extAttr.isNumber!=undefined && extAttr.isNumber){
					val = val.replace(/,/g,'');
					val = val.replace('.','');
					val = val.replace('-','');
				}else if(val.length > parseInt(maxLen)){
					$(n).val(val.substring(0,maxLen));
					val = $(n).val();
				}
				if(val.length >= parseInt(maxLen))
					reFocusWhenClick($(n).attr('id'));
			}
		});
}
function initFormat() {
	$(".button.themed").each(function(){
		if($(this).attr("disabled") == true){
			$(this).attr("class", "button disabled");
		}
	});
	var texts = $(":text"); // 页面初始化时格式化所有的text控件
	$.each(texts, function(i, n) {
		var widgetName = $(n).attr("id");
		$.format(widgetName);
		if($(n).attr("ext") && $(n).attr("ext").length>0){		
			var extAttr = $.String2Json($(n).attr("ext"));// eval('('+$(n).attr("ext")+')');
			if(extAttr.required||extAttr.required=='true'){
					$.required(widgetName,extAttr);
			}
			if(extAttr.dateStyle){
				 $.dateStyle(widgetName,extAttr.dateStyle);
			}
			if(extAttr.highCurrency){
				 $.highCurrency(widgetName,extAttr);
			}		
			if(extAttr.lowCurrency){
				 $.lowCurrency(widgetName,extAttr);
			}	
			if(extAttr.timeStyle){
				 $.timeStyle(widgetName,extAttr);
			}				
		}
		if($(n).attr("readonly")){			
						$(n).css("background-color", "#dcdcdc");	
						$(n).css("border", "1px solid #a5a5a5");
		}
		if($(n).attr('class') == 'combobox')
			changeComboBoxValue(n,true);
		else
		{
			var alt = $(n).attr('alt');
			if ($.isEmpty(alt))// 没有设置掩码的需绑定keyup事件
			{
				bindKeyDown(n);
				bindKeyUp(n);
			}
		}
	});
	texts.setMask();
	var password = $(":password"); // 页面初始化时格式化所有的password控件
	$.each(password, function(i, n) {
		var widgetName = $(n).attr("id");
		$.format(widgetName);
		if($(n).attr("ext") && $(n).attr("ext").length>0){		
			var extAttr = $.String2Json($(n).attr("ext"));// eval('('+$(n).attr("ext")+')');
			if(extAttr.required||extAttr.required=='true'){
					$.required(widgetName,extAttr);
			}
		}
	});	
	var selects = $("select"); // 页面初始化时格式化所有的select控件
	$.each(selects, function(i, n) {
		var widgetName = $(n).attr("id");
		$.format(widgetName);
	});
	
	var tables = $(".datagrid");
	$.each(tables,function(i,n){
		var widgetName = $(n).attr("id");
		$.format(widgetName);
	});
	
	var passwords = $(":password"); // 页面初始化时格式化所有的密码控件
	$.each(passwords, function(i, n) {
		var widgetName = $(n).attr("id");
		$.format(widgetName);
		bindKeyUp(n);
	});
	
	var textareas = $("textarea"); // 页面初始化时格式化所有的文本框控件
	$.each(textareas, function(i, n) {
/*******************************************************************************
 * if($(n).attr("readonly")==true){ $(n).css("background-color", "#dcdcdc");
 * $(n).css("border", "1px solid #a5a5a5"); }
 ******************************************************************************/
		var widgetName = $(n).attr("id");
		$.format(widgetName);
		bindKeyUp(n);
	});
	
	var buttons = $(":submit,:button");// 根据应用定义给每个按钮加入快捷键
	$.each(buttons,function(i,n){
		var val = $(n).val();
		if(val.indexOf('(')!=-1)
		{
			var fstIdx = val.indexOf('(');
			var lastIdx = val.indexOf(')');
			var key = val.substring(fstIdx+1,lastIdx).trim();
			n.accessKey = key;
		}
	});
	// reFocusWhenClick('');//焦点定位到第一个输入场
	bindHotKey();
	
	
}

/** **********格式化操作************ */
/*
 * 需要格式化的内容： 高低币、日期、时间 需要校验的内容: 必输项、最大长度（分为全英文或中英文混合）、小数位精度、最大中文数、只能输入数字、只能输入英文
 */
jQuery
		.extend( {
			format : function(widget) {
				var mydefaults = {
					required : "",
					isNumber : "",
					is9Number : "",
					decimalLength : "",
					leftPadZero : "",
					highCurrency : "",
					lowCurrency : "",
					dateStyle : "",
					timeStyle : "",
					maxLength : "",
					isEnStr : "",
					isZhStr : ""
				};

				var temp = widget;
				if (temp.constructor != Array)
					temp = $.makeArray(widget);
				$.each(temp, function(i, n) {
					var wgt = $("#" + n);
					if($(wgt).is(":text") || wgt.is(":password")){
						   // alert($(wgt).attr("id"));
						if($(wgt).attr("ext")&&$(wgt).attr("ext").length>0){		
							var extAttr = $.String2Json($(wgt).attr("ext"));// eval('('+$(wgt).attr("ext")+')');
							// var extAttr = $.String2Json(extAttr);
							$(wgt).numberFmtCtrl(extAttr);
							var fmtContent = $(wgt).metadata( {
								type : "attr",
								name : "ext"
							});
							var opts = $.extend(true, {}, mydefaults, fmtContent);
							// $.f(n, opts);
							$(wgt).bind("blur", function() {
								$.f(n, opts);
							});
							$(wgt).bind("focus", function() {
								$.removeInfo(n);
							});
							if($(wgt).val()!=undefined&&$(wgt).val()!=""&&$(wgt).val()!=null&&$(wgt).val()!='null'){
								$.removeInfo(n);
							}
						}	 
					}
					if ($(wgt).is("select")) {
						var fmtContent = $(wgt).metadata( {
							type : "attr",
							name : "ext"
						});
						var opts = $.extend(true, {}, mydefaults, fmtContent);
						$.f(n, opts);
						$(wgt).bind("focus", function() {
							$.removeInfo(n);
						});
						$(wgt).bind("blur", function() {
							$.f(n, opts);
						});
						if($(wgt).val()!=undefined&&$(wgt).val()!=""&&$(wgt).val()!=null&&$(wgt).val()!='null'){
							  $.removeInfo(n);
						}
					} else if ($(wgt).is("Table")) {
						$.fTable(wgt);
					}
				});
			},
			f : function(widgetId, opts) { // 格式化核心函数
				$
						.each(
								opts,
								function(i, n) {
									if (n != "") {
										try {
											eval("$."
													+ (i + "('" + widgetId
															+ "','" + n + "')"));
										} catch (e) {

										}
									}
								});
			},
			required : function(objId, opt) {
				var obj = $("#" + objId);
				var jsonExt = $.String2Json($(obj).attr("ext"));
				if(jsonExt.required!=undefined && jsonExt.required==true){
					$.setRequireds(objId);
					var val = $(obj).val();
					var readonlyAttr = $(obj).attr("readonly");
					if(val!=undefined){
						var jsonValue = $.String2Json($(obj).attr("ext"));
						if(jsonValue.isNumber!=undefined && jsonValue.isNumber==true){
							val = $.replaceTemplate(val.replace(".",""),"0","");
						}else{
							val = $.trim(val);
						}
					}
					if ($.isEmpty(val) && $.isEmpty(readonlyAttr)) {
						$.showInfo(obj, jQuery.validator.messages.required);
						return;
					}
					else if(!$.isEmpty(val))
					{
						$.removeInfo(objId);
						if($.isEmpty(readonlyAttr)){
							obj.css("background-color","#fff1d1");
							$(obj).css("border", "1px solid #98c0d2");
						}
					}
				}
			},
			// check help list
			checkHelpList : function(objId, opt) {
			 var obj = $("#" + objId); 
			 var val = $(obj).val();
			 if($.isEmpty(val))
				 return;
			 var errMsg = jQuery.validator.messages.helpListInvalidValue;
			 if($.checkVal(objId, val) != 0) //输入的值不在下拉列表范围 
			 {
				 $.showInfo(obj,errMsg);
				 } else{
					$.removeInfo(objId);
				}
			},			
			highCurrency : function(obj, opt) {
				var jsonValue = $.String2Json($("#" + obj).attr("ext"));
				if(jsonValue.highCurrency!=undefined && jsonValue.highCurrency==true){
					//$.setHighCurrency(obj);
					// $("#" + obj).attr('alt','highCurrency');
					var val = $("#" + obj).val();
					// 去格式化
					if ($.isNumber(obj, opt))
						val = val.replace(/,/g, "");
					if ($.isEmpty(val))
						return;
					val = $.getHighCurrency(val);
					$("#" + obj).val(val);
				}
			},
			lowCurrency : function(obj, opt) {
				var jsonValue = $.String2Json($("#" + obj).attr("ext"));
				if(jsonValue.lowCurrency!=undefined && jsonValue.lowCurrency==true){				
					// $("#" + obj).attr('alt','lowCurrency');
					var val = $("#" + obj).val();
					// 去格式化
					if ($.isNumber(obj, opt)){
						val = val.replace(/,/g, "");
						//val = val.replace(/.00/g, "");
					}
					if ($.isEmpty(val))
						return;
			        var xsd = val.toString().split(".");
			        if (xsd.length > 1) {
			        	val = xsd[0].toString();
			        } 
					val = $.getLowCurrency(val);
					$("#" + obj).val(val);
				}
			},
			dateStyle : function(obj, opt) { // 1、2为"YYYY MM DD",3、4为DD MM
				// YYYY,5、6为MM DD YYYY
				var val = $("#" + obj).val();
				if(val.length == 8 && (opt==3 || opt == 4 || opt == 5 || opt == 6)){
					var acYear =val.substring(0,4);
					var acMonth = val.substring(4,6);
					var acDate = val.substring(6,8);
					if(opt == 3 || opt == 4)
						$("#" + obj).val(acDate+acMonth+acYear);
					else if(opt == 5 || opt == 6)
						$("#" + obj).val(acMonth+acDate+acYear);
					val = $("#" + obj).val();
				}
				dateMask(obj,opt);
				obj = $("#" + obj);		
				var reg = /^(0+)$/g;
			    if ($.isEmpty(val) || reg.test(val))
			       return;
				val = $.removeFormatInfo(val);
				if ($.isEmpty(val))
					return;
				if (isNaN(val) || (val.length != 8)) {
					$.showInfo(obj, jQuery.validator.messages.date);
					return;
				}
				val = $.getDateStyle(val, opt);
				if (val != "00/00/0000" && !$.dateCheck(val, opt)) {
					$.showInfo(obj, jQuery.validator.messages.date);
					return;
				}
				$(obj).val(val);
			},
			timeStyle : function(obj, opt) {
				$("#" + obj).attr('alt','time');
				obj = $("#" + obj);
				var val = $(obj).val();
				if ($.isEmpty(val))
					return;
				val = $.removeFormatInfo(val);
				while (val.length < 6)
					val = val + "0";
				if (isNaN(val)) {
					$.showInfo(obj, jQuery.validator.messages.time);
					return;
				}
				val = $.getTimeStyle(val);
				if (!$.timeCheck(val, opt)) {
					$.showInfo(obj, jQuery.validator.messages.time);
					return;
				}
				$(obj).val(val);
			},
			maxLength : function(obj, opt) {
				obj = $("#" + obj);
				var val = $(obj).val();
				// 判断highCurrency、lowCurrency、dateStyle、timeStyle等属性是否存在
				if ($.isAttrExist(obj, "highCurrency")) {
					val = val.replace(/,/g, "");
					val = val.substring(0, val.length - 3);
				}
				if ($.isAttrExist(obj, "lowCurrency")) {
					val = val.replace(/,/g, "");
				}
				if ($.isAttrExist(obj, "dateStyle")) {
					val = val.replace(/\//g, "");
					val = val.replace(/-/g, "");
				}
				if ($.isAttrExist(obj, "timeStyle")) {
					val = val.replace(/:/g, "");
				}
				if ($.isAttrExist(obj, "is9Number")) {
					val = val.replace(/./g, "");
				}
				if ($.isAttrExist(obj, "isNumber")) {
					val = val.replace(/./g, "");
					val = val.replace(/-/g, "");
				}
				var re1 = /([^\x00-\xff]+)([\x00-\xff]+)/;
				var re2 = /([\x00-\xff]+)([^\x00-\xff]+)/;
				var firstChar = /[^\x00-\xff]/;
				var count = 0;
				if (firstChar.test(val.charAt(0))) {
					var tempVal = val;
					while (re1.test(tempVal)) {
						tempVal = tempVal.replace(re1, "$2");
						count++;
						while (re2.test(tempVal)) {
							tempVal = tempVal.replace(re2, "$1");
							count++;
						}
					}
				} else {
					var tmpVal = val;
					while (re2.test(tmpVal)) {
						tmpVal = tmpVal.replace(re2, "$1");
						count++;
						while (re1.test(tmpVal)) {
							tmpVal = tmpVal.replace(re1, "$2");
							count++;
						}

					}
				}

				val = val.replace(/[^\x00-\xff]/g, "aa"); // "aa"为占位符
				var len = val.length + 2
						* ((firstChar.test(val) && count == 0) ? 1 : count); // 如果是全部中文的情况
				if (len > opt) {
					$.showInfo(obj, jQuery.validator.messages.lenInfo);
					return;
				}
			},
			decimalLength : function(obj, opt) {
				// numberMask(obj,opt);
				var val = $.value(obj);
				obj = $("#" + obj);
				var re = /\d+./;
				val = val.replace(re, "a"); // "a"为占位符
				val = val.replace(/-/g, "");
				var len = val.length - 1;				
				if (len > opt) {
					// $.showInfo(obj, jQuery.validator.messages.deciInfo);
					return;
				}
			},
			isNumber : function(obj, opt) {
				// var alt = $("#" + obj).attr('alt');
				// if ($.isEmpty(alt))
					// $("#" +
					// obj).attr('alt','signedNumOnly');//如果是S型数据,则为控件加入掩码,只允许用户输入数字和负号
				obj = $("#" + obj);
				var val = $(obj).val();
				var tempVal = val.replace(/\//g, "");
				tempVal = tempVal.replace(/,/g, "");
				tempVal = tempVal.replace(/:/g, "");
				if (isNaN(tempVal)) {
					$.showInfo(obj, jQuery.validator.messages.number);
					return false;
				} else
					return true;
			},
			is9Number : function(obj, opt) {
				// var alt = $("#" + obj).attr('alt');
				// if ($.isEmpty(alt))
					// $("#" +
					// obj).attr('alt','numberOnly');//如果是9型数据,则为控件加入掩码,只允许用户输入数字
				obj = $("#" + obj);
				var val = $(obj).val();
				var tempVal = val.replace(/\//g, "");
				tempVal = tempVal.replace(/,/g, "");
				tempVal = tempVal.replace(/:/g, "");

				if (isNaN(tempVal) || tempVal.charAt(0) == "-") {
					$.showInfo(obj, jQuery.validator.messages.number9);
					return false;
				} else
					return true;

			},
			leftPadZero : function(obj, msg) {
				obj = $("#" + obj);
				var val = $(obj).val();
				val = $.getLeftPadZero(val);
				$(obj).val(val);
			},
			isEnStr : function(obj, msg) {
				obj = $("#" + obj);
				var val = $(obj).val();
				if ($.isEmpty(val))
					return;
				var re = /^[\x00-\xff]+$/;
				if (!re.test(val)) {
					$.showInfo(obj, jQuery.validator.messages.charInfo);
					return;
				}
			},
			isZhStr : function(obj, msg) {
				obj = $("#" + obj);
				var val = $(obj).val();
				if ($.isEmpty(val))
					return;
				var re = /^(([^\x00-\xFF])|(\s))+$/;
				if (!re.test(val)) {
					$.showInfo(obj, jQuery.validator.messages.zhStrInfo);
					return;
				}
			},
			showInfo : function(obj, msg) {
				var wgt = $(obj);
				if ($.isNotEmpty(wgt)) {
					var $errorTip = wgt.parent().find(".errorTip:first");
					if (!$.isEmptyObject($errorTip)) {
						$errorTip.html(msg).hide();
						
						if(msg.length == 1)// 必输提示改为固定底色提示,区别于浮动DIV的方式
						{						
							// wgt.parent().find(".reqdiv").remove();
							// var newDiv = $('<div class=\'reqdiv\'
							// style=\'display:inline;color:red;font-size:15px\'>'+msg+'</div>');
							// newDiv.appendTo(wgt.parent());
						// wgt.css("background-color","#c4e8fd");
						// if (wgt.is(":input"){
						// wgt.css("background","");
						// }
						// wgt.css("background-color","#eaf5f9");
						// wgt.css("border","1px solid #a1cae4");
						    wgt.css("background-color","#fff1d1");
						// wgt.css("border","1px solid #e97400");
						    wgt.css("height","20px");
						    wgt.css("line-height","20px");
						}
						else
						{
							$.destroyErrorTip(obj);
							$.setErrorTip(obj, msg);
							$.showErrorTip(obj);
						}
					}
				}
			},
			removeInfo : function(obj) {
				var $errorTip = $("#" + obj).parent().find(".errorTip:first");
				if (!$.isEmptyObject($errorTip)) {
					$errorTip.html("").hide();
					// $("#" + obj).parent().find(".reqdiv").remove();
					$.destroyErrorTip($("#" + obj));
				}
			},
			removeFormatInfo : function(val) {
				val = val.replace(/-/g, "");
				val = val.replace(/\//g, "");
				val = val.replace(/,/g, "");
				val = val.replace(/:/g, "");
				return val;
			},
			removeNumberInfo : function(val) {
				val = val.replace(/\//g, "");
				val = val.replace(/,/g, "");
				val = val.replace(/:/g, "");
				return val;
			},
			dateCheck : function(val, opt) {
				var condition = "";
				if ((opt == "1") || (opt == "2"))
					condition = (val.charAt(0) > 0)
							&& ((val.charAt(5) == 0 && val.charAt(6) > 0) || (val
									.charAt(5) == 1 && val.charAt(6) < 3))
							&& ((val.charAt(8) == 0 && val.charAt(9) > 0)
									|| ((val.charAt(8) == 1) || (val.charAt(8) == 2)) || (val
									.charAt(8) == 3 && val.charAt(9) < 2));
				if ((opt == "3") || (opt == "4"))

					condition = (val.charAt(6) > 0)
							&& ((val.charAt(3) == 0 && val.charAt(4) > 0) || (val
									.charAt(3) == 1 && val.charAt(4) < 3))
							&& ((val.charAt(0) == 0 && val.charAt(1) > 0)
									|| ((val.charAt(0) == 1) || (val.charAt(0) == 2)) || ((val
									.charAt(0) == 3) && (val.charAt(1) < 2)));
				if ((opt == "5") || (opt == "6"))
					condition = (val.charAt(4) > 0)
							&& ((val.charAt(0) == 0 && val.charAt(1) > 0) || (val
									.charAt(0) == 1 && val.charAt(1) < 3))
							&& ((val.charAt(3) == 0 && val.charAt(4) > 0)
									|| ((val.charAt(3) == 1) || (val.charAt(3) == 2)) || (val
									.charAt(3) == 3 && val.charAt(4) < 2));
				return condition;
			},
			timeCheck : function(val, opt) {
				var condition = ((val.charAt(0) < 2) || ((val.charAt(0) == 2) && (val
						.charAt(1) < 4)))
						&& (val.charAt(3) < 6) && (val.charAt(6) < 6);
				return condition;
			},
			isAttrExist : function(obj, opt) {
				var opts = $(obj).metadata( {
					type : "attr",
					name : "ext"
				});
				var r = false;
				$.each(opts, function(i, n) {
					if (i == opt) {
						r = true;
						return r;
					}
				});
				return r;
			},
			fTable : function(obj) {
				// var ths = $(obj).children().eq(0).children();
				var ths = $(obj).find("th");
				$.each(ths, function(i, n) {
					var fmtContent = $(n).metadata( {
						type : "attr",
						name : "ext"
					});
					$.each(fmtContent, function(k, j) { // 格式化每列的数据
								if ($.isFormatAttr(k)) {
									var trs = $(obj).children().eq(1)
											.children();
									var thName = $(n).attr("name");
									// alert("thName:"+thName);
							var columnIndex = $.getColIndex(ths, thName);
							$.formatTrs(trs, columnIndex, k, j);
						}
					});
				});
			},
			isFormatAttr : function(opt) {
				var tFlag = false;
				if (opt == "leftPadZero" || opt == "highCurrency"
						|| opt == "lowCurrency" || opt == "dateStyle"
						|| opt == "timeStyle")
					tFlag = true;
				return tFlag;
			},
			getColIndex : function(objs, opt) {
				for ( var i = 0; i < objs.length; i++) {
					var tmpName = $(objs[i]).attr("name");
					if (tmpName == opt)
						return i;
				}
			},
			formatTrs : function(trs, columnIndex, formatInfo, formatVal) {
				for ( var i = 1; i < trs.length; i++) {
					var tmpVal = $(trs[i]).children().eq(columnIndex).html();
					tmpVal = $.trim(tmpVal).replace("&nbsp;", "");
					// alert("tmp1:"+tmpVal);
			if (formatInfo == "highCurrency") {
				if ($.isEmpty(tmpVal))
					return;
				tmpVal = $.getHighCurrency(tmpVal);

			} else if (formatInfo == "lowCurrency") {
				if ($.isEmpty(tmpVal))
					return;
				tmpVal = $.getLowCurrency(tmpVal);

			} else if (formatInfo == "leftPadZero") {
				tmpVal = $.getLeftPadZero(tmpVal);
			} else if (formatInfo == "dateStyle") {
				if (isNaN(tmpVal) || (tmpVal.length != 8)) {
					return;
				}
				tmpVal = $.getDateStyle(tmpVal, formatVal);

			} else if (formatInfo == "timeStyle") {
				tmpVal = $.removeFormatInfo(tmpVal);
				while (tmpVal.length < 6)
					tmpVal = "0" + tmpVal;
				if (isNaN(tmpVal))
					return;
				tmpVal = $.getTimeStyle(tmpVal);

			}
			$(trs[i]).children().eq(columnIndex).html(tmpVal);
		}
	},
	getHighCurrency : function(val) {
		val = $.removeNumberInfo(val);
		//val = $.formatNumber(val,2)+"";
		if (val.indexOf(".") == -1) // 给整数后面加上.00，注意负号的情况
				val = val.replace(/^(-?\d*)$/, "$1.00");
			val = val.replace(".", ",");
			var re2 = /(-?\d)(\d{3},)/;
			while (re2.test(val))
				val = val.replace(re2, "$1,$2");
			val = val.replace(/,(\d+)$/, ".$1"); // 将最后一个","转化为"."
			return val;

		},
		getLowCurrency : function(val) {
			val = $.removeNumberInfo(val);
			val = val.replace(/^(-?\d*)$/, "$1.");
			val = val.replace(".", ",");
			var re2 = /(-?\d)(\d{3},)/;
			while (re2.test(val))
				val = val.replace(re2, "$1,$2");
			val = val.replace(/,$/, ""); // 去掉最后一个","
			return val;
		},
		getLeftPadZero : function(val) {
			var re = /^(0*)(\d)/; // 以000开头的数字
			if (re.test(val))
				val = val.replace(re, "$2");
			var re2 = /(-)(0+)(.*)/; // 以-000开头的数字，例如-000.123可能转化为-.123
			if (re2.test(val))
				val = val.replace(re2, "$1$3");
			var re3 = /^(-\.)(.*)/; // 以-.开头的数字，补0，例如-.123转化为-0.123
			if (re3.test(val))
				val = val.replace(re3, "-0.$2");
			return val;
		},
		getDateStyle : function(val, formatVal) {
			val = $.removeFormatInfo(val);
			var re = /^(\d{4})(\d{2})(\d{2})$/; // 格式化使用
			switch (formatVal) {
			default:
				val = val.replace(re, "$3/$2/$1");
			break;
			case 1:
				val = val.replace(re, "$1-$2-$3");
				break;
			case 2:
				val = val.replace(re, "$1/$2/$3");
				break;
			case 3:
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1-$2-$3");
				break;
			case 4:
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1/$2/$3");
				break;
			case 5:
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1-$2-$3");
				break;
			case 6:
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1/$2/$3");
				break;
			case "1":
				val = val.replace(re, "$1-$2-$3");
				break;
			case "2":
				val = val.replace(re, "$1/$2/$3");
				break;
			case "3":
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1-$2-$3");
				break;
			case "4":
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1/$2/$3");
				break;
			case "5":
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1-$2-$3");
				break;
			case "6":
				re = /^(\d{2})(\d{2})(\d{4})$/;
				val = val.replace(re, "$1/$2/$3");
				break;				
			}
			return val;
			// alert("formatVal:"+formatVal+"-tmpVal:"+tmpVal);
		},
		getTimeStyle : function(val) {
			val = $.removeFormatInfo(val);
			var re = /^(\d{2})(\d{2})(\d{2})$/; // 格式化使用
			val = val.replace(re, "$1:$2:$3");
			return val;
		},
		formatWidgets : function(wgts) {
			$.each(wgts, function(i, n) {
				var widgetName = $(n).attr("id");
				$.format(widgetName);
			});
		},
		ref : function(wgts){
			}
		});

// 反格式化
jQuery.extend( {
	unformat : function(widget) {
		var mydefaults = {
			required : "",
			isNumber : "",
			leftPadZero : "",
			highCurrency : "",
			lowCurrency : "",
			dateStyle : "",
			timeStyle : "",
			maxLength : "",
			decimalLength : "",
			isEnStr : "",
			isZhStr : ""
		};
		var temp = widget;
		if (temp.constructor != Array)
			temp = $.makeArray(widget);
		$.each(temp, function(i, n) {
			var wgt = $("#" + n);
			var fmtContent = $(wgt).metadata( {
				type : "attr",
				name : "ext"
			});
			var opts = $.extend(true, {}, mydefaults, fmtContent);
			$.unf(n, opts);
		});
	},
	unf : function(widgetId, opts) { // 反格式化的核心函数
		$.each(opts, function(i, n) {
			if (n != "") {
				try {
					eval("$.un" + (i + "('" + widgetId + "','" + n + "')"));
				} catch (e) {

				}
			}
		});
	},
	unhighCurrency : function(obj, opt) {
		obj = $("#" + obj);
		var val = $(obj).val();
		if (val.endWith("\\.00"))
			val = val.substring(0, val.length - 3);
		val = val.replace(/,/g, "");
		$(obj).val(val);
	},
	unlowCurrency : function(obj, opt) {
		obj = $("#" + obj);
		var val = $(obj).val();
		val = val.replace(/,/g, "");
		$(obj).val(val);
	},
	undateStyle : function(obj, opt) {
		obj = $("#" + obj);
		var val = $(obj).val();
		val = $.removeFormatInfo(val);
		switch (opt) {
		case "1":
			break;
		case "2":
			break;
		case "3":
			val = val.substring(4, 8) + val.substring(2,4)
					+ val.substring(0, 2);
			break;
		case "4":
			val = val.substring(4, 8) + val.substring(2,4)
					+ val.substring(0,2);
			break;
		case "5":
			val = val.substring(4, 8) + val.substring(0, 2)
					+ val.substring(2,4);
			break;
		case "6":
			val = val.substring(4, 8) + val.substring(0, 2)
					+ val.substring(2,4);
			break;
		default:
			
			break;
		}
		$(obj).val(val);
	},
	untimeStyle : function(obj, opt) {
		obj = $("#" + obj);
		var val = $(obj).val();
		val = $.removeFormatInfo(val);
		$(obj).val(val);
	},
	unrequired : function(obj, opt) {

	},
	unmaxLength : function(obj, opt) {

	},
	undecimalLength : function(obj, opt) {

	},
	unisNumber : function(obj, opt) {

	},
	unis9Number : function(obj, opt) {

	},
	unisEnStr : function(obj, opt) {

	},
	unisZhStr : function(obj, opt) {

	},
	unformatWidgets : function(wgts) {
		$.each(wgts, function(i, n) {
			var widgetName = $(n).attr("id");
			$.unformat(widgetName);
		});
	},
	setAlias : function(tableName, thName) {
		// 获取表格和表头对象
	var tableObj = $("#" + tableName);
	// 获取表格列索引
	var ths = $(tableObj).children().eq(0).children();
	var isIE=document.all ? true : false;
    if(isIE)
         ths = ths[0].cells;
	var columnIndex = $.getColIndex(ths, thName);
	var thObj = ths[columnIndex];
	var aliasContent = $(thObj).attr("alias"); 
	var jsonStr = $.String2Json(aliasContent);
	// 获取总行对象和别名内容
	var trs = $(tableObj).children().eq(1).children();
	// 依次处理每行数据
	for ( var i = 1; i < trs.length; i++) {
		var tmpVal = $(trs[i]).children().eq(columnIndex).html();
		var alias = $.getAliasByIndex(tmpVal, jsonStr);
		$(trs[i]).children().eq(columnIndex).html(alias);
	}
},
getAliasByIndex : function(tmpValue, aliasContent) {
	$.each(aliasContent, function(i, k) {
		if (tmpValue.replace("&nbsp;", "") == i) {
			tmpValue = $.trim(k);
		}
	});
	return tmpValue;
},
		unref : function(wgts){
			}
});

/** 日历控件* */
jQuery.extend( {

	initDateField : function(fieldName, dateStyle) {
		var dateFormatVal = 'yy-mm-dd';
		if (dateStyle == "2")
			dateFormatVal = 'yy/mm/dd';
		if (dateStyle == "3")
			dateFormatVal = 'dd-mm-yy';
		if (dateStyle == "4")
			dateFormatVal = 'dd/mm/yy';
		if (dateStyle == "5")
			dateFormatVal = 'mm-dd-yy';
		if (dateStyle == "6")
			dateFormatVal = 'mm/dd/yy';
		var obj = new Date();
		var date = obj.getDate();
		var month = obj.getMonth() + 1;
		var year = obj.getYear();
		if(!$.browser.msie)
			year += 1900;
		var acYear = parseInt(bdAcDate.substring(0,4));
		var acMonth = parseInt(bdAcDate.substring(4,6));
		if(acMonth==0)
			acMonth = parseInt(bdAcDate.substring(5,6));
		var acDate = parseInt(bdAcDate.substring(6,8));
		if(acDate==0)
			acDate = parseInt(bdAcDate.substring(7,8));
		var defaultDate = "";
		if(acYear >= year)
			defaultDate += "+" +(acYear - year)+"y ";
		else
			defaultDate += "-" +(year - acYear)+"y ";
		if(acMonth >= month)
			defaultDate += "+" +(acMonth - month)+"m ";
		else
			defaultDate += "-" +(month - acMonth)+"m ";
		if(acDate >= date)
			defaultDate += "+" +(acDate - date)+"d";
		else
			defaultDate += "-" +(date - acDate)+"d";
		
		$("#" + fieldName).datepicker( {
			changeMonth : true,
			changeYear : true,
			dateFormat : dateFormatVal,
			autoSize : true,
			showOtherMonths : true,
			selectOtherMonths : true,
			showOn : 'button',
			defaultDate : defaultDate,
			onSelect: function(){
				$.removeInfo(fieldName);
				reFocusWhenClick(fieldName);
			}
		});
	}
});

/** 外设接口* */
jQuery.extend({
	
	/**
	 * 读取磁条
	 */
	readFromMsr : function(){
	    var msrParams = "";
	    var deviceType = "MSR";

	    msrParams = deviceType + "|00";
	    var result = feDeviceInput(msrParams);

	    if (result.indexOf('|') > 0)
		    return result.split('|')[0];
	    else
		    return result;	
	},
	
	/**
	 * 读取密码键盘
	 */
    readFromPinPad : function(obj){

		var pinpadParams = "";
		var deviceType = "PINPAD";
		maxLen = $(obj).attr("maxLength");
		var inputTimes = "0"; // 0代表首次输入，1代表再次输入
		var pinpadParams = deviceType + "|" + inputTimes + maxLen;

		var password = feDeviceInput(pinpadParams);

		if ($(obj).attr("deviceInputTwice") == "true" && password != "") {
			inputTimes = "1";
			pinpadParams = deviceType + "|" + inputTimes + maxLen;
			var againInput = feDeviceInput(pinpadParams);
			if (password == againInput)
				return password;
			else {
				alert("两次输入的密码不一致!");
				return "";
			}
		}

	    return password;
	},
	
	/**
	 * 加密处理
	 */
	encrypt : function(str){

		var deviceType = "ENY";
		var params = deviceType + "|" + str;

		var result = feDeviceInput(params);

	    return result;
	}
	
});

function initHotKey(e) {
	var e = e ? e : window.event;
	var key = '';
	if (e.which)
		key = e.which;
	if (e.keyCode)
		key = e.keyCode;
	if ((key == 113) && ($(":submit").length > 0)) {
		$("form").submit();
	}
	if (key==116){            
		e.keyCode = 0;            
		e.returnValue =false;            
		e.cancelBubble =true; 
		window.location.reload();
		return false;      
	}
}


jQuery.extend( {

	showTipOnFocus : function(fieldName) {
		$('#'+fieldName).poshytip({
		className: 'tip-yellowsimple',
		showOn: 'focus',
		alignTo: 'target',
		alignX: 'inner-left',
		offsetX: 0,
		offsetY: 5
		});
	},
	setErrorTip:function(field,msg){
		$(field).poshytip({
		className: 'tip-yellowsimple',
		content: msg,
		showOn: 'none',
		alignTo: 'target',
		alignX: 'right',
		alignY: 'center',
		offsetX: $(field).attr('class')=='combobox'?23:2,
		offsetY: 5,
		hideAniDuration:0
		});
	},
	showErrorTip:function(field){
		if($(field).offset().top <= 0)// 隐藏的元素top 为负数或0，只有不隐藏的元素才有必要显示提示信息
			return;
		$(field).poshytip('show'); 
	},
	hideErrorTip:function(field){
		$(field).poshytip('hide'); 
	},
	destroyErrorTip:function(field){
		$(field).poshytip('destroy');
	}
});

jQuery.extend({
	confirms : function( msg,func) {	
	    Ext.Msg.confirm('',msg,function(btn1){
	    	if(btn1=='yes'){
	    		$(func);
	    	}
	    });
    }
});

/**
 * 密码控件双敲
 */
jQuery.extend( {
	InputTwice : function(obj) {
		var flg = "1";
		var psw1 = "";
		$("#" + obj).focus(function() {
			$("#" + obj).keyup(function() {
				if (flg == "1") {
					psw1 = $("#" + obj).val();
					if (psw1.length == 6) {
						alert("请再次输入！");
						$.clear(obj);
						flg = "2";
					}
				}
			});
		});
		$("#" + obj).keyup(function() {
			if (flg == "2") {
				var psw2 = $("#" + obj).val();
				if (psw2.length == 6) {
					if (psw1 != psw2) {
						alert("两次输入的密码不一致！");
						$.clear(obj);
					}
				}
			}
		});
		$("#" + obj).blur(function() {
			flg = "1";
		});
	}
});
/**
 * 错误域高亮显示、聚焦
 */
function jumpToField(obj) {
		$("#" + obj).focus();
		$("#" + obj).css("borderColor","#8C8C8C");
		$("#" + obj).css("border-width","3px");
		setTimeout(function(){$("#" + obj).css("borderColor","#ff0000");$("#" + obj).css("border-width","2px");},500);
}
/**
 * 提升用户体验的sAlert()
 */
function sAlert(str,obj){
	var isIe=(document.all)?true:false;
	if(typeof(eval("document.all.bgDiv"))== "undefined"){
		var msgw,msgh,bordercolor;
		msgw=400;// 提示窗口的宽度
		msgh=100;// 提示窗口的高度
		bordercolor="#336699";// 提示窗口的边框颜色
		titlecolor="#99CCFF";// 提示窗口的标题颜色
		
		var sWidth,sHeight;
		sWidth=document.body.offsetWidth;
		sHeight=document.body.offsetHeight;
		
		
		var bgObj=document.createElement("div");
		bgObj.setAttribute('id','bgDiv');
		bgObj.style.position="absolute";
		bgObj.style.top="0";
		bgObj.style.background="#666";
		bgObj.style.filter=(isIe)?"alpha(opacity=0);":"opacity:0;";
		bgObj.style.opacity="0.0";
		bgObj.style.left="0";
		bgObj.style.width=sWidth + "px";
		bgObj.style.height=sHeight + "px";
		document.body.appendChild(bgObj);
		showBackground(bgObj,50);
		var msgObj=document.createElement("div")
		msgObj.setAttribute("id","salert_msgDiv");
		msgObj.setAttribute("align","center");
		msgObj.style.position="absolute";
		msgObj.style.background="white";
		msgObj.style.filter=(isIe)?"alpha(opacity=90);":"opacity:0.9;";
		msgObj.style.opacity="0.9";
		msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
		msgObj.style.border="1px solid " + bordercolor;
		msgObj.style.width=msgw + "px";
		msgObj.style.height=msgh + "px";
		msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/2) + "px";
		msgObj.style.left=(sWidth-msgw)/2 + "px";
		var title=document.createElement("h4");
		title.setAttribute("id","msgTitle");
		title.setAttribute("align","right");
		title.style.margin="0";
		title.style.padding="3px";
		title.style.background=bordercolor;
		title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
		title.style.opacity="0.75";
		title.style.border="1px solid " + bordercolor;
		title.style.height="18px";
		title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
		title.style.color="white";
		title.style.cursor="pointer";
		title.innerHTML=jQuery.validator.messages.titleCose;
		title.onclick=function(){	
		    document.body.removeChild(bgObj);
		    document.getElementById("salert_msgDiv").removeChild(title);
		    document.body.removeChild(msgObj);
			if(obj!=null && typeof(eval(obj))!= "undefined"){
				obj.focus();
			}
		}
		document.body.appendChild(msgObj);
		document.getElementById("salert_msgDiv").appendChild(title);
		var txt=document.createElement("p");
		txt.style.margin="1em 0"
		txt.setAttribute("id","msgTxt");
		txt.innerHTML="<img src='comm/images/j_t08.jpg' style='margin-right:15px' style='margin-left:20px;'/>"+str;
		document.getElementById("salert_msgDiv").appendChild(txt);
		document.getElementById('salert_msgDiv').focus();
		msgObj.onkeypress = function(){
		  	if(typeof(eval("document.all.bgDiv"))!= "undefined"){
				if(event.keyCode == 13){
					document.body.removeChild(bgObj);
					document.getElementById("salert_msgDiv").removeChild(title);
					document.body.removeChild(msgObj);
					if(obj!=null && typeof(eval(obj))!= "undefined"){
						obj.focus();
					}
				}else{
					return;
				}
			}else{
				return;
			}
		}
		function showBackground(showobj,endInt){
			if(isIe){
				showobj.filters.alpha.opacity+=2;
				if(showobj.filters.alpha.opacity<endInt){
					setTimeout(function(){showBackground(showobj,endInt)},5);
				}else{		
					setTimeout(function(){if(typeof(eval("document.all.bgDiv"))!= "undefined"){removeBackground(bgObj,0);if(obj!=null && typeof(eval(obj))!= "undefined"){obj.focus();}}else{return false;}},2000);
				}
			}else{
				var al=parseFloat(showobj.style.opacity);al+=0.01;
				showobj.style.opacity=al;
				if(al<(endInt/100)){
					setTimeout(function(){showBackground(showobj,endInt)},5);
				}else{
					setTimeout(function(){if(typeof(eval("document.all.bgDiv"))!= "undefined"){removeBackground(bgObj,0);if(obj!=null && typeof(eval(obj))!= "undefined"){obj.focus();}}else{return false;}},2000);
				}
			}
		}
		function removeBackground(removeobj,endInt){
			if(isIe){
				removeobj.filters.alpha.opacity-=2;
				if(removeobj.filters.alpha.opacity>endInt){
					setTimeout(function(){removeBackground(removeobj,endInt)},5);
				}else{
					document.body.removeChild(bgObj);
					document.getElementById("salert_msgDiv").removeChild(title);
					document.body.removeChild(msgObj);
				}
			}else{
				var al=parseFloat(removeobj.style.opacity);al-=0.01;
				removeobj.style.opacity=al;
				if(al>(endInt/100)){
					setTimeout(function(){removeBackground(removeobj,endInt)},5);
				}else{
					document.body.removeChild(bgObj);
					document.getElementById("salert_msgDiv").removeChild(title);
					document.body.removeChild(msgObj);
				}
			}
		}
	}
}
function bAlert(str){
	var isIe=(document.all)?true:false;
	if(typeof(eval("document.all.balert_msgDiv"))== "undefined"){
		var msgw,msgh,bordercolor;
		msgw=200;// 提示窗口的宽度
		msgh=50;// 提示窗口的高度
		var sWidth,sHeight;
		sWidth=document.body.offsetWidth;
		sHeight=document.body.offsetHeight;
		
		var msgObj=document.createElement("div")
		msgObj.setAttribute("id","balert_msgDiv");
		msgObj.setAttribute("align","center");
		msgObj.style.position="absolute";
		msgObj.style.color="white";
		msgObj.style.background="#000000";
		msgObj.style.filter=(isIe)?"alpha(opacity=0);":"opacity:0;";
		msgObj.style.opacity="0.0";
		msgObj.style.font="bold 15px Arial";
		msgObj.style.width=msgw + "px";
		// msgObj.style.height=msgh + "px";
		msgObj.style.padding = "10px";
		msgObj.style.top=(document.documentElement.scrollTop + (sHeight-msgh)/3) + "px";
		msgObj.style.left=(sWidth-msgw)/2 + "px";
		document.body.appendChild(msgObj);
		$("#balert_msgDiv").corner("10px");
		showBackground(msgObj,70);
		var txt=document.createElement("p");
		// txt.style.margin="5px 1px";
		txt.setAttribute("id","msgTxt");
		txt.innerHTML=str;
		document.getElementById("balert_msgDiv").appendChild(txt);
		function showBackground(showobj,endInt){
			if(isIe){
				showobj.filters.alpha.opacity+=1;
				if(showobj.filters.alpha.opacity<endInt){
					setTimeout(function(){showBackground(showobj,endInt)},5);
				}else{		
					setTimeout(function(){if(typeof(eval("document.all.balert_msgDiv"))!= "undefined"){removeBackground(showobj,0);}},1200);
				}
			}else{
				var al=parseFloat(showobj.style.opacity);al+=0.01;
				showobj.style.opacity=al;
				if(al<(endInt/100)){
					setTimeout(function(){showBackground(showobj,endInt)},5);
				}else{
					setTimeout(function(){if(typeof(eval("document.all.balert_msgDiv"))!= "undefined"){removeBackground(showobj,0);}},1200);
				}
			}
		}
		function removeBackground(removeobj,endInt){
			if(isIe){
				removeobj.filters.alpha.opacity-=1;
				if(removeobj.filters.alpha.opacity>endInt){
					setTimeout(function(){removeBackground(removeobj,endInt)},5);
				}else{
					document.body.removeChild(msgObj);
				}
			}else{
				var al=parseFloat(removeobj.style.opacity);al-=0.01;
				removeobj.style.opacity=al;
				if(al>(endInt/100)){
					setTimeout(function(){removeBackground(removeobj,endInt)},5);
				}else{
					document.body.removeChild(msgObj);
				}
			}
		}
	}
}

function ResizeImages(obj){
	var imgobj = $(obj);
	var oldwidth,oldheight,newwidth,newheight;
	var divobj = imgobj.parent();
	var tmpimg = new Image(); 
	tmpimg.src = $(obj).attr("src");
	if($(obj).attr("src") != "comm/images/default_img.jpg"){
		var maxwidth=divobj.width()=="" ? tmpimg.width : divobj.width();
		var maxheight=divobj.height()=="" ? tmpimg.height : divobj.height();
		if(tmpimg.width >= maxwidth || tmpimg.height >= maxheight){
			oldwidth = tmpimg.width;
			oldheight = tmpimg.height;
			newwidth = maxheight * (oldwidth/oldheight);
			newheight = maxwidth * (oldheight/oldwidth); 
			if(newwidth <= maxwidth){
				imgobj.css({width:""+ newwidth +"px", height:""+ maxheight +"px"});
				imgobj.css({top:""+ (((divobj.height()-maxheight)/2)) +"px"});
			}
			if(newheight <= maxheight){
				imgobj.css({width:""+ maxwidth +"px", height:""+ newheight +"px"});
				imgobj.css({top:""+ (((divobj.height()-newheight)/2)) +"px"});
			}	
		}else{
			imgobj.css({width:""+ tmpimg.width +"px", height:""+ tmpimg.height +"px"});		
			imgobj.css({top:""+ (((divobj.height()-tmpimg.height)/2)) +"px"});
		}
	}else{
		imgobj.css({width:""+ divobj.width() +"px", height:""+ divobj.height() +"px"});	
		imgobj.css({top:""+ 0 +"px"});
	}
}
