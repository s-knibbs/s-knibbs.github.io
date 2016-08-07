---
layout: page
title: Projects
permalink: /projects/
mainnav: true
---

##Personal Projects

###HTTP Live Streaming TV Server

This started as an experiment to see if I could use a Raspberry Pi to stream live broadcast TV over a local network. This will work similarly to the [EE TV box](https://broadband.ee.co.uk/ee-tv/ee-tv-features) which can stream a selection of channels to other devices such as tablets in the home.

There are other open-source tools to do this (e.g. [MuMuDVB](http://www.mumudvb.net/)) which work by multicasting the video streams over the local network. This requires multicast capable network equipment, many older consumer routers do not support multicast at all. Even now, multicast support over WiFi in particular [tends to be poor](http://superuser.com/questions/730288/why-do-some-wifi-routers-block-multicast-packets-going-from-wired-to-wireless).

Instead, this tool uses [Apple's HTTP Live Streaming](https://developer.apple.com/streaming/)  (HLS) standard to stream TV channels using a webserver. The media stream is divided up into a series of 10s long segments and served as files over HTTP. By using HTTP and maintaining a buffer of several seconds of video at the server, this system is resilient to adverse network conditions such as dropped packets and network congestion. Multicast performance under these conditions would be poor and would cause the video stream to break-up or drop out completely. HLS supports MPEG transport streams as a container format which is the same format used by DVB, so the conversion process is relatively simple.

To test this I am using a Raspberry Pi 2 along with the [PCTV nanoStick T2](http://www.pctvsystems.com/Products/ProductsEuropeAsia/DVBTT2products/PCTVnanoStickT2/tabid/248/language/en-GB/Default.aspx) which is one of the few USB DVB tuners which supports DVB-T2, this is required to receive Freeview HD broadcasts in the UK. This works quite well in the UK, all of the main HD channels (BBC ONE HD, BBC TWO HD, ITV HD, Channel 4 HD) are broadcast on a single multiplex so only a single tuner is required.

The project is currently in the 'beta' stage, there are a couple of major issues that need addressing for this to be truly usable. For more technical information and to try this out yourself see the [GitHub repo](#).

##Client Projects

###Regression Test system for a hardware model video encoder

As part of a team of 2 - 4 engineers I developed a database backed (MySQL) system for scheduling regression test jobs for a hardware model video encoder and collecting the results for display later. Test jobs are scheduled on a cluster of dedicated machines managed by Oracle Grid Engine.

The system is composed of a client GUI written in Python and Qt, a script wrapper for launching the encoder and collecting the results, and a web interface for viewing the results. The GUI is used to select which build of the encoder to run (branch and revision number) and which tests to run.

Later additions to the project include:

- The addition of video quality tests, used primarily to test the addition of [HEVC](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding) support to the encoder. This included updating the web interface to automatically generate graphs of bitrate vs video quality.
- The development of a dashboard screen to display the job-queue status and latest trunk test results at a glance.
- Support for third-party encoders for benchmarking video quality.