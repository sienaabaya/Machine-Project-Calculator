function anOp(i){
	if(i == '+' ||i == '-' ||i == '*' ||i == '/' ||i == '%' ||i == '^' ){
	return true;
	}else{
	return false;
	}
}

$(document).ready(function(){
	var num;
	var prevNum='';
	var currentNum='';
	var operator='';
	var latestInput ='';
	var prevOp ='';
	var lastChar='';
	var prevInput='';
	
	$(this).on('click','td', function(){
		$('#latestInput').text($(this).text());
		latestInput = $('#latestInput').text();
	});

	

	$(this).on('click','.num',function(){
		num = $(this).data('input');
			$('#answerBox').text(currentNum+''+num);
			currentNum= $('#answerBox').text();
			prevOp = operator;
			
	});

	$(this).on('click','.operator',function(){
		lastChar = $('#answerBox').text().slice(-1);
		prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-2);
		operator = $(this).text();
		$('#answerBox').text(currentNum+operator)
		$('#hiddenOp').text($(this).text());
		$('#prevNum').text(currentNum);
	/*	if(prevInput == '+'||prevInput == '-'||prevInput == '*'||prevInput == '/'||prevInput == '%' &&
			lastChar == '+'||lastChar == '-'||lastChar == '*'||lastChar == '/'||lastChar == '%'){
			$('#answerBox').text().slice(0,$('#answerBox').text().lenth -1);
		}else{
			$('#answerBox').text(currentNum+operator)
		}*/
		
		currentNum = $('#answerBox').text();
	});
	
	$(this).on('click','#answer', function(){
		$('#answerBox').text(eval($('#answerBox').text()));
		currentNum='';
	});
	
});

