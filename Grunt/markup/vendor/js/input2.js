function summValue(n) {
	var value = parseInt(n),
		maxValueFactorial = 20;

	if(!value || isNaN(value)){
		return 'Incorrect value';
	}

	if(value > maxValueFactorial){
		return 'Please input value < ' + maxValueFactorial;
	}

	if(value === 1){
		return 1;
	}
	else{
		return value + summValue(value - 1);
	}
}