import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Configuração para __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);

// Caminhos absolutos
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

// 1. Configuração de arquivos estáticos
// Prioridade: arquivos gerados no build (dist) -> arquivos originais (public)
app.use(express.static(distPath));
app.use(express.static(publicPath));

// 2. Fallback para SPA (Single Page Application)
// Retorna o index.html para qualquer outra rota desconhecida
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
  
  // Diagnóstico simples de build
  const distExists = fs.existsSync(distPath);
  console.log('--- DIAGNÓSTICO ---');
  console.log(`📂 Pasta 'dist' existe? ${distExists ? 'SIM' : 'NÃO'}`);
  console.log(`📂 Caminho absoluto dist: ${distPath}`);
  console.log('-------------------');
});