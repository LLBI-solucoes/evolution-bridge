# Script de publicação do evolution-bridge

# Função para verificar se há alterações não commitadas
function Test-GitChanges {
    $status = git status --porcelain
    return $status.Length -gt 0
}

# Função para verificar se estamos na branch master
function Test-masterBranch {
    $currentBranch = git rev-parse --abbrev-ref HEAD
    return $currentBranch -eq "master"
}

# Verifica se estamos na branch master
if (-not (Test-masterBranch)) {
    Write-Host "Erro: Você precisa estar na branch master para publicar." -ForegroundColor Red
    exit 1
}

# Obtém a versão atual do package.json
$packageJson = Get-Content .\package.json -Raw | ConvertFrom-Json
$currentVersion = $packageJson.version

# Verifica se há alterações não commitadas
if (Test-GitChanges) {
    Write-Host "`nExistem alterações não commitadas. Commitando alterações..." -ForegroundColor Yellow
    git add .
    git commit -m "chore: preparando publicação $currentVersion"
}

# Atualiza o repositório local com as alterações remotas
Write-Host "`nAtualizando repositório local..." -ForegroundColor Blue
git pull origin master

# Executa o build para garantir que não há erros
Write-Host "`nExecutando build..." -ForegroundColor Blue
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro: Falha no build. Corrija os erros antes de publicar." -ForegroundColor Red
    exit 1
}

# Executa o npm version patch para incrementar a versão
Write-Host "`nIncrementando versão..." -ForegroundColor Blue
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
Write-Host "`nEnviando alterações para o repositório remoto..." -ForegroundColor Blue
git push origin master
git push origin --tags

# Publica o pacote no npm
Write-Host "`nPublicando no npm..." -ForegroundColor Blue
npm publish --access public

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nPublicação concluída com sucesso!" -ForegroundColor Green
    Write-Host "Versão anterior: $currentVersion" -ForegroundColor Yellow
    Write-Host "Nova versão: $newVersion" -ForegroundColor Yellow
} else {
    Write-Host "`nErro ao publicar no npm. Verifique os logs acima." -ForegroundColor Red
    exit 1
}