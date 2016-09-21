---
layout: post
title: Testing Chocolatey
categories: "Reviews"
tags: Windows XML chocolatey PowerShell
image:
  name: Chocolatey Logo
  url: https://raw.githubusercontent.com/chocolatey/chocolatey.org/master/chocolatey/Website/Content/Images/logo_square.svg
  centered: true
  caption: Logo from [chocolatey.org](https://github.com/chocolatey/chocolatey.org)
  height: 300
  width: 600
  type: SVG
---
For those who don't already know, [Chocolatey](https://chocolatey.org/) is a package manager for Windows, similar to the [Advanced Packaging Tool](https://en.wikipedia.org/wiki/Advanced_Packaging_Tool) (APT) in Debian Linux. Chocolatey is designed for complete applications rather than developer libraries. For that there is a separate tool called [NuGet](https://www.nuget.org/).

This greatly simplifies the process of installing and managing software on Windows machines. The tool also integrates with a number of configuration management tools such as [Puppet](https://puppet.com/).

The list of applications available includes many common tools used by developers including:

 - PuTTY
 - Python
 - 7-Zip
 - VLC Media Player
 - VirtualBox

### Installation

In a PowerShell v3+ prompt with administrator privileges, Chocolatey can be installed with the following:

```
PS> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
PS> iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
```

Chocolatey will then be available from newly launched PowerShell and command prompts.

### Basic Usage

Install packages with:

```
> choco install PACKAGE_NAME [PACKAGE_NAME...]
# Shorthand command
> cinst PACKAGE_NAME [PACKAGE_NAME...]
```

Uninstall packages with:

```
> choco uninstall PACKAGE_NAME [PACKAGE_NAME...]
# Shorthand command
> cuninst PACKAGE_NAME [PACKAGE_NAME...]
```

Upgrade packages with:

```
> choco upgrade PACKAGE_NAME|all
# Shorthand command
> cup PACKAGE_NAME|all
```

### Installing a list of packages

You can install a list of packages using `choco install` by specifying `packages.config` as the package name. This is an XML file in the following format:

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="putty" />
  <package id="thunderbird" version="45.3.0" />
  <package id="chocolateytestpackage" version="0.1" source="https://example.com/" />
  <package id="alloptions" version="0.1.1"
           source="https://somewhere/api/v2/" installArguments=""
           packageParameters="" forceX86="false" allowMultipleVersions="false"
           ignoreDependencies="false"
           />
</packages>
```

Unfortunately, there isn't currently a way to [generate this XML automatically](https://github.com/chocolatey/choco/issues/357) from the list of installed packages, so I created a [small Python script](https://gist.github.com/s-knibbs/e3255f3d862da87827d7ae651b9cafb9) to do this by calling `choco list --localonly`. The script requires [Jinja](http://jinja.pocoo.org/) for the XML template which can be installed with:

```
pip install jinja
```

From my initial experience, Chocolatey seems to work pretty well. I was able to convert many of the manually installed applications on my machine to 'Chocolatey' installs by re-installing these with `choco install`.

Unfortunately, some of the more [advanced features](https://chocolatey.org/pricing) such as the ability to automatically synchronise with "Programs and Features" (prevents choco getting out of sync when using software such as web browser that automatically update) are only available in the paid versions though which start at $8/month. Hopefully some of these features will be brought to the open source version in future.
