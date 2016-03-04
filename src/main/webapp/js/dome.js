var isAgree=false;
var cateGory=1;
var htmlArray=new Array("","","","");
var isMobile=false;
$(function(){
		var winW=$(window).width();
		var winH=$(window).height();
		var index=0;
		var datas=[
		{"pic":['head_pic.jpg','head_pic.jpg','head_pic.jpg'],"title":['多乐士专业3000内墙漆体系1','多乐士专业3000内墙漆体系2','多乐士专业3000内墙漆体系3']},
		{"pic":['head_pic.jpg','head_pic.jpg','head_pic.jpg'],"title":['多乐士专业3000内墙漆体系4','多乐士专业3000内墙漆体系5','多乐士专业3000内墙漆体系6']},
		{"pic":[],"title":[]},
		{"pic":['head_pic.jpg','head_pic.jpg','head_pic.jpg'],"title":['多乐士专业3000内墙漆体系7','多乐士专业3000内墙漆体系8','多乐士专业3000内墙漆体系9']}
		];
	
	(function (a,b){
			$(window).resize(function(a,b){
				if(winW>640){
					$(".guideP").css({"max-width":winH*0.65}) 
				}else{
					$(".guideP").css({"max-width":"100%"})
				}
			})
		})(winH,winW);
		//导航页函数
		(function (a){
			//图片动画
			function move(element1,element2,num){
				$(element1).animate({"top":num,"opacity":1},800,function(){
						$(element2).css({"-webkit-transform":"scale(1,1)"});
					})	
				}	
				move(".gP_jq",".jqTxt","20%");
				move(".gP_sc",".scTxt","43.5%");
				move(".gP_yy",".yyTxt","68%");
				move(".gP_xm",".xmTxt","91.5%")
			var sH=$(".guideP span").height();
			$(".guideP span").css({"lineHeight":sH+"px"})//设置按钮内文字行高
			btnEffect(".centerBtn");
		})(btnEffect());
		//个人资料页
		(function(a){
			var winH=$(window).height();
			var winW=$(window).width();
			var $headImg=$(".data_head .headImg");
			$(".persData").css({"height":winH})
			BlurAndFocus(".write_na");
			BlurAndFocus(".write_ph",/^1[3-8]+\d{9}$/);//验证电话号码
			BlurAndFocus(".write_gs");
			BlurAndFocus(".write_ps");
			BlurAndFocus(".write_add");
		})(BlurAndFocus());
		//活动详情页
		(function active(){
			var winH=$(window).height();
			$(".activeDetails .act_Info span").css({"line-height":winH*0.15*0.5+"px"})//设置活动信息文字行高
			var H=$(".activeDetails .txt .txt_product").height();
			$(".activeDetails .txt").css({"height":H+50+"px"})//设置详细内容的高度
			btnEffect("signUp");
		})();
		//分类页
		(function(a,b){
			var color=["#21b180","#51f8ea","#72bce1","#f8b551"];
			$($(".recentAct ul.table li")[index]).css({"color":color[0]})
			$(".recentAct ul.table li").click(function(){
				
				 index=$(this).index();
				 if(cateGory==index){
					 return;
				 }else{
					 cateGory=index;
				 }
					if(cateGory==3){
						$(".rem_Viewdeta").html("<a href='huiyuan.html'>我的管理</a>");
						$(".recentAct .course .ybm").show();
					}else{
						$(".rem_Viewdeta").html("<a href='actDetails.html'>查看详情</a>");
						$(".recentAct .course .ybm").hide();
					}
				 $(this).addClass("activate").siblings().removeClass("activate");
				 $(".context").html("");//清空
				 changeContextGetInfo();
				$(this).css({"color":color[index]}).siblings().css("color","#b7b7b7");
				$(".remind .rem_txt").css({"color":color[index]});
				$(".remind .iconfont").css({"border":"1px solid "+color[index],"color":color[index]});
				$(".recentAct .cour_info font").css({"color":color[index]});
				$(".recentAct .course").css({"box-shadow":"0 2px 2px"+color[index]});
			})
			foundDom();//初始化
			//创建Dom函数
			function foundDom(){
				var arr1=[],arr2=[];
				if(index==2){
					for(var j=0;j<3;j++){
						arr1.push([
						"<div class='course colorServe'>",
							"<div class='top'>",
								"<p class='type'>内墙</p>",
								"<span>预约成功</span>",
							"</div>",
							"<ul class='small_info'>",
								"<li>项&nbsp &nbsp目&nbsp &nbsp地&nbsp  址<font>|</font><span>海淀区中关村创业大街昊海楼9楼</span></li>",
								"<li>项&nbsp &nbsp目&nbsp &nbsp面&nbsp  积<font>|</font><span>213平方</span></li>",
								"<li>项&nbsp &nbsp目&nbsp &nbsp类&nbsp  型<font>|</font><span>多层住宅</span></li>",
								"<li>色彩服务类别<font>|</font><span>内墙</span></li>",
								"<li>选用产品意向<font>|</font><span>内墙涂料</span></li>",
								"<li>项目交付时间<font>|</font><span>2015-10-9</span></li>",
							"</ul>",
							"<div class='colorS_hi'>",
								"<ul class='small_info'>",
								"<li>姓名&nbsp &nbsp&nbsp <font>|</font><span>丽莎</span></li>",
								"<li>手机&nbsp &nbsp&nbsp <font>|</font><span>18523453921</span></li>",
								"<li>职务&nbsp &nbsp&nbsp <font>|</font><span>设计师</span></li>",
								"<li>公司&nbsp &nbsp&nbsp <font>|</font><span>上海设计公司</span></li>",
								"</ul>",
							"</div>",
							"<div class='jiantou jiantou_xia'></div>",
						"</div>"].join(''));	
					}
					for(var h=0;h<3;h++){$(".context").append(arr1[h])}
				}else{
						for(var i=0;i<datas[index].pic.length;i++){
							arr1.push([
						"<div class='course'>",
							"<img src='img/"+datas[index].pic[i]+"'/>",
							"<span class='ybm'>已报名</span>",
							"<div class='cour_info'>",
								"<h3>培训课程</h3>",
								"<p class='cour_title'>"+datas[index].title[i]+"</p>",
								"<p class='cour_time'><font class='iconfont'>&#xe67c;</font>2015-10-15</p>",
								"<p class='cour_addr'><font class='iconfont'>&#xe631;</font>海淀区中关村创业大街昊海楼9楼</p>",
								"<div class='rem_Viewdeta btn'><a href='actDetails.html'>查看详情</a></div>",
							"</div>",
						"</div>"].join(''));
						}
					for(var h=0;h<arr1.length;h++){$(".context").append(arr1[h])}
				}
				if(index==3){
					$("rem_Viewdeta").html("<a href='huiyuan.html'>我的管理</a>");
					$(".recentAct .course .ybm").show()
				}else{
					$("rem_Viewdeta").html("<a href='actDetails.html'>查看详情</a>");
					$(".recentAct .course .ybm").hide()	
				}
				//回顶部
				scroll();
				var mark=0;
				$(".jiantou").click(function(){
						if(mark==0){
							$(this).parent().find(".colorS_hi").slideDown(500)
						//$(".colorS_hi").slideDown(500)
						$(this).removeClass("jiantou_xia")
						$(this).addClass("jiantou_shang")
						mark++;
					}else{
					$(".colorS_hi").slideUp(500)
						mark=0;	
						$(this).removeClass("jiantou_shang")
						$(this).addClass("jiantou_xia")						
					}
				})
			}
				//加载新页面
		/*$( window ).on( "load", function(){
				console.log(checkscrollside());
			$(window).scroll(function(){
				if(checkscrollside()==true){
					//	foundDom()
				}
			})
			
		})*/
		})(datas,scroll());
		//注册绑定页
		(function(){
			var mark=0;//
			$(".login .agree").click(function(){
				if(mark==0){
					$(this).find(".size").html("&#xe62f;");
					isAgree=true;
					mark++;
				}else{
					$(this).find(".size").html("&#xe703;");
					isAgree=false;
					mark=0;
				}
			})
			BlurAndFocus(".yourName")
			BlurAndFocus(".yourPhone",/^1[3-8]+\d{9}$/)
			BlurAndFocus(".idenCode")
		})()
		
	});
	//点击按钮效果
	function btnEffect(element){
		$(element).click(function(){
			$(this).css({"box-shadow":"1px 1px 5px rgba(0,0,0,0.4) inset","border":"1px solid #ddd","color":"#ddd"});
			$(this).find("a").css({"color":"#ddd"});
			setTimeout(function(){
				$(element).css({"box-shadow":"1px  1px 5px rgba(0,0,0,0.4)","border":"1px solid #8c9292","color":"#000"})
				$(element).find("a").css({"color":"#000"})
			},100)
		})
		//tuch(element)
	}
	//触摸--解决按钮长期按下效果
	function tuch(element){
			"use strict";
			$(element).on("touchstart",function(event){
				event.preventDefault();
				$(this).css({"box-shadow":"1px 1px 5px rgba(0,0,0,0.4) inset","border":"1px solid #ddd","color":"#ddd"});
				$(this).find("a").css({"color":"#ddd"});
			});
			$(element).on("touchend",function(event){
				event.preventDefault();
				$(this).css({"box-shadow":"1px  1px 5px rgba(0,0,0,0.4)","border":"1px solid #8c9292","color":"#000"})
				$(this).find("a").css({"color":"#000"})
			})
		}
		//个人资料页的li触摸变背景色
		function touch(){
			"use strict";
			$(".persData .Info li").on("touchstart",function(event){
				event.preventDefault();
				$(this).css({"background":"#ddd"});
			});
			$(".persData .Info li").on("touchend",function(event){
				event.preventDefault();
				$(this).css({"background":"#fff"})
			})
		}
		//失去焦点获取焦点及验证
		function  BlurAndFocus(element,regexp){
			$(element).focus(function(){
				if($(this).val()==$(this).attr("title")){
					$(this).val("");
					$(this).css({"color":"#000"})
					$(this).parent().css({"borderBottom":"1px solid #b7b7b7"})
				}
			})
			$(element).blur(function(){
					if($(this).val()==""){
						$(this).val($(this).attr("title"));
						$(this).css({"color":"#ddd"})
						$(this).parent().css({"borderBottom":"1px solid #b7b7b7"})
					}else{
						if($(this).hasClass("mobile")){
								var res=$(this).val()+"";
								console.log(regexp.test(res))
							if(regexp.test(res)==false){
								$(this).parent().css({"borderBottom":"1px solid red"})
							}else{
								$(this).parent().css("borderBottom","1px solid #85c5e5")
							}	
						}else{
							$(this).parent().css("borderBottom","1px solid #85c5e5")
						}
					}
			});
		}
		//回顶部效果函数
		function scroll(){
			var topbtn =$(".bottom");
			var timer = null;
			var pagelookheight = $(window).height(); //可视范围内页面的大小
			//滚动条触发事件
			$(window).scroll(function(){
			  var backtop = $(document).scrollTop();
			 //页面距顶部的大小（页面被隐藏的部分超出容器的距离）
			  if(backtop>40){   //超出一屏幕的内容时出现返回到顶部的按钮
				 // $(".header").addClass("fixed");
				  topbtn.show();
			  }else{
				  //$(".header").removeClass("fixed");
				  topbtn.hide();
			  }
			});
		  //返回顶部按钮
			topbtn.click(function () {
			  timer = setInterval(function () {   //计时器
				  var backtop = $(document).scrollTop();
				  var speedtop = backtop/5;
				  var heihgt=backtop -speedtop;  //浏览器卷去页面的高度
				  $(document).scrollTop(heihgt);
				  if(backtop ==0){
					  clearInterval(timer);
				  }
			  }, 30);
		});
		}
		//弹出框
		function trace(str,callback){
			var loads = '<div id="tracebg" style="width:100%; position:absolute; left:0; top:0; background:0;"></div><div id="tracebox" style="width:76%; position:absolute; left:11%; top:30%; background:#fff; border-radius:8px; padding:3em 1% 1% 1%; text-align:center; font-size:1em; color:3;"><div style="padding:0 2em 0 2em;">'+str+'</div><br><br><br><font style="width:100%; display:block; line-height:35px; margin:0 auto; border-radius:5px; color:0; border-top:1px solid #efefef;">知道了</font></div>';
			$("body").append(loads);
			$("#tracebg").height($(window).height());
			$("#tracebg").css({opacity:0,"z-index":999999});
			$("#tracebox").css({opacity:0,"z-index":1000000});
			$("#tracebg").animate({opacity:0.6},200,function(){
				$("#tracebox").animate({opacity:0.95},300);
			});
			
			$("#tracebox").click(function(){
				$("#tracebox").animate({opacity:0},300,function(){	  
					$("#tracebg").animate({opacity:0},200,function(){
						$("#tracebg").remove();
						$("#tracebox").remove();
						if(callback) callback();
					});
				});
			});
		}
	//检查是否到底部
	function checkscrollside(){
    var $aPin = $(".context .course");
	 var lastPinH =$aPin.last().offset().top+Math.floor($aPin.last().height());
	var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $(window).height();//页面高度
	 return (lastPinH+60 ==scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}
		

		
	