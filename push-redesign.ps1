# push-redesign.ps1
# Push anan.zh.kg redesign to GitHub.
# Uses GH_TOKEN env var (paste in this same PowerShell session before running).
# Usage:
#   $env:GH_TOKEN = 'ghp_...'
#   .\push-redesign.ps1

$ErrorActionPreference = 'Stop'
$root = 'I:\Codex\projects\cross-border-ecom-tools\web\anan-devtools'
Set-Location $root

if (-not $env:GH_TOKEN) {
  Write-Host 'Error: $env:GH_TOKEN is empty. Set it first:' -ForegroundColor Red
  Write-Host '  $env:GH_TOKEN = ''ghp_...'''
  exit 1
}

git remote set-url origin "https://qq136692547-cmyk:$env:GH_TOKEN@github.com/qq136692547-cmyk/anan-devtools.git"

git add -A
git status --short
Write-Host ''
Write-Host 'Committing...' -ForegroundColor Cyan
git commit -m 'Redesign: terminal-meets-IDE aesthetic, ASCII art banner, new design system'
if ($LASTEXITCODE -ne 0) { Write-Host 'Nothing to commit or commit failed'; exit $LASTEXITCODE }

Write-Host 'Pushing to main...' -ForegroundColor Cyan
git push origin main
Write-Host 'Done.' -ForegroundColor Green