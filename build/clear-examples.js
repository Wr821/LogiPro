// Script para limpar TODOS os dados de exemplo do localStorage
console.log('🧹 LIMPANDO TODOS OS DADOS DE EXEMPLO...');

// Valores conhecidos de exemplo que devem ser removidos
const exampleValues = [8500, 7200, 6800, 9200, 15700];

// Limpar cache dos cards
const allKeys = Object.keys(localStorage);
const removedKeys = [];

allKeys.forEach(key => {
  // Remover caches dos cards
  if (key.includes('cards_cache_')) {
    localStorage.removeItem(key);
    removedKeys.push(key);
    return;
  }
  
  // Verificar e remover dados com valores de exemplo
  try {
    const data = localStorage.getItem(key);
    if (data) {
      // Tentar parse como JSON
      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch {
        return; // Não é JSON, pular
      }
      
      if (Array.isArray(parsed)) {
        // Verificar se contém valores de exemplo
        const hasExampleValues = parsed.some(item => {
          if (typeof item === 'object' && item !== null) {
            const value = item.value || item.valentia || item.valor || 0;
            return exampleValues.includes(Number(value));
          }
          return false;
        });
        
        if (hasExampleValues) {
          localStorage.removeItem(key);
          removedKeys.push(key);
          console.log('🗑️ Removido (contém dados de exemplo):', key);
        }
      }
    }
  } catch (error) {
    // Ignorar erros de parse
  }
});

console.log(`✅ LIMPEZA CONCLUÍDA: ${removedKeys.length} chaves removidas`);
console.log('🔄 Recarregue a aplicação para ver o resultado');

// Forçar recarga da página após 2 segundos
setTimeout(() => {
  window.location.reload();
}, 2000);