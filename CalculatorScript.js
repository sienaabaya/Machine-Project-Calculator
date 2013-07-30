function anOp(i){
	return ['+','-','*','/','%'].indexOf(i) != -1;
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
	function enterNumber(number){
			$('#answerBox').text(currentNum+''+number);
			currentNum= $('#answerBox').text();
			prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-2);
			if((anOp(prevInput) || prevInput=='') && number=='0'){
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
				currentNum = $('#answerBox').text();
			}else if(prevInput=='.' && number=='.'){
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
			console.log(err);
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
		if((e.keyCode<58 && e.keyCode>45)&& e.keyCode!=47){
			try{
				enterNumber(String.fromCharCode(e.keyCode));
			}catch(err){
				console.log(err);
				$('#ac').click();
			}
		}else if(e.keyCode == 61 || e.keyCode == 13){
			$('#answer').click();
		}else if((e.keyCode<48 && e.keyCode>41 || e.keyCode == 37)&& e.keyCode != 44 || e.keyCode != 46){
			operator =String.fromCharCode(e.keyCode);
			$('#hiddenOp').text(String.fromCharCode(e.keyCode));
			evaluate();
		}else{	
		}	
	}).bind('keydown',function(e){
		if(e.keyCode == 8)
			$('#del').click();

	});
});
