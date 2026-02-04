Write-Host "============================================" -ForegroundColor Green
Write-Host "  Ndertimi i Struktures se Projektit KontabApp" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

$projectName = "KontabApp"
Write-Host "Duke krijuar projektin: $projectName" -ForegroundColor Cyan

# Krijo strukturën
New-Item -ItemType Directory -Path $projectName -Force
Set-Location $projectName

# Krijo të gjitha folderat
$folders = @(
    "public",
    "src\components\common",
    "src\components\layout",
    "src\components\clients",
    "src\components\documents",
    "src\components\accounting",
    "src\components\tasks",
    "src\hooks",
    "src\lib",
    "src\services",
    "src\store",
    "src\types",
    "src\utils",
    "src\pages"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force
}

Write-Host "Struktura u krijua me sukses!" -ForegroundColor Green

# Tani mund të ekzekutosh komandat npm manualisht:
Write-Host "`nTani ekzekuto këto komanda:" -ForegroundColor Yellow
Write-Host "1. npm init -y" -ForegroundColor White
Write-Host "2. npm install react react-dom" -ForegroundColor White
Write-Host "3. npm install -D @types/react @types/react-dom" -ForegroundColor White
Write-Host "4. npm install react-router-dom" -ForegroundColor White
Write-Host "5. Kopjo konfigurimet nga më sipër" -ForegroundColor White

Set-Location ..
Write-Host "`nProjekti u krijua në folderin: $projectName" -ForegroundColor Green