pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Récupération du projet depuis GitHub'
            }
        }

        stage('Frontend') {
            steps {
                echo 'Build Flutter'
            }
        }

        stage('Backend') {
            steps {
                echo 'Build Node.js'
            }
        }
    }
}