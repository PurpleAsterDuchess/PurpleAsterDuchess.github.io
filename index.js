const save = (event) => {
    event.preventDefault();
    let blogEntry = document.getElementById("entry").value;
    localStorage.setItem("entry", blogEntry);
    const p = document.getElementById("output1");
    const func1 = () => p.innerHTML = localStorage.getItem("entry");
    done.addEventListener('click', func1)
};

const countingChar = () => {
    $('textarea').keyup(function() {
        let charCount = $(this).val().length,
        current = $('#current'),
        max = $('#maximum'),
        count = $('#counter');
    })
    current.text(charCount)
}