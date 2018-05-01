docker run --add-host localnode:10.134.2.41 --name nginx_proxy -d -v "$(pwd)":/etc/nginx  -p 443:443  -p 80:80 nginx 
