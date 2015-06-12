
function formExitManagerStart()
{
	formExitManagerSaveDefaultForm();
    window.onbeforeunload = formExitManager;
}
function formExitManager(event_)
{
	if(!event_ && window.event)
		event_ = window.event;
		
	if(isSubmited)
		isSubmited=false;
	else
	{
		var results = formExitManagerCompareForm();

		if (!results) 
		{
			var msg = "¡El documento ha sido modificado pero no guardado!";
			event_.returnValue = msg;
			return msg;
		}
		
	}
	return null;
}


function formExitManagerSaveDefaultForm()
{
	for(var a=0;a<document.forms.length;a++)
	{
		if(
		   (document.forms[a].hasAttribute('id') && document.forms[a].getAttribute('id') =='formu' ) ||
		   (document.forms[a].hasAttribute('name') && document.forms[a].getAttribute('name') =='formu' ) 
		)
			var formu = document.forms[a];
	}
	
	for(var i = 0; i < formu.elements.length; i++)
	{
		//alert('guardando '+formu.elements[i].id+'');
		if(!formu.elements[i].hasAttribute('name')  || formu.elements[i].hasAttribute('disabled')  || formu.elements[i].type == 'button'   || formu.elements[i].type == 'submit'){}
		else
			formClean[i] = getFormElementValue(formu.elements[i]);
	}
}

function formExitManagerCompareForm()
{
	for(var a=0;a<document.forms.length;a++)
	{
		if(document.forms[a].hasAttribute('id') && document.forms[a].getAttribute('id') =='formu')
			var formu = document.forms[a];
	}
	
	for(var i = 0; i < formu.elements.length; i++)
	{
		if(!formu.elements[i].hasAttribute('name') || formu.elements[i].hasAttribute('disabled')  || formu.elements[i].type == 'button'   || formu.elements[i].type == 'submit' ){}
		else
		{
			var newvalue =  getFormElementValue(formu.elements[i]);
			//alert('comparando el input con nombre"'+formu.elements[i].name+'" y valor anteiro '+formClean[i]+' con valor nuevo '+newvalue+'');
			if(formClean[i] != getFormElementValue(formu.elements[i]))
				return false;
		}
	}
	return true;
}

function getFormElementValue(el) {
	for(var a=0;a<document.forms.length;a++)
	{
		if(document.forms[a].hasAttribute('id') && document.forms[a].getAttribute('id') =='formu')
			var formu = document.forms[a];
	}

	  if (el.type == "radio") {
		return getRadioElementValue(formu[el.name]);
	  } else if (el.type == "checkbox") {
		return '';
	  } else if (el.type == "select") {
		return formu[el.id].seletedIndex.value;
	  } else {
		return el.value;
	  }
}
function getRadioElementValue(radio) {
  for (var j = 0; j < radio.length; j++) {
    if (radio[j].checked) {
      return radio[j].value;
    } else {
      return null;
    }
  }
  return null;
}

