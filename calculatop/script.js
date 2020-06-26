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
        if (displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ) {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
    } 

       //ACTION KEY
     if (
           action === 'add' ||
           action === 'subtract' ||
           action === 'multiply' ||
           action === 'devide'
     ){
         const firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         const secondValue = displayedNum;

         //CHECK FOR firstValue AND operator BECAUSE secondValue IS ALWAYS EXISTS   
         if (
             firstValue &&
             operator &&
             previousKeyType !== 'operator' &&
             previousKeyType !== 'calculate'
             ) {
             const calcValue = calculate(firstValue, operator, secondValue);
             display.textContent = calcValue;             

             //UPDATE CALCULATE VALUE AS firstValue
             calculator.dataset.firstValue = calcValue;
         } else {
             //IF THERE ARE NO CALCULATIONS, SET displayedNum AS THE firstValue
             calculator.dataset.firstValue = displayedNum;
         }

        key.classList.add('.is-depressed')
        //ADD CUSTOM ATTRIBUTE
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
     }

     if (action === 'decimal') {
         if (!displayedNum.includes('.')) {
         display.textContent = displayedNum + '.';
     }  else if (
         previousKeyType === 'operator' ||
         previousKeyType === 'calculate'
         ) {
         display.textContent = '0.';
     }
         calculator.dataset.previousKeyType = 'decimal';
    }
      //CLEAR
     if (action === 'clear') {
         if (key.textContent === 'AC') {
             calculator.dataset.firstValue = '';
             calculator.dataset.modValue = '';
             calculator.dataset.operator = '';
             calculator.dataset.previousKeyType = ''
         } else {
             key.textContent = 'AC';
         }

         display.textContent = 0;
         calculator.dataset.previousKeyType = 'clear';
     }
     if (action !== 'clear') {
         const clearButton = calculator.querySelector('[data-action=clear]');
         clearButton.textContent = 'CE';

     }


     //CALCULATE FUNCTION
     const calculate = (n1, operator, n2) => {
         let  result = '';

         if (operator === 'add') {
             result = parseFloat(n1) + parseFloat(n2);
         }  if (operator === 'subtract') {
             result = parseFloat(n1) - parseFloat(n2);
         }  if (operator === 'multiply') {
             result = parseFloat(n1) * parseFloat(n2);
         }  if (operator === 'devide') {
             result = parseFloat(n1) / parseFloat(n2);
         }

         return result;

     }

     if (action === 'calculate') {
         let firstValue = calculator.dataset.firstValue;
         const operator = calculator.dataset.operator;
         let secondValue = displayedNum;

    if (firstValue) {
        if (previousKeyType === 'calculate') {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
        }

         display.textContent = calculate(firstValue, operator, secondValue);
    }
    //SET modValue ATTRIBUTE
         calculator.dataset.modValue = secondValue;
         calculator.dataset.previousKeyType = 'calculate';
        }
        
    }
})

