const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com.br',
    port: 587,
    secure: false,
    auth: {
        user: 'fernando@fernandoparanhos.com.br',
        pass: 'aF*232892!@#*&!'
   }
});


app.get('/', (req, res) => res.send('servidor rodando'));

app.post('/login', function (req, res) {
    console.log('Body ===>', req.body);
    var mailOptions = {
        from: 'contato@fernandoparanhos.com.br',
        to: 'fernandoeparanhos@gmail.com',
        subject: req.body.nome,
        text: `telefone: ${req.body.telefone}<br> Mensagem: ${req.body.conteudo} e-mail: ${req.body.email}<br> e-mail-para realizar sonhos: ${req.body.emailindex}`
    }
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            res.send(err);
        }else{
            res.send('Mensagem enviada com sucesso');
       
        }
    });

})

let port = process.env.PORT || 5000 ;
app.listen(port, () => console.log('servidor rodando'));
