FROM jenkins/jenkins:lts

USER root

# Outils de base
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    zip \
    xz-utils \
    ca-certificates \
    apt-transport-https \
    gnupg \
    lsb-release \
    sudo

# Installation Docker CLI
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

RUN echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
$(. /etc/os-release && echo $VERSION_CODENAME) stable" \
> /etc/apt/sources.list.d/docker.list

RUN apt-get update && apt-get install -y docker-ce-cli

# Installation Flutter
WORKDIR /opt

RUN git clone https://github.com/flutter/flutter.git -b stable

ENV FLUTTER_HOME=/opt/flutter
ENV PATH=$FLUTTER_HOME/bin:$FLUTTER_HOME/bin/cache/dart-sdk/bin:$PATH

# Corriger les permissions
RUN git config --system --add safe.directory /opt/flutter

RUN chown -R jenkins:jenkins /opt/flutter

USER jenkins

RUN flutter config --no-analytics
RUN flutter doctor