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

    }
}