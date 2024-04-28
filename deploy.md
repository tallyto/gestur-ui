# Deploy github pages

### Instalar o github pages cli
```bash
npm i -g angular-cli-ghpages
```

### Fazer o build da aplicação para desenvolvimento
```bash
ng build --configuration development --base-href=/gestur-ui/
```

### Fazer o deploy da aplicação
```bash
angular-cli-ghpages --dir=dist/gestur-ui/browser
```

