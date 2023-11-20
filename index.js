var fs = require('fs');

        const save = (event) => {
            event.preventDefault();
            let blogEntry = document.getElementById("entry").value;
            localStorage.setItem("entry", blogEntry);
            const p = document.getElementById("output1");
            const func1 = () => p.innerHTML = localStorage.getItem("entry");
            done.addEventListener('click', func1)
        };
        const newElement = () => {
            fs.writeFile("blogEntries.txt", "some text here",
            function (err) {
                if (err) {
                    return console.log(err);
                }
                fs.readFile ("/blogEntries.txt", "utf8", function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                   console.log("Data read : " + data.toString()); 
                });
            })
        };
