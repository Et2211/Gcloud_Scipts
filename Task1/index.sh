#!/bin/bash

#Generate the key 
key=`openssl rand -base64 32`

echo "How many clients's?"
read N

#Create the server 
gcloud compute instances create --machine-type n2-highcpu-2 --scopes=compute-rw  --metadata-from-file startup-script=server.sh --metadata key=$key,N=$N --tags http-server,https-server server --zone=europe-west1-c

#Fetches the IP of the server to pass to clients
IP=`gcloud compute instances describe server --format='get(networkInterfaces[0].accessConfigs[0].natIP)' --zone=europe-west1-c`

#Creates N number of clients
for i in $(seq 1 $N)
do
  gcloud compute instances create --machine-type n2-highcpu-2 --metadata-from-file startup-script=client.sh client$i --metadata key=$key,IP=$IP --tags http-server,https-server --zone=europe-west1-c
done

