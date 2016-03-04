<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<title>用户列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/js/easyui/themes/icon.css">
<script type="text/javascript" src="${pageContext.request.contextPath }/js/easyui/jquery.min.js" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/easyui/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/easyui/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<script type="text/javascript">
var dg;
var idIdentityAlive=false;
$(function(){
dg=$("#dg").datagrid({
	url:'${pageContext.request.contextPath }/api/list.do',
	idField:'id',
    columns:[[
        {field:'name',title:'姓名',width:'13%',align:'center'},
        {field:'nickname',title:'昵称',width:'15%',align:'center'},
        {field:'phone',title:'电话',width:'15%',align:'center'},
        {field:'identity',title:'身份证',width:'15%',align:'center'},
        {field:'rowAddTime',title:'添加时间',width:'15%',align:'center',
        	formatter:function(value,row,index){
        		var time=new Date();
        		time.setTime(value.time);
        		var str=formatterTime(time);
        		return str;
        	}
        },
        {field : 'id',title : '操作',width : '20%',
        	formatter : function(value, row, index) {
				var str="&nbsp;&nbsp;&nbsp;&nbsp;";
				str += "<a href='javascript:void(0);' onclick='editEntity(\""+index+"\");'>修改</a>";
				str+="&nbsp;&nbsp;&nbsp;&nbsp;";
				str+="<a href='javascript:void(0);' onclick='deleteEntity(\""+index+"\");'>删除</a>";
				return str;
			}
		}
    ]],
    pagination:true,
    rownumbers:true,
    singleSelect:true,
    toolbar: [{
		iconCls: 'icon-add',
		text:'添加',
		handler: addEntity
	}]
});
$("#identity2").change(function(){
	if($("#identityHidden").val()!=$("#identity2").val()){
	$("#identity2").validatebox({
		required:true,
		invalidMessage:'身份证已经存在',
		validType:'remote[\'${pageContext.request.contextPath }/api/validateIdentity.do\',\'identity\']'
	});
	}else{
		$("#identity2").validatebox({
			required:true,
			validType:''
		});
	}
});
});
function editEntity(index){
	var row=dg.datagrid('getRows')[index];
	$("#name2").val(row.name);
	$("#nickname2").val(row.nickname);
	$("#phone2").val(row.phone);
	$("#identity2").val(row.identity);
	$("#identityHidden").val(row.identity);
	$("#rowAddTime2").datetimebox('setValue', formatterTime(new Date(row.rowAddTime.time)));
$("#ff2").form({
	url:"${pageContext.request.contextPath }/api/edit.do",
    onSubmit: function(param){
    	param.id = row.id;
    		if($("#identityHidden").val()!=$("#identity2").val()){
    			$("#identity2").validatebox("enableValidation");
$("#identity2").validatebox({
	required:true,
	invalidMessage:'身份证已经存在',
	validType:'remote[\'${pageContext.request.contextPath }/api/validateIdentity.do\',\'identity\']'
});
    			
    			return $("#ff2").form("validate");
    		}
			return $("#nickname2").validatebox("validate");
    },
    success:function(data){
    	data = eval('(' + data + ')');
    	if(data.success=='true'){
    		$('#dlg2').dialog('close');
    		$.messager.alert('提示',"修改成功");
    		dg.datagrid('reload');
    	}else{
    		$.messager.alert('提示',"修改失败");
    	}
    }
});
$('#dlg2').show().dialog({
    title: '修改',
    height: 'auto',
    width:'400',
    top:100,
    closable : true,
    cache: false,
    modal: true,
    buttons:[{
		text:'修改',
		handler:function(){
			$("#ff2").submit();
		}
	}]
});
}
function deleteEntity(index){
	var row=dg.datagrid('getRows')[index];
	$.ajax({
  		url:"${pageContext.request.contextPath }/api/delete.do",
  		data:{'id':row.id,'imgPath':row.imgPath},
  		dataType:'json',
  		type:'post',
  		success:function(data){
  			if(data.success=='true'){
				$.messager.alert('提示','删除成功');
    		}else{
    			$.messager.alert('提示',data.msg);
    		}
   				dg.datagrid('reload');
  			}
	});
}
function addEntity(){
$("#name").val("");
$("#nickname").val("");
$("#phone").val("");
$("#identity").val("");
$("#rowAddTime").datetimebox('setValue', formatterTime(new Date()));
$("#ff").form({
	url:"${pageContext.request.contextPath }/api/add.do",
    onSubmit: function(){
    	return $("#ff").form("validate");
    },
    success:function(data){
    	data = eval('(' + data + ')');
    	if(data.success=='true'){
    		$('#dlg').dialog('close');
    		dg.datagrid('reload');
    	}else{
    		$.messager.alert('提示',"添加失败");
    	}
    }
});
$('#dlg').show().dialog({
    title: '新增',
    height: 'auto',
    width:'400',
    top:100,
    closable : true,
    cache: false,
    modal: true,
    buttons:[{
		text:'添加',
		handler:function(){
			$("#ff").submit();
		}
	}]
});
}
function formatterTime(time){
	var str=time.getFullYear()+"-";
	str+=time.getMonth()<9?"0"+(time.getMonth()+1):(time.getMonth()+1);
	str+="-";
	str+=time.getDate()<10?"0"+time.getDate():time.getDate();
	str+=" ";
	str+=time.getHours()<10?"0"+time.getHours():time.getHours();
	str+=":";
	str+=time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes();
	str+=":";
	str+=time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds();
	return str;
}
</script>
</head>
<body>
<div style="width:100%;">
	<table id="dg"></table>
</div>
<div id="dlg" style="display: none;width:400px;">
	<form id="ff" method="post">
    <div>
    	<table>
    		<tr>
    			<td style="width:100px;text-align:right;">姓名：</td><td><input id="name" name="name" style="width:200px;" class="easyui-validatebox" type="text" data-options="" /></td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">身份证：</td><td>
<input id="identity" name="identity" style="width:200px;" class="easyui-validatebox" type="text"
data-options="required:true,invalidMessage:'身份证已经存在',validType:'remote[\'${pageContext.request.contextPath }/api/validateIdentity.do\',\'identity\']'" />
</td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">昵称：</td><td><input id="nickname" name="nickname" style="width:200px;" class="easyui-validatebox" type="text" data-options="required:true,validType:'length[1,50]'" /></td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">电话：</td><td><input id="phone" name="phone" style="width:200px;" class="easyui-validatebox" type="text" id="name" name="name" data-options="" /></td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">添加时间：</td><td>
    			<input class="easyui-datetimebox" id="rowAddTime" name="rowAddTime" data-options="showSeconds:true"style="width:200px"/>
    			</td>
    		</tr>
    	</table>
    </div>
	</form>
</div>
<div id="dlg2" style="display: none;width:400px;">
	<form id="ff2" method="post">
    <div>
    	<table>
    		<tr>
    			<td style="width:100px;text-align:right;">姓名：</td><td><input id="name2" name="name" style="width:200px;" class="easyui-validatebox" type="text" data-options="" /></td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">身份证：</td><td>
<input id="identity2" name="identity" style="width:200px;" class="easyui-validatebox" type="text"
data-options="" />
</td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">昵称：</td><td><input id="nickname2" name="nickname" style="width:200px;" class="easyui-validatebox" type="text" data-options="required:true,validType:'length[1,50]'" /></td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">电话：</td><td><input id="phone2" name="phone" style="width:200px;" class="easyui-validatebox" type="text" id="name" name="name" data-options="" /></td>
    		</tr>
    		<tr><td colspan="2"></td></tr>
    		<tr>
    			<td style="width:100px;text-align:right;">添加时间：</td><td>
    			<input class="easyui-datetimebox" id="rowAddTime2" name="rowAddTime" data-options="showSeconds:true"style="width:200px"/>
    			</td>
    		</tr>
    	</table>
    </div>
	</form>
</div>
<input type="hidden" id="identityHidden" />
</body>
</html>