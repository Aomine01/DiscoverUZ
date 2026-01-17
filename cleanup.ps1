# ============================================
# DiscoverUz - Safe Cleanup Script
# ============================================
# This script safely removes bloat identified in the audit
# Total cleanup: ~6.5 MB of duplicate images + archive directory

Write-Host "DiscoverUz - Deep Clean Cleanup Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$cleanupSummary = @()
$totalSaved = 0

# ============================================
# 1. DELETE ARCHIVE DIRECTORY (~4GB)
# ============================================
Write-Host "[1/6] Checking for archive directory..." -ForegroundColor Yellow
$archiveDir = "discover-uz_ARCHIVE_20260110_185257"

if (Test-Path $archiveDir) {
    $archiveSize = (Get-ChildItem -Path $archiveDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "  Found: $archiveDir (${archiveSize} MB)" -ForegroundColor White
    $confirm = Read-Host "  Delete archive directory? (y/N)"
    
    if ($confirm -eq 'y') {
        Remove-Item -Path $archiveDir -Recurse -Force
        Write-Host "  ✓ Deleted archive directory" -ForegroundColor Green
        $cleanupSummary += "Archive directory: ${archiveSize} MB"
        $totalSaved += $archiveSize
    } else {
        Write-Host "  Skipped" -ForegroundColor Gray
    }
} else {
    Write-Host "  Not found (already deleted)" -ForegroundColor Gray
}

# ============================================
# 2. DELETE DUPLICATE PNG FILES (3.5 MB)
# ============================================
Write-Host "`n[2/6] Removing duplicate PNG files..." -ForegroundColor Yellow
$pngFiles = @(
    "public\images\bazaar.png",
    "public\images\plov.png",
    "public\images\tashkent.png",
    "public\images\hero.png",
    "public\images\bukhara.png",
    "public\images\khiva.png",
    "public\images\samarkand.png"
)

$pngSize = 0
foreach ($file in $pngFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1KB
        $pngSize += $size
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted $file (${size} KB)" -ForegroundColor Green
    }
}

if ($pngSize -gt 0) {
    $cleanupSummary += "PNG duplicates: $([math]::Round($pngSize / 1024, 2)) MB"
    $totalSaved += ($pngSize / 1024)
}

# ============================================
# 3. DELETE DUPLICATE JPG FILES (1.9 MB)
# ============================================
Write-Host "`n[3/6] Removing duplicate JPG files..." -ForegroundColor Yellow
$jpgFiles = @(
    "public\images\background4k.jpg",
    "public\images\background2k.jpg"
)

$jpgSize = 0
foreach ($file in $jpgFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1KB
        $jpgSize += $size
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted $file (${size} KB)" -ForegroundColor Green
    }
}

if ($jpgSize -gt 0) {
    $cleanupSummary += "JPG duplicates: $([math]::Round($jpgSize / 1024, 2)) MB"
    $totalSaved += ($jpgSize / 1024)
}

# ============================================
# 4. DELETE ZOMBIE COMPONENTS (11KB)
# ============================================
Write-Host "`n[4/6] Removing unused components..." -ForegroundColor Yellow
$zombieComponents = @(
    "components\SearchBox.tsx",
    "components\YandexMap.tsx"
)

$componentSize = 0
foreach ($file in $zombieComponents) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1KB
        $componentSize += $size
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted $file (${size} KB)" -ForegroundColor Green
    }
}

if ($componentSize -gt 0) {
    $cleanupSummary += "Zombie components: $([math]::Round($componentSize, 2)) KB"
}

# ============================================
# 5. CONSOLIDATE LOGO FILES (630KB)
# ============================================
Write-Host "`n[5/6] Consolidating logo files..." -ForegroundColor Yellow
$redundantLogos = @(
    "public\discoveruzlogo.svg",
    "public\discoveruzlogonoback.svg",
    "public\logo.svg",
    "public\logo.optimized.svg"
)

$logoSize = 0
foreach ($file in $redundantLogos) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1KB
        $logoSize += $size
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted $file (${size} KB)" -ForegroundColor Green
    }
}

if ($logoSize -gt 0) {
    Write-Host "  ℹ Kept: public\discoveruzlogo.optimized.svg (96KB)" -ForegroundColor Cyan
    $cleanupSummary += "Logo files: $([math]::Round($logoSize, 2)) KB"
}

# ============================================
# 6. DELETE UNUSED NEXT.JS DEFAULTS (3KB)
# ============================================
Write-Host "`n[6/6] Removing unused default assets..." -ForegroundColor Yellow
$defaultAssets = @(
    "public\file.svg",
    "public\globe.svg",
    "public\next.svg",
    "public\vercel.svg",
    "public\window.svg"
)

$assetSize = 0
foreach ($file in $defaultAssets) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1KB
        $assetSize += $size
        Remove-Item $file -Force
        Write-Host "  ✓ Deleted $file (${size} KB)" -ForegroundColor Green
    }
}

if ($assetSize -gt 0) {
    $cleanupSummary += "Default assets: $([math]::Round($assetSize, 2)) KB"
}

# ============================================
# SUMMARY
# ============================================
Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "CLEANUP SUMMARY" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

if ($cleanupSummary.Count -gt 0) {
    foreach ($item in $cleanupSummary) {
        Write-Host "  • $item" -ForegroundColor White
    }
    Write-Host "`n  TOTAL SAVED: $([math]::Round($totalSaved, 2)) MB" -ForegroundColor Green
} else {
    Write-Host "  No files deleted (already clean)" -ForegroundColor Gray
}

Write-Host "`n✓ Cleanup complete!" -ForegroundColor Green
Write-Host "  Next steps:" -ForegroundColor Cyan
Write-Host "  1. Update .env with new required variables (EMAIL_HMAC_KEY, ALLOWED_ORIGIN)" -ForegroundColor White
Write-Host "  2. Run: npm install (refresh dependencies)" -ForegroundColor White
Write-Host "  3. Run: npm run build (verify no errors)" -ForegroundColor White
