# TREE SNAPSHOT
# - All folders and files listed
# - File contents shown unless explicitly suppressed
# - Suppressed folders do not expand

$root = '.'

# Folders whose CONTENTS should be suppressed (folder name still shown)
$SuppressFolderContent = @(
    'node_modules'
)

# Files whose CONTENTS should be suppressed (filename still shown)
$SuppressFileContent = @(
    'package-lock.json',
    'yarn.lock',
    '.env',
    '.env.local',
    'tree.ps1'
)

function Show-Tree {
    param(
        [string]$path,
        [string]$indent = ''
    )

    Get-ChildItem -LiteralPath $path |
        Sort-Object @{Expression={$_.PSIsContainer};Descending=$true}, Name |
        ForEach-Object {

            if ($_.PSIsContainer) {
                Write-Output ("{0}{1}/" -f $indent, $_.Name)

                if ($SuppressFolderContent -contains $_.Name) {
                    Write-Output ("{0}  | <CONTENT SUPPRESSED: FOLDER>" -f $indent)
                    return
                }

                Show-Tree -path $_.FullName -indent ($indent + '  ')
            }
            else {
                $lineCount = 0
                try {
                    $lineCount = (Get-Content -LiteralPath $_.FullName -ErrorAction Stop).Count
                } catch {}

                Write-Output ("{0}{1} (lines: {2})" -f $indent, $_.Name, $lineCount)

                if ($SuppressFileContent -contains $_.Name) {
                    Write-Output ("{0}  | <CONTENT SUPPRESSED: FILE>" -f $indent)
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
                    Write-Output ("{0}  | <UNABLE TO READ FILE>" -f $indent)
                }
            }
        }
}

Write-Output ($root + '/')
Show-Tree -path $root
