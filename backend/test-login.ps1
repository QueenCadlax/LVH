$body = @{
    email = "admin@lowveld.co.za"
    password = "lowveld2026"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body `
    -ErrorAction SilentlyContinue

if ($response.StatusCode -eq 200) {
    $data = $response.Content | ConvertFrom-Json
    Write-Host "`n✅ LOGIN SUCCESSFUL`n"
    Write-Host "Token: $($data.token.Substring(0, 30))..."
    Write-Host "User: $($data.user.email)"
    Write-Host "User ID: $($data.user.id)`n"
} else {
    Write-Host "`n❌ LOGIN FAILED`n"
    Write-Host $response.Content
}
