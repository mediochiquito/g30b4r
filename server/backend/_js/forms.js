// JavaScript Document

function form_get_variables(form)
{
	var parameters = Array();

	var length = form.elements.length;
	for(var i = 0;i < length;i++)
	{
		var element = form.elements[i];
		if(!element.name)
			continue;
		switch(element.type)
		{
			case "text":
			case "hidden":
			case "password":
			//case "textarea":
				parameters.push(element.name+'='+encodeUTF8(element.value));
			break;
			case "checkbox":
			case "radio":
			if(element.checked)
				parameters.push(element.name+'='+encodeUTF8(element.value));
			break;
			case "select-one":
			{
				try{parameters.push(element.name+'='+encodeUTF8(element.options[element.selectedIndex].value));}
				catch(e){}
			}
			break;
			case "select-multiple":
			{
				for (id in element.options)
				{
					if(element.options[id].selected && element.options[id].selected==true)
					{
						try{parameters.push(element.name+'='+encodeUTF8(element.options[id].value));}catch(e){}
					}
				}
			}
			break;
		}
	}
	return parameters.join('&');
}

function checkUncheck(element)
{
	if(element.checked && element.getAttribute('okyase')=='true')
	{ 
		element.removeAttribute('checked');
		element.checked = false;
		element.setAttribute('okyase', 'false');
	}
	else
	{
		element.checked = true;
		element.setAttribute('okyase', 'true');
	}
}
function checkUncheckAll(nombre, form)
{	
	var formu  = form;
	for(var i=0; i<formu.length;i++)
	{
		if(formu[i].type == 'checkbox' && formu[i].id==nombre)
		{
			if(formu[i].checked == true)
				formu[i].checked = false;
			else
				formu[i].checked = true;
		}
	 }
}
function select_value(item)
{
	return item.options[item.selectedIndex].value;
}



