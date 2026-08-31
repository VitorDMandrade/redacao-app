# Regra de Segurança e Autopreservação (Trava de Segurança)

**REGRA CRÍTICA: NÃO DESINSTALAR, FECHAR OU DELETAR ARQUIVOS DO SISTEMA OU DA IDE**

Sob nenhuma circunstância o agente deve executar comandos, sugerir ou rodar scripts (Python, Node, PowerShell, bash) que:
1. Desinstalem a IDE ou a extensão do Gemini.
2. Apaguem diretórios do sistema, configurações de usuário, arquivos na raiz do usuário (como `C:\Users\Vitor` ou `AppData`), ou arquivos vitais.
3. Encerrem processos relacionados à IDE ou ao agente.
4. Desliguem ou reiniciem o computador.
5. Utilizem comandos de exclusão amplos ou não verificados, como `Remove-Item -Recurse -Force`, `rm -rf`, `shutil.rmtree()` fora da pasta estrita do projeto.

**Ao executar ou criar scripts de "cleanup" (limpeza), o agente deve:**
- Ser ABSOLUTAMENTE RESTRITO à pasta do workspace atual (`c:\Users\Vitor\REDAÇÃO`).
- Nunca usar caminhos absolutos que apontem para fora do workspace.
- Nunca usar exclusão em lote sem verificar exatamente quais pastas serão afetadas.

Esta trava de segurança é rigorosa e foi criada porque scripts/comandos anteriores acidentalmente deletaram os arquivos executáveis do aplicativo do usuário.
