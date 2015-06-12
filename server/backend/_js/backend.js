// JavaScript Document
function filtrar_listas(selected)
{
	
	selected = selected_value(selected);
	
	var lista = document.getElementsByName('lista');
	
	if(lista[0].hasAttribute('category') && lista[0].hasAttribute('lugar'))
	{
		var lugar = selected_value(_('_fotos_lugares_id_lugares'));
		var  category= selected_value(_('_fotos_lugares_id_categorias'));
		
		for(var a=0;a<lista.length;a++)
		{
			var item = lista[a];
			
			
			if(
			   	(item.getAttribute('category') == category || category == '') && 
				(item.getAttribute('lugar') == lugar || lugar=='') 
			)
			{
				item.style.display = 'block';
			}
			else
			{
				item.style.display = 'none';
			}
		}
	}
	else
	{
		for(var a=0;a<lista.length;a++)
		{
			var item = lista[a];
			if(item.getAttribute('category') == selected)
			{
				item.style.display = 'block';
			}
			else
			{
				item.style.display = 'none';
			}
			if(selected == '')
			{
				item.style.display = 'block';
			}
		}
	}
	return;
}

function filtrar_hoteles(selected)
{
	selected = selected_value(selected);
	var lista = document.getElementsByName('lista');
	
	if(lista[0].hasAttribute('category'))
	{
		var category = selected;
		
		for(var a=0;a<lista.length;a++)
		{
			var item = lista[a];
			if(
			   	(item.getAttribute('category') == category || category == '') 
			)
			{
				item.style.display = 'block';
			}
			else
			{
				item.style.display = 'none';
			}
		}
	}
	else
	{
		for(var a=0;a<lista.length;a++)
		{
			var item = lista[a];
			if(item.getAttribute('category') == selected)
			{
				item.style.display = 'block';
			}
			else
			{
				item.style.display = 'none';
			}
			if(selected == '')
			{
				item.style.display = 'block';
			}
		}
	}
	return;
}

function pub_des_pub($tabla, $id, $value){
	
	var publicar=1;
	if(!$value){
		publicar = 0;
	}
	
	Ajax("publicar_despublicar.php", "", "POST", "tabla="+$tabla+"&id="+$id+"&value="+publicar);
}

function filtrar_listas_multi()
{
	//selected = selected_value(selected);
	
	var lista = document.getElementsByName('lista');
	

		var lugar = selected_value(_('_fotos_lugares_id_lugares'));
		var category= selected_value(_('_fotos_lugares_id_categorias'));
		
		for(var a=0;a<lista.length;a++)
		{
			var item = lista[a];
			
			
			if(
			   	(item.getAttribute('category_' + category) == "1" || category == '') && 
				(item.getAttribute('lugar_' + lugar) == "1" || lugar=='') 
			)
			{
				item.style.display = 'block';
			}
			else
			{
				item.style.display = 'none';
			}
			
			
		}
	
	return;
}