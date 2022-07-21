
echo "New version for helio-frontend: "
read version

echo -e "\nDeployment for production with version: $version"

docker build --no-cache -t emiliocrespoperan/helio-frontend:$version -t emiliocrespoperan/helio-frontend:latest . 

docker push emiliocrespoperan/helio-frontend:$version
docker push emiliocrespoperan/helio-frontend:latest


echo -e "\nDeployment for playground with version: $version"

docker build --no-cache --build-arg profile=playground -t emiliocrespoperan/helio-frontend-playground:$version -t emiliocrespoperan/helio-frontend-playground:latest . 

docker push emiliocrespoperan/helio-frontend-playground:$version
docker push emiliocrespoperan/helio-frontend-playground:latest


read -rsn1 -p"Press any key to continue";echo

