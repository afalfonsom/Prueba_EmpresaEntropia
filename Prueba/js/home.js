$(function(){
    //Esta función se ejecutará cada vez que la página inicie
    
});
var IMC="";
function open_request_data_modal(){
	$('#modal_datos').modal();
}
/* esta funcion permite capturas los datos enviados en la url lo que se busca con este metodo es comenzar a hacer un split en la url 
en primer lugar el nombre de la variable almacenado en un array clave valor entonces el nombre de la variable seria la clave y el valor de la
variable que tambien es obtenido mediante el split de la url es el valor de este arrelgo despues de hacer esto se llama a un metodo
que se llama calucar imc el cual como su nombre lo indica calcula el IMC para posteriormente enviar el resultado a la nueva pagina web */
function obtenerValoresUrl(){
	var query = function () {
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = pair[1];
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]], pair[1] ];
				query_string[pair[0]] = arr;
			} else {
				query_string[pair[0]].push(pair[1]);
			}
		} 
		return query_string;
	} (); 
	calcularIMC(query['peso'],query['altura']);
	document.getElementById("mostrar").innerHTML =IMC;

}

/*funcion encargada de obtener los campos almacenados en el array query donde se encuentra los valores de peso y altura
para luego hacer el calculo del IMC ademas de esto evaluo si la persona tiene un IMC adecuado o tiene sobre peso
para luego enviar una variable con el calculo del imc*/
function calcularIMC(peso, altura ){
	var resultado= peso/((altura/100)*(altura/100));
	console.log(resultado);
	if(resultado < 18.5){
		return IMC="<p><h2>Su Indice de Masa corporal es: </h2> <h2>"+resultado+"</h2> <br> <h1> Esta debajo por debajo del peso</h1></p>";
	}
	if(resultado >= 18.5 && resultado < 24.9){
		return IMC="<p><h2>Su Indice de Masa corporal es:  </h2> <h2> "+resultado+"</h2> <br> <h1> Usted esta Saludable</h1></p>";
	}
	if(resultado >= 25 && resultado < 29.9){
		return IMC="<p><h2>Su Indice de Masa corporal es:  </h2> <h2>"+resultado+"</h2> <br> <h1> Usted esta Con sobre peso</h1></p>";
	}
	if(resultado >= 30 && resultado < 39.9){
		return IMC="<p><h2>Su Indice de Masa corporal es:  </h2> <h2>"+resultado+"</h2> <br> <h1>Cuidado Obesidad</h1></p>";
	}
	else{
		return IMC+="<p><h2>Su Indice de Masa corporal es:  </h2> <h2>"+resultado+"</h2> <br> <h1> Obesidad extrema o de alto riesgo</h1></p>";
}

}
/*esta funcion es la encargada de capturar los valores del peso y altura de la url para enviarlos hacia la nueva ventana
donde se mostraran los resultados*/
function enviarParametros(){
	var parametros="";
	var peso= document.getElementById("person_weight").value;
	var altura= document.getElementById("person_height").value;
	parametros= parametros+"peso="+peso+"&altura="+altura;
	window.location.assign("resultado.html?"+parametros);
} 
