pipeline {
    agent any

    environment {
        DEPLOY_USER = 'ubuntu'         
        DEPLOY_HOST = '54.165.172.232'  // Your server's IP
        DEPLOY_DIR  = '/var/www/my-react-app'
        NPM_CONFIG_REGISTRY = "https://registry.npmmirror.com"
    }

    tools {
        nodejs 'NodeJS'  // Make sure this matches the NodeJS installation name in Jenkins
    }

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout directly from your GitHub repo
                git branch: 'main', url: 'https://github.com/dinesh12-pm/react-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Using Node version:"
                    node -v
                    echo "Using NPM version:"
                    npm -v
                    echo "Installing dependencies..."
                    npm install --verbose
                '''
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['deploy-server-ssh-key']) {
                    sh """
                        echo "Deploying to $DEPLOY_HOST..."
                        ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST 'rm -rf $DEPLOY_DIR/*'
                        scp -r build/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DIR/
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Build and deployment successful!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}

