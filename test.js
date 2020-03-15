"use strict";
const todo = require('./index.js');
const assert = require('assert');
const fs = require('fs');

fs.unlink('./tasks.json',(err) =>{
  //todo,listのテスト
  todo.todo('Buy apples');
  todo.todo('Get a coffee');
  assert.deepEqual(todo.list(),['Buy apples', 'Get a coffee']);

  //done,donelistのテスト
  assert.deepEqual(todo.done('Buy apples'),true);
  assert.deepEqual(todo.done('No tasks'),false);
  assert.deepEqual(todo.donelist(),['Buy apples']);
  assert.deepEqual(todo.list(), ['Get a coffee']);

  //delのテスト
  todo.del('Buy apples');
  assert.deepEqual(todo.del('Get a coffee'),true);
  assert.deepEqual(todo.del('No tasks'), false);
  assert.deepEqual(todo.donelist(),[]);

  console.log('test is finished');
});
