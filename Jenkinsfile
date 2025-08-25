pipeline {
    agent any

    environment {
        DEPLOY_USER = 'ubuntu'
        DEPLOY_HOST = '54.165.172.232'   // Target server IP
        DEPLOY_DIR  = '/var/www/my-react-app'
    }

    tools {
        nodejs 'NodeJS'   // Ensure NodeJS is configured in Jenkins global tools
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/dinesh12-pm/react-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Installing dependencies..."
                    npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['deploy-server-ssh-key']) {
                    sh """
                        echo "Deploying to server..."
                        ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST 'mkdir -p $DEPLOY_DIR && rm -rf $DEPLOY_DIR/*'
                        scp -o StrictHostKeyChecking=no -r build/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DIR/
                    """
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Build or Deploy failed!"
        }
        success {
            echo "✅ Deployment successful to $DEPLOY_HOST"
        }
    }
}

