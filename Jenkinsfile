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
                    bat 'npm install'
                }
            }
        }

        stage('Check Backend') {
            steps {
                dir('Projet_flutter_backend') {
                    bat 'node --check src/app.js'
                }
            }
        }

    }
}