import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContact,validDate,taskTiming,isCrmStage} from '../src/lib/crm.ts';
const contact={restaurant_name:'Brasa',contact_name:'',phone:'',email:'',city:'',niche:'',source:'',stage:'novo',estimated_value:2000};
test('valida contatos e não aceita etapa ou valor inválido',()=>{
 assert.equal(validateContact(contact),null);
 for(const patch of [{restaurant_name:' '},{stage:'inventado'},{estimated_value:NaN},{estimated_value:-1},{email:'email invalido'}]) assert.ok(validateContact({...contact,...patch}));
 assert.equal(isCrmStage('ganho'),true);
});
test('retornos distinguem atraso, hoje, futuro e concluído',()=>{
 const task={due_date:'2026-09-28',completed_at:null};
 assert.equal(taskTiming(task,'2026-09-28'),'today');
 assert.equal(taskTiming(task,'2026-09-29'),'overdue');
 assert.equal(taskTiming(task,'2026-09-27'),'future');
 assert.equal(taskTiming({...task,completed_at:'2026-09-28T12:00:00Z'},'2026-10-01'),'done');
});
test('rejeita datas inexistentes e aceita ano bissexto',()=>{
 assert.equal(validDate('2026-02-30'),false);
 assert.equal(validDate('2026-02-29'),false);
 assert.equal(validDate('2028-02-29'),true);
 assert.equal(validDate('28/09/2026'),false);
});
