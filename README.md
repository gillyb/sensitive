# sensitive
A native version of the kibana sense plugin for elasticsearch

![Sensitive native](https://raw.githubusercontent.com/gillyb/sensitive/master/screenshots/sense.png)

### A little bit of history  
A long time ago, [elastic.co](http://elastic.co) released a chrome extension called Sense that made it really easy to communicate with your elasticsearch server. It had a simple and comfortable UI, but more importantly it offered auto-complete (a.k.a. intellisense) when building elasticsearch queries.  
This was an amazing tool, and I used it a lot.  

Then, (for some unknown reason) they decided to remove it from the Google extensions library, and it was only offered to customers who bought a license for marvel (the elasticsearch monitoring app).  

Recently elastic released the sense code as a plugin for kibana.  
This is great news! ...but what if I'm not using kibana ? I'm using elasticsearch and want to use sense, but I don't want to install kibana for that!  

### Sensitive to the rescue!  
Sensitive is the sense plugin wrapped as a native desktop application, using [electron](http://electron.atom.io/).  
It basically has all the kibana code in it, which will be cleaned out hopefully, along with the sense plugin code, but it doesn't run as a server, and doesn't use any ports on your computer.  


### Why is this better than the chrome extension ?  
There are guides on the internet about how to install sense as a chrome extension, like it was released a long time ago.   There are a few small problems with this though - The biggest problem is that the auto-complete doesn't work with the newer elasticsearch query DSL features included in ES 2 and above. In addition, I prefer running it as a native app which isn't related to my chrome, and doesn't act as a tab.


### Running from the source code  
* Install [nodejs](https://nodejs.org/en/)
* Download the 'Sensitive' source code
* Open your terminal (or cmd) and open the directory where you put the source code
* run `npm install` (this might take a while)
* run `npm start` to run the application
  
### Executable  
If you just want a running executable of this, then click on the appropriate link :
* [MacOS](https://github.com/gillyb/sensitive/releases/tag/Mac_0.1)  
_This was built running this: electron-packager ./ Sensitive --platform=darwin --arch=x64 --out=release --icon=./sense/installedPlugins/sense/public/logo128.png_  
*Please help me create executables for other platforms!*  

### Helping out  
If you want to help out improving this, then feel free to open issues, send pull requests or email with me suggestions.  
Thanks :)  

The most important issues that should be handled are :  
* Clean the irrelevant kibana code from the source
* Create release packages for other platforms (windows, linux)
* Add dropdown so user can choose which version of elasticsearch query DSL to use for auto-complete

### More links  
* [Sense history from the people at elastic.co](https://www.elastic.co/blog/sense-2-0-0-beta1)  
* [ElasticSearch 101 using Sense](http://joelabrahamsson.com/elasticsearch-101/)  
* [Installing Sense as a chrome extension](http://www.joshslauson.com/2014/06/14/how-to-install-sense-chrome-extension-from-source/)
