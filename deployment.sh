
echo "New version for helio-frontend: "
read version

echo -e "\nVersion to be created: $version"

docker build -t emiliocrespoperan/helio-frontend:$version . 

docker push emiliocrespoperan/helio-frontend:$version

echo -e "\nVersion to be updated: latest"

docker build -t emiliocrespoperan/helio-frontend:latest .

docker push emiliocrespoperan/helio-frontend:latest

read -rsn1 -p"Press any key to continue";echo

