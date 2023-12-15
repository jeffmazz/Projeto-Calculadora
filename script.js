const firstNumber = document.querySelector('#firstNumber')
const secondNumber = document.querySelector("#secondNumber")
const operator = document.querySelector("#op")

const numbers = document.querySelectorAll(".number")
const minusOperator = document.querySelector("#minus")
const operators = document.querySelectorAll(".operator")

const point = document.querySelector("#point")
const cleanOne = document.querySelector("#cleanOne")
const cleanCurrentNumber = document.querySelector("#cleanCurrentNumber")
const cleanAll = document.querySelector("#clean")
const percentage = document.querySelector("#percentage")
const equal = document.querySelector("#equal")

/* Keyboard Events */

window.addEventListener('keyup', (e) => {

    if(e.ctrlKey && e.key == '5') {
        percentageFunction()
        return
    }

    switch(e.key) {

        case '.':
        case ',':
            pointFunction()
            break;

        case 'Backspace':
            cleanOneCharacter()
            break;

        case 'Escape':
            cleanAllFunction()
            break;

        case 'Delete':
            cleanCurrentNumberFunction()
            break;

        case '-':
            minusOperatorFunction()
            break;

        case 'Enter':
            equalFunction()
            break;
        
    }

})

/* Numbers Function */

numbers.forEach(n => {

    window.addEventListener('keyup', (e) => {

        if(e.ctrlKey) return

        if(e.key == n.innerHTML) {

            if(operator.innerHTML == '') {
                if(firstNumber.innerHTML.length >= 16) return
                firstNumber.innerHTML += n.innerHTML
            } else {
                if(secondNumber.innerHTML.length >= 16) return
                secondNumber.innerHTML += n.innerHTML
            }

        }

    })

    n.addEventListener("click", () => {

        if(operator.innerHTML == '') {
            if(firstNumber.innerHTML.length >= 16) return
            firstNumber.innerHTML += n.innerHTML
        } else {
            if(secondNumber.innerHTML.length >= 16) return
            secondNumber.innerHTML += n.innerHTML
        }

    })
    
})

/* Minus Operator Function */

function minusOperatorFunction() {

    if(firstNumber.innerHTML.length > 17) {
        return
    }
    
    if(secondNumber.innerHTML != '') {
        return
    }
    
    if(firstNumber.innerHTML == '') {
        firstNumber.innerHTML = minusOperator.innerHTML
        return
    }
    
    if(firstNumber.innerHTML == '-') {
        return
    }
    
    operator.innerHTML = minusOperator.innerHTML

}

minusOperator.addEventListener('click', () => minusOperatorFunction())

/* Operators Function */

function operatorsValidator() {

    if(firstNumber.innerHTML.length > 17) return true

    if(secondNumber.innerHTML != '') return true
    
    if(firstNumber.innerHTML == '' || firstNumber.innerHTML == '-') return true

}

operators.forEach(o => {

    window.addEventListener('keyup', (e) => {

        if(e.ctrlKey) return

        if(e.key == o.innerHTML) {

            if(operatorsValidator()) return
            
            operator.innerHTML = o.innerHTML

        }

    })
    
    o.addEventListener('click', () => {

        if(operatorsValidator()) return
        
        operator.innerHTML = o.innerHTML
        
    })
    
})

/* Point Function */

function pointFunction() {

    if(operator.innerHTML == '') {
    
        if(firstNumber.innerHTML.includes('.')) {
            return
        } else {
            if(firstNumber.innerHTML.length >= 15) return
            firstNumber.innerHTML += point.innerHTML
        }
    } else {
        
        if(secondNumber.innerHTML.includes('.')) {
            return
        } else {
            if(secondNumber.innerHTML.length >= 15) return
            secondNumber.innerHTML += point.innerHTML
        }
        
    }
    
}

point.addEventListener('click', () => pointFunction())

/* Clean One Character Function */

function cleanOneCharacter() {

    if(secondNumber.innerHTML != '') {
    
        secondNumber.innerHTML = secondNumber.innerHTML.slice(0,-1)
        
    } else if (secondNumber.innerHTML == '' && operator.innerHTML != '') {
    
        operator.innerHTML = operator.innerHTML.slice(0,-1)
        
    } else {
    
        firstNumber.innerHTML = firstNumber.innerHTML.slice(0,-1)
        
    }

}

cleanOne.addEventListener('click', () => cleanOneCharacter())

/* Clean Current Number Function */

function cleanCurrentNumberFunction() {

    if(secondNumber.innerHTML != '') secondNumber.innerHTML = ''

    if(secondNumber.innerHTML == '' && operator.innerHTML != '') return

    if(secondNumber.innerHTML == '' && operator.innerHTML == '' && firstNumber.innerHTML != '') firstNumber.innerHTML = ''

}

cleanCurrentNumber.addEventListener('click', () => cleanCurrentNumberFunction())

/* Clean All function */

function cleanAllFunction() {

    firstNumber.innerHTML = ''
    operator.innerHTML = ''
    secondNumber.innerHTML = ''

}

cleanAll.addEventListener('click', () => cleanAllFunction())

/* Percentage Function */

function percentageFunction() {

    if(firstNumber.innerHTML.length > 17) return
    
    if(firstNumber.innerHTML == '' || firstNumber.innerHTML == '-' || firstNumber.innerHTML == '.') return

    if(secondNumber.innerHTML == '') operator.innerHTML = percentage.innerHTML
    
    if(secondNumber.innerHTML == '' || secondNumber.innerHTML == '.') {

        return

    } else {
        
        let n1percentage = (firstNumber.innerHTML / 100) * secondNumber.innerHTML

        let res = firstNumber.innerHTML + operator.innerHTML + n1percentage

        secondNumber.innerHTML = ''
        operator.innerHTML = ''
        firstNumber.innerHTML = eval(res)

        if(firstNumber.innerHTML.includes('.')) firstNumber.innerHTML = parseFloat(firstNumber.innerHTML).toFixed(2)

        resultFunctionLimiter()

    }

}

percentage.addEventListener("click", () => percentageFunction())

/* Equal Function */

function equalFunction() {

    if (firstNumber.innerHTML == '' ||
    operator.innerHTML == '' ||
    secondNumber.innerHTML == '' ||
    secondNumber.innerHTML == '.'
    ) return

    let n1 = firstNumber.innerHTML
    let oper = operator.innerHTML
    let n2 = secondNumber.innerHTML

    if(operator.innerHTML == '%') {

        let res = (n2 / 100) * n1
        secondNumber.innerHTML = ''
        operator.innerHTML = ''
        firstNumber.innerHTML = res

        if(firstNumber.innerHTML.includes('.')) firstNumber.innerHTML = parseFloat(firstNumber.innerHTML).toFixed(2)

        resultFunctionLimiter()

        return

    }

    let res = eval(n1 + oper + n2)
    secondNumber.innerHTML = ''
    operator.innerHTML = ''
    firstNumber.innerHTML = res

    if(firstNumber.innerHTML.includes('.')) firstNumber.innerHTML = parseFloat(firstNumber.innerHTML).toFixed(2)

    resultFunctionLimiter()

}

equal.addEventListener("click", () => equalFunction())

/* Result Function Limiter */

function resultFunctionLimiter() {

    if(firstNumber.innerHTML.length > 17) {

        firstNumber.innerHTML = 'ERROR'

        setTimeout(() => {
            firstNumber.innerHTML = ''
        },1000)

    }

}

/* Date and Hour Functions */

const day = document.querySelector(".day")
const hour = document.querySelector(".hour")

window.addEventListener("load", () => {

    hour.innerHTML = new Date().toLocaleTimeString("pt-BR")
    
    setInterval(() => {
        
        hour.innerHTML = new Date().toLocaleTimeString("pt-BR")
        
    }, 1000)
    
    day.innerHTML = new Date().toLocaleDateString("pt-BR", {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
    
})
