**1. List all products**
```powershell
curl "http://localhost:3000/api/productos"
```

**2. Full‑text search**
```powershell
curl "http://localhost:3000/api/productos?q=oral"
```

**3. Filter by category**
```powershell
curl "http://localhost:3000/api/productos?categoriaId=1"
```

**4. Filter by subcategory**
```powershell
curl "http://localhost:3000/api/productos?subcategoriaId=1"
```

**5. Filter by family**
```powershell
curl "http://localhost:3000/api/productos?familiaId=1"
```

**6. Filter by stock availability**
```powershell
curl "http://localhost:3000/api/productos?inStock=true"
```

**7. Combined filters**
```powershell
curl "http://localhost:3000/api/productos?q=oral&categoriaId=1&inStock=true"
```

**8. List all categories**
```powershell
curl "http://localhost:3000/api/categorias"
```

**9. Category tree (nested)**
```powershell
curl "http://localhost:3000/api/categorias/1"
```