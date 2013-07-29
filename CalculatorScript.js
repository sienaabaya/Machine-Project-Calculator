function anOp(i){
	if(i == '+' ||i == '-' ||i == '*' ||i == '/' ||i == '%' ||i == '^' ){
	return true;
	}else{
	return false;
	}
}
$(document).ready(function(){
	var num;
	var currentNum='';
	var operator='';
	var lastChar='';
	var prevInput='';
	function evaluate(){
		lastChar = $('#answerBox').text().slice(-1);
		prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
		$('#answerBox').text(currentNum+operator)
			if(anOp(prevInput)&&anOp(lastChar)){
				prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -2));
				currentNum = $('#answerBox').text();
				$('#answerBox').text(currentNum+operator);
			}else{
				$('#answerBox').text(currentNum+operator)
			}
		currentNum = $('#answerBox').text();
		}	
	$(this).on('click','.num',function(){
		num = $(this).data('input');
		$('#answerBox').text(currentNum+''+num);
		currentNum= $('#answerBox').text();		
	});
	$(this).on('click','.operator',function(){
		$('#hiddenOp').text($(this).text());
		operator =$('#hiddenOp').text();
		evaluate();
	});	
	$(this).on('click','#answer', function(){
		$('#answerBox').text(eval($('#answerBox').text()));
		currentNum=$('#answerBox').text();
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
		if(e.keyCode<58 && e.keyCode>47){
			$('#answerBox').text($('#answerBox').text()+String.fromCharCode(e.keyCode));
			currentNum=$('#answerBox').text();
		}else if(e.keyCode == 61 || e.keyCode == 13){
			$('#answer').click();
		}else if((e.keyCode<48 && e.keyCode>41 || e.keyCode == 37)&&e.keyCode != 44){
			operator =String.fromCharCode(e.keyCode);
			$('#hiddenOp').text(String.fromCharCode(e.keyCode));
			evaluate();
		}else{	
		}	
	});
	$('html').bind('keydown',function(e){
		if(e.keyCode == 8)
			$('#del').click();
	});
});
