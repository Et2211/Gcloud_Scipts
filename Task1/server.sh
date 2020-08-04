sudo bash

#Install Git and Node
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs git

#Fetch the key from metadata
key=`curl -s -H "Metadata-Flavor: Google"  \
   "http://metadata.google.internal/computeMetadata/v1/instance/attributes/key"`

#Fetch the number of clients from metadata
N=`curl -s -H "Metadata-Flavor: Google"  \
   "http://metadata.google.internal/computeMetadata/v1/instance/attributes/N"`

#Install Git, Node and any dependancies
git clone https://github.com/portsoc/distributed-master-worker
cd distributed-master-worker
npm install

#Run the server with the key
npm run server $key

#Once the server is finished, delete the client machines
for i in $(seq 1 $N)
do
  gcloud --quiet compute instances delete client$i --zone=europe-west1-c
done

