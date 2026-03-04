const SHEET_ID = '1cEH-AJ1v7hAq-vWgpSEaEXHL8pnCDM6pmTb_rTIJzCw';
const SHEET_NAME = 'Лист1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    let result;
    
    switch(data.action) {
      case 'updateStatus':
        result = updateStatus(sheet, data.taskId, data.newStatus);
        break;
      case 'updateField':
        result = updateField(sheet, data.taskId, data.field, data.value);
        break;
      case 'addTask':
        result = addTask(sheet, data.task);
        break;
      case 'deleteTask':
        result = deleteTask(sheet, data.taskId);
        break;
      default:
        result = {error: 'Unknown action'};
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status: 'ok', time: new Date().toISOString()}))
    .setMimeType(ContentService.MimeType.JSON);
}

function findRowByTaskId(sheet, taskId) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(taskId).trim()) return i + 1;
  }
  return -1;
}

function updateStatus(sheet, taskId, newStatus) {
  const row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  sheet.getRange(row, 5).setValue(newStatus);
  const now = new Date();
  sheet.getRange(row, 8).setValue(
    String(now.getDate()).padStart(2,'0') + '.' + String(now.getMonth()+1).padStart(2,'0')
  );
  return {ok: true, taskId, newStatus};
}

function updateField(sheet, taskId, field, value) {
  const row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  
  const FIELD_MAP = {
    'task': 2, 'project': 3, 'assignee': 4, 'status': 5,
    'priority': 6, 'notes': 9, 'blocked': 10, 'deadline': 11, 'parent': 12
  };
  
  const col = FIELD_MAP[field];
  if (!col) return {error: 'Unknown field: ' + field};
  
  sheet.getRange(row, col).setValue(value);
  const now = new Date();
  sheet.getRange(row, 8).setValue(
    String(now.getDate()).padStart(2,'0') + '.' + String(now.getMonth()+1).padStart(2,'0')
  );
  return {ok: true, taskId, field, value};
}

function addTask(sheet, task) {
  const data = sheet.getDataRange().getValues();
  let maxNum = 0;
  for (let i = 1; i < data.length; i++) {
    const id = String(data[i][0]);
    const match = id.match(/T-(\d+)/);
    if (match) maxNum = Math.max(maxNum, parseInt(match[1]));
  }
  const nextId = 'T-' + String(maxNum + 1).padStart(3, '0');
  const now = new Date();
  const dateStr = String(now.getDate()).padStart(2,'0') + '.' + String(now.getMonth()+1).padStart(2,'0');
  
  sheet.appendRow([
    nextId,
    task.title || '',
    task.project || '',
    task.assignee || '',
    task.status || '📋 To Do',
    task.priority || '🟡 Medium',
    dateStr, '', 
    task.notes || '',
    task.blocked || '',
    task.deadline || '',
    task.parent || ''
  ]);
  
  return {ok: true, taskId: nextId};
}

function deleteTask(sheet, taskId) {
  const row = findRowByTaskId(sheet, taskId);
  if (row === -1) return {error: 'Task not found: ' + taskId};
  sheet.deleteRow(row);
  return {ok: true, taskId};
}
