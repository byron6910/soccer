const express=require('express');
const bd=require('../database.js')
const routes=express.Router();

routes.get('/list',async(req,res)=>{
  const categories=await bd.query('SELECT * FROM category');
  console.log(categories);
  res.render('category/list.hbs',{categories});
});

routes.get('/add',(req,res)=>{
  res.render('category/add.hbs');
});

routes.post('/add',async(req,res)=>{
  console.log(req.body);
  const {name}=req.body;
  //const newCategory={name};
  await bd.query('INSERT INTO category set ?',{name});
  res.redirect('list');
});

routes.get('/delete/:id',async (req,res)=>{
  const {id}=req.params;
  await bd.query('DELETE FROM category WHERE id=?',[id]);
  res.redirect('/category/list')
});

routes.get('/edit/:id',async(req,res)=>{
  const {id}=req.params;
  const categories=await bd.query('SELECT * FROM category WHERE id=?',[id]);
  console.log(categories);
  res.render('category/edit.hbs',{category:categories[0]});
});

routes.post('/edit/:id',async(req,res)=>{
  const {id}=req.params;
  const {name}=req.body;
  const newCategory={
    id,name
  }
  const categories=await bd.query('UPDATE category set ? WHERE id=?',[newCategory,id]);
  res.redirect('/category/list');
});

module.exports=routes;
