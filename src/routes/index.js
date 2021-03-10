const express = require('express');
const router = express.Router();

const Laboratorio = require('../models/laboratorio')

router.get('/', async (req, res) => {
    const laboratorios = await Laboratorio.find();
    console.log(laboratorios);
    res.render('index', {
        laboratorios
    })
})

router.post('/add', async (req, res) => {
    const laboratorio = new Laboratorio(req.body)
    await laboratorio.save();
    res.redirect('/')
})

router.get('/enable/:id', async (req, res) => {
    const { id } = req.params;
    const laboratorio = await Laboratorio.findById(id);
    laboratorio.status = !laboratorio.status;
    await laboratorio.save();
    res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Laboratorio.remove({_id: id});
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const laboratorio = await Laboratorio.findById(id);
    res.render('edit', {
        laboratorio
    });
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Laboratorio.update({_id: id}, req.body);
    res.redirect('/');
})

router.get('/print/:id', async (req, res) => {
    const { id } = req.params;
    const laboratorio = await Laboratorio.findById(id);
    res.render('print', {
        laboratorio
    });
})

// Search $regex
router.get('/search/:search', (req, res) => {
    var searchString = req.params.search;
    Laboratorio.find({ "$or": [
        {"nit": { "$regex": searchString, "$options": "i" }},
        {"tipoDevice": { "$regex": searchString, "$options": "i" }}
    ]})
    .sort([['date', 'descending']])
    .exec((err, laboratorios) => {

        if(err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error en la peticion'
            });
        }

        if(!laboratorios || laboratorios.length <= 0) {
            return res.status(404).send({
                status: 'Error',
                message: 'no hay resultados'
            });
        }

        return res.status(200).send({
            status: 'success',
            laboratorios
        });

    })
});

module.exports = router;