### Features

  - É só instalar e usar. Não requer configurações extras.

- Funciona tanto para v-text-field quanto input 

- Extremamente leve

### Instalação
  

Faça download e cole dentro do seu projeto (aceito ajuda para adicionar ao npm)

```js

import money from  './<caminho-relativo>/v-money'

// Registre a diretiva v-money

Vue.use(money)

```

### Uso

```html

<input  v-model="preco"  v-money/>

-ou-

<v-text-field  v-model="preco"  v-money/>

```

## Propriedades

- O sufixo é R$

- Duas casas decimais para os centavos

- Ponto ( . ) separando os milhares

- Exemplo: R$ 47.210,55

## Thanks to:

- https://github.com/vuejs-tips/v-money

- https://github.com/lmarqs/v-money