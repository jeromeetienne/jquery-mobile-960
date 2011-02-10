#!/usr/bin/env node
/**
 * Script to build all the css for jquery-mobile-960
 * Porting the famous 960 grid to jquery-mobile
 * jquery mobile grid are crud at best
 * surely not suitable for large screens
 * pure port 
*/


//////////////////////////////////////////////////////////////////////////////////
//		buildGeneric							//
//////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////
//		buildFluid							//
//////////////////////////////////////////////////////////////////////////////////

var buildFluidInit	= function(nCols){
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

var buildFluidPerCols	= function(nCols, classPrefix, styleAttr, unitStr)
{
	var str	= "";
	for(var col = 0; col < nCols; col++){
		var	width	= (100/nCols)*(col+1);
		str	+= ".container_"+nCols+" ."+classPrefix+"_"+(col+1)+" {\n";
		str	+= "\t"+styleAttr+": "+width+unitStr+";\n";
		str	+= "}\n";
	}
	str	+= "\n";
	return str;
}

var buildFluidCss	= function(nCols){
	var	str	= "";
	str	+= buildGenericAlphaOmega(nCols);
	str	+= buildGenericAllCols(nCols);
	str	+= buildFluidInit(nCols);
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

//////////////////////////////////////////////////////////////////////////////////
//		buildFixed							//
//////////////////////////////////////////////////////////////////////////////////

var buildFixedInit	= function(nCols){
	var str	= "";
	str	+= ".ui-mobile [data-role='page'], .ui-mobile [data-role='dialog'], .ui-page {\n"
	str	+= "\tleft: 50%;\n"
	str	+= "\tmargin-left: -480px;\n"
	str	+= "\twidth: 960px;\n"
	str	+= "}\n";
	
	str	+= ".container_"+nCols+" {\n"
	str	+= "\twidth: 960px;\n"
	str	+= "}\n";

	str	+= "\n";
	return str;
}

var buildFixedPerCols	= function(nCols, classPrefix, styleAttr)
{
	var str	= "";
	var jqueryMarginW	= 30;
	for(var col = 0; col < nCols; col++){
		var	width	= (960-jqueryMarginW)/nCols*(col+1);
		str	+= ".container_"+nCols+" ."+classPrefix+"_"+(col+1)+" {\n";
		str	+= "\t"+styleAttr+": "+width+"px;\n";
		str	+= "}\n";
	}
	str	+= "\n";
	return str;
}

var buildFixedCss	= function(nCols){
	var	str	= "";
	str	+= buildGenericAlphaOmega(nCols);
	str	+= buildGenericAllCols(nCols);
	str	+= buildFixedInit(nCols);
	str	+= buildFixedPerCols(nCols, "grid", "width");
	str	+= buildFixedPerCols(nCols, "prefix", "padding-left");
	str	+= buildFixedPerCols(nCols, "suffix", "padding-right");
	return str;
}

var buildFixedFile	= function(filename){
	var str	= "";
	str	+= buildFixedCss(12)
	str	+= buildFixedCss(16)
	require('fs').writeFileSync(filename, str, encoding='utf8');
}

//////////////////////////////////////////////////////////////////////////////////
//		Main								//
//////////////////////////////////////////////////////////////////////////////////

buildFixedFile("css/jquery-mobile-960.css")
buildFluidFile("css/jquery-mobile-fluid960.css")