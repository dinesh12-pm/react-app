pipeline {
    agent any

    environment {
        DEPLOY_USER = 'ubuntu'         
        DEPLOY_HOST = '54.165.172.232'  
        DEPLOY_DIR  = '/var/www/my-react-app'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dinesh12-pm/react-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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

