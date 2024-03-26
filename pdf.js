const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
const writableStream = fs.createWriteStream('example.pdf');
doc.pipe(writableStream);

// doc.pipe(fs.createWriteStream('output.pdf'));
// const stream = doc.pipe(blobStream());
fs.readFile('./datas.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
  
      const pdfs = jsonData.pdfs;
 
      console.log('pdfs:');
      pdfs.forEach(pdf => {
        console.log(pdf);
        doc.image(pdf.photo, 20, 600, {fit: [100, 100]})

        doc.moveDown()
        doc.fontSize(25) 
        doc.text(pdf.name,220, 320);


        doc.text(pdf.grade,170,370)
            .text(pdf.degree,280,370);


        doc.text(pdf.date,170,420)
            .text(pdf.place,360,420)

        doc.addPage();

    });
    doc.end();

        writableStream.on('finish', () => {
            // const url = stream.toBlobURL('application/pdf');
            console.log("PDF Created")
            // iframe.src = url;
        })
            
            } catch (error) {
            console.error('Error parsing JSON data:', error);
            }
        });



