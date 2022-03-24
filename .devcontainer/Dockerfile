FROM node:17-slim

RUN apt-get update && apt-get install -y git zsh wget

RUN npm install -g npm pnpm

USER node

RUN cd ~ && wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh && sh install.sh
RUN /bin/zsh ~/.zshrc
