const express = require('express');
const router = express.Router();

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


router.post('/pdf', (req, res) => {
    var nit = req.body.nit
    var name = req.body.name
    var tipoDevice = req.body.tipoDevice
    var nameDevice = req.body.nameDevice
    var code = req.body.code
    
    var dateNow = new Date();
    // current date
    // adjust 0 before single digit date
    var date = ("0" + dateNow.getDate()).slice(-2);
    // current month
    var month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    // current year
    var year = dateNow.getFullYear();
    // current hours
    var hours = dateNow.getHours();
    // current minutes
    var minutes = dateNow.getMinutes();
    // current seconds
    var seconds = dateNow.getSeconds();


    var doc = {
        content: [                        
            {text: tipoDoc, style: 'titleOne', alignment: 'center'},
            {text: 'DE HERRAMIENTAS DE TRABAJO', style: 'title', alignment: 'center'},
            {text: 'Mediante este documento se hace constar que CINTELI COLOMBIA SAS', style: 'subtitleMargin', alignment: 'center'},
            {text: 'ha realizado entrega a quien así mismo lo recibe, de las herramientas cuyas', style: 'subtitle', alignment: 'center'}, 
            {text: 'características se detallan a continuación:', style: 'subtitle', alignment: 'center'},
            {
                style: 'table',
                table: {
                    body: [
                        [{text: 'Cedula', bold: true}, `${nit}`],
                        [{text: 'Nombre', bold: true},  `${name}`],
                        [{text: 'Tipo', bold: true},  `${tipoDevice}`],
                        [{text: 'Nombre del Equipo', bold: true},  `${nameDevice}`],
                        [{text: 'Codigo', bold: true},  `${code}`],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'table',
                table: {
                    body: [
                        [{text: 'Entrega:',bold: true}, {text: 'Recibido por:',bold: true}],
                        [{text: 'Nombre:',bold: true}, {text: 'Nombre:',bold: true}],
                        [{text: 'Firma:',bold: true}, {text: 'Firma',bold: true}],
                        [{text: 'C.C No.____________________',bold: true}, {text: 'C.C No.____________________',bold: true}],
                        
                    ]
                },
                layout: 'noBorders'
            },
            {text: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds, style:'dateNow', alignment: 'center'},           
        ],
        styles: {
            titleOne: {
                fontSize: 16,
                bold: true,
                margin: [0, 80, 0, 0]
            },
            title: {
                fontSize: 16,
                bold: true,
            },
            subtitleMargin: {
                fontSize: 12,
                bold: false,
                margin: [0, 20, 0, 0]
            },
            subtitle: {
                fontSize: 12,
                bold: false,
                margin: [0, 0, 0, 0]
            },
            table: {
                margin: [0, 50, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            dateNow: {
                bold: true,
                fontSize: 10,
                color: 'black',
                margin: [0, 20, 0, 0]
            }
        },   
    };

    const pdfDoc = pdfMake.createPdf(doc);
    pdfDoc.getBase64((data) => {
        res.writeHead(200,{
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="filename.pdf"'
        });
        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download)
    })
})

module.exports = router;