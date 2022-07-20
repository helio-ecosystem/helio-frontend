
echo "New version for helio-frontend: "
read version

echo -e "\nVersion to be created: $version"

docker build -t emiliocrespoperan/helio-frontend:$version . 
docker push emiliocrespoperan/helio-frontend:$version

docker build -t emiliocrespoperan/helio-frontend-playground:$version . 
docker push emiliocrespoperan/helio-frontend-playground:$version

echo -e "\nVersion to be updated: latest"

docker build -t emiliocrespoperan/helio-frontend:latest .
docker push emiliocrespoperan/helio-frontend:latest

docker build -t emiliocrespoperan/helio-frontend-playground:latest .
docker push emiliocrespoperan/helio-frontend-playground:latest

read -rsn1 -p"Press any key to continue";echo

