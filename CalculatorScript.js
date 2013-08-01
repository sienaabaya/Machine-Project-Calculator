function ifOperator(i){
	return ['+','-','*','/','%'].indexOf(i) != -1;
}
$(document).ready(function(){
	var num = new Array();
	var expressionContent = new Array();
	var currentNum='';
	var operator='';
	var lastChar='';
	var prevInput='';
	function evaluate(){
		lastChar = $('#answerBox').text().slice(-1);
		prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
			if(ifOperator(prevInput)&&ifOperator(lastChar)){
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
				currentNum = $('#answerBox').text();
				$('#answerBox').text(currentNum+operator);
			}else{
				$('#answerBox').text(currentNum+operator);
			}
		currentNum = $('#answerBox').text();
	}
	function enterNumber(number){
			var thirdToTheLast = $('#answerBox').text().charAt($('#answerBox').text().length-2);
			var secondToTheLast = $('#answerBox').text().charAt($('#answerBox').text().length-1);
			$('#answerBox').text(currentNum+''+number);
			currentNum= $('#answerBox').text();
			prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-2);
			if((ifOperator(thirdToTheLast)||thirdToTheLast=='')
				&&secondToTheLast=='0'&&(number!='0' && !ifOperator(number))){
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -2)+number);
				currentNum = $('#answerBox').text();
			}else if((ifOperator(thirdToTheLast)||thirdToTheLast=='')
				&&secondToTheLast=='0'&&number=='0') {
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
				currentNum = $('#answerBox').text();
			}
			if(prevInput=='.' && number=='.'){
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
				currentNum = $('#answerBox').text();
			}
		}	
	$(this).on('click','.num',function(){		
			enterNumber($(this).text());
	});
	$(this).on('click','.operator',function(){
		$('#hiddenOp').text($(this).text());
		operator =$('#hiddenOp').text();
		evaluate();
	});	
	$(this).on('click','#answer', function(){
		try{
			$('#answerBox').text(eval($('#answerBox').text()));
			currentNum=$('#answerBox').text();
		}catch(err){
			$('#answerBox').text('');
			currentNum = $('#answerBox').text('');
			$('#ac').click();
		}
	});	
	$(this).on('click', '#ac', function(){
		$('#answerBox').text('');
		$('#hiddenOp').text('');
		currentNum='';
		operator='';
	});
	$(this).on('click', '#del',function(){
		$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
		currentNum = $('#answerBox').text();
	});
	$('html').keypress(function(e){
		if((e.keyCode<=57&&e.keyCode>=46)&& e.keyCode!=47){
			try{
				enterNumber(String.fromCharCode(e.keyCode));
			}catch(err){
				$('#ac').click();
			}
		}else if(e.keyCode == 61 || e.keyCode == 13){
			$('#answer').click();
		}else if(e.keyCode==42 || e.keyCode==43 || e.keyCode==45 || e.keyCode==46 || e.keyCode==47 || e.keyCode==37){
			operator =String.fromCharCode(e.keyCode);
			$('#hiddenOp').text(String.fromCharCode(e.keyCode));
			evaluate();
		}
	}).bind('keydown',function(e){
		if(e.keyCode == 8)
			$('#del').click();
	});
});
