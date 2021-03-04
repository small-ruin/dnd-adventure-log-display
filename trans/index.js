var mammoth = require("mammoth");
const fs = require('fs')
 
var options = {
    styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
    ]
};

mammoth.convertToHtml({path: "./4.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(messages);
        fs.writeFile('./4.html', html);
    })
    .done();