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
		prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
		$('#answerBox').text(currentNum+operator)
		$('#hiddenOp').text($(this).text());
		$('#prevNum').text(currentNum);
		operator =$('#hiddenOp').text();
		console.log(prevInput);
		if(anOp(prevInput)&&anOp(lastChar)){
			prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
			console.log('same op');
			$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -2));
			currentNum = $('#answerBox').text();
			$('#answerBox').text(currentNum+operator);
		}else{
			$('#answerBox').text(currentNum+operator)
		}
		prevNum = currentNum;
		currentNum = $('#answerBox').text();
	});
	
	$(this).on('click','#answer', function(){
		$('#answerBox').text(eval($('#answerBox').text()));
		currentNum=$('#answerBox').text();
	});
	
	$(this).on('click', '#ac', function(){
		$('#answerBox').text('');
		$('#prevNum').text('-');
		$('#hiddenOp').text('');
		$('#latestInput').text('');
		currentNum='';
		operator='';
		prevNum='';
	});

	$(this).on('click', '#del',function(){
		$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
		currentNum = $('#answerBox').text();
	});

	$('html').keypress(function(e){

		if(e.keyCode<58 && e.keyCode>47|| e.keyCode == 46){
			$('#answerBox').text($('#answerBox').text()+String.fromCharCode(e.keyCode));
			currentNum=$('#answerBox').text();
		}else if(e.keyCode == 61 || e.keyCode == 13){
			$('#answer').click();
		}else if((e.keyCode<48 && e.keyCode>41 || e.keyCode == 37)&&e.keyCode != 44 &&e.keyCode != 46){
			lastChar = $('#answerBox').text().slice(-1);
			prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
			operator =String.fromCharCode(e.keyCode);
			$('#answerBox').text(currentNum+operator)
			$('#hiddenOp').text(String.fromCharCode(e.keyCode));
			$('#prevNum').text(currentNum);
				if(anOp(prevInput)&&anOp(lastChar)){
					prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-1);
					console.log('same op');
					$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -2));
					currentNum = $('#answerBox').text();
					$('#answerBox').text(currentNum+operator);
				}else{
					$('#answerBox').text(currentNum+operator)
				}
			prevNum = currentNum;
			currentNum = $('#answerBox').text();
		}else{	
		}
		
	});

	$('html').bind('keydown',function(e){
		if(e.keyCode == 8)
			$('#del').click();
	});
	

});
