#!/usr/bin/env node
/**
 * Script to build all the css for jquery-mobile-960
 * Porting the famous 960 grid to jquery-mobile
 * jquery mobile grid are crud at best
 * surely not suitable for large screens
 * pure port 
*/


var buildGenericAlphaOmega	= function(nCols){
	var str	= "";
	str	+= ".container_"+nCols+" .alpha { clear-left: 0; }\n";
	str	+= "\n";
	return str;
}

var buildGenericAllCols	= function(nCols){
	var str	= "";
	for(var col = 0; col < nCols; col++){
		var	width	= (100/nCols)*(col+1);
		str	+= ".grid_"+(col+1);
		str	+= col+1 == nCols ? "\n" : ",\n";
	}
	str	+= "{ margin: 0; padding: 0; border: 0; float: left; }\n";
	str	+= "\n";
	return str;	
}

var buildFluidContainerInit	= function(nCols){
	var str	= "";
	str	+= ".container_"+nCols+" { overflow: hidden; }\n";
	str	+= "\n";
	return str;
}

var buildFluidAllCols	= function(nCols)
{
	var str	= "";
	for(var col = 0; col < nCols; col++){
		var	width	= (100/nCols)*(col+1);
		str	+= ".container_"+nCols+" .grid_"+(col+1)+" {\n";
		str	+= "\twidth: "+width+"%;\n";
		str	+= "}\n";
	}
	str	+= "\n";
	return str;
}

var buildFluidAllPrefix	= function(nCols)
{
	var str	= "";
	for(var col = 0; col < nCols; col++){
		var	width	= (100/nCols)*(col+1);
		str	+= ".container_"+nCols+" .prefix_"+(col+1)+" {\n";
		str	+= "\tpadding-left: "+width+"%;\n";
		str	+= "}\n";
	}
	str	+= "\n";
	return str;
}
var buildFluidAllSuffix	= function(nCols)
{
	var str	= "";
	for(var col = 0; col < nCols; col++){
		var	width	= (100/nCols)*(col+1);
		str	+= ".container_"+nCols+" .suffix_"+(col+1)+" {\n";
		str	+= "\tpadding-right: "+width+"%;\n";
		str	+= "}\n";
	}
	str	+= "\n";
	return str;
}

var buildFluidCss	= function(nCols){
	var	str	= "";
	str	+= buildGenericAlphaOmega(nCols);
	str	+= buildGenericAllCols(nCols);
	str	+= buildFluidContainerInit(nCols);
	str	+= buildFluidAllCols(nCols);
	str	+= buildFluidAllPrefix(nCols);
	str	+= buildFluidAllSuffix(nCols);
	return str;
}

var buildFluidFile	= function(filename){
	var str	= "";
	str	+= buildFluidCss(12)
	str	+= buildFluidCss(16)
	require('fs').writeFileSync(filename, str, encoding='utf8');
}


buildFluidFile("css/jquery-mobile-fluid960.css")