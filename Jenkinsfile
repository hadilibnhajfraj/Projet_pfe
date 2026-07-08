pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    environment {
        FLUTTER_HOME = "/opt/flutter"
        PATH = "/opt/flutter/bin:/opt/flutter/bin/cache/dart-sdk/bin:${env.PATH}"
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

        stage('Flutter Version') {
            steps {
                sh '''
                    flutter --version
                    flutter doctor -v
                '''
            }
        }

      stage('Flutter Pub Get') {
    steps {
        dir('Projet_flutter') {
            sh 'flutter pub get'
        }
    }
}

stage('Flutter Analyze') {
    steps {
        dir('Projet_flutter') {
            sh '''
                echo "=============================="
                echo "NOUVEAU JENKINSFILE"
                echo "=============================="

                flutter analyze || true

                echo "FIN ANALYZE"
            '''
        }
    }
}
stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh '''
            sonar-scanner \
              -Dsonar.projectKey=crm-pfe \
              -Dsonar.sources=Projet_flutter/lib,Projet_flutter_backend/src
            '''
        }
    }
}
stage('Flutter Build Web') {
    steps {
        dir('Projet_flutter') {
            sh '''
                flutter clean
                flutter pub get
                flutter build web --verbose
            '''
        }
    }
}
    }

    post {
        success {
            echo 'Pipeline terminée avec succès'
        }

        failure {
            echo 'Pipeline en échec'
        }
    }
}