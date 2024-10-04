🌍 ENGLISH VERSION 🇬🇧
💧 Gas & Water Measure Management System ⚡

🔧 Project Overview:

This is a comprehensive data management system for reading water and gas meters, designed for a potential water/gas company. Users can submit photos of meters, and numerical readings are automatically recognized using Google’s GeminiAPI, transforming images into precise data! These readings are stored in a MySQL database, allowing clients' consumption to be checked, distinguishing between water and gas usage.

🌟 Key Features:

    🚰 Upload photos of water and gas meters.
    🧠 Automatic reading recognition using GeminiAPI.
    🗃️ Secure data storage in MySQL.
    🔍 Query consumption by customer and meter type (water or gas).

💻 Technologies Used:

This fullstack project leverages a powerful and modern tech stack:

    TypeScript ⚙️
    Node.js + Express 🚀
    React + Next.js ⚛️
    Material UI 🎨
    MySQL 🗄️
    Docker 🐳 – Yes, everything runs inside Docker containers for easy setup and deployment!
    Jest ✅ – Tests are included, though still a work in progress to ensure code quality.

📊 What has been implemented:

    A robust Node.js backend communicating with the database.
    A dynamic and responsive React frontend using Material UI for a modern UI experience.
    Integration with GeminiAPI for automated reading recognition from meter images.

🔮 Future steps:

    ✨ Enhance the UI with cleaner Material UI components.
    🔐 Implement more validation and new features.
    🧪 Expand test coverage with Jest.


🔧 Installation Instructions
    Step 1: Install Dependencies

    You need to install dependencies for both the backend and frontend.

        Navigate to the back-end directory and run:



    cd back-end/

    npm install

    Navigate to the front-end directory and run:


        cd front-end/

        npm install

    Step 2: Run the Project

    Once dependencies are installed, you can start the entire system using Docker.

        Make sure you are in the back-end directory:



    cd back-end/

    Start the application using Docker Compose:


        docker compose up

    Note: Make sure that MySQL Workbench or any other MySQL instance is not running on your machine to avoid port conflicts with the MySQL container.

🔗 Feel free to explore the code, contribute, and send suggestions!


🌍 VERSÃO EM PORTUGUÊS 🇧🇷
💧 Gas & Water Measure Management System ⚡

🔧 Descrição do Projeto:

Este é um sistema completo de gerenciamento de leituras de hidrômetros e gasômetros voltado para uma potencial empresa de água e gás. Os usuários podem enviar fotos dos medidores, e os valores numéricos são automaticamente reconhecidos via GeminiAPI do Google, transformando imagens em dados precisos! Esses dados são armazenados em um banco de dados MySQL, permitindo a consulta de consumo de diferentes clientes, separando entre água e gás.

🌟 Principais Funcionalidades:

    🚰 Envio de fotos de medidores de água e gás.
    🧠 Reconhecimento automático de leituras com GeminiAPI.
    🗃️ Armazenamento seguro dos dados em MySQL.
    🔍 Consulta de consumo por cliente e tipo de medidor (água ou gás).

💻 Tecnologias Utilizadas:

Este projeto fullstack é construído com uma stack poderosa e moderna:

    TypeScript ⚙️
    Node.js + Express 🚀
    React + Next.js ⚛️
    Material UI 🎨
    MySQL 🗄️
    Docker 🐳 – Sim, tudo roda em containers Docker, facilitando a configuração e o deploy!
    Jest ✅ – Testes em andamento para garantir a qualidade do código.

📊 O que já foi implementado:

    Backend robusto em Node.js para comunicação com o banco de dados.
    Frontend dinâmico e responsivo em React com Material UI para uma experiência moderna.
    Integração com GeminiAPI para leitura automatizada das imagens dos medidores.

🔮 Próximos passos:

    ✨ Melhorar a interface com componentes mais clean do Material UI.
    🔐 Implementar mais validações e novas funcionalidades.
    🧪 Ampliar a cobertura de testes unitários e funcionais com Jest.

🔧 Instruções de Instalação
    Passo 1: Instalar Dependências

    Você precisará instalar as dependências tanto no diretório do backend quanto no frontend.

        Navegue até o diretório back-end e execute:



    cd back-end/

    npm install

    Navegue até o diretório front-end e execute:


        cd front-end/
        
        npm install

    Passo 2: Rodar o Projeto

    Após instalar as dependências, você pode iniciar todo o sistema utilizando o Docker.

        Certifique-se de estar no diretório back-end:

    cd back-end/

    Inicie a aplicação com o Docker Compose:

        docker compose up

    Nota: Certifique-se de que o MySQL Workbench ou qualquer outra instância do MySQL não esteja rodando na sua máquina para evitar conflitos de porta com o container do MySQL.


