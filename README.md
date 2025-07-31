# Self-Driving Car - Simulação com Rede Neural

Um projeto de simulação 2D desenvolvido em JavaScript puro, HTML e CSS, que utiliza uma rede neural e um algoritmo genético para treinar carros a desviarem do tráfego de forma autônoma.

<img width="375" height="209" alt="image" src="https://github.com/user-attachments/assets/a791541a-7331-4be8-9a58-8647c896ef2b" />

<img width="375" height="210" alt="image" src="https://github.com/user-attachments/assets/0f5213d7-ea73-4739-ac0f-05b312fa9408" />

-----

## 🚀 Funcionalidades

Este projeto é dividido em dois modos principais: um modo de simulação de IA e um modo de controle manual.

### 🚗 Simulação e Controle

  - **Controle Manual:** Assuma o controle de um carro principal usando as teclas direcionais do teclado para testar a física e a dirigibilidade.
  - **Modo de IA:** Ative o modo de Inteligência Artificial para que uma população de carros tente aprender a dirigir por conta própria.
  - **Alternância de Modos:** Alterne facilmente entre o controle manual (`🎮`) e a simulação de IA (`🤖`) com um clique.
  - **Tráfego Dinâmico:** A pista é populada por carros "dummy" que se movem em velocidade constante em faixas aleatórias, criando um ambiente desafiador para a IA.
  - **Detecção de Colisão:** Os carros detectam colisões com as bordas da pista e com outros veículos. Um carro danificado para de se mover.

### 🧠 Inteligência Artificial (Algoritmo Genético)

  - **Rede Neural:** Cada carro de IA é equipado com um "cérebro", que é uma rede neural simples.
  - **Sensores:** Os carros utilizam sensores de raio (ray-casting) para detectar a distância das bordas da pista e de outros carros. As leituras desses sensores servem como entrada (input) para a rede neural.
  - **Tomada de Decisão:** A rede neural processa os dados dos sensores e decide a próxima ação do carro (acelerar, virar à esquerda, virar à direita ou dar ré).
  - **Seleção do Melhor Indivíduo:** O algoritmo identifica o "melhor carro" da geração, que é aquele que consegue percorrer a maior distância na pista sem colidir.
  - **Salvar Progresso:** O cérebro do melhor carro pode ser salvo (`💾`) no armazenamento local do navegador (`localStorage`), permitindo que o treinamento seja retomado posteriormente.
  - **Mutação Genética:** Ao iniciar uma nova simulação com um cérebro salvo, os outros carros da população recebem uma cópia do melhor cérebro com uma pequena taxa de **mutação**. Isso introduz variações e permite que a IA explore novas "estratégias" de direção, sendo a base do aprendizado por algoritmo genético.

### ⚙️ Interface e Configuração

  - **Visualização da Rede:** Uma tela de canvas dedicada renderiza em tempo real a estrutura da rede neural do melhor carro, mostrando os neurônios, as conexões e os pesos sinápticos.
  - **Painel de Configuração:** Sliders interativos permitem configurar os parâmetros da simulação em tempo real:
      - **Número de Carros:** Define o tamanho da população de carros de IA.
      - **Número de "Níveis" de Tráfego:** Controla a densidade do tráfego de carros "dummy".
      - **Taxa de Mutação:** Ajusta a porcentagem de mutação aplicada aos cérebros da nova geração.
  - **Persistência de Dados:** Todas as configurações dos sliders e o melhor cérebro são salvos no `localStorage`, mantendo o estado da simulação mesmo após recarregar a página.
  - **Descartar Progresso:** Um botão (`🗑️`) permite limpar todos os dados salvos do `localStorage` e reiniciar a simulação do zero.

-----

## 🛠️ Como Executar

Por ser um projeto puramente front-end, você não precisa de um back-end.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Viitor22/AutoCar.git
    ```

2.  **Abra o diretório:**

    ```bash
    cd AutoCar
    ```

3.  **Inicie um servidor local:**
    A maneira mais fácil é usar uma extensão como o **Live Server** no Visual Studio Code. Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

    *(Abrir o `index.html` diretamente no navegador pode causar erros de CORS ao carregar os scripts.)*

-----

## 💻 Tecnologias Utilizadas

  - **HTML5** (principalmente a API Canvas)
  - **CSS3**
  - **JavaScript (ES6+)**
