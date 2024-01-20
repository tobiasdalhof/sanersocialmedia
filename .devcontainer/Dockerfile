FROM node:20-slim

RUN apt-get update && apt-get install -y git zsh wget zip p7zip p7zip-full curl

RUN npm install --location=global pnpm

USER node

RUN cd ~ && wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh && sh install.sh
RUN /bin/zsh ~/.zshrc
