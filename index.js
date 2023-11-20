const save = (event) => {
    event.preventDefault();
    let blogEntry = document.getElementById("entry").value;
    localStorage.setItem("entry", blogEntry);
    const p = document.getElementById("output1");
    const func1 = () => p.innerHTML = localStorage.getItem("entry");
    done.addEventListener('click', func1)
};

function countText () {
    let text = document.getElementById("entry").value;
    document.getElementById('current').innerText = text.length;
}
