pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'cicd-assignment-app'
        PORT = '3000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Jenkins automatically checks out the code from the Git repository configured in the pipeline job.
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                // Build the Docker image using the Dockerfile in the repository
                bat 'docker build -t %DOCKER_IMAGE_NAME% .'
            }
        }

        stage('Run Application') {
            steps {
                echo 'Running the application in a Docker container...'
                
                // Stop and remove the existing container if it's already running to avoid port conflicts
                bat '''
                @echo off
                docker stop %DOCKER_IMAGE_NAME%-container >nul 2>&1
                docker rm %DOCKER_IMAGE_NAME%-container >nul 2>&1
                exit 0
                '''

                // Run the new Docker container in detached mode
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
