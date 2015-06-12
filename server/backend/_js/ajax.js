function Ajax(pag, enDiv, metodo, parametros, incrementarEnDiv, evaluarContenido, functionToCall)
{
	if(!pag)
		pag = document.location;
	
	var ajax = new XMLHttpRequest();
	ajax.open(metodo, pag, true);
	ajax.onreadystatechange = function()
	{
		if (ajax.readyState == 1 || ajax.readyState == 2 || ajax.readyState == 3)
			document.getElementById('ajax_cargando').style.display = "block";

		if (ajax.readyState == 4)
		{ 
			try
			{
				if (ajax.status == 200)
				{
					var htmlDoc =  ajax.responseText;

					if(htmlDoc.indexOf('<!-- error de login -->') != -1)
					{
						document.location.replace('_logout.php');
						return;
					}
						
					if(enDiv != '' &&  typeof(enDiv) != 'undefined' && !document.getElementById(enDiv))
					{
						alert('La div '+enDiv+' no existe');
					}
					
					if(incrementarEnDiv==false)
					{
						if(!document.getElementById(enDiv)){}
						else
						{
							document.getElementById(enDiv).innerHTML = htmlDoc;
							try
							{
								if(document.getElementById(enDiv).style.display == 'none')
									document.getElementById(enDiv).style.display = 'block';
								if(enDiv=='mensaje_reporter')
								{
									document.getElementById('mensaje_reporter_cerrar').style.display = 'block';
								}
							}catch(e){alert(e)}
						}
					}
					else
					{
						if(!document.getElementById(enDiv)){}
						else
						{
							document.getElementById(enDiv).innerHTML += htmlDoc;
							try
							{
								if(document.getElementById(enDiv).style.display == 'none')
									document.getElementById(enDiv).style.display = 'block';
								if(enDiv=='mensaje_reporter')
								{
									document.getElementById('mensaje_reporter_cerrar').style.display = 'block';
								}
							}catch(e){alert(e)}
						}
					}
					if(evaluarContenido != false && evaluarContenido != '')
					{
						var xmlDoc =  ajax.responseXML;
						AjaxEvaluar(xmlDoc)
					}
					if(!functionToCall || functionToCall=='' || htmlDoc.indexOf('<!-- error -->')!= -1){}
					else
					{
						//alert('llamando a '+functionToCall+' ');
						setTimeout(functionToCall, 250);
					}
					document.getElementById('ajax_cargando').style.display = "none"
	
				}
			}
			catch(e)
			{
				
			}
		}
	}
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send(parametros);
}

function AjaxEvaluar(xmlDoc)
{
	if(xmlDoc.getElementsByTagName("script").length>0)
	{
		var script_a_ejecutar = xmlDoc.getElementsByTagName("script").item(0).firstChild.data;
		eval(script_a_ejecutar);
	}
}