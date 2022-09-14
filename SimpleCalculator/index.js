(function(){

    let numberInput = document.querySelector('.number-input');
    let buttons = document.querySelectorAll('.btn');
    let equal = document.querySelector('.btn-equal');
    let clear = document.querySelector('.btn-clear');

    buttons.forEach(button => {
        button.addEventListener('click', e => {
            let value = e.target.dataset.num;
            numberInput.value += value;

            if(numberInput.value === "000"){
                numberInput.value = '0';
            }
        })
    });

    equal.addEventListener('click', e => {

        if(numberInput.value === ""){
            numberInput.value = '';
        } else {
            let answer = eval(numberInput.value);
            numberInput.value = answer;
        }
    });

    clear.addEventListener('click', e => {
        numberInput.value = '';
    })
})();

