//LISTEN FOR ALL KEYPRESSES
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display');

keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        
        const key = e.target;
        const action = key.dataset.action;
        //DISPLAYING NUMBERS THROUGH THE textContent
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        
        //REMOVE .is-depressed class FROM ALL KEYS
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('.is-depressed'))
        

     if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
     } 

       //ACTION KEY
     if (action === 'add' ||
           action === 'subtract' ||
           action === 'multiply' ||
           action === 'devide'
     ){
        key.classList.add('.is-depressed')
        //ADD CUSTOM ATTRIBUTE
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
     }

     if (action === 'decimal') {
         display.textContent = displayedNum + '.'
     }
      //CLEAR
     if (action === 'clear') {
         console.log('clear key');
     }


     //CALCULATE FUNCTION
     const calculate = (n1, operator, n2) => {
         let = '';

         if (operator === 'add') {
             result = parseFloat(n1) + parseFloat(n2);
         } else if (operator === 'subtract') {
             result = n1 - n2;
         } else if (operator === 'multiply') {
             result = n1 * n2;
         } else if (operator === 'devide') {
             result = n1 / n2;
         }

         return result;

     }

     if (action === 'calculate') {
         const firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         const secondValue = displayedNum;

         display.textContent = calculate(firstValue, operator, secondValue);
        }
        
    }
})

