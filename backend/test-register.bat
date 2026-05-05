@echo off
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@lowveld.co.za\",\"password\":\"lowveld2026\",\"firstName\":\"Admin\",\"lastName\":\"Lowveld\"}"
