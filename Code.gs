const SHEET_ID = '1cEH-AJ1v7hAq-vWgpSEaEXHL8pnCDM6pmTb_rTIJzCw';
const SHEET_NAME = 'Лист1';

function doGet(e) {
  var p = e && e.parameter ? e.parameter : {};
  
  // If payload param exists, parse it
  if (p.payload) {
    return handleAction(JSON.parse(p.payload));
  }
  
  // If action param exists, use individual params
  if (p.action) {
    return handleAction(p);
  }
  
  return out({status: 'ok', time: new Date().toISOString()});
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return handleAction(data);
  } catch(err) {
    return out({error: err.message});
  }
}

function handleAction(data) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    var result;
    
    switch(String(data.action)) {
      case 'updateStatus':
        result = updateStatus(sheet, data.taskId, data.newStatus);
        break;
      case 'updateField':
        result = updateField(sheet, data.taskId, data.field, data.value);
        break;
      case 'addTask':
        var task = typeof data.task === 'string' ? JSON.parse(data.task) : (data.task || data);
        result = addTask(sheet, task);
        break;
      case 'bulkUpdate':
        var fields = typeof data.fields === 'string' ? JSON.parse(data.fields) : data.fields;
        result = bulkUpdate(sheet, data.taskId, fields);
        break;
      case 'deleteTask':
        result = deleteTask(sheet, data.taskId);
        break;
      case 'test':
        result = {test: 'ok', params: data};
        break;
      default:
        result = {error: 'Unknown action: ' + data.action};
    }
    
    return out(result);
  } catch(err) {
    return out({error: err.message});
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function findRowByTaskId(sheet, taskId) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(taskId).trim()) return i + 1;
  }
  return -1;
}

function now() {
  var d = new Date();
  return ('0'+d.getDate()).slice(-2) + '.' + ('0'+(d.getMonth()+1)).slice(-2);
}

function updateStatus(sheet, taskId, newStatus) {
  var row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  sheet.getRange(row, 5).setValue(newStatus);
  sheet.getRange(row, 8).setValue(now());
  return {ok: true, taskId: taskId, newStatus: newStatus};
}

function updateField(sheet, taskId, field, value) {
  var row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  
  var FIELD_MAP = {
    'task': 2, 'project': 3, 'assignee': 4, 'status': 5,
    'priority': 6, 'notes': 9, 'blocked': 10, 'deadline': 11, 'parent': 12
  };
  
  var col = FIELD_MAP[field];
  if (!col) return {error: 'Unknown field: ' + field};
  
  sheet.getRange(row, col).setValue(value);
  sheet.getRange(row, 8).setValue(now());
  return {ok: true, taskId: taskId, field: field};
}

function bulkUpdate(sheet, taskId, fields) {
  var row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  
  var FIELD_MAP = {
    'title': 2, 'task': 2, 'project': 3, 'assignee': 4, 'status': 5,
    'priority': 6, 'notes': 9, 'blocked': 10, 'deadline': 11, 'parent': 12
  };
  
  var updated = [];
  for (var key in fields) {
    if (FIELD_MAP[key]) {
      sheet.getRange(row, FIELD_MAP[key]).setValue(fields[key] || '');
      updated.push(key);
    }
  }
  sheet.getRange(row, 8).setValue(now());
  return {ok: true, taskId: taskId, updated: updated};
}

function addTask(sheet, task) {
  var data = sheet.getDataRange().getValues();
  var maxNum = 0;
  for (var i = 1; i < data.length; i++) {
    var id = String(data[i][0]);
    var match = id.match(/T-(\d+)/);
    if (match) maxNum = Math.max(maxNum, parseInt(match[1]));
  }
  var nextId = 'T-' + ('000' + (maxNum + 1)).slice(-3);
  
  sheet.appendRow([
    nextId,
    task.title || '',
    task.project || '',
    task.assignee || '',
    task.status || '📋 To Do',
    task.priority || '🟡 Medium',
    now(), '',
    task.notes || '',
    task.blocked || '',
    task.deadline || '',
    task.parent || ''
  ]);
  
  return {ok: true, taskId: nextId};
}

function deleteTask(sheet, taskId) {
  var row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  sheet.deleteRow(row);
  return {ok: true, taskId: taskId};
}
