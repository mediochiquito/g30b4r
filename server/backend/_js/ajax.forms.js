// JavaScript Document

function encodeUTF8(string)
{
	try
	{
		return encodeURIComponent(string);
	}
	catch(err)
	{
		try
		{
			return encodeURI(string);
		}
		catch(err)
		{
			try
			{
				return escape(string);
			}
			catch(err)
			{
				return (string);
			}
		}
	}
}
function submitForm(form, url, reporter, functionToCall)
{
	var parameters = form_get_variables(form);
	Ajax(url, reporter, 'POST', parameters, false, false, functionToCall)
}
function sendRequest(url, reporter, functionToCall)
{
	Ajax(url, reporter, 'POST', '', false, false,functionToCall);
}
function sendPostRequest(url, vars, reporter, functionToCall)
{
	Ajax(url, reporter, 'POST', vars, false, false, functionToCall);
}