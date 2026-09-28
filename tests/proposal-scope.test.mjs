import test from 'node:test';
import assert from 'node:assert/strict';
import { isFullMethod, proposalExtras } from '../src/lib/proposal-scope.ts';
const base = { restaurant_name: 'Teste', service_value: 2000, ad_value: 1500, contract_duration: 3 };
test('planos personalizados não incluem entregas do método completo', () => {
  assert.equal(isFullMethod({...base, plan_type:'personalizado', services:[{id:'x',name:'Tráfego Pago'}]}), false);
});
test('reconhece serviços legados e o plano completo', () => {
  assert.equal(isFullMethod({...base, services:['Tráfego Pago','Gestão de Google Meu Negócio','Análise de Ativos','Engenharia de Cardápio'].map(name=>({id:name,name}))}), true);
  assert.equal(isFullMethod({...base, plan_type:'metodo_pinguim'}), true);
});
test('marketplace só aparece quando selecionado', () => {
  assert.deepEqual(proposalExtras(base), []);
  assert.deepEqual(proposalExtras({...base, services:[{id:'ifood',name:'iFood',price:1000,quantity:2},{id:'x',name:'Tráfego'}]}).map(s=>s.id), ['ifood']);
});
