#!/usr/bin/env groovy

import jenkins.*
import jenkins.model.*
import hudson.*
import hudson.model.*

node {
    def NAME = "admin-front"
    def DOCKER_REPO = "hub.develobeer.blog"

  try{
    stage('Checkout'){
      checkout scm
    }

    def shortRevision = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
    println("short revision : " + shortRevision)
    
    switch(params.JOB){
      case "build&deploy":
        stage('npm build'){
          runBuild()
        }

        stage("docker build with tag") {
            sh "docker build . -t ${DOCKER_REPO}/${NAME}:${shortRevision}"
        }

        stage("docker login & image push") {
            sh "docker login hub.develobeer.blog -u ${params.DOCKER_REPO_USER} -p ${params.DOCKER_REPO_PASS}"
            sh "docker push ${DOCKER_REPO}/${NAME}:${shortRevision}"
        }
      
        if("${env.CURRENT_ADMIN_ENV}" == "blue"){
          stage('deploy swarm manager'){
            deployManager("Green1", shortRevision)
          }

          if (currentBuild.result == "SUCCESS") {
              stage('overwrite env'){
                overwriteEnv("green")
              }

              stage('overwrite nginx conf'){
                sh "docker cp /var/deploy_env_conf/admin_green_front.conf myNginx:/etc/nginx/conf.d/target_admin_front.conf"
              }

              stage('reload nginx'){
                sh "docker kill -s HUP myNginx"
              }
          }


        }
        else{
          stage('deploy swarm manager'){
            deployManager("Blue1", shortRevision)
          }

          if (currentBuild.result == "SUCCESS") {
              stage('overwrite env'){
                overwriteEnv("blue")
              }

              stage('overwrite nginx conf'){
                sh "docker cp /var/deploy_env_conf/admin_blue_front.conf myNginx:/etc/nginx/conf.d/target_admin_front.conf"
              }

              stage('reload nginx'){
                sh "docker kill -s HUP myNginx"
              }
          }
        }
        
      break
      case "build":
        stage('npm build'){
          runBuild()
        }
      break
      case "install":
        stage('npm install'){
          sh "npm install"
        }
      break
      case "update":
        stage('npm update'){
          sh "npm update"
        }
      break
      case "versionCheck":
        stage('package version check'){
          sh "npm list --depth=0"
        }
      break
      case "moduleFolderRemove":
        stage('remove modules folder'){
          sh "rm -rf ./node_modules"
        }
      break
    }
  }
  catch (err){
    currentBuild.result = 'FAILED'
    println(err.getMessage());
    throw err
  }
}


def runBuild(){
  sh "npm run build"
}
          
def deployManager(configName, shortRevision) {
    sshPublisher(publishers: [
            sshPublisherDesc(
                    configName: configName,
                    transfers: [
                            sshTransfer(sourceFiles: 'docker-compose-admin.yml, deploy-admin-manager.sh',
                                    execCommand: "cd /root && \
                                    docker login hub.develobeer.blog -u ${params.DOCKER_REPO_USER} -p ${params.DOCKER_REPO_PASS} && \
                                    chmod 744 ./deploy-admin-manager.sh && \
                                    ./deploy-admin-manager.sh ${shortRevision}")
                    ],
            )
    ],
            failOnError: true)
}

def overwriteEnv(activeEnv){
  Jenkins instance = Jenkins.getInstance()
  def globalNodeProperties = instance.getGlobalNodeProperties()
  def envVarsNodePropertyList = globalNodeProperties.getAll(hudson.slaves.EnvironmentVariablesNodeProperty.class)
  def newEnvVarsNodeProperty = null
  def envVars = null

  if ( envVarsNodePropertyList == null || envVarsNodePropertyList.size() == 0 ) {
    newEnvVarsNodeProperty = new hudson.slaves.EnvironmentVariablesNodeProperty();
    globalNodeProperties.add(newEnvVarsNodeProperty)
    envVars = newEnvVarsNodeProperty.getEnvVars()
  }
  else {
    envVars = envVarsNodePropertyList.get(0).getEnvVars()
  }

  envVars.put("CURRENT_ADMIN_ENV", activeEnv)

  instance.save()
}
