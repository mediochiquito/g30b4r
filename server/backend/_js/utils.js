// JavaScript Document
function _(id)
{
	return document.getElementById(id);
}
function removeNode(id)
{
	_(id).parentNode.removeChild(_(id));
}
function emptyNode(id)
{
	while(_(id).firstChild)
	{
		_(id).removeChild(_(id).firstChild);
	}
}
function addFlash(donde, src, ancho, alto, flash_vars)
{
	var SWF = document.createElement('embed');
	SWF.setAttribute('id', donde+'_flash');
	SWF.setAttribute('src', src);
	SWF.setAttribute('width', ancho);
	SWF.setAttribute('height', alto);
	SWF.setAttribute('type', 'application/x-shockwave-flash');
	SWF.setAttribute('bgcolor', '#000000');
	SWF.setAttribute('wmode', 'transparent');
	SWF.setAttribute('scale', 'scale');
	SWF.setAttribute('allowScriptAccess', 'always');
	SWF.setAttribute('FlashVars', flash_vars);

	document.getElementById(donde).appendChild(SWF);
}

function selected_value(item)
{
	return item.options[item.selectedIndex].value;
}
