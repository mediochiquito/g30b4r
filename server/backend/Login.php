<h1>Login</h1> 
<div id="conteiner">
  <form id="form1" name="form1" method="post" action="login_send.php">
    <table border="0" cellpadding="0">
      <tr>
        <td width="76">Usuario:</td>
        <td width="150"><b>
          <input type="text" name="txt_user" id="txt_user" value="" style="width:150px;" class='form-control' />
        </b></td>
      </tr> 
      <tr>
        <td>Contraseña:</td>
        <td><b>
          <input type="password" name="txt_pass" id="txt_pass" value="" style="width:150px;" class='form-control' />
         
        </b></td>
      </tr>
      <tr>
        <td colspan="2" style="color:#F00;"><?
        if($_GET["error"] == 1){
			
			echo "Usuario o contraseña incorrecto.";
		}
		?></td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
        <td align="center"><input type="submit" name="Submit" id="button" value="Enviar" style="width:100px;" onclick="guardar(<?=$cant_prod?>);" /></td>
      </tr>
    </table>
  </form>
</div>