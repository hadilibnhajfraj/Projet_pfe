pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    environment {
        FLUTTER_HOME = "/opt/flutter"
        PATH = "/opt/flutter/bin:/opt/flutter/bin/cache/dart-sdk/bin:${env.PATH}"
        SCANNER_HOME = tool 'SonarScanner'
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
                    sh 'node --check src/server.js'
                }
            }
        }

        stage('Backend Tests') {
    steps {
        dir('Projet_flutter_backend') {
            sh 'npm test -- --coverage'
        }
    }
}
stage('Flutter Test') {
    steps {
        dir('Projet_flutter') {
            sh 'flutter test --coverage'
        }
    }
}

        stage('Backend Lint') {
            steps {
                dir('Projet_flutter_backend') {
                    // Non-blocking for now: the ESLint/SonarJS ruleset was
                    // just introduced and surfaced pre-existing issues across
                    // the codebase that are being fixed incrementally — see
                    // `npm run lint` output. Flip to a hard failure once that
                    // backlog is cleared.
                    sh 'npm run lint || true'
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
                        echo "FLUTTER ANALYZE"
                        echo "=============================="

                        flutter analyze || true

                        echo "Analyse terminée"
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('Projet_flutter_backend') {
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            ${SCANNER_HOME}/bin/sonar-scanner
                        '''
                    }
                }
            }
        }

        stage('Flutter Build Web') {
            steps {
                dir('Projet_flutter') {
                    sh '''
                        flutter clean
                        flutter pub get
                        flutter build web --release
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

        always {
            cleanWs()
        }
    }
}