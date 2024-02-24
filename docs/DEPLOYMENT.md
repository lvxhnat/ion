## Deployment 

### Missing volume files on docker mounting
```bash
sudo chown -R root:root /etc/letsencrypt/live/*
```

### Docker Installation on Ubuntu
```bash
sudo snap install docker 
# Sometimes, docker runs into the invalid host header error. To resolve this:
sudo snap refresh docker --channel=latest/edge
```

### Refresh Certificate
Refer to [this](https://ongkhaiwei.medium.com/generate-lets-encrypt-certificate-with-dns-challenge-and-namecheap-e5999a040708) guide for how to setup certbot.
```bash
# Install Certbot
snap install certbot --classic
# Get SSL certificates
sudo certbot certonly --manual --domain="finflow.cloud,api.finflow.cloud,www.finflow.cloud,www.api.finflow.cloud" --preferred-challenges=dns --agree-tos
```
TLDR: Set TXT record, add under Host _acme-challenge.api, i.e. _acme-challenge.(your prefix). The base host will fill up the remainder of the url, in this case finflow.cloud (Hence yielding api.finflow.cloud being SSL issued)
** The TXT records for ACME challenges can be deleted after the certificate is issued.

### Registering a Subdomain 

In order to add a subdomain e.g. original domain - https://finflow.cloud | subdomain - https://api.finflow.cloud, 
you can add on an A Record to the namecheap domain registration DNS configurations.