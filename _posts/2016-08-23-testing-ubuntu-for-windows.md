---
layout: post
title: Testing Ubuntu on Windows
category: "Reviews"
tags: Ubuntu Linux Windows
---

I recently had a play around with [Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about) which is available in the
recently released Windows 10 anniversary update.

For the uninitiated, Ubuntu on Windows is a command line environment running the server version of Ubuntu 14.04 LTS. It runs on top
of a compatibility layer called [Windows subsystem for Linux](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) (WSL).

It functions similarly to the [Wine](https://www.winehq.org/) tool for running Windows apps in Linux by providing binary compatibility for Linux apps.
This is in contrast to the existing [Cygwin](https://www.cygwin.com/) tool, which uses linux apps compiled to work on Windows.

Currently, the tool is the beta stage of development and only supports Ubuntu 14.04.

Installation was a breeze. You need to [enable development mode](https://msdn.microsoft.com/en-gb/windows/uwp/get-started/enable-your-device-for-development)
in windows first. WSL can then be installed by selecting this in the 'Turn windows features on or off' dialogue.

After installation, you are provided with a shortcut to launch a bash prompt. You currently need to set up a separate Linux user account,
your Windows account doesn't currently get imported. To avoid issues with network access, it is currently necessary to launch bash with Windows
administrator privileges.

Ubuntu on Windows is targeted towards developers, web-developers in particular. I was able to install a number of packages from `apt-get` without any issues,
including *Apache* and *MySQL*. **Note:** Any background processes such as *Apache* will only run whilst there is a bash prompt open.

Although GUI applications are not officially supported I was even able to run some simple GUI applications such as [gitk](http://gitolite.com/gitk.html)
by using [Xming](http://www.straightrunning.com/XmingNotes/) ([Cygwin-X](http://x.cygwin.com/) did not work), an x-server for windows.

I did encounter a few issues, however. WSL currently lacks support for [inotify](https://en.wikipedia.org/wiki/Inotify). This is important for anyone
using a development server such as `jekyll serve` since inotify is required to listen for code & content changes and auto-reload them.

The integration with Windows could be improved. The entire Windows filesystem can be accessed from `/mnt/c/`. However, accessing the Ubuntu filesystem from Windows
is not as obvious. It is possible to access the home directories under `C:\Users\USERNAME\AppData\Local\lxss\home`, although this is undocumented.

It seems that symlinks to the Windows filesystem don't currently behave correctly (attempting to change directory inside a symlinked directory had no effect for me). You may want to do this to provide a shortcut to your
Windows profile directory.

Overall, I think this is a useful tool and is certainly much quicker and easier to setup than a full virtual machine. However, for now I will continue to use a virtual machine
running Ubuntu due to the current limitations.
