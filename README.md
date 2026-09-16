# paceon.com.br

Site institucional da PaceOn, em HTML estático. Publicado com GitHub Pages.

O conteúdo deste repositório é a saída gerada por `apps/site/build.py` no
repositório do produto (`ai-runner`). Para atualizar o site:

```bash
cd ai-runner/apps/site && python3 build.py
rsync -a --delete --exclude .git --exclude CNAME --exclude .nojekyll --exclude README.md dist/ ../../../paceon.com.br/
cd ../../../paceon.com.br && git add -A && git commit -m "site: atualiza conteúdo" && git push
```
