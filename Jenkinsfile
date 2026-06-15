def runCommand(command) {
    if (isUnix()) {
        sh command
    } else {
        bat command
    }
}

pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    runCommand('npm ci')
                }
            }
        }

        stage('Install Playwright Browser') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps chromium'
                    } else {
                        bat 'npx playwright install chromium'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    runCommand('npx playwright test')
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**,allure-results/**,screenshots/**,test-results/**', allowEmptyArchive: true
        }
    }
}

