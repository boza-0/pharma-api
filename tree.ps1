# TREE SNAPSHOT (tolerant)
# - All folders and files listed when accessible
# - File contents shown unless explicitly suppressed
# - File contents may be suppressed by exact filename or by file extension
# - Suppressed folders do not expand
# - Unreadable folders/files are marked, never crash traversal
# - Reparse points (symlinks/junctions) are shown but not expanded (prevents loops)

$root = '.'

# Folders whose CONTENTS should be suppressed (folder name still shown)
$SuppressFolderContent = @(
  'node_modules'
)

# Files whose CONTENTS should be suppressed (filename still shown)
$SuppressFileContent = @(
  'package.json',
  'package-lock.json',
  'readme.md',
  'tree.ps1'
)

# File extensions whose CONTENTS should be suppressed (case-insensitive)
$SuppressFileExtensions = @(
  '.lock',
  '.log',
  '.ps1'
)

# Prevent infinite recursion via symlinks/junctions and also avoid duplicating work
$VisitedDirs = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)

function Get-SafeLineCount {
  param([string]$filePath)

  $count = 0
  try {
    Get-Content -LiteralPath $filePath -ErrorAction Stop -ReadCount 2000 |
      ForEach-Object { $count += $_.Count }
    return $count
  }
  catch {
    return 0
  }
}

function Show-Tree {
  param(
    [string]$path,
    [string]$indent = ''
  )

  $fullPath = $null
  try {
    $fullPath = (Resolve-Path -LiteralPath $path -ErrorAction Stop).Path
  }
  catch {
    # If we can't resolve it, still attempt listing by raw path below.
    $fullPath = $path
  }

  if (-not $VisitedDirs.Add($fullPath)) {
    Write-Output ("{0}  | <REVISIT SKIPPED>" -f $indent)
    return
  }

  $items = $null
  try {
    $items = Get-ChildItem -LiteralPath $path -ErrorAction Stop
  }
  catch {
    $msg = $_.Exception.Message
    Write-Output ("{0}  | <UNABLE TO ACCESS DIRECTORY: {1}>" -f $indent, $msg)
    return
  }

  $items |
    Sort-Object @{Expression={$_.PSIsContainer};Descending=$true}, Name |
    ForEach-Object {

      if ($_.PSIsContainer) {
        Write-Output ("{0}{1}/" -f $indent, $_.Name)

        # Don’t expand symlinks/junctions/reparse points (common source of loops)
        if (($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
          Write-Output ("{0}  | <REPARSE POINT: NOT EXPANDED>" -f $indent)
          return
        }

        if ($SuppressFolderContent -contains $_.Name) {
          Write-Output ("{0}  | <CONTENT SUPPRESSED: FOLDER>" -f $indent)
          return
        }

        Show-Tree -path $_.FullName -indent ($indent + '  ')
      }
      else {
        $lineCount = Get-SafeLineCount -filePath $_.FullName
        Write-Output ("{0}{1} (lines: {2})" -f $indent, $_.Name, $lineCount)

        # Precedence:
        # 1) Exact filename suppression
        # 2) Extension-based suppression
        # 3) Content display

        if ($SuppressFileContent -contains $_.Name) {
          Write-Output ("{0}  | <CONTENT SUPPRESSED: FILE>" -f $indent)
          return
        }

        $extension = [IO.Path]::GetExtension($_.Name)
        if ($SuppressFileExtensions -contains $extension) {
          Write-Output ("{0}  | <CONTENT SUPPRESSED: FILE EXTENSION {1}>" -f $indent, $extension)
          return
        }

        try {
          Write-Output ("{0}  | <BEGIN FILE CONTENT>" -f $indent)

          Get-Content -LiteralPath $_.FullName -ErrorAction Stop |
            ForEach-Object {
              Write-Output ("{0}  | {1}" -f $indent, $_)
            }

          Write-Output ("{0}  | <END FILE CONTENT>" -f $indent)
        }
        catch {
          $msg = $_.Exception.Message
          Write-Output ("{0}  | <UNABLE TO READ FILE: {1}>" -f $indent, $msg)
        }
      }
    }
}

Write-Output ($root + '/')
Show-Tree -path $root
