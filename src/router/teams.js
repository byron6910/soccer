const express=require('express');
const routes=express.Router();
const bd=require('../database.js');


routes.get('/list',async(req,res)=>{
  const teams=await bd.query('SELECT * FROM teams');
  res.render('teams/list',{teams});
});

routes.get('/add',(req,res)=>{
  res.render('teams/add');
});

routes.post('/add',async(req,res)=>{
  const{name,date_f,category,president,mail,phone}=req.body;
  const newTeam={name,date_f,category,president,mail,phone};
  await bd.query('INSERT INTO teams set ?',[newTeam]);
  res.redirect('list');
});

routes.get('/delete/:id',async(req,res)=>{
  const {id}=req.params;
  await bd.query('DELETE FROM teams WHERE id=?',[id]);
  res.redirect('/teams/list');
});

routes.get('/edit/:id',async(req,res)=>{
  const {id}=req.params;
  const teams=await bd.query('SELECT * FROM teams WHERE id=?',[id]);
  res.render('teams/edit.hbs',{team:teams[0]});
});

routes.post('/edit/:id',async (req,res)=>{
  const {id}=req.params;
  const {name,date_f,category,president,mail,phone}=req.body;
  const newTeam={id,name,date_f,category,president,mail,phone};
  const teams=await bd.query('UPDATE teams set ? WHERE id=?',[newTeam,id]);
  res.redirect('/teams/list');
});


module.exports=routes;
