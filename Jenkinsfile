pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'ecommerce-platform'
        IMAGE_TAG = "${BUILD_NUMBER}"
        MAVEN_OPTS = '-Xmx1024m'
        NODE_VERSION = '18'
    }
    
    tools {
        maven 'Maven-3.9.4'
        nodejs 'NodeJS-18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    echo "Building Spring Boot application..."
                    sh 'mvn clean compile -DskipTests'
                }
            }
        }
        
        stage('Run Backend Tests') {
            steps {
                script {
                    echo "Running backend unit tests..."
                    sh 'mvn test'
                }
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'target/surefire-reports/*.xml'
                    publishCoverage adapters: [jacocoAdapter('target/site/jacoco/jacoco.xml')]
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    echo "Building React frontend..."
                    dir('frontend') {
                        sh 'npm ci'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Run Frontend Tests') {
            steps {
                script {
                    echo "Running frontend tests..."
                    dir('frontend') {
                        sh 'npm test -- --coverage --watchAll=false'
                    }
                }
            }
            post {
                always {
                    publishCoverage adapters: [istanbulCoberturaAdapter('frontend/coverage/cobertura-coverage.xml')]
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    echo "Running security scans..."
                    sh 'mvn org.owasp:dependency-check-maven:check'
                }
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'target',
                        reportFiles: 'dependency-check-report.html',
                        reportName: 'Dependency Check Report'
                    ])
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    def image = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        image.push()
                        image.push("latest")
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Deploying to staging environment..."
                    sh '''
                        docker-compose -f docker-compose.staging.yml down
                        docker-compose -f docker-compose.staging.yml pull
                        docker-compose -f docker-compose.staging.yml up -d
                    '''
                }
            }
        }
        
        stage('Integration Tests') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Running integration tests..."
                    sh '''
                        # Wait for services to be ready
                        sleep 30
                        
                        # Run integration tests
                        mvn verify -Pintegration-tests
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying to production environment..."
                    sh '''
                        docker-compose -f docker-compose.prod.yml down
                        docker-compose -f docker-compose.prod.yml pull
                        docker-compose -f docker-compose.prod.yml up -d
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Cleaning up workspace..."
                sh 'docker system prune -f'
            }
        }
        
        success {
            script {
                echo "Build successful!"
                // Send notification to Slack/Teams
                slackSend(
                    channel: '#deployments',
                    color: 'good',
                    message: "✅ E-Commerce Platform build #${BUILD_NUMBER} successful!\n" +
                            "Branch: ${env.BRANCH_NAME}\n" +
                            "Commit: ${env.GIT_COMMIT_SHORT}\n" +
                            "Build: ${env.BUILD_URL}"
                )
            }
        }
        
        failure {
            script {
                echo "Build failed!"
                // Send notification to Slack/Teams
                slackSend(
                    channel: '#deployments',
                    color: 'danger',
                    message: "❌ E-Commerce Platform build #${BUILD_NUMBER} failed!\n" +
                            "Branch: ${env.BRANCH_NAME}\n" +
                            "Commit: ${env.GIT_COMMIT_SHORT}\n" +
                            "Build: ${env.BUILD_URL}\n" +
                            "Console: ${env.BUILD_URL}console"
                )
            }
        }
        
        unstable {
            script {
                echo "Build unstable!"
                slackSend(
                    channel: '#deployments',
                    color: 'warning',
                    message: "⚠️ E-Commerce Platform build #${BUILD_NUMBER} unstable!\n" +
                            "Branch: ${env.BRANCH_NAME}\n" +
                            "Commit: ${env.GIT_COMMIT_SHORT}\n" +
                            "Build: ${env.BUILD_URL}"
                )
            }
        }
    }
}
