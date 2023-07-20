---
title: SSL Pinning Bypass For Android Using Frida
author: agmmnn
pubDatetime: 2023-07-20T04:05:51Z
featured: false
draft: false
tags:
  - pentest
  - Burp Suite
  - mitm
  - Android
  - frida
  - objection
ogImage: ""
description: "SSL pinning is a security mechanism used by mobile applications to prevent man-in-the-middle attacks by verifying the server's SSL certificate. However, there are situations where developers or security testers..."
---

SSL pinning is a security mechanism used by mobile applications to prevent man-in-the-middle attacks by verifying the server's SSL certificate. However, there are situations where developers or security testers may need to bypass SSL pinning to analyze or modify network traffic. In this article, we will explore how to bypass SSL pinning on Android using Frida, a dynamic instrumentation toolkit.

### Install MEmu Emulator:

To begin our SSL pinning bypass process, we'll need an Android emulator. Recommend installing the [MEmu emulator](https://www.memuplay.com/) to create a virtual Android environment on your computer.

### Frida Packages for Python

For Frida server, we’ll need to install a few python packages. In a terminal, type the following command:

```bash
$ pip install Frida
$ pip install objection
$ pip install frida-tools
```

3. ADB Setup:

Ensure that you have Android Debug Bridge (ADB) installed on your computer. Use the following command to check if your emulator or connected Android device is detected:

```bash
$ adb devices
```

### Download and Configure Frida Server:

```bash
$ adb shell getprop ro.product.cpu.abi
```

Based on the architecture, download the appropriate Frida server from the official GitHub repository (https://github.com/frida/frida/releases). Rename the downloaded file to "frida-server" for convenience.

Push the Frida server to the emulator or device's temporary directory using ADB:

```bash
$ adb push frida-server /data/local/tmp/
```

Ensure the Frida server has the necessary permissions:

```bash
$ adb shell "chmod 777 /data/local/tmp/frida-server"
```

Launch Frida on the device by executing the following command:

```bash
$ adb shell "/data/local/tmp/frida-server &"
```

Verify that Frida is running correctly by checking the attached processes on the device:

```bash
$ frida-ps -U
```

### Bypass SSL Pinning with Frida:

Now, we can bypass SSL pinning by utilizing a Frida script. The following Frida command will unpin SSL certificates for a specified app:

```bash
$ frida --codeshare akabe1/frida-multiple-unpinning -U -f <appname>
```

Replace <appname> with the package name or process name of the target application.

# Final Intercepting with Burp Suite:

After successfully bypassing SSL pinning with Frida, you can now intercept and analyze the network traffic of the target application. To do this, you'll need to configure Burp Suite, a popular web vulnerability scanner and proxy tool.
Install Burp Suite on your computer and set it up to intercept traffic.

For Android devices, you'll need to install Burp Suite's SSL certificate in the emulator to handle HTTPS traffic. Follow the instructions provided in the link below to install the Burp Suite certificate in an Android emulator: http://agmmnn.dev/blog/installing-burp-suite-certificate-in-an-android-emulator
