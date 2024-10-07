pipeline {

    environment{
        registry='roksonn/digital-bomb'
        dockerLogin='docker-login'
        dockerImage=''
    }

    agent any

    tools{ nodejs "nodejs" }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId:'github-token', url: 'https://github.com/roksonn/jenkins_CI-CD.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'ng test --no-watch --no-progress --browsers=ChromeHeadlessNoSandbox'
            }
        }
        stage('Docker Image') {
            steps {
                script {
                    dockerImage=docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry("", dockerLogin) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
               sh 'docker rmi $registry:$BUILD_NUMBER'
            }
        }
    }
}
