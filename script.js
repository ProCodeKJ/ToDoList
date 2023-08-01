let txt_multi = document.querySelector("#txt_multi");
let txt_answer = document.querySelector("#txt_answer");
let btn = document.querySelector("#btn");
let check_show = document.querySelector("#check_show");
let btn_check = document.querySelector("#btn_check");
let txt_type = document.querySelector("#txt_type");
let points = document.querySelector("#points");


let rand1s = [];
let rand2s = [];
let corrects = [];
let rand1;
let rand2;
let max_questions = 10;
let ok = 0;
let count = 3;


btn.addEventListener("click" , function() {
    let btn_class = btn.getAttribute("class");
    if (btn_class == "btn_start") {
        btn.setAttribute("value","Restart");
        btn.setAttribute("class","btn_stop");
        setStartTimer();

    }else if (btn_class == "btn_stop") {
        let answer = confirm("Are You Sure Restart This Program?");
        if (answer ==true) {
             location.href = "index.html"
        }       
    }

})



function setStartTimer() {
    let timer = setInterval(function() {
    txt_answer.innerHTML = `starting in ${count}`;   
    count--;
        if (count === 0) {
            setTimeout(function() {
                clearInterval(timer);
                startMulti();
                rand1s = [1];
                rand2s = [1];
                corrects = [1];
            },500) 
            
        }
},500);
}

function startMulti() {

        rand1 = parseInt(Math.random() * 10 );
        rand2 = parseInt(Math.random() * 10 );
        txt_multi.innerHTML = `${rand1} × ${rand2}`;
            if (check_show.checked === true) {
                txt_answer.innerHTML = rand1 * rand2;
            } else {
                txt_answer.innerHTML = `Enter The Answer ${rand1} × ${rand2} !`
            }
            
            txt_type.focus();
        }
        
    
     

btn_check.addEventListener("click" , function() {
    if(max_questions < 0) {
        console.log("NO!!!")
    }
    else if (max_questions < 1) {
        txt_multi.innerHTML= "Easy Multi";
        txt_type.value = "";
        if (ok == 10) {
            txt_answer.innerHTML = `You've got all questions right!!!!!!`;
        }
        else {
            txt_answer.innerHTML = `You've got ${ok}  questions right!`;
        }
        max_questions--;
        createList();


    }else if (rand1s[0] === 1) {
        if (txt_type.value == "") {
            alert("Please enter a number");
        }
        else if (rand1 * rand2 == txt_type.value) {
            rand1s.push(rand1);
            rand2s.push(rand2);
            corrects.push(txt_type.value);
            ok++;
            max_questions--;
            txt_type.value = "";
                startMulti();
            } else {
                rand1s.push(rand1);
                rand2s.push(rand2);
                corrects.push(txt_type.value);
                max_questions--;
                txt_type.value = "";
                startMulti();
            }
            }
            
        })
       


function createItem(text,correct) {
    let newItem = document.createElement("li");
    let newText = document.createTextNode(text);
    newItem.appendChild(newText);
    newItem.setAttribute("class",correct)
    points.appendChild(newItem);
}

function createList() {
    for(let i = 1;i<11;i++) {
        if (rand1s[i] * rand2s[i] == corrects[i]) {
        createItem(`${rand1s[i]} × ${rand2s[i]} = ${corrects[i]} (O)`,"correct");
    }else {
        createItem(`${rand1s[i]} × ${rand2s[i]} ≠ ${corrects[i]} → ${rand1s[i] * rand2s[i]} (X)`, "not_correct");
    }
}
    rand1s = [];
    rand2s = [];
    corrects = [];
    }
    



    