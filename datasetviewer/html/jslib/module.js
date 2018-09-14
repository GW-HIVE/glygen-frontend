var childList = {};
var isMain = {};
var nodeid2name = {};
var nodeid2index = {};
var treeJson = [];
var toggleCount = {};
var currentBatch = 1;
var batchSize = 100;
var batchCount = 0;
var datasetName = '';
var readMeFile = '';
var objId = '';
var resJson = {};
var filterHash = {};
var seen = {"category":{}, "species":{}, "filetype":{}, "datasetcount":{}};       




////////////////////////////////
$(document ).ready(function() {

	setGlobalMenuCn();        
	var sections = getSections();
        $("#modulesectionscn").html(sections);
	$("#modulesearchboxcn").html(getSearchBoxCn());
       
	setPageFrame();
	fillFrameCn();
});

////////////////////////////
function setPageFrame(){

	var linkList = [
		 '<a class=pagelink href="/" style="font-size:13px;">Home</a>'
		,'<a class=pagelink href="/workflow" style="font-size:13px;">Interation Workflow</a>'
		,'<a class=pagelink href="/datamodel" style="font-size:13px;">Data Model</a>'
		,'<a class=pagelink href="/faq" style="font-size:13px;">FAQ</a>'
		,'<a class=pagelink href="/deposit" style="font-size:13px;">Deposit</a>'
	]
	var linkSet = linkList.join(" | ");
	
	$("#pagelinkscn").html(linkSet);

	return;
}


////////////////////////////
function fillFrameCn(){

	if(pageId == 'browse'){
		fillGridViewCn("1");
        }
	else if(server == "dev" && pageId == 'edit'){
		fillJsonTextCn();
	}
	else if(server == "dev" && pageId == 'create'){
		objId = 0;
		fillJsonTextCn();
	}
	else if (pageId == "datamodel"){
		fillDataModelViewCn();
	}
	else{
		fillStaticHtmlCn('/content/page.'+pageId+'.html', '#pagecn');
        }
	return;
}


////////////////////////////
function fillGridViewCn(){

	var url = cgiRoot + '/servlet.cgi';
	var reqObj = new XMLHttpRequest();
	reqObj.open("POST", url, true);
	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        reqObj.onreadystatechange = function() {
                if (reqObj.readyState == 4 && reqObj.status == 200) {
                        //console.log('response='+reqObj.responseText);
                        resJson = JSON.parse(reqObj.responseText);
			rndrGridContent();
                }
        };
	var postData = 'mode=json&svc=get_objects';
	reqObj.send(postData);
	console.log(postData);

}

///////////////////////////
function fillJsonTextCn(){

	var link = '<a class=pagelink id=saveobject href="#" style="font-size:13px;">Save Object</a>'; 
	var cn = '<table width=100%>';
	cn += '<tr><td align=right>'+link+'</td></tr>';
	cn += '<tr><td><textarea id=jsontext rows=40 style="width:100%;padding:10;"></textarea></td></tr>';
	cn += '</table>';
	$("#pagecn").html(cn);

	var url = cgiRoot + '/servlet.cgi';
       	var reqObj = new XMLHttpRequest();
       	reqObj.open("POST", url, true);
       	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       	reqObj.onreadystatechange = function() {
               	if (reqObj.readyState == 4 && reqObj.status == 200) {
                       	$("#jsontext").val(reqObj.responseText);
               	}
       	};
       	var postData = 'mode=json&svc=get_single_object&objid=' + objId;
       	reqObj.send(postData);
       	console.log(postData);
}


///////////////////////////
function fillDataModelViewCn(){


	var url = htmlRoot + '/content/page.datamodel.html';
	var reqObj = new XMLHttpRequest();
	reqObj.open("GET", url, true);
	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	reqObj.onreadystatechange = function() {
		if (reqObj.readyState == 4 && reqObj.status == 200) {
			//console.log('response='+reqObj.responseText);
			$("#pagecn").html(reqObj.responseText);
			var cn = '<br><table width=100% border=0>' + 
				'<tr><td id=predicatescn></td></tr></table>';
			$("#pagecn").append(cn);
			rndrDataModelTable();
		}
	};
	reqObj.send();
			        

}


///////////////////////////
function rndrDataModelTable(){

	var url = cgiRoot + '/servlet.cgi';
	var reqObj = new XMLHttpRequest();
	reqObj.open("POST", url, true);
	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	reqObj.onreadystatechange = function() {
		if (reqObj.readyState == 4 && reqObj.status == 200) {
			var resObj = JSON.parse(reqObj.responseText);
			drawTable(resObj["dataframe"], "predicatescn", {"pagesize":100});
		}
	};
	var postData = 'mode=json&svc=getDataModelTable';
	reqObj.send(postData);
}


//////////////////////////////////////////
function rndrGridContent(){

	var gridWidth = 250;
	var gridHeight = 140;
	var npass = 0;
	seen = {"category":{}, "species":{}, "filetype":{}, "datasetcount":{}, "total":0}
	var gridDivs = '<div class="grid_section grid_group">';
	for (var i in resJson["datasets"]){
			var obj = resJson["datasets"][i];
			if (obj["status"] == -1){
				continue;
			}
			var ii = parseInt(i) + 1;
			var cat = obj["categorytitle"];
			seen["category"][cat] = true;
			seen["datasetcount"][cat] = (cat in seen["datasetcount"] ? seen["datasetcount"][cat] + 1 : 0);
			seen["total"] += 1;
			var fileType = obj["filetype"];
			var species = obj["species"];
			seen["filetype"][fileType] = true;
			seen["species"][species] = true;
			if("category" in filterHash && !(cat in filterHash["category"])){
                        	continue;
                	}
			if("species" in filterHash && !(species in filterHash["species"])){
                                continue;
                        }
			npass += 1;
			var xPos = i*(gridWidth + 80);
			var iconFileName = obj["iconfilename"];
                        seen["datasetcount"][species] = (!(species in seen["datasetcount"]) ? 1 : 
					seen["datasetcount"][species] + 1); 
			seen["datasetcount"][fileType] = (!(fileType in seen["datasetcount"]) ? 1 :
                                        seen["datasetcount"][fileType] + 1);
			if("filetype" in filterHash && !(fileType in filterHash["filetype"])){
                        	continue;
                	}
			if("species" in filterHash && !(species in filterHash["species"])){
                                continue;
                        }
			var miniTable = '';
			if ("minitable" in obj){
				miniTable = rndrMiniTable(obj["minitable"]);
			}
		
                        gridDivs += '<div class="grid_col grid_span_1_of_3">';
			var s = 'position:absolute;;width:45%;height:15px;border:0px solid red;';
                        s += 'left:5%;top:0%;color:#333;';
                        s += 'padding:15px 0px 0px 0px;font-size:11px;text-align:left;';
                        objId = "000000".substring(0, 6 - String(obj["_id"]).length) + String(obj["_id"]);
                        gridDivs += '<div style="'+s+'">';
                        gridDivs += (obj["status"] == 1 ? cat + ' object ' + objId  + " " + obj["_id"]:
                                                cat + ' ('+objId+')' + ' <font color=red>in progress</font>');
                        gridDivs += '</div>';
                        var s = 'position:absolute;width:45%;height:15px;border:0px solid red;';
                        s += 'right:5%;top:0%;color:#333;text-align:right;';
                        s += 'padding:15px 0px 0px 0px;font-size:11px;';
                        gridDivs += '<div style="'+s+'">';
                        gridDivs += obj["species"] + ', ' + fileType.toUpperCase();
                        gridDivs += '</div>';

                        var s = 'position:absolute;left:15%;top:60px;width:70%;height:50px;font-size:18px;';
			s += 'font-weight:bold;color:#004065;vertical-align:bottom;';
                        s += 'border:0px solid red;';
			gridDivs += '<div style="'+s+'">';
			gridDivs += obj["title"];
			gridDivs += '</div>';
		
			var iconUrl = htmlRoot + '/content/' + iconFileName;
			var s = 'position:absolute;left:10%;top:120px;width:80%;height:130px;font-size:18px;';
			s += 'font-size:12px;border:0px solid red;';
			gridDivs += '<div style="'+s+'">';
			gridDivs += miniTable;
			gridDivs += (miniTable == '' ? '<img src="'+iconUrl+'" height=90%>' : "");
			gridDivs += '</div>';
		
			var s = 'position:absolute;left:10%;top:250px;width:80%;height:40px;font-size:18px;';
                        s += 'font-size:12px;border:0px solid red;';
			gridDivs += '<div style="'+s+'">';
			gridDivs += obj["description"];
			gridDivs += '</div>';	
			var datasetName = obj["filename"];
		 	var url1 = htmlRoot + '/datasets/reviewed/'+datasetName
			
			var s = 'position:absolute;left:5%;top:300px;width:90%;height:20px;';
                        s += 'font-size:13px;text-align:center;color:#004065;cursor:hand;border:0px solid red;';
			var linkId = "dataset_" + i;
			gridDivs += '<div style="'+s+'">';
			gridDivs += '<a id="'+linkId+'" class=readmelink style="font-size:12px;">README</a>';
			gridDivs += ' | <a id="'+linkId+'" class=previewlink style="font-size:12px;">PREVIEW</a>';
			gridDivs += ' | <a href="'+url1+'" download="'+datasetName+'" style="font-size:12px;">DOWNLOAD</a>';
                       
			var linkId = "obj_" + obj["_id"];
			gridDivs += ' | <a id="'+linkId+'" class=commentlink style="font-size:12px;">COMMENT</a>';
			gridDivs += '</div>';
			gridDivs += '</div>';
	}
	gridDivs += '</div>';




	var filters1 = '<b>Filter by categories</b><br>';
	for (var x in seen["category"]){
		var n = (x in seen["datasetcount"] ? seen["datasetcount"][x] : 0);
                var label = x + ' (' + n + ')';
		var chkd = "checked";
		if ("category" in filterHash){
			chkd = (filterHash["category"][x] == true ? "checked" : "");
		}
		var chkbox = '<input class=filtercheckbox type=checkbox name=category '+chkd+' width=15 value="'+x+'">';
		filters1 += '&nbsp;&nbsp;&nbsp;' + chkbox + label + '<br>';
	}	

	var filters2 = '<b>Filter by species</b><br>';
        for (var x in seen["species"]){
		var n = (x in seen["datasetcount"] ? seen["datasetcount"][x] : 0);
		var label = x + ' (' + n + ')';
                var chkd = "checked";
                if ("species" in filterHash){
                        chkd = (filterHash["species"][x] == true ? "checked" : "");
                }
                var chkbox = '<input class=filtercheckbox type=checkbox name=species '+chkd+' width=15 value="'+x+'">';
        	filters2 += '&nbsp;&nbsp;&nbsp;' + chkbox + label + '<br>';
	}


	var filters3 = '<b>Filter by file type</b><br>';
	for (var x in seen["filetype"]){
		var n = (x in seen["datasetcount"] ? seen["datasetcount"][x] : 0);
                var label = x + ' (' + n + ')';
                var chkd = "checked";
                if ("filetype" in filterHash){
                        chkd = (filterHash["filetype"][x] == true ? "checked" : "");
                }
		var chkbox = '<input class=filtercheckbox type=checkbox name=filetype '+chkd+' width=15 value="'+x+'">';
		filters3 += '&nbsp;&nbsp;&nbsp;' + chkbox + label + '<br>';
	}


	var s =  'width:80px;height:25px;';
        var applybtn = '<input type=submit class=filterbtn id=apply style="'+s+'" value=" Apply ">';
        var resetbtn = '<input type=submit class=filterbtn id=reset style="'+s+'" value=" Reset ">';
	//var btns = applybtn + '&nbsp;' + resetbtn;
	var btns = '';

	var filterLink = '<a id=filterlink href="" style="font-size:13px;">Filter</a>';
        
	var filters = '<table width=100% border=0 style="font-size:13px;">' +
       			'<tr><td valign=top>'+filters1+'</td>'+ 
				'<td valign=top>'+filters2+'</td>'+
				'<td valign=top>'+filters3+'</td></tr>' + 
			'</table>';	
	var filterTable = '<table width=100% border=0 style="font-size:13px;">' +
			'<tr style="border-bottom:1px solid #ccc;">' + 
			'<td >Total of '+ seen["total"]+ ' datasets ('+npass +' passed filter)</td>' + 
        		'<td align=right>'+filterLink+'</td>' + 
			'</tr>' + 
        		'<tr><td class=filtercontainer colspan=2 style="padding:20;border-bottom:1px solid #eee;">'+filters+'</td></tr>' +
			'</table>';

	var gridTable = '<table width=100% height=100% border=0 margin=0>';
	var style = 'padding:10px;border:1px solid #eee;background:#f8f8f8;';
	gridTable += '<tr><td valign=top>' + filterTable + '</td>';
	gridTable += '<tr><td valign=top style="padding:0 0 0 2%;">' + gridDivs + '</td>';
	gridTable += '</tr>';
	gridTable += '</table>';
	$("#pagecn").html(gridTable);
	return
}



////////////////////////
function popMessage(msg){

	event.preventDefault(); 
	$("html, body").animate({ scrollTop: 0 }, "0");
	
	var s = "padding:2px 20px 2px 20px;";
        var closebtn = '<input name=btn2 id=closewindow type=submit style="'+s+'" value="&times;">';
        var table = '<table width=100% style="font-size:13px;" border=0>' +
                        '<tr height=25><td align=right>'+ closebtn+'</td></tr>' +
                        '</table>';

	var s = 'position:absolute;left:1%;top:5px;width:98%;height:25px;';
        s += 'filter: alpha(opacity=100);opacity: 1.00;z-index:1003;border:0px solid;';
        var div1 = '<DIV id=popdiv1 style="'+s+'">'+table+'</DIV>';

        var s = 'position:absolute;left:10%;top:50;width:80%;height:400;overflow:auto;';
        s += 'background:#fff;filter: alpha(opacity=100);opacity: 1.00;z-index:1002;padding:10px;';
        var div2 = '<DIV id=popdiv2 style="'+s+'">'+msg+'</DIV>';

        var s = 'position:absolute;left:10%;width:80%;height:500;top:5%;';
        s += 'background:#eee;filter: alpha(opacity=100);opacity: 1.00;z-index:1001;';
        var popdiv = '<DIV id=popdiv style="'+s+'">'+ div1 + div2+'</DIV>';

        var s = 'position:absolute;left:0px;top:0px;width:100%;height:3000px;background:#000;color:#fff;';
        s += 'filter: alpha(opacity=75);z-index:1000;';
        s += 'opacity: 0.75;';
        var bgdiv = '<DIV id=bgdiv style="'+s+'"></DIV>';

        $("body").append(bgdiv + popdiv);

	return;
}


//////////////////////////////////
function setReadmeContent(fileName, containerId){


        var url = htmlRoot + '/' + fileName;
        var reqObj = new XMLHttpRequest();
        reqObj.containerId = containerId;
        reqObj.open("GET", url, true);
        reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        reqObj.onreadystatechange = function() {
                if (reqObj.readyState == 4 && reqObj.status == 200) {
                        $(reqObj.containerId).html('<pre>'+reqObj.responseText + '</pre>');
                }
                else{
                        var msg = fileName + ' does not exist!';
                        var table = '<table width=100%>' +
                                '<tr height=400><td style="color:red;" align=center> ' + msg + '</td></tr>' +
                                '</table>';
                        $(reqObj.containerId).html(table);
                }
        };
        reqObj.send();
}

//////////////////////////////////
function setPreviewContent(dataObj, containerId){



        var url = cgiRoot + '/servlet.cgi';

	var reqObj = new XMLHttpRequest();
        reqObj.containerId = containerId;
	reqObj.open("POST", url, true);
        reqObj.fileType = dataObj["filetype"];

	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        reqObj.onreadystatechange = function() {
                if (reqObj.readyState == 4 && reqObj.status == 200) {
                	if (reqObj.fileType == "csv"){
				var resObj = JSON.parse(reqObj.responseText);
				drawTable(resObj["dataframe"], reqObj.containerId, {"pagesize":25});
			}
			else if (reqObj.fileType == "fasta"){
				var resObj = JSON.parse(reqObj.responseText);
                        	var cn = '<table width=100% style="font-size:12px;" border=0>';
				for (var i in resObj["seqobjects"]){
					var obj = resObj["seqobjects"][i];
					cn += '<tr><td>>'+ obj.seqid + ' ' + obj.seqdesc + '</td></tr>';
					var seq = "";
					var lineLen = 100;
					for (var j=0; j < parseInt(obj.seqbody.length/lineLen) + 1; j++){
						var startPos = j*lineLen;
						endPos = startPos + lineLen;
						endPos = (endPos > obj.seqbody.length - 1 ? obj.seqbody.length - 1:
								endPos);
						seq += obj.seqbody.substring(startPos, endPos) + '\n';
					}				
					cn += '<tr><td><pre>'+seq+'</pre></td></tr>';
					cn += '<tr height=30><td>&nbsp;</td></tr>';
				}
				cn += '</table>';
				$("#"+reqObj.containerId).html(cn);
			}
			else if (["rdf", "aln", "png", "gp", "gb"].indexOf(reqObj.fileType) != -1){
				var cnBody = '<textarea style="width:100%;" rows=45>'+
					reqObj.responseText+'</textarea>';
				cnBody = (["aln", "png",  "gp", "gb"].indexOf(reqObj.fileType) != -1 ? reqObj.responseText : cnBody); 
				var cn = '<table width=100% style="font-size:12px;" border=0>';
                                cn += '<tr><td><pre>'+cnBody+'<pre></td></tr>';
				cn += '</table>';
                                $("#"+reqObj.containerId).html(cn);
                        }
			else{
				var resObj = JSON.parse(reqObj.responseText);
				$("#"+reqObj.containerId).html("<br><br>" + resObj["errormsg"]);
			}
		}
                else{
                        var msg = 'Service failed!';
                        var table = '<table width=100%>' +
                                '<tr height=400><td style="color:red;" align=center> ' + msg + '</td></tr>' +
                                '</table>';
                        $(reqObj.containerId).html(table);
                }
        };
	var inJson = {"objectid":dataObj["object_id"]};
        var postData = 'mode=json&svc=getPreviewRecords&injson=' + JSON.stringify(inJson);
	reqObj.send(postData);

}





///////////////////////
function isValidJson(str) {
	    
	try {
		JSON.parse(str);
	} catch (e) {
		return e;
	}
	return true;
}




//////////////////////Event handlers
$(document).on('click', '.glygenmenu', function (event) {
        event.preventDefault();

	var lastPart = this.href.split("/").pop()
	if (server == "prd"){
		window.location.href = "http://glygen.org/" + lastPart;
	}
	else{
		window.location.href = "http://" + server + ".glygen.org/" + lastPart;
	}
});



$(document).on('click', '#filterlink', function (event) {
        event.preventDefault();

	$(".filtercontainer").toggle();

});




$(document).on('click', '#saveobject', function (event) {
	event.preventDefault();
	var jsonText = $("#jsontext").val();
	var tv = isValidJson(jsonText);
	if(tv != true){
		popMessage(tv);
	}
	var obj = JSON.parse(jsonText);
	var emptyFields = [];
	for (var key in obj){
		if(String(obj[key]).length == 0){
		 	emptyFields.push(key);
		}
	}
	if (emptyFields.length > 0){
		var msg = 'The following fields have no values:<br><br>';
		msg += emptyFields.join("<br>");
		popMessage(msg);
		return;
	}

	var url = cgiRoot + '/servlet.cgi';
        var reqObj = new XMLHttpRequest();
        reqObj.open("POST", url, true);
        reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        reqObj.onreadystatechange = function() {
                if (reqObj.readyState == 4 && reqObj.status == 200) {
			var resJson = JSON.parse(reqObj.responseText);
                        window.location.href = "/edit/" + resJson["objid"]
                }
        };

	obj["objid"] = objId;
        var postData = 'mode=json&svc=save_object&injson=' + JSON.stringify(obj);
        reqObj.send(postData);
        console.log(postData);



});




$(document).on('click', '.menucell', function (event) {
        event.preventDefault();

	pageId = this.id;
	var sections = getSections();
        $("#modulesectionscn").html(sections);
        $("#modulesearchboxcn").html(getSearchBoxCn());

	setPageFrame();
        fillFrameCn();
	$("#modulesectionscn").css("display", "none");

});

///////////////////////////////////////////////
$(document).on('click', '.menucellselected', function (event) {
        event.preventDefault();

	var sections = getSections();
        $("#modulesectionscn").html(sections);
        $("#modulesearchboxcn").html(getSearchBoxCn());
        
        pageId = this.id;
        setPageFrame();
        fillFrameCn();
        $("#modulesectionscn").css("display", "none");

});


///////////////////////////////////////////////////
$(document).on('click', '.filtercheckbox', function (event) {
	
	event.preventDefault();
	
	filterHash = {"category":{}, "species":{}, "filetype":{}};
	$("input[type=checkbox][name=category]:checked").each(function () {
		filterHash["category"][$(this).val()] = true;
	});

	$("input[type=checkbox][name=species]:checked").each(function () {
                filterHash["species"][$(this).val()] = true;
        });

	$("input[type=checkbox][name=filetype]:checked").each(function () {
                filterHash["filetype"][$(this).val()] = true;
        });	

	rndrGridContent();

});


///////////////////////////////////////////////////
$(document).on('click', '.previewlink', function (event) {

        event.preventDefault();
        var datasetIndex = parseInt(this.id.split("_")[1]);
       

	
	$("html, body").animate({ scrollTop: 0 }, "0");
        var s = "padding:2px 20px 2px 20px;";
        var closebtn = '<input name=btn2 id=closewindow type=submit style="'+s+'" value="&times;">';
        var table = '<table width=100% style="font-size:13px;" border=0>' +
                        '<tr height=25><td align=right>'+ closebtn+'</td></tr>' +
                        '</table>';
        var s = 'position:absolute;left:1%;top:5px;width:98%;height:25px;';
        s += 'filter: alpha(opacity=100);opacity: 1.00;z-index:1003;border:0px solid;';
        var div1 = '<DIV id=popdiv1 style="'+s+'">'+table+'</DIV>';

        var s = 'position:absolute;left:5%;top:5%;width:90%;height:90%;overflow:auto;';
        s += 'background:#fff;filter: alpha(opacity=100);opacity: 1.00;z-index:1002;padding:10px;';
        var div2 = '<DIV id=popdiv2 style="'+s+'"></DIV>';

        var s = 'position:absolute;left:10%;width:80%;height:90%;top:5%;';
        s += 'background:#eee;filter: alpha(opacity=100);opacity: 1.00;z-index:1001;';
        var popdiv = '<DIV id=popdiv style="'+s+'">'+ div1 + div2+'</DIV>';

        var s = 'position:absolute;left:0px;top:0px;width:100%;height:3000px;background:#000;color:#fff;';
        s += 'filter: alpha(opacity=75);z-index:1000;';
        s += 'opacity: 0.75;';
        var bgdiv = '<DIV id=bgdiv style="'+s+'"></DIV>';

        $("body").append(bgdiv + popdiv);
        setPreviewContent(resJson["datasets"][datasetIndex],  'popdiv2');
});

///////////////////////////////////////////////////
$(document).on('click', '.commentlink', function (event) {

        event.preventDefault();
        objId = this.id.split("_")[1];



        $("html, body").animate({ scrollTop: 0 }, "0");
        var s = "padding:2px 20px 2px 20px;";
        var closebtn = '<input name=btn2 id=closewindow type=submit style="'+s+'" value="&times;">';
        var table = '<table width=100% style="font-size:13px;" border=0>' +
                        '<tr height=25><td align=right>'+ closebtn+'</td></tr>' +
                        '</table>';
        var s = 'position:absolute;left:1%;top:5px;width:98%;height:25px;';
        s += 'filter: alpha(opacity=100);opacity: 1.00;z-index:1003;border:0px solid;';
        var div1 = '<DIV id=popdiv1 style="'+s+'">'+table+'</DIV>';


	var s = 'width:100%;padding:3;height:30px;';
        var emObj = {"name":"fullname","placeholder":"firstname lastname", type:"text", style:s};
        var txtbox1 = getElement(emObj);
	
	var s = 'width:100%;padding:3;height:30px;';
        var emObj = {"name":"email","placeholder":"Email address", type:"text", style:s};
        var txtbox2 = getElement(emObj);

	var s = 'width:100%;padding:3;height:100px;';
        var emObj = {"name":"comment","placeholder":"comment", "id":"commentid", type:"textarea", style:s};
        var txtbox3 = getElement(emObj);


        var emObj = {"name":"hobjid",type:"hidden", value:objId};
        var htxtbox = getElement(emObj);



	var s = 'width:200px;height:30px;';
	var submitbtn = '<input type=submit id=savecomment name=searchbtn style="'+s+'" value=" Submit ">';
	submitbtn += htxtbox;


	var s = 'width:100%;height:400px;overflow:auto;background:#f1f1f1;';
	var viewdiv = '<div id=commentscn style="'+s+'"></div>';

	var table = '<br><br><table style="font-size:13px;width:80%;margin-left:10%;" border=0>' +
		'<tr><td>'+txtbox1+'</td></tr>' +
		'<tr><td>'+txtbox2+'</td></tr>' +
		'<tr><td>'+txtbox3+'</td></tr>' +	
		'<tr><td>'+submitbtn+'</td></tr>' +	
		'<tr height=30><td>&nbsp;</td></tr>' +
		'<tr><td>Existing comments<br>'+viewdiv+'</td></tr>' +
		'</table>';
       
        var s = 'position:absolute;left:5%;top:5%;width:90%;height:90%;overflow:auto;';
        s += 'background:#fff;filter: alpha(opacity=100);opacity: 1.00;z-index:1002;padding:10px;';
        var div2 = '<DIV id=popdiv2 style="'+s+'">'+table+'</DIV>';

        var s = 'position:absolute;left:10%;width:80%;height:90%;top:5%;';
        s += 'background:#eee;filter: alpha(opacity=100);opacity: 1.00;z-index:1001;';
        var popdiv = '<DIV id=popdiv style="'+s+'">'+ div1 + div2 + '</DIV>';

        var s = 'position:absolute;left:0px;top:0px;width:100%;height:3000px;background:#000;color:#fff;';
        s += 'filter: alpha(opacity=75);z-index:1000;';
        s += 'opacity: 0.75;';
        var bgdiv = '<DIV id=bgdiv style="'+s+'"></DIV>';
        $("body").append(bgdiv + popdiv);


	if(["dev", "tst", "beta", "prd"].indexOf(server) != -1 ){ 

		var inJson = JSON.stringify({"objid":objId});
        	$("#commentscn").html(getWaitMsg());
        	var url = cgiRoot + '/servlet.cgi';
        	var reqObj = new XMLHttpRequest();
        	reqObj.open("POST", url, true);
		reqObj.divId = "#commentscn";
        	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        	reqObj.onreadystatechange = function() {
                if (reqObj.readyState == 4 && reqObj.status == 200) {
                       try {
                                var resJson = JSON.parse(reqObj.responseText);
                                if (resJson["taskStatus"] == 1){
					var rows = '';
					for (var i in resJson["comments"]){
						var obj = resJson["comments"][i];
						rows += '<tr><td>'+obj["comment"]+'</td></tr>';
						rows += '<tr><td>'+obj["fullname"]+'</td></tr>';
						rows += '<tr><td>'+obj["email"]+'</td></tr>';
						rows += '<tr><td>'+obj["createdts"] +'<br>//</td></tr>';
						rows += '<tr height=20><td>&nbsp;</td></tr>';
					}
					if (rows == ''){
						rows += '<tr height=20>' + 
							'<td>No existing comments available.</td></tr>';
					}
					var cn = '<table style="margin:3%;width:94%;">';
					cn += rows + '</table>';
                                        $(this.divId).html(cn);
                                }
                                else{
                                        $(this.divId).html(getErrorMsg(resJson["errMsg"]));
                                }
                        }
                        catch(e){
                                $(this.divId).html(getErrorMsg("syntaxError, please report this error!"));
                                console.log(e);
                        }
                }
        };
        var postData = 'mode=json&svc=getComment&inJson='+ inJson;
        reqObj.send(postData);
        console.log('request='+postData);
	}




});



///////////////////////////////////////////////////
$(document).on('click', '.readmelink', function (event) {
 
	event.preventDefault(); 
	var i = parseInt(this.id.split("_")[1]);


	$("html, body").animate({ scrollTop: 0 }, "0");
	
 
	var s = "padding:2px 20px 2px 20px;";
        var closebtn = '<input name=btn2 id=closewindow type=submit style="'+s+'" value="&times;">';
        var table = '<table width=100% style="font-size:13px;" border=0>' +
                        '<tr height=25><td align=right>'+ closebtn+'</td></tr>' +
                        '</table>';

	var s = 'position:absolute;left:1%;top:5px;width:98%;height:25px;';
        s += 'filter: alpha(opacity=100);opacity: 1.00;z-index:1003;border:0px solid;';
        var div1 = '<DIV id=popdiv1 style="'+s+'">'+table+'</DIV>';

        var s = 'position:absolute;left:5%;top:5%;width:90%;height:90%;overflow:auto;';
        s += 'background:#fff;filter: alpha(opacity=100);opacity: 1.00;z-index:1002;padding:10px;';
        var div2 = '<DIV id=popdiv2 style="'+s+'"></DIV>';

        var s = 'position:absolute;left:10%;width:80%;height:90%;top:5%;';
        s += 'background:#eee;filter: alpha(opacity=100);opacity: 1.00;z-index:1001;';
        var popdiv = '<DIV id=popdiv style="'+s+'">'+ div1 + div2+'</DIV>';

        var s = 'position:absolute;left:0px;top:0px;width:100%;height:3000px;background:#000;color:#fff;';
        s += 'filter: alpha(opacity=75);z-index:1000;';
        s += 'opacity: 0.75;';
        var bgdiv = '<DIV id=bgdiv style="'+s+'"></DIV>';

        $("body").append(bgdiv + popdiv);



	var readmeFile = '/datasets/reviewed/' + resJson["datasets"][i]["readmefilename"];
	setReadmeContent(readmeFile, '#popdiv2');

});

///////////////////////////////////////
$(document).on('click', '#closewindow', function (event) {
        event.preventDefault();
        $("#popdiv1").remove();
        $("#popdiv2").remove();
        $("#popdiv").remove();
        $("#bgdiv").remove();
});

  
//////////////////////////////////////////
$(document).on('click', '#savecomment', function (event) {
        event.preventDefault();

	var fullName = $("input[name=fullname]").val();
        var email = $("input[name=email]").val();
        var comment = $("#commentid").val();
	var hobjId = $("input[name=hobjid]").val();


	if (comment.trim() == ""){
		alert("Please submit valide comment!");
		return false;
	}

        var inJson = JSON.stringify({"objid":hobjId, "fullname":fullName, "email":email, "comment":comment});
	$("#popdiv2").html(getWaitMsg());
        var url = cgiRoot + '/servlet.cgi';
        var reqObj = new XMLHttpRequest();
        reqObj.open("POST", url, true);
        reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        reqObj.onreadystatechange = function() {
                if (reqObj.readyState == 4 && reqObj.status == 200) {
                       try {
                                console.log(reqObj.responseText);
				var resJson = JSON.parse(reqObj.responseText);
				if (resJson["taskStatus"] == 1){
					var s = 'font-size:13px;width:80%;margin-left:10%;';
					var cn = '<br><br><table style="'+s+'" border=0>' +
                				'<tr height=400><td valign=middle align=center>' + 
					'Successfully submitted, you can close this windown now.</td></tr>' +
               					 '</table>';
					$("#popdiv2").html(cn);					
				}
				else{
					$("#popdiv2").html(getErrorMsg(resJson["errMsg"]));
				}
			}
                        catch(e){
                                $("#popdiv2").html(getErrorMsg("syntaxError, please report this error!"));
                                console.log(e);
                        }
                }
        };
        var postData = 'mode=json&svc=saveComment&inJson='+ inJson;
        reqObj.send(postData);
        console.log('request='+postData);
	return;	

});




