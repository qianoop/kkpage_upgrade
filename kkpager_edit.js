﻿/*
 kkpager upgrade
 Reference to https://github.com/pgkk/kkpager
 new https://github.com/qianoop/kkpage_upgrade.git
 Copyright (c) 2016 qian.lei.2010@gmail.com
 Licensed under the GNU GENERAL PUBLIC LICENSE
 */
(function ($) {
	var opts={};
	$.fn.extend({
		"generPageHtml":function(options,enforceInit){
			opts = $.extend({}, defaluts, options);
			opts  = _init(opts);
			var str_first='',str_prv='',str_next='',str_last='';
			if(opts.isShowFirstPageBtn){
				if(opts.hasPrv){
					str_first = '<a '+_getHandlerStr(1)+' title="'
							+(opts.lang.firstPageTipText || opts.lang.firstPageText)+'">'+opts.lang.firstPageText+'</a>';
				}else{
					str_first = '<span class="disabled">'+opts.lang.firstPageText+'</span>';
				}
			}
			if(opts.isShowPrePageBtn){
				if(opts.hasPrv){
					str_prv = '<a '+_getHandlerStr(opts.prv)+' title="'
							+(opts.lang.prePageTipText || opts.lang.prePageText)+'">'+opts.lang.prePageText+'</a>';
				}else{
					str_prv = '<span class="disabled">'+opts.lang.prePageText+'</span>';
				}
			}
			if(opts.isShowNextPageBtn){
				if(opts.hasNext){
					str_next = '<a '+_getHandlerStr(opts.next)+' title="'
							+(opts.lang.nextPageTipText || opts.lang.nextPageText)+'">'+opts.lang.nextPageText+'</a>';
				}else{
					str_next = '<span class="disabled">'+opts.lang.nextPageText+'</span>';
				}
			}
			if(opts.isShowLastPageBtn){
				if(opts.hasNext){
					str_last = '<a '+_getHandlerStr(opts.total)+' title="'
							+(opts.lang.lastPageTipText || opts.lang.lastPageText)+'">'+opts.lang.lastPageText+'</a>';
				}else{
					str_last = '<span class="disabled">'+opts.lang.lastPageText+'</span>';
				}
			}
			var str = '';
			var dot = '<span class="spanDot">...</span>';
			var total_info='<span class="totalText">';
			var total_info_splitstr = '<span class="totalInfoSplitStr">'+opts.lang.totalInfoSplitStr+'</span>';
			if(opts.isShowCurrPage){
				total_info += opts.lang.currPageBeforeText + '<span class="currPageNum">' + opts.pno + '</span>' + opts.lang.currPageAfterText;
				if(opts.isShowTotalPage){
					total_info += total_info_splitstr;
					total_info += opts.lang.totalPageBeforeText + '<span class="totalPageNum">'+opts.total + '</span>' + opts.lang.totalPageAfterText;
				}else if(opts.isShowTotalRecords){
					total_info += total_info_splitstr;
					total_info += opts.lang.totalRecordsBeforeText + '<span class="totalRecordNum">'+opts.totalRecords + '</span>' + opts.lang.totalRecordsAfterText;
				}
			}else if(opts.isShowTotalPage){
				total_info += opts.lang.totalPageBeforeText + '<span class="totalPageNum">'+opts.total + '</span>' + opts.lang.totalPageAfterText;;
				if(opts.isShowTotalRecords){
					total_info += total_info_splitstr;
					total_info += opts.lang.totalRecordsBeforeText + '<span class="totalRecordNum">'+opts.totalRecords + '</span>' + opts.lang.totalRecordsAfterText;
				}
			}else if(opts.isShowTotalRecords){
				total_info += opts.lang.totalRecordsBeforeText + '<span class="totalRecordNum">'+opts.totalRecords + '</span>' + opts.lang.totalRecordsAfterText;
			}
			total_info += '</span>';

			var gopage_info = '';
			if(opts.isGoPage){
				gopage_info = '<span class="goPageBox">'+opts.lang.gopageBeforeText+'<span id="'+opts.gopageWrapId+'">'+
						'<input type="button" id="'+opts.gopageButtonId+'" onclick="window.kkpager.gopage(this,'+opts.click+')" class="topage" value="'
						+opts.lang.gopageButtonOkText+'" />'+
						'<input type="text" id="'+opts.gopageTextboxId+'" onfocus="window.kkpager.focus_gopage(this)" onblur="window.kkpager.blur_gopage(this)" value="'+opts.next+'" /></span>'+opts.lang.gopageAfterText+'</span>';
			}

			//分页处理
			if(opts.total <= 8){
				for(var i=1;i<=opts.total;i++){
					if(opts.pno == i){
						str += '<span class="curr">'+i+'</span>';
					}else{
						str += '<a '+_getHandlerStr(i)+' title="'
								+opts.lang.buttonTipBeforeText + i + opts.lang.buttonTipAfterText+'">'+i+'</a>';
					}
				}
			}else{
				if(opts.pno <= 5){
					for(var i=1;i<=7;i++){
						if(opts.pno == i){
							str += '<span class="curr">'+i+'</span>';
						}else{
							str += '<a '+_getHandlerStr(i)+' title="'+
									opts.lang.buttonTipBeforeText + i + opts.lang.buttonTipAfterText+'">'+i+'</a>';
						}
					}
					str += dot;
				}else{
					str += '<a '+_getHandlerStr(1)+' title="'
							+opts.lang.buttonTipBeforeText + '1' + opts.lang.buttonTipAfterText+'">1</a>';
					str += '<a '+_getHandlerStr(2)+' title="'
							+opts.lang.buttonTipBeforeText + '2' + opts.lang.buttonTipAfterText +'">2</a>';
					str += dot;

					var begin = opts.pno - 2;
					var end = opts.pno + 2;
					if(end > opts.total){
						end = opts.total;
						begin = end - 4;
						if(opts.pno - begin < 2){
							begin = begin-1;
						}
					}else if(end + 1 == opts.total){
						end = opts.total;
					}
					for(var i=begin;i<=end;i++){
						if(opts.pno == i){
							str += '<span class="curr">'+i+'</span>';
						}else{
							str += '<a '+_getHandlerStr(i)+' title="'
									+opts.lang.buttonTipBeforeText + i + opts.lang.buttonTipAfterText+'">'+i+'</a>';
						}
					}
					if(end != opts.total){
						str += dot;
					}
				}
			}
			var pagerHtml = '<div>';
			if(opts.isWrapedPageBtns){
				pagerHtml += '<span class="pageBtnWrap">' + str_first + str_prv + str + str_next + str_last + '</span>'
			}else{
				pagerHtml += str_first + str_prv + str + str_next + str_last;
			}
			if(opts.isWrapedInfoTextAndGoPageBtn){
				pagerHtml += '<span class="infoTextAndGoPageBtnWrap">' + total_info + gopage_info + '</span>';
			}else{
				pagerHtml += total_info + gopage_info;
			}
			pagerHtml += '</div><div style="clear:both;"></div>';
			this.html(pagerHtml);
		}
	});
	function  _init(opts){
		if(opts.pno < 1) opts.pno = 1;
		opts.total = (opts.total <= 1) ? 1: opts.total;
		if(opts.pno > opts.total) opts.pno = opts.total;
		opts.prv = (opts.pno<=2) ? 1 : (opts.pno-1);
		opts.next = (opts.pno >= opts.total-1) ? opts.total : (opts.pno + 1);
		opts.hasPrv = (opts.pno > 1);
		opts.hasNext = (opts.pno < opts.total);
		return opts;
	}


	function  _getHandlerStr(n){
			if(opts.mode == 'click'){
				return 'href="'+_getHref(n)+'" onclick="return window.kkpager.clickHandler('+n+','+opts.click+')"';
			}
			//link模式，也是默认的
			return 'href="'+_getLink(n)+'"';
	}

	function _getHref(n){
		//默认返回'#'
		return '#';
	}

	function  _getLink(n){
		if(n == 1){
			return opts.hrefFormer + opts.hrefLatter;
		}
		return opts.hrefFormer + '_' + n + opts.hrefLatter;
	}

	function clickHandler(n,obj){
		 obj(n);
	}

	function pages(){
       return{
		   clickHandler:clickHandler,
		   focus_gopage:focus_gopage,
		   blur_gopage:blur_gopage,
		   gopage:gopage
	   }
	}

	function  focus_gopage(obj){
       var btnGo  = $(obj).parent().find('.topage');
		$(this).attr('hideFocus',true);
		btnGo.show();
		btnGo.css('left','10px');
		$(this).addClass('focus');
		btnGo.animate({left: '+=30'}, 50);
	}


	function  blur_gopage(obj){
		setTimeout(function(){
			var btnGo = $(obj).parent().find('.topage');
			btnGo.animate({
				left: '-=25'
			}, 100, function(){
				btnGo.hide();
				$(this).removeClass('focus');
			});
		},400);
	}

	function  gopage(obj,fn){
		var str_page =$(obj).parent().find("input[type='text']").val();
		var n = parseInt(str_page);
		if(n < 1) n = 1;
		fn(n);
	}
	//默认参数
	var defaluts ={
		pagerid 			: 'kkpager', //divID
		mode				: 'link', //模式(link 或者 click)
		pno					: 1, //当前页码
		total				: 1, //总页码
		totalRecords		: 0, //总数据条数
		isShowFirstPageBtn	: true, //是否显示首页按钮
		isShowLastPageBtn	: true, //是否显示尾页按钮
		isShowPrePageBtn	: true, //是否显示上一页按钮
		isShowNextPageBtn	: true, //是否显示下一页按钮
		isShowTotalPage 	: true, //是否显示总页数
		isShowCurrPage		: true,//是否显示当前页
		isShowTotalRecords 	: false, //是否显示总记录数
		isGoPage 			: true,	//是否显示页码跳转输入框
		isWrapedPageBtns	: true,	//是否用span包裹住页码按钮
		isWrapedInfoTextAndGoPageBtn : true, //是否用span包裹住分页信息和跳转按钮
		hrefFormer			: '', //链接前部
		hrefLatter			: '', //链接尾部
		gopageWrapId		: 'kkpager_gopage_wrap',
		gopageButtonId		: 'kkpager_btn_go',
		gopageTextboxId		: 'kkpager_btn_go_input',
		lang				: {
			firstPageText: '首页',
			firstPageTipText: '首页',
			lastPageText: '尾页',
			lastPageTipText: '尾页',
			prePageText: '上一页',
			prePageTipText: '上一页',
			nextPageText: '下一页',
			nextPageTipText: '下一页',
			totalPageBeforeText: '共',
			totalPageAfterText: '页',
			currPageBeforeText: '当前第',
			currPageAfterText: '页',
			totalInfoSplitStr: '/',
			totalRecordsBeforeText: '共',
			totalRecordsAfterText: '条数据',
			gopageBeforeText: '&nbsp;转到',
			gopageButtonOkText: '确定',
			gopageAfterText: '页',
			buttonTipBeforeText: '第',
			buttonTipAfterText: '页'
		}
	};

	window.kkpager = pages();

})(window.jQuery);


