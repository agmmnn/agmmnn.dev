---
title: Installing Burp Suite Certificate in an Android Emulator
author: agmmnn
pubDatetime: 2023-07-20T02:05:51Z
featured: false
draft: false
tags:
  - pentest
  - Burp Suite
  - mitm
  - Android
ogImage: ""
description: "Burp Suite is a powerful tool for web application security testing and analysis. If you're working with an Android emulator and want to capture and analyze its network traffic using Burp Suite..."
---

Burp Suite is a powerful tool for web application security testing and analysis. If you're working with an Android emulator and want to capture and analyze its network traffic using Burp Suite, follow these steps to install the Burp Suite certificate in the emulator:

### Step 1: Install Android Emulator

Download and install any Anroid emulator. [MEmu emulator](https://www.memuplay.com) recommended. Once installed, run the Android emulator of your choice.

### Step 2: Configure Burp Suite Proxy Listener

Launch Burp Suite and navigate to the "Proxy" tab. Open "Options" and go to the "Proxy listeners" section. Here, add a new listener with the following configurations: Port 8080, Ip 192.168.1.2

### Step 3: Export Burp Suite Certificate

Still in the "Proxy listeners" section, click on "Import / Export CA certificate" and export the certificate in DER format. Save the certificate as "burp.der" on your machine.

### Step 4: Convert DER to PEM

Use OpenSSL to convert the "burp.der" certificate to PEM format using the following command:

```bash
openssl x509 -inform DER -in burp.der -out burp.pem
```

Output the hash with "subject_hash_old" to rename the PEM file:

```bash
openssl x509 -inform PEM -subject_hash_old -in burp.pem | head -1
```

The output will be <cert>.0. Now, rename the "burp.pem" file accordingly:

```bash
mv burp.pem <cert>.0
```

### Step 5: Set up Proxy on Emulator

After launching the Android emulator, change the proxy settings by opening the "Settings" and navigating to the "Proxy" section. Make sure your Wi-Fi is connected and configure the proxy settings as follows:

- Manual proxy configuration
- Host name: 192.168.1.2
- Port number: 8080
- Click "Apply."

### Step 6: Copy the Certificate to the Emulator

Use ADB tools to copy the certificate file to the Android emulator. If you're on a Mac, you can watch a video on how to install ADB on Mac. The command to push the certificate is:

```bash
$ adb push <cert>.0 /sdcard/
```

To ensure the certificate is in the correct location, remount the emulator as root using the following commands:

```bash
$ adb root
$ adb remount
$ adb shell
# mv /sdcard/<cert>.0 /system/etc/security/cacerts/
```

Next, change the permission of the certificate:

```bash
$ chmod 644 /system/etc/security/cacerts/<cert>.0
```

### Final: Restart the Android Emulator (Optional)

Now, restart the Android emulator to apply the changes.

Congratulations! You have successfully installed the Burp Suite certificate in the Android emulator. Now, you can turn on Intercept mode in Burp Suite and capture the app's network traffic for analysis. Have fun exploring and securing your Android apps!
