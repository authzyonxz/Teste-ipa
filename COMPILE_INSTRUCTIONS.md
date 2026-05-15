# VPN PREMIUM — Instruções de Compilação para .IPA

## Passo 1: Preparar o Ambiente

```bash
# Instale as dependências Node
npm install

# Instale os pods iOS
cd ios && pod install && cd ..
```

## Passo 2: Abrir no Xcode

```bash
open ios/VPN-Premium.xcworkspace
```

**⚠️ IMPORTANTE:** Abra o arquivo `.xcworkspace`, NÃO o `.xcodeproj`

## Passo 3: Configurar Assinatura

1. No Xcode, clique em **VPN-Premium** no painel esquerdo
2. Vá em **Signing & Capabilities**
3. Selecione seu **Team** (Apple Developer Account)
4. Defina o **Bundle Identifier** (exemplo: `com.seudominio.vpnpremium`)

## Passo 4: Gerar o Archive

1. Selecione o destino: **Any iOS Device (arm64)**
2. Menu: **Product → Archive**
3. Aguarde a compilação (pode levar alguns minutos)

## Passo 5: Exportar o .IPA

1. Quando o Archive terminar, a janela **Organizer** abrirá automaticamente
2. Selecione o archive criado
3. Clique em **Distribute App**
4. Escolha o método de distribuição:
   - **Ad Hoc** — Instalar em dispositivos específicos
   - **Development** — Testes internos
   - **App Store Connect** — Publicar na App Store
5. Siga o assistente até o final
6. Salve o arquivo `.ipa` em um local seguro

## Passo 6: Instalar no iPhone

### Opção A — AltStore (Recomendado - Gratuito)
1. Instale o [AltStore](https://altstore.io) no seu Mac
2. Conecte o iPhone via USB
3. Abra o AltStore
4. Clique no ícone do iPhone
5. Arraste o arquivo `.ipa` para a janela do AltStore

### Opção B — Sideloadly (Gratuito)
1. Baixe o [Sideloadly](https://sideloadly.io)
2. Conecte o iPhone via USB
3. Abra o Sideloadly
4. Arraste o `.ipa` para a janela
5. Clique em "Start"

### Opção C — Apple Configurator 2 (Gratuito, Mac App Store)
1. Instale o Apple Configurator 2 da App Store
2. Conecte o iPhone via USB
3. Abra o Apple Configurator 2
4. Arraste o `.ipa` para o seu iPhone na lista

## Troubleshooting

### "Pod install fails"
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

### "Xcode build fails"
```bash
# Limpar build
Cmd + Shift + K

# Depois rebuild
Cmd + B
```

### "App crashes on launch"
- Abra o Xcode Console (Cmd + Shift + C)
- Procure por erros vermelhos
- Verifique se todas as dependências foram instaladas

### "Slow animations"
- As animações são otimizadas para iPhone 12+
- Em iPhones mais antigos, as animações podem ser mais lentas
- Isso é normal e não afeta a funcionalidade

## Dicas Importantes

✅ **Sempre use `.xcworkspace`**, não `.xcodeproj`
✅ **Atualize o Bundle Identifier** com seu domínio
✅ **Tenha um Apple Developer Account** (gratuito ou pago)
✅ **Conecte o iPhone via USB** durante a compilação
✅ **Confie no certificado** quando solicitado no iPhone

## Recursos Adicionais

- [React Native Docs](https://reactnative.dev)
- [Xcode Help](https://developer.apple.com/xcode)
- [Apple Developer](https://developer.apple.com)
