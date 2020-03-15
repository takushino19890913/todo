"use strict";

// key: tasks, value: Done or Not(True or false)
let tasks = new Map();

const fs = require('fs');
const fileName = './tasks.json'

// 同期的にファイルから復元
try {
  const data = fs.readFileSync(fileName, 'utf8');
  tasks = new Map(JSON.parse(data));
} catch (ignore) {
  console.log(fileName + 'から復元できませんでした');
}

/**
* save tasks to file
*/
function saveTasks(){
  fs.writeFileSync(fileName,JSON.stringify(Array.from(tasks)),'utf-8');
}

/**
* @パラムで取るパラメーターの説明。{}内は　Type
* TODOを追加する
* @param {string} task
*/
function todo(task) {
  tasks.set(task, false);
  saveTasks();
}

/**
* タスクと完了したかどうかが含まれる配列を受け取り、完了したかを返す
* @リターンは返り血の説明、{} 内はタイプ、そして説明。
* @param {array} taskAndIsDonePair
* @return {boolean} 完了したかどうか
*/
function isDone(taskAndIsDonePair) {
  return taskAndIsDonePair[1];
}

/**
* タスクと完了したかどうかが含まれる配列を受け取り、完了していないかを返す
* @param {array} taskAndIsDonePair　一つ一つのタスクが入る。
* @return {boolean} 完了していないかどうか
*/
function isNotDone(taskAndIsDonePair) {
  return !isDone(taskAndIsDonePair);
}

/**
* TODOの一覧の配列を取得する
* @return {array}
*/
function list() {
  return Array.from(tasks)
    .filter(isNotDone)
    .map(t => t[0]);//index0のみ返す。

}

/**
* @パラムで取るパラメーターの説明。{}内は　Type
* TODOを完了済みにする
* task が存在しない場合、　エラーメッセージを表示するために、falseを返す。
* @param {string} task
* @return {boolean}
*/
function done(task){
 if(tasks.has(task)){
   tasks.set(task,true);
   saveTasks();
   return true;
 }
 else {
   // error message
   return false;
 }
}

/**
* 完了済みのタスクの一覧の配列を取得する
* @return {array}
*/
function donelist(){
  return Array.from(tasks)
     .filter(isDone)
     .map(t =>t[0]);
}

/**
* @パラムで取るパラメーターの説明。{}内は　Type
* TODOを削除する
* タスクが完了済みでない場合、確認メッセージを表示
* @param {string} task
* @param {boolean}
*/
function del(task){
  if(tasks.has(task) == false)
  {
    return false;
  }
  else{
    tasks.delete(task);
    saveTasks();
    return true;
  }
}

module.exports = { todo,
                   list,
                   done,
                   donelist,
                   del };
