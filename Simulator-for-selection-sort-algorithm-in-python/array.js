window.view = {
	numbers: new Array(),
	lastRedDiv: new Object(),
	nextRedDiv: new Object(),
	i: 0,
	j: 0,
	temp2:0,
	key: 0,
	sml:0,
	m: 0,
	min_idx:0,
	changeClass: function(id, className) {
		document.getElementById(id).className = className
	},
	getLastHighlightedDiv: function() {
		var findClass = document.getElementsByClassName('showDivInRed')
		return findClass[0]
	},
	resetVariables: function() {
		this.numbers = new Array()
		this.lastRedDiv = new Object()
		this.nextRedDiv = new Object()
		this.i = 1
		this.j = 0
		this.key = 0
		this.m = 0
	},
	getNextDivToHighlight: function(lastHighlightedDiv) {
		var next = lastHighlightedDiv.nextSibling
		next = next.nextSibling
		return next
	},
	jumpTo: function(targetDivId) {
		var element = document.createElement('div')
		element.id = targetDivId
		return element
	},
	disableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = true
	},
	enableButton: function(buttonId) {
		document.getElementById(buttonId).disabled = false
	},
	addClickEvent: function(id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	getArraySize: function() {
		var inputValue = document.getElementById('inputArraySize').value
		inputValue = Number(inputValue)
		return inputValue
	},
	activateEvents: function() {
		this.addClickEvent('btnOk', function() { view.proceedToStartButton() })
		this.addClickEvent('btnStart', function() { view.displayElements() })
		this.addClickEvent('btnNext', function() { view.sortArray() })
	},
	proceedToStartButton: function() {
		var userInput = this.getArraySize()
		if( isNaN( userInput ) === false ) {
			if( userInput !== 0 && userInput !== 1) {
				var element = document.getElementById('inputButtonRadio')
				element.className = 'show, radioButtonDivision'
				this.disableButton('btnOk')
				this.changeClass( 'btnOk', 'okButton buttonDisable' )
				this.enableButton( 'btnStart' )
				this.changeClass( 'btnStart', 'startButton button' )
			}
			else
				alert('Enter array size (greater than 1) !')
		}
		else
			alert( 'Size of the array must be an Integer !' )
	},
	generateRandomNumbers: function() {
		var inputValue = this.getArraySize()
		for ( i = 0 ; i < inputValue ; i++ ) {
			var random = Math.floor(Math.random()*15)
			this.numbers.push(String(random))
		}
	},
	getUserInput: function() {
		var inputValue = document.getElementById('userInput').value
		inputValue = inputValue.replace(/\s/g, ',')
		this.numbers = inputValue.split(',')
	},
	takeInputFromRadioBox: function() {
		var element = document.getElementsByName('radio_group')
		 if ( element[0].checked )    	
			this.generateRandomNumbers()
		else if (element[1].checked)
			this.getUserInput()
	},
	createBoxes: function() {
		for ( i = 0 ; i < this.numbers.length ; i++ ) {
			var outerDiv = document.createElement('div')
			outerDiv.className = 'outerDiv'
			var element = document.createElement('div')
			element.innerHTML = this.numbers[i]
				element.className = 'unSortedArray'
			outerDiv.appendChild(element)
			document.getElementById('sortingDiv').appendChild(outerDiv)
		}
	},
	removeImage: function() {
		var element = document.getElementsByTagName('img')
		if ( element.length > 0 )
			document.getElementById('sortingDiv').removeChild(element[0])
	},
	createImage: function(left, top) {
		var image = document.createElement('img')
		image.style.position = 'absolute'
		image.style.left = left + 'px'
		image.style.top = top  + 'px'
		image.style.opacity = '0.7'
        image.className = 'arrowImage'
		document.getElementById('sortingDiv').appendChild(image)
	},
	showCode: function() {
		document.getElementById('1-dArray').className = 'show, codeLayout'
	},
	validateUserInputs: function() {
		var result
		for ( i = 0 ; i < this.numbers.length ; i++ ) {
			if ( isNaN(Number(this.numbers[i])) )
				return false
		}
	},
	showImage: function() {
		var pos = this.getPositionOfElement()
		this.createImage(pos[0], pos[1])
	},
	getPositionOfElement: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		var posLeft = String(elements[this.j].offsetLeft + 1)
		var posTop = String(elements[this.j].offsetTop + 4)
		var position = []
		position.push(posLeft, posTop)
		return position
	},
	highlightNextStep: function() {
		this.changeClass(this.lastRedDiv.id, 'show')
		this.changeClass(this.nextRedDiv.id, 'showDivInRed')
	},
	convertFromStringToNumber: function() {
		for ( i = 0 ; i < this.numbers.length ; i++ )
			this.numbers[i] = Number(this.numbers[i])
	},
	displayElements: function() {
		this.takeInputFromRadioBox()
		var arraySize = this.getArraySize()
		var isValidInput = this.validateUserInputs()
		if ( arraySize === this.numbers.length ) {	
			if ( isValidInput === false)
				alert('Enter Numeric Values Only!')
			else {
				this.createBoxes()
				this.showCode()
				this.convertFromStringToNumber()
				this.disableButton('btnStart')
				this.changeClass( 'btnStart', 'startButton buttonDisable' )
				this.enableButton('btnNext')
				this.changeClass( 'btnNext', 'button nextButton' )
				this.changeClass( 'line1' , 'showDivInRed')
			} 
		}
		else
			alert('number of inputs must be equal to the size of the array')	
	},
	setKey: function() {
		var element = document.getElementById('sortingDiv').childNodes
		document.getElementById('key').innerHTML = element[this.i].firstChild.innerHTML
		var elements = document.getElementById('sortingDiv').childNodes
		elements[this.i].firstChild.style.background = '#F5B941'
	},
	setMinIdx:function( pos){
			for(var ii=1;ii<document.getElementsByClassName('sml_').length;ii++){
				document.getElementsByClassName('sml_')[ii].style.background = '#558cff'
				document.getElementsByClassName('sml_')[ii].className='unSortedArray'					
			}

			var elements = document.getElementById('sortingDiv').childNodes
			elements[pos].firstChild.className='sml_'
	},

	jIter:function(){
		var elements = document.getElementById('sortingDiv').childNodes
		if(this.j==this.i+1){

			elements[this.j].firstChild.style.background='White'
		}
		else{
			if(elements[this.j-1].firstChild.className=='sml_'){
				elements[this.j].firstChild.style.background='White'
			}
			else{

				elements[this.j-1].firstChild.style.background='#558cff'
				elements[this.j-1].firstChild.className='unSortedArray'
				elements[this.j].firstChild.style.background='White'
			}
		}
	},

	showSwap:function(){
			var elements = document.getElementById('sortingDiv').childNodes
			elements[this.sml].firstChild.innerHTML=this.numbers[this.sml]
			elements[this.key].firstChild.innerHTML=this.numbers[this.key]
			elements[this.sml].firstChild.className='unSortedArray'
			elements[this.sml].firstChild.style.background='#558cff'

	},

	swapText: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		elements[this.j + 1].firstChild.innerHTML = elements[this.j].firstChild.innerHTML 
		var temp = this.numbers[this.j]
	},
	insertKey: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		elements[this.j + 1].firstChild.innerHTML = document.getElementById('key').innerHTML
	},
	showElementAsSorted: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		elements[this.i - 1].firstChild.className='sortedArray'
		elements[this.i - 1].firstChild.style.background = '#41B247'
	},
	updateArray: function() {
		var elements = document.getElementById('sortingDiv').childNodes
		for ( i = 0 ; i < this.numbers.length ; i ++ ) {
			this.numbers[i] = Number(elements[i].firstChild.innerHTML)
		}
	},
	clearDivs: function() {
		document.getElementById('key').innerHTML = 0
		document.getElementById('1-dArray').className = 'hide codeLayout'
		document.getElementById('sortingDiv').innerHTML = ''
		document.getElementById('inputArraySize').value = ''
		document.getElementById('inputButtonRadio').className = 'radioButtonDivision hide'
		document.getElementById('btnRandom').checked = false
		document.getElementById('btnManual').checked = false
	},
	sortArray: function() {
		this.lastRedDiv = this.getLastHighlightedDiv()
		this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv)
		if(this.lastRedDiv.id=='line2'){
			this.j=this.i+1
			this.setKey()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line3' ) {
			this.sml=this.i
			var elements = document.getElementById('sortingDiv').childNodes
			//elements[this.sml].firstChild.className='sml_'
			this.setMinIdx(this.i)
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line4' ) {
			this.jIter()
			this.highlightNextStep()
		}
		else if ( this.lastRedDiv.id === 'line5' ) {
			if(this.numbers[this.sml]>this.numbers[this.j]){
				this.highlightNextStep()
			} 
			else{
				if(this.j+1==this.numbers.length){
					
					this.nextRedDiv = this.jumpTo('line7')
			var elem = document.getElementById('sortingDiv').childNodes
			if(elem[this.numbers.length-1].firstChild.className!='sml_'){
				elem[this.numbers.length-1].firstChild.style.background='#558cff'
			}

					this.highlightNextStep()
				}
				else{
					this.j=this.j+1
					this.nextRedDiv=this.jumpTo('line4')
					this.highlightNextStep()
				}
				
			}
		}

		else if(this.lastRedDiv.id==='line6'){
			this.sml=this.j
			this.setMinIdx(this.j)
			if(this.j+1==this.numbers.length){
				this.nextRedDiv = this.jumpTo('line7')

			var elem = document.getElementById('sortingDiv').childNodes
			if(elem[this.numbers.length-1].firstChild.className!='sml_'){
				elem[this.numbers.length-1].firstChild.style.background='#558cff'
			}
				this.highlightNextStep()
			}
			else{
				this.j=this.j+1
				this.nextRedDiv=this.jumpTo('line4')
				this.highlightNextStep()
			}
		}
		else if(this.lastRedDiv.id==='line7'){



			temp2=this.numbers[this.i]
			this.numbers[this.i]=this.numbers[this.sml]
			this.numbers[this.sml]=temp2
			this.showSwap()	
			if (this.i==this.numbers.length-2) {
				this.highlightNextStep()
			}
			else{
				this.i=this.i+1
				this.key=this.key+1
				this.showElementAsSorted()
				this.nextRedDiv=this.jumpTo('line2')
				this.highlightNextStep()
			}
		}

		else if(this.lastRedDiv.id==='line8'){
			var elements = document.getElementById('sortingDiv').childNodes
			for ( var ij = 0 ; ij < this.numbers.length ; ij ++ ) {
				elements[ij].firstChild.className='sortedArray'
				elements[ij].firstChild.style.background = '#41B247'
			}
						

			this.highlightNextStep()
		}

		else if(this.lastRedDiv.id==='line9'){
						this.disableButton('btnNext')
			this.changeClass( 'btnNext', 'disableButton nextButton' )
			alert('List is sorted');
		}

		// else


		else{this.highlightNextStep()
		}
	},
	init: function() {
		this.activateEvents()
	}
}
window.onload = function() { view.init() }

	function reloadbn(){
		window.location.reload()
	}