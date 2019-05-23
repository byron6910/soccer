const express = require('express');
const path=require('path');
const morgan=require('morgan');
//const flash=require('connect-flash');
const plantilla=require('express-handlebars');



const app=express();

//configuraciones
app.set('port',process.env.PORT||3500);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',plantilla({
  defaultLayout:'main',
  layoutsDir:path.join(app.get('views'),'layouts'),
  partialsDir:path.join(app.get('views'),'partials'),
  extname:'.hbs'
  //helpers:require('./lib/handlebars')

}));
app.set('view engine','.hbs');
//middleware
//app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//globales


//rutas

app.use(require('./router/index.js'));
app.use('/category',require('./router/category.js'))
app.use('/teams',require('./router/teams.js'));
app.use('/players',require('./router/players.js'));



app.listen(app.get('port'),(req,res)=>{
  console.log('servidor corriendo en puerto ',app.get('port'));
});
