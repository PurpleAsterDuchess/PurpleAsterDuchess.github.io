// const save = (event) => {
//     event.preventDefault();
//     let blogEntry = document.getElementById("entry").value;
//     localStorage.setItem("entry", blogEntry);
//     const p = document.getElementById("output1");
//     const func1 = () => p.innerHTML = localStorage.getItem("entry");
//     done.addEventListener('click', func1)
// };

const countText = () => {
    let text = document.getElementById("entry").value;
    document.getElementById('current').innerText = text.length;
}

const newElement = () => {
    let li = document.createElement("li");
    let inputValue = document.getElementById("entry").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("output1").appendChild(li);
    }
    document.getElementById("entry").value = "";

    countText();
}

const saveEntry = () => {
    let li2 = document.createElement("li");
    let inputValue2 = document.getElementById("when").value;
    let t2 = document.createTextNode(inputValue2);
    li2.appendChild(t2);
    if (inputValue2 === '') {
        alert("You must enter a date!");
    } else {
        let li = document.createElement("li");
        let inputValue = document.getElementById("entry").value;
        let t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            document.getElementById("output1").appendChild(li);
            document.getElementById("output2").appendChild(li2);
        }
        document.getElementById("entry").value = "";
        
    }
    document.getElementById("when").value = "";

    countText();
}