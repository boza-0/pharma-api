# BONSAI SNAPSHOT (tolerant)
# - Lists folder and file names only
# - No file contents are displayed
# - Folder contents may be suppressed by exact folder name (folder is shown but not expanded)
# - Unreadable folders are marked, never crash traversal
# - Reparse points (symlinks/junctions) are shown but not expanded (prevents loops)
# - Prevents infinite recursion via visited-directory tracking

$root = '.'

# Folders whose CONTENTS should be suppressed (folder name still shown)
$SuppressFolderContent = @(
  'node_modules',
  'net8.0-windows'
)

# Track visited directories to prevent loops
$VisitedDirs = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)

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
        Write-Output ("{0}{1}" -f $indent, $_.Name)
      }
    }
}

Write-Output ($root + '/')
Show-Tree -path $root
