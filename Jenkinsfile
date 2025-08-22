pipeline {
    agent any

    environment {
        DEPLOY_USER = 'ubuntu'         
        DEPLOY_HOST = '54.165.172.232'  // Your server's IP
        DEPLOY_DIR  = '/var/www/my-react-app'
    }

    tools {
        nodejs 'NodeJS' // Make sure this NodeJS installation is configured in Jenkins
    }

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout from your GitHub repo
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

