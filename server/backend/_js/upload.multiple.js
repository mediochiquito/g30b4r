
	function flashUploadMultiple(aIDSubida, form, outputToFunction, vars)
	{
		this.aIDSubida = aIDSubida;
		this.container = document.getElementById(aIDSubida+'_queue');
		this.form = form;
		this.vars = vars;
		if(document.getElementById(aIDSubida+'_flash'))
			document.getElementById(aIDSubida+'_flash').parentNode.removeChild(document.getElementById(aIDSubida+'_flash'));
		
		//this.counterProgressDisplays = 0;
		
		this.maxSizePHP = maxSizePHP;
		
		this.maxSize = maxPostSize;
		
		this.queue = Array();
		
		addFlash(aIDSubida, '_upload/upload_multiple.swf?maxSize='+this.maxSize+'&destino='+encodeURIComponent('./upload.php?')+'&jsObject='+aIDSubida, 16, 16);
		
		this.setDestino = function()
		{
			_(this.aIDSubida+'_flash').setDestino(form_get_variables(this.form)+'&'+this.vars);
		}
		
		this.onStartProcess = function(id_archivo)
		{
			var span = document.createElement('span');
			span.setAttribute('id', this.aIDSubida+'_'+id_archivo+'_progreso');
			
			this.queue[id_archivo] = span;
			
			var div = document.createElement('div');
			div.setAttribute('id', this.aIDSubida+'_'+id_archivo);
			div.setAttribute('class', 'uploadContenedor');
			div.appendChild(document.createTextNode(id_archivo));
			
			div.appendChild(span);
			
			this.container.appendChild(div);
		}
		this.onSecurityError = function(id_archivo, returnedString)
		{
			this.queue[id_archivo].innerHTML = ('<br>Error de seguridad:'+returnedString);
			this.queue[id_archivo].setAttribute('class', 'uploadError');
		}
		this.onHTTPError = function(id_archivo, url, returnedString)
		{
			this.queue[id_archivo].innerHTML = ('<br>El archivo está siendo subido a "'+url+'" en el cual el servidor responde "'+returnedString+'"');
			this.queue[id_archivo].setAttribute('class',  'uploadError');
		}
		this.onIOError = function(id_archivo)
		{
			this.queue[id_archivo].innerHTML = ('<br>IOError: El archivo que está intentando subir no puede ser leido. Compruebe que tenga acceso al mismo.');
			this.queue[id_archivo].setAttribute('class',  'uploadError');
		}
		this.onServerReturnedError = function(id_archivo, returnedString)//esto se ejecuta cuando el php retorna un error personalizado
		{
			if(!outputToFunction){}
			else
			{
				returnedString = returnedString.split('<!-- output2function -->');
				outputToFunction(returnedString[1]);
				returnedString = returnedString[0];
			}

			//alert('onServerReturnedError'+'_'+id_archivo);
			this.queue[id_archivo].innerHTML = ('<br>'+returnedString);
			this.queue[id_archivo].setAttribute('class', 'uploadError');
		}
		this.onProgress = function(id_archivo, loaded, total, percent)
		{
			//document.getElementById(aIDSubida).innerHTML = (loaded+' / '+total+'<br> '+percent+'%');
			//this.counterProgressDisplays++;
			if(percent== '100' )
				percent = '99';
			this.queue[id_archivo].innerHTML = ('<br>'+percent+'%');
			this.queue[id_archivo].setAttribute('class',  'uploadUploading');
		}
		this.onFinished = function(id_archivo, returnedString)
		{
			if(!outputToFunction){}
			else
			{
				returnedString = returnedString.split('<!-- output2function -->');
				outputToFunction(returnedString[1]);
				returnedString = returnedString[0];
			}
			
			if(returnedString && returnedString != ' ' && returnedString != '')
				this.queue[id_archivo].innerHTML = '<br>'+returnedString;
			else
				this.queue[id_archivo].innerHTML = ('<br>Archivo cargado con éxito');
			this.queue[id_archivo].setAttribute('class',  'uploadComplete');
			//alert(this.counterProgressDisplays);
		}
		this.onFileToBig=function(id_archivo, tamano)
		{
			this.queue[id_archivo].innerHTML = ('<br>El archivo que se intenta cargar pesa '+Math.round(tamano/1024/1024)+' Mb y es más grande que lo permitido '+this.maxSizePHP);
			this.queue[id_archivo].setAttribute('class', 'uploadError');
		}
		this.onCancel = function(id_archivo )
		{
			//alert('onCancel'+'_'+id_archivo);
		}
		this.onSelect = function(id_archivo )
		{
			//alert('onSelect'+'_'+id_archivo);
			this.queue[id_archivo].innerHTML = ('<br>El archivo está en cola de espera');
			this.queue[id_archivo].setAttribute('class',  'uploadCola');
		}
	}
	var uploads = new Array();
	
	function addFlash(donde, src, ancho, alto)
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

		document.getElementById(donde).appendChild(SWF);
	}