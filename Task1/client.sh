#Fetch the Ip of the server
IP=`curl -s -H "Metadata-Flavor: Google"  \
   "http://metadata.google.internal/computeMetadata/v1/instance/attributes/IP"`

#Fetch the key from the server
key=`curl -s -H "Metadata-Flavor: Google"  \
   "http://metadata.google.internal/computeMetadata/v1/instance/attributes/key"`

#Install Git and Node
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs git

#Clone DMW
git clone https://github.com/portsoc/distributed-master-worker
cd distributed-master-worker
npm install

#Run the client and then shut down once finished
npm run client $key $IP
sudo shutdown -h now
