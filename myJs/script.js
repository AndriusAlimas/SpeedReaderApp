// JavaScript Document
$(function(){
  	// declare variables
  		var myArray;
		var inputLength;
		var reading = false;
		var counter;
		var action;
		var frequency = 200;
	
  	// on page load hide elements we don't need, leave only text area and start button
hideElements(['#new','#resume','#pause','#result','#error','#all-sliders']);
	
  	// click on Start Reading
  	$("#start").click(function(){
		// get text and split it to words inside an array
		// \s match spaces, tabs , new lines, etc and + means one or more.
		myArray = $("#userInput").val().split(/\s+/);
		
		// get the number of words
		inputLength = myArray.length;
		
		if(inputLength>1){ // there is enough inputs
		    // move to reading mode
			reading = true;
			
			hideElements(['#start','#error','#userInput']);
			showElements(['#new','#pause','#all-sliders']);
			
			// start the counter at zero
			counter = 0;
			
			// change slider-progress min & max values
			$("#slider-progress").attr("min",counter);
			$("#slider-progress").attr("max",inputLength - 1);
	
			// show reading box with first word
			$("#result").show();
			$("#result").text(myArray[counter]);
					
			// start reading from the first word	
			action = setInterval(read,frequency);	
			
		   }else{ // not enough text input
			   $("#error").show();
			   
		   }
	});
	
	// click on New
	$("#new").click(function(){
	  // reload page
		location.reload();
	});
	
  	// click on Pause
   $("#pause").click(function(){
	   // stop reading and switch to none reading mode
	   clearInterval(action);
	   reading = false;
	   
	   // Hide Pause Button
	   $("#pause").hide();
	   
	   // Show Resume Button
	   $("#resume").show();
   });
	
  	// click on Resume
	$("#resume").click(function(){
	   // resume reading
		reading = true;
		action = setInterval(read,frequency);
		
		// hide resume and show pause buttons
		$("#resume").hide();
		$("#pause").show();
	});
	
  // SLIDERS
  	// click on fontSize
  		$("#slider-font").on("slidestop",function(event,ui){
			// refresh the slider
			$("#slider-font").slider("refresh");
			
			// get the value
			var slider_value = parseInt($("#slider-font").val());
			
			// the word inside box change font size 
			$("#result").css("fontSize",slider_value);
			
			// change font-size slider text value to see font size
			$("#fontSize").text(slider_value);
			
		});
	
  	// click on speed
  		$("#slider-speed").on("slidestop",function(event,ui){
			// refresh the slider
			$("#slider-speed").slider("refresh");
			
			// get the value
			var slider_value = parseInt($("#slider-speed").val());
			
			// change text value to see speed
			$("#speed").text(slider_value);
			
			// stop reading
			clearInterval(action);
			
			// change frequency
			frequency = 60000 / slider_value;
			
			// resume reading if we are in reading mode
			if(reading){
				action = setInterval(read,frequency);	
			}
			
		});
	
  	// progress slider
  		$("#slider-progress").on("slidestop",function(event,ui){
			// refresh the slider
			$("#slider-progress").slider("refresh");	
			
			// get the value
			var slider_value = parseInt($("#slider-progress").val());
			
			// stop reading
			clearInterval(action);
			
			// change counter
			counter = slider_value;
			
			// change word
			$("#result").text(myArray[counter]);
			
			// change value of progress
			$("#percentage").text(Math.floor(counter / (inputLength - 1) * 100));
			
			if(reading){
				action = setInterval(read,frequency); // back to reading
			}
		});
	
  	// FUNCTIONS
	// hide elements we don't need
	function hideElements(arrayHide){
		for(i=0;i<arrayHide.length;i++){
			$(arrayHide[i]).hide();
		}
	}
	
	// show elements we need to see
	function showElements(arrayShow){
		for(i=0;i<arrayShow.length;i++){
			$(arrayShow[i]).show();
		}
	}
	
	
	function read(){
		if( counter == inputLength - 1){ // last word
			clearInterval(action); // stop reading
			reading = false; // change to none reading mode
			$("#pause").hide();
		}else{
			counter++; // go to next word
			
			// get word
			$("#result").text(myArray[counter]);
			
			// changing progress slider value and refresh
			$("#slider-progress").val(counter).slider('refresh');
			
			// change text of percentage
			$("#percentage").text(Math.floor(counter / (inputLength - 1) * 100));
		}
	}
	
  });