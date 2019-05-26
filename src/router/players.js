const express=require('express');
const routes=express.Router();
const bd=require('../database.js');

routes.get('/list',async (req,res)=>{
  const players=await bd.query('SELECT * FROM players');
  res.render('players/list.hbs',{players});
});

routes.get('/add',(req,res)=>{
  res.render('players/add');
});

routes.post('/add', async(req,res)=>{
  const data=req.body;
  console.log(data);
  const player=await bd.query('INSERT INTO players SET ?',[data]);
  res.redirect('list');
});

routes.get('/delete/:id',async (req,res)=>{
  const {id}=req.params;
  await bd.query('DELETE FROM players WHERE id=?',[id]);
  res.redirect('/players/list');
});

routes.get('/edit/:id',async (req,res)=>{
  const {id}=req.params;

  const players=await bd.query('SELECT * FROM players WHERE id=?',[id]);
  res.render('players/edit',{player:players[0]});
});

routes.post('/edit/:id',async (req,res)=>{
  const {id}=req.params;
  const data=req.body;
  const newPlayer=await bd.query('UPDATE players set ? WHERE id=?',[data,id]);
  res.redirect('/players/list');
});


module.exports=routes;
