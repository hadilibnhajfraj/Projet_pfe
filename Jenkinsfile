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

        stage('Debug Flutter') {
            steps {
                dir('Projet_flutter') {
                    sh '''
                        pwd
                        ls
                        cat pubspec.yaml
                    '''
                }
            }
        }

        stage('Flutter Pub Get') {
            steps {
                dir('Projet_flutter') {
                    sh '''
                        docker run --rm \
                          -v $(pwd):/app \
                          -w /app \
                          ghcr.io/cirruslabs/flutter:stable \
                          flutter pub get
                    '''
                }
            }
        }

        stage('Flutter Analyze') {
            steps {
                dir('Projet_flutter') {
                    sh '''
                        docker run --rm \
                          -v $(pwd):/app \
                          -w /app \
                          ghcr.io/cirruslabs/flutter:stable \
                          flutter analyze
                    '''
                }
            }
        }

        stage('Flutter Build Web') {
            steps {
                dir('Projet_flutter') {
                    sh '''
                        docker run --rm \
                          -v $(pwd):/app \
                          -w /app \
                          ghcr.io/cirruslabs/flutter:stable \
                          flutter build web
                    '''
                }
            }
        }
    }
}