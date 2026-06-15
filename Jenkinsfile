pipeline {
agent any

```
tools {
    nodejs 'NodeJS_22'
}

stages {

    stage('Install Dependencies') {
        steps {
            bat 'npm ci'
        }
    }

    stage('Install Playwright Browsers') {
        steps {
            bat 'npx playwright install chromium'
        }
    }

    stage('Run Tests') {
        steps {
            bat 'npx playwright test'
        }
    }
}

post {
    always {
        allure(
            includeProperties: false,
            jdk: '',
            results: [[path: 'allure-results']]
        )
    }
}
```

}
