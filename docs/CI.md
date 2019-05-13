# How to enable continues intagration and deployment:
0) In case you need subdomains - create or update repo with deployment config (further mentioned as *deployment repo*) (similar to https://github.com/oakslab/dot-deployment).
1) Modify travis.yaml deploy->provider section and package.json scripts to have your project referenced there. Modify app-production.yaml and app-staging.yaml to match services specified in *deployment repo* (or let it be default in case you don't use subdomains).
2) Download gcloud key for travis (AppEngine/Apis&Services/Credentials -> create), name it as "gcloud-cert.json" place in your repo, encrypt it with “travis encrypt-file gcloud-cert.json --add”, and REMOVE NON-ENCRYPTED file from your repo.
3) Update CNAME in portal, where your client’s domain is registered (e.g. godaddy).
4) Verify domain both in GCP and in portal, where your client’s domain is registered (e.g. godaddy). 
5) Add subdomain in settings (AppEngine -> Application Settings -> Custom Domains).
6) Push your code, to start deployment with travis.
7) Deploy *deployment repo* manually with "yarn deploy" command.
