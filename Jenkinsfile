pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'cicd-assignment-app'
        PORT = '3000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                bat 'docker build -t %DOCKER_IMAGE_NAME% .'
            }
        }

        stage('Run Application') {
            steps {
                echo 'Running the application in a Docker container...'
                
                bat '''
                @echo off
                docker stop %DOCKER_IMAGE_NAME%-container >nul 2>&1
                docker rm %DOCKER_IMAGE_NAME%-container >nul 2>&1
                exit 0
                '''

                bat 'docker run -d -p %PORT%:%PORT% --name %DOCKER_IMAGE_NAME%-container %DOCKER_IMAGE_NAME%'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully. The application is now running on port 3000.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
