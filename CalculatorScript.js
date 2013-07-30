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
	function enterNumber(){
			$('#answerBox').text(currentNum+''+num);
			currentNum= $('#answerBox').text();
			prevInput = $('#answerBox').text().charAt($('#answerBox').text().length-2);
			if((anOp(prevInput) || prevInput=='') && num=='0'){
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
				currentNum = $('#answerBox').text();
			}else if(prevInput=='.' && num=='.'){
				$('#answerBox').text($('#answerBox').text().slice(0,$('#answerBox').text().length -1));
				currentNum = $('#answerBox').text();
			}
		}	
	$(this).on('click','.num',function(){		
			num = $(this).data('input');
			enterNumber();
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
				num=String.fromCharCode(e.keyCode);
				enterNumber();
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
	});
	$('html').bind('keydown',function(e){
		if(e.keyCode == 8)
			$('#del').click();

	});
});
