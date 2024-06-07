---
author: agmmnn
pubDatetime: 2024-05-27T15:53:25.000+03:00
modDatetime:
title: Quickly Test Your Webhooks with Cloudflare Tunnel
featured: false
draft: false
tags:
  - webhooks
  - cloudflare
  - cloudflared
  - tunne
  - local server
ogImage: "https://cdn-images-1.medium.com/v2/resize:fit:1600/1*gLRiQjphSxxT7-gTRdm7JA.png"
description: "Creating a tunnel between your local machine and a tunnel service exposes local ports to the public internet. Many tools can help you do this, but today you're going to learn about Cloudflare Tunnel..."
---

Cloudflare Tunnel is tunneling software that lets you quickly secure and encrypt application traffic to any type of infrastructure. This enables you to hide your web server IP addresses, block direct attacks, and focus on delivering great applications.

![Cloudflare Tunnel](https://cdn-images-1.medium.com/v2/resize:fit:1600/1*gLRiQjphSxxT7-gTRdm7JA.png)

Creating a tunnel between your local machine and a tunnel service exposes local ports to the public internet. Many tools can help you do this, but today you're going to learn about Cloudflare Tunnel, also known as cloudflared (formerly Argo Tunnel).

## Set up a Local Web Server

To get started, set up a local web server. You can use Python’s built-in HTTP server for this purpose:

```sh
python -m http.server 8080
```

This command will start a web server on port 8080.

## Quickly Expose Your Local Web Server to the Internet

Next, install Cloudflare Tunnel. The installation process varies depending on your operating system.

**For macOS:**

```sh
brew install cloudflared
```

**For Windows:**

```sh
winget install --id Cloudflare.cloudflared
```

After installation, use the following command to create a tunnel that exposes your local server to the internet:

```sh
cloudflared tunnel --url http://localhost:8080
```

You will receive a message similar to the one below, providing you with a temporary URL to access your local server:

```
Thank you for trying Cloudflare Tunnel....
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
|  https://colleagues-ga-eternal-recruitment.trycloudflare.com                               |
+--------------------------------------------------------------------------------------------+
...
```

## Use a Persistent Address for Your Cloudflare Tunnel

For more stability and convenience, you might want to use a persistent address. Here’s how to set it up:

1. **Log in to Cloudflare Tunnel:**

   ```sh
   cloudflared tunnel login
   ```

2. **Create a Tunnel:**

   ```sh
   cloudflared tunnel create test
   ```

3. **List Tunnels:**

   ```sh
   cloudflared tunnel list
   ```

4. **Configure the Tunnel:**

   Create or edit the configuration file at `~/cloudflared/config.yml`:

   ```yml
   tunnel: <uuid>
   credentials-file: /Users/yourname/.cloudflared/<uuid>.json

   ingress:
     - hostname: test.myhost.com
       service: http://localhost:8080
     - service: http_status:404
   ```

5. **Run the Tunnel:**

   ```sh
   cloudflared tunnel run
   ```

By following these steps, you can set up a persistent and secure tunnel for your local web server. This is particularly useful for testing webhooks or any application that requires a public endpoint.
