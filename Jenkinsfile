pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend') {
            steps {
                dir('Projet_flutter_backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Check Backend') {
            steps {
                dir('Projet_flutter_backend') {
                    sh 'node --check src/app.js'
                }
            }
        }

        stage('Flutter Pub Get') {
            steps {
                sh '''
                docker run --rm \
                -v ${WORKSPACE}/Projet_flutter:/app \
                -w /app \
                ghcr.io/cirruslabs/flutter:stable \
                flutter pub get
                '''
            }
        }

        stage('Flutter Analyze') {
            steps {
                sh '''
                docker run --rm \
                -v ${WORKSPACE}/Projet_flutter:/app \
                -w /app \
                ghcr.io/cirruslabs/flutter:stable \
                flutter analyze
                '''
            }
        }

        stage('Flutter Build Web') {
            steps {
                sh '''
                docker run --rm \
                -v ${WORKSPACE}/Projet_flutter:/app \
                -w /app \
                ghcr.io/cirruslabs/flutter:stable \
                flutter build web
                '''
            }
        }

    }
}