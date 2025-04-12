function Test-GitChanges {
    $status = git status --porcelain
    return $status.Length -gt 0
}

function Test-masterBranch {
    $currentBranch = git rev-parse --abbrev-ref HEAD
    return $currentBranch -eq "master"
}

if (-not (Test-masterBranch)) {
    Write-Host "Erro: Você precisa estar na branch master para publicar." -ForegroundColor Red
    exit 1
}

$packageJson = Get-Content .\package.json -Raw | ConvertFrom-Json
$currentVersion = $packageJson.version

if (Test-GitChanges) {
    Write-Host "`nExistem alterações não commitadas. Commitando alterações..." -ForegroundColor Yellow
    git add .
    git commit -m "v$currentVersion"
}

Write-Host "`nAtualizando repositório local..." -ForegroundColor Blue
git pull origin master

Write-Host "`nExecutando build..." -ForegroundColor Blue
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro: Falha no build. Corrija os erros antes de publicar." -ForegroundColor Red
    exit 1
}

Write-Host "`nIncrementando versão..." -ForegroundColor Blue
npm version patch

$packageJson = Get-Content .\package.json -Raw | ConvertFrom-Json
$newVersion = $packageJson.version

git add .
git commit -m "v$currentVersion"

git tag -a "v$newVersion" -m "v$newVersion"

Write-Host "`nEnviando alterações para o repositório remoto..." -ForegroundColor Blue
git push origin master
git push origin --tags

Write-Host "`nPublicando no npm..." -ForegroundColor Blue
npm publish --access public

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nPublicação concluída com sucesso!" -ForegroundColor Green
    Write-Host "Versão anterior: $currentVersion" -ForegroundColor Yellow
    Write-Host "Nova versão: $newVersion" -ForegroundColor Yellow
}
else {
    Write-Host "`nErro ao publicar no npm. Verifique os logs acima." -ForegroundColor Red
    exit 1
}