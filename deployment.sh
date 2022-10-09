
echo "New version for helio-frontend: "
read version

echo -e "\nDeployment for production with version: $version"

docker build --force-rm --no-cache -t emiliocrespoperan/helio-frontend:$version -t emiliocrespoperan/helio-frontend:latest .

docker push emiliocrespoperan/helio-frontend:$version
docker push emiliocrespoperan/helio-frontend:latest

read -rsn1 -p"Press any key to continue";echo

