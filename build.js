/* Gera a pasta dist/ pro deploy: copia o HTML e cria o config.js a partir das variaveis de ambiente do Vercel */
var fs = require('fs');
var path = require('path');

var url = process.env.SUPABASE_URL || '';
var key = process.env.SUPABASE_KEY || '';

if(!url || !key){
  console.error('Faltam as variaveis de ambiente SUPABASE_URL e/ou SUPABASE_KEY.');
  process.exit(1);
}

var distDir = path.join(__dirname, 'dist');
fs.mkdirSync(distDir, { recursive: true });

fs.copyFileSync(
  path.join(__dirname, 'orcamento-mudanca-local.html'),
  path.join(distDir, 'index.html')
);

var configJs = 'window.SUPABASE_URL = ' + JSON.stringify(url) + ';\n'
  + 'window.SUPABASE_KEY = ' + JSON.stringify(key) + ';\n';
fs.writeFileSync(path.join(distDir, 'config.js'), configJs);

console.log('Build ok: dist/index.html e dist/config.js gerados.');
