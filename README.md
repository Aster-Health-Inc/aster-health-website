# Aster Health Website

repo contains the static website for Aster Health, deployed using GitHub Pages and served on the custom domain - https://aster.fit 


domain aster.fit is registered and managed through *GoDaddy*. GoDaddy DNS is responsible for routing all traffic to GitHub Pages. 
DNS configuration includes :
- four A records that point the root domain to GitHub’s servers, 
- CNAME record to ensure www subdomain resolves correctly. 

The DNS setup is as follows:

A - @ - 185.199.108.153  
A - @ - 185.199.109.153  
A - @ - 185.199.110.153  
A - @ - 185.199.111.153  
CNAME- www - asterhealthinc.github.io

(allows GitHub Pages to serve the site from this repository while GoDaddy handles domain resolution)

for anyone maintaining or updating the site - update important changes in this readme for documentation purposes. 

