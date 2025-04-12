# Script de publicação do evolution-bridge

# Obtém a versão atual do package.json
$packageJson = Get-Content .\package.json -Raw | ConvertFrom-Json
$currentVersion = $packageJson.version

# Executa o npm version patch para incrementar a versão
npm version patch

# Obtém a nova versão após o incremento
$packageJson = Get-Content .\package.json -Raw | ConvertFrom-Json
$newVersion = $packageJson.version

# Faz o commit com a nova versão
git add .
git commit -m "chore: bump version to $newVersion"

# Cria a tag com a nova versão
git tag -a "v$newVersion" -m "Version $newVersion"

# Envia as alterações e tags para o repositório remoto
git push origin main
git push origin --tags

# Publica o pacote no npm
npm publish --access public

Write-Host "\nPublicação concluída com sucesso!" -ForegroundColor Green
Write-Host "Versão anterior: $currentVersion" -ForegroundColor Yellow
Write-Host "Nova versão: $newVersion" -ForegroundColor Yellow